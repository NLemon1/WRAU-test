const header = () => {

    const headerSearchOverlay = document.querySelector('.js-header__search-overlay');
    const headerSearchOverlayOpeners = document.querySelectorAll('.js-header__search-overlay-toggle');
    const headerSearchOverlayClose = document.querySelector('.js-header__search-overlay-close');
    const headerSearchInput = document.getElementById('header-search-input');

    const siteMain = document.querySelector('.js-site-main');
    const header = document.querySelector('.js-header');
    const offsetHeight = 120;

    let tempOpener = "";

    const killOverlay = () => {
        headerSearchOverlay.classList.remove('is-open');
        headerSearchOverlay.setAttribute('aria-hidden', 'true');
        tempOpener.classList.remove('is-open');
        tempOpener.setAttribute('aria-expanded', 'false');
        headerSearchInput.blur();
    }

    const initOverlay = (openBtn) => {
        headerSearchOverlay.classList.add('is-open');
        headerSearchOverlay.setAttribute('aria-hidden', 'false');
        openBtn.classList.add('is-open');
        openBtn.setAttribute('aria-expanded', 'true');
        tempOpener = openBtn;
        headerSearchInput.focus();
    }

    if (headerSearchOverlay) {

        headerSearchOverlayOpeners.forEach((headerSearchOverlayOpener) => {
            headerSearchOverlayOpener.addEventListener('click', (e) => {

                if (headerSearchOverlay.classList.contains('is-open')) {
                    killOverlay();
                } else {
                    initOverlay(headerSearchOverlayOpener);
                }

                e.preventDefault();

            });
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && headerSearchOverlay.classList.contains('is-open')) {
                killOverlay();
            }
        });

        headerSearchOverlayClose.addEventListener('click', (e) => {
            killOverlay(tempOpener);
            e.preventDefault();
        });
    }


    if (header) {

        if (header.classList.contains('site-header--show-on-scroll-up')) {

            let scrollPos = 0;

            global.addEventListener('scroll', () => {

                const { top } = document.body.getBoundingClientRect();
                const isSticky = header.classList.contains('position-sticky');

                const handleScrollTop = () => {
                    header.classList.add('site-header--top');
                    header.classList.remove('position-sticky');
                };

                const handleScrollUp = () => {
                    if (!isSticky) {
                        header.classList.add('position-sticky');
                    }
                };

                const handleScrollDown = () => {
                    header.classList.remove('site-header--top');

                    if (isSticky) {
                        global.setTimeout(() => {
                            global.setTimeout(() => {
                                header.classList.remove('position-sticky');
                            }, 250);
                        });
                    }
                };

                if (!siteMain.classList.contains("has-overlay")) {
                    if (top >= offsetHeight) {
                        handleScrollTop();
                    } else if (top > scrollPos) {
                        handleScrollUp();
                    } else {
                        handleScrollDown();
                    }
                }

                scrollPos = top;
            });
        } else if (header.classList.contains('position-sticky')) {
            global.addEventListener('scroll', () => {
                const { top } = document.body.getBoundingClientRect();

                if (top >= offsetHeight) {
                    header.classList.add('site-header--top');
                } else {
                    header.classList.remove('site-header--top');
                }
            });
        }
    }



};

export default header;