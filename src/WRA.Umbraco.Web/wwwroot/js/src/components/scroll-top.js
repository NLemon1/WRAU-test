const scrollTop = () => {

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

        //calculate scroll relative scroll depth to hide/show button

        const paneHeight = scrollPaneElement.scrollHeight ?? scrollPaneElement.outerHeight;


        scrollPaneElement.addEventListener('scroll', (e) => { 

            const paneScrollPosition = scrollPaneElement.scrollTop ?? scrollPaneElement.pageYOffset; // div / window

            console.log( (paneScrollPosition / paneHeight) * 1) //percentaged scrolled, need to make it relative to viewport height


        });

     //  console.log(scrollPaneElement, paneHeight) //total pane height


    });


};

export default scrollTop;