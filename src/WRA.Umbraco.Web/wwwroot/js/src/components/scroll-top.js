const scrollTop = () => {

    //HTML: <button aria-hidden="true" class="js-scroll-top btn-scroll-top btn-scroll-top--inset" data-targetid="tabpanel-info-change" data-paneid="tabpanel-info-change" title="Back to Top"  hidden>
    // targetid is required, paneid defaults to window element.

    const scrollTopBtns = document.querySelectorAll('.js-scroll-top');
    const siteHeader = document.querySelector('.js-header');

    scrollTopBtns.forEach((scrollTopBtn) => {

        const scrollTarget = scrollTopBtn.dataset.targetid,
            targetId = document.getElementById(scrollTarget);

        const scrollPane = scrollTopBtn.dataset.paneid,
            scrollPaneElement = scrollPane == "" || scrollPane == undefined ? window : document.getElementById(scrollPane);

        const scrollTargetYPos = targetId.offsetTop || 0;
        const scrollTargetScrollPos = scrollPane ? targetId.offsetTop : scrollTargetYPos;

        const setOffset = siteHeader.classList.contains("position-sticky") || siteHeader.classList.contains("site-header--top") ? siteHeader.offsetHeight + 50 : 0;

        scrollTopBtn.addEventListener("click", (e) => {
            e.preventDefault();

            scrollPaneElement.scrollTo({
                top: scrollTargetScrollPos - setOffset,
                left: 0,
                behavior: "smooth",
            });
        });

        const viewportHeight = window.outerHeight;

        setTimeout(() => {
            scrollPaneElement.addEventListener('scroll', (e) => {
                const paneScrollPosition = scrollPaneElement.scrollTop ?? scrollPaneElement.pageYOffset; // div / window

                if ((paneScrollPosition * 2) > viewportHeight) {
                    scrollTopBtn.hidden = false;
                } else {
                    scrollTopBtn.hidden = true;
                }

            });
        }, 150);

    });
};

export default scrollTop;