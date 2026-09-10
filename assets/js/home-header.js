(() => {
    const header = document.querySelector('.home-header');
    if (!header) return;
    header.classList.add('home-header-ready');

    let scheduled = false;
    const updateHeader = () => {
        header.classList.toggle('home-header-scrolled', window.scrollY > 20 && !header.classList.contains('home-header-static'));
        scheduled = false;
    };

    window.addEventListener('scroll', () => {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(updateHeader);
    }, { passive: true });
    window.addEventListener('pageshow', updateHeader);
    updateHeader();

    // Leave enough room for anchor targets, including when text wraps on mobile.
    const surface = header.querySelector('.home-header-inner');
    const updateOffset = () => {
        // Avoid covering most of a short viewport or a page with enlarged text.
        const isTooTall = surface.offsetHeight > window.innerHeight * 0.4;
        header.classList.toggle('home-header-static', isTooTall);
        document.body.style.setProperty('--home-header-offset', `${isTooTall ? 24 : surface.offsetHeight + 36}px`);
        updateHeader();
    };
    updateOffset();
    window.addEventListener('resize', updateOffset, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(updateOffset).observe(surface);
})();
