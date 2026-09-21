/* Rides page: draws every GPX trace on a Leaflet map and fills in the stats. */
(function () {
  'use strict';

  var rides = window.RIDES || [];
  var mapEl = document.getElementById('rides-map');
  if (!mapEl || typeof L === 'undefined') return;

  // ---- Map ---------------------------------------------------------------
  var map = L.map(mapEl, {
    scrollWheelZoom: false,
    zoomSnap: 0,
    zoomDelta: 1
  }).setView([48.8566, 2.3522], 11);
  window.ridesMap = map; // handy for debugging in the console

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Leaflet rounds wheel gestures into zoom steps. Apply the raw wheel
  // distance instead so trackpads stay smooth and faster gestures travel
  // farther, while double-click and the controls still use one full level.
  var wheelDelta = 0;
  var wheelPoint = null;
  var wheelFrame = null;

  function applyWheelZoom() {
    var delta = wheelDelta;
    wheelDelta = 0;
    wheelFrame = null;
    if (!delta || !wheelPoint) return;

    var targetZoom = map.getZoom() - delta / 120;
    targetZoom = Math.max(map.getMinZoom(), Math.min(map.getMaxZoom(), targetZoom));
    map.setZoomAround(wheelPoint, targetZoom, { animate: false });
  }

  mapEl.addEventListener('wheel', function (event) {
    event.preventDefault();
    var delta = event.deltaY;
    if (event.deltaMode === 1) delta *= 18;
    else if (event.deltaMode === 2) delta *= mapEl.clientHeight;

    wheelDelta += delta;
    wheelPoint = map.mouseEventToContainerPoint(event);
    if (wheelFrame === null) wheelFrame = window.requestAnimationFrame(applyWheelZoom);
  }, { passive: false });

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
  var activeFilter = 'all';
  var activeTag = null;

  function matchesFilter(ride) {
    if (activeFilter === 'all') return true;
    return (ride.tags || []).indexOf(activeTag) !== -1;
  }

  function updateLayerVisibility(index) {
    var layer = layers[index];
    if (!layer) return;
    [layer.line, layer.start].forEach(function (part) {
      if (matchesFilter(rides[index])) part.addTo(map);
      else map.removeLayer(part);
    });
  }

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

  function focusRide(index, fitView) {
    activeIndex = index;
    layers.forEach(function (l, i) {
      if (!l) return;
      var dim = index !== null && i !== index;
      l.line.setStyle({ opacity: dim ? 0.25 : 0.9, weight: i === index ? 5 : 4 });
      if (i === index) l.line.bringToFront();
    });
    cards.forEach(function (c, i) { c.classList.toggle('is-active', i === index); });
    if (fitView === false) return;
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

        var start = L.circleMarker(latlngs[0], {
          radius: 5, color: '#fff', weight: 2, fillColor: ride.color, fillOpacity: 1
        }).addTo(map);

        layers[index] = { line: line, start: start };
        updateLayerVisibility(index);

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

  // Re-measure when the layout changes without overriding the user's zoom.
  if (typeof ResizeObserver !== 'undefined') {
    var lastWidth = mapEl.clientWidth;
    new ResizeObserver(function () {
      if (mapEl.clientWidth === lastWidth) return;
      lastWidth = mapEl.clientWidth;
      map.invalidateSize();
    }).observe(mapEl);
  }

  // ---- Interactions ------------------------------------------------------
  cards.forEach(function (card, i) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return; // let links work normally
      focusRide(activeIndex === i ? null : i, false);
    });
  });

  var filterButtons = document.querySelectorAll('.rides-filters button');
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeFilter = btn.getAttribute('data-filter');
      activeTag = btn.getAttribute('data-tag');
      filterButtons.forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      cards.forEach(function (card, i) {
        var show = matchesFilter(rides[i]);
        card.classList.toggle('is-hidden', !show);
        updateLayerVisibility(i);
      });
      focusRide(null);
    });
  });
})();
