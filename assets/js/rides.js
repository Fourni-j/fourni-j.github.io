/* Rides page: draws every GPX trace on a Leaflet map and fills in the stats. */
(function () {
  'use strict';

  var rides = window.RIDES || [];
  var mapEl = document.getElementById('rides-map');
  if (!mapEl || typeof L === 'undefined') return;

  // ---- Map ---------------------------------------------------------------
  var map = L.map(mapEl, { scrollWheelZoom: false }).setView([48.8566, 2.3522], 11);
  window.ridesMap = map; // handy for debugging in the console

  var cartoAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  var voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 20,
    attribution: cartoAttribution
  }).addTo(map);

  var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 20,
    attribution: cartoAttribution
  });

  L.control.layers({ 'Map': voyager, 'Light': positron }, null, { position: 'topright' }).addTo(map);

  // ---- GPX parsing -------------------------------------------------------
  function parseGpx(text) {
    var doc = new DOMParser().parseFromString(text, 'application/xml');
    var nodes = doc.getElementsByTagName('trkpt');
    if (!nodes.length) nodes = doc.getElementsByTagName('rtept');
    var pts = [];
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var eleNode = n.getElementsByTagName('ele')[0];
      pts.push({
        lat: parseFloat(n.getAttribute('lat')),
        lon: parseFloat(n.getAttribute('lon')),
        ele: eleNode ? parseFloat(eleNode.textContent) : null
      });
    }
    return pts;
  }

  function haversine(a, b) {
    var R = 6371000;
    var toRad = Math.PI / 180;
    var dLat = (b.lat - a.lat) * toRad;
    var dLon = (b.lon - a.lon) * toRad;
    var s = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(a.lat * toRad) * Math.cos(b.lat * toRad) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.sqrt(s));
  }

  function stats(pts) {
    var distance = 0;
    for (var i = 1; i < pts.length; i++) distance += haversine(pts[i - 1], pts[i]);

    // Elevation gain: smooth with a small moving average and ignore tiny
    // oscillations so GPS noise doesn't inflate the D+.
    var eles = pts.map(function (p) { return p.ele; }).filter(function (e) { return e !== null && !isNaN(e); });
    var gain = 0;
    if (eles.length > 1) {
      var win = 5, smooth = [];
      for (var j = 0; j < eles.length; j++) {
        var lo = Math.max(0, j - win), hi = Math.min(eles.length - 1, j + win), sum = 0;
        for (var k = lo; k <= hi; k++) sum += eles[k];
        smooth.push(sum / (hi - lo + 1));
      }
      var ref = smooth[0];
      for (var m = 1; m < smooth.length; m++) {
        var d = smooth[m] - ref;
        if (d >= 3) { gain += d; ref = smooth[m]; }
        else if (d <= -3) { ref = smooth[m]; }
      }
    }
    return { distance: distance, gain: gain };
  }

  // ---- Layers & cards ----------------------------------------------------
  var layers = [];
  var cards = Array.prototype.slice.call(document.querySelectorAll('.ride-row'));
  var activeIndex = null;

  function setText(root, attr, value) {
    var el = root.querySelector('[data-' + attr.split('=')[0] + '="' + attr.split('=')[1] + '"]');
    if (el) el.textContent = value;
  }

  function fmtKm(m) { return (m / 1000).toFixed(1); }

  function fitAll() {
    map.invalidateSize();
    var visible = layers.filter(function (l) { return l && map.hasLayer(l.line); });
    if (!visible.length) return;
    var bounds = visible[0].line.getBounds();
    visible.forEach(function (l) { bounds.extend(l.line.getBounds()); });
    map.fitBounds(bounds, { padding: [30, 30] });
  }

  // Temporary emphasis (hover) — does not change the zoom.
  function highlightRide(index) {
    layers.forEach(function (l, i) {
      if (!l) return;
      var isTarget = i === index;
      var dimmed = activeIndex !== null && i !== activeIndex;
      l.line.setStyle({
        opacity: index === null ? (dimmed ? 0.25 : 0.9) : (isTarget ? 1 : 0.2),
        weight: isTarget || i === activeIndex ? 6 : 4
      });
      if (isTarget) { l.line.bringToFront(); l.hit.bringToFront(); }
    });
    cards.forEach(function (c, i) { c.classList.toggle('is-hover', i === index); });
  }

  function focusRide(index) {
    activeIndex = index;
    layers.forEach(function (l, i) {
      if (!l) return;
      var dim = index !== null && i !== index;
      l.line.setStyle({ opacity: dim ? 0.25 : 0.9, weight: i === index ? 5 : 4 });
      if (i === index) { l.line.bringToFront(); l.hit.bringToFront(); }
    });
    cards.forEach(function (c, i) { c.classList.toggle('is-active', i === index); });
    if (index !== null && layers[index]) {
      map.invalidateSize();
      map.fitBounds(layers[index].line.getBounds(), { padding: [30, 30] });
    } else {
      fitAll();
    }
  }

  function addRide(ride, index) {
    return fetch(ride.gpx)
      .then(function (r) { if (!r.ok) throw new Error(r.status + ' ' + ride.gpx); return r.text(); })
      .then(function (text) {
        var pts = parseGpx(text);
        if (!pts.length) throw new Error('No track points in ' + ride.gpx);
        var latlngs = pts.map(function (p) { return [p.lat, p.lon]; });

        var line = L.polyline(latlngs, { color: ride.color, weight: 4, opacity: 0.9, interactive: false }).addTo(map);

        // Wide invisible line on top so the trace is easy to hover/click.
        var hit = L.polyline(latlngs, { color: '#000', weight: 16, opacity: 0 }).addTo(map);
        hit.on('mouseover', function () { highlightRide(index); });
        hit.on('mouseout', function () { highlightRide(null); });
        hit.on('click', function (e) {
          L.DomEvent.stopPropagation(e);
          focusRide(index);
          var card = cards[index];
          if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

        var start = L.circleMarker(latlngs[0], {
          radius: 5, color: '#fff', weight: 2, fillColor: ride.color, fillOpacity: 1
        }).addTo(map);

        layers[index] = { line: line, hit: hit, start: start };

        var s = stats(pts);
        var card = cards[index];
        if (card) {
          setText(card, 'stat=distance', fmtKm(s.distance));
          setText(card, 'stat=elevation', Math.round(s.gain));
        }
      })
      .catch(function (err) {
        console.error('Ride could not be loaded:', err);
        var card = cards[index];
        if (card) card.classList.add('is-error');
      });
  }

  Promise.all(rides.map(addRide)).then(fitAll);

  // The container can be measured at 0px wide while the page animates in, so
  // re-measure whenever its size changes and keep the traces in view.
  if (typeof ResizeObserver !== 'undefined') {
    var lastWidth = mapEl.clientWidth;
    new ResizeObserver(function () {
      if (mapEl.clientWidth === lastWidth) return;
      lastWidth = mapEl.clientWidth;
      map.invalidateSize();
      focusRide(activeIndex);
    }).observe(mapEl);
  }

  // ---- Interactions ------------------------------------------------------
  cards.forEach(function (card, i) {
    card.addEventListener('mouseenter', function () { highlightRide(i); });
    card.addEventListener('mouseleave', function () { highlightRide(null); });
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return; // let links work normally
      focusRide(activeIndex === i ? null : i);
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  map.on('click', function () { focusRide(null); });

  var filterButtons = document.querySelectorAll('.rides-filters button');
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var type = btn.getAttribute('data-filter');
      filterButtons.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      cards.forEach(function (card, i) {
        var show = type === 'all' || card.getAttribute('data-type') === type;
        card.classList.toggle('is-hidden', !show);
        var l = layers[i];
        if (!l) return;
        if (show) { l.line.addTo(map); l.hit.addTo(map); l.start.addTo(map); }
        else { map.removeLayer(l.line); map.removeLayer(l.hit); map.removeLayer(l.start); }
      });
      focusRide(null);
    });
  });
})();
