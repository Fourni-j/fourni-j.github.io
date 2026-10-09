// Plays an article's app demos while they are on screen. With Reduce Motion,
// each demo shows its key moment until the reader presses play.
(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function videoDemo(video) {
        const still = Number(video.dataset.still || 0);
        return {
            play() { video.play().catch(() => {}); },
            pause() { video.pause(); },
            showStill() {
                video.pause();
                if (video.readyState >= 1) {
                    video.currentTime = still;
                } else {
                    video.addEventListener('loadedmetadata', () => { video.currentTime = still; }, { once: true });
                }
            }
        };
    }

    // The note is written in the item's details, like the app's What's New page.
    function noteDemo(screen) {
        const add = screen.querySelector('.fb-note-add');
        const typed = screen.querySelector('.fb-note-typed');
        const words = screen.querySelector('.fb-note-words');
        const caret = screen.querySelector('.fb-note-caret');
        const note = words.textContent;
        let run = 0;

        const wait = (ms, id) => new Promise((resolve, reject) => {
            setTimeout(() => (id === run ? resolve() : reject()), ms);
        });

        function show(written, isWriting) {
            add.hidden = isWriting;
            typed.hidden = !isWriting;
            typed.style.opacity = 1;
            words.textContent = note.slice(0, written);
            caret.hidden = written >= note.length;
        }

        return {
            async play() {
                const id = ++run;
                try {
                    for (;;) {
                        show(0, false);
                        await wait(1200, id);
                        show(0, true);
                        await wait(500, id);
                        for (let index = 1; index <= note.length; index += 1) {
                            show(index, true);
                            await wait(70, id);
                        }
                        await wait(2800, id);
                        typed.style.opacity = 0;
                        await wait(600, id);
                    }
                } catch {
                    // Paused or scrolled away: the screen keeps its current state.
                }
            },
            pause() { run += 1; },
            showStill() { run += 1; show(note.length, true); }
        };
    }

    document.querySelectorAll('.post-phone').forEach((phone) => {
        const video = phone.querySelector('video');
        const screen = phone.querySelector('.fb-note-screen');
        const button = phone.querySelector('.post-demo-toggle');
        const demo = video ? videoDemo(video) : screen ? noteDemo(screen) : null;
        if (!demo || !button) return;

        let pausedByReader = reduceMotion.matches;
        let isVisible = false;
        let isPlaying = false;

        function update() {
            const shouldPlay = isVisible && !pausedByReader;
            if (shouldPlay === isPlaying) return;
            isPlaying = shouldPlay;
            if (shouldPlay) demo.play(); else demo.pause();
        }

        function setPaused(paused) {
            pausedByReader = paused;
            button.setAttribute('aria-pressed', String(paused));
            update();
        }

        if (pausedByReader) demo.showStill(); else demo.pause();
        button.hidden = false;
        button.setAttribute('aria-pressed', String(pausedByReader));
        button.addEventListener('click', () => setPaused(!pausedByReader));
        reduceMotion.addEventListener('change', (event) => {
            setPaused(event.matches);
            if (event.matches) demo.showStill();
        });

        if ('IntersectionObserver' in window) {
            new IntersectionObserver((entries) => {
                isVisible = entries[entries.length - 1].isIntersecting;
                update();
            }, { threshold: 0.25 }).observe(phone);
        } else {
            isVisible = true;
            update();
        }
    });
})();
