//import AccordionTabs from 'a11y-accordion-tabs';

const pageTabs = () => {
    // init tabs
    //new AccordionTabs();


    const pageTabs = document.querySelectorAll(".js-page-tab");
    const pageTabsReturnBtns = document.querySelectorAll(".js-page-tab-return-btn");
    const pageTabPanels = document.querySelectorAll(".js-tabs-panel");

    pageTabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();

            const tabPanelId = tab.getAttribute("aria-controls");
            const tabPanelTarget = document.getElementById(tabPanelId);

            tabPanelTarget.ariaHidden = false;
            document.documentElement.classList.add("overflow-hidden");

        });
    });

    const attachedAnimation = (isDirectLoad) => {
        if (!isDirectLoad) {
            pageTabPanels.forEach((pageTabPanel) => {
                pageTabPanel.classList.add("has-animate");
            });
        }
    }

    const removeLocationHash = () => {
        const noHashURL = window.location.href.replace(/#.*$/, '');
        window.history.replaceState('', document.title, noHashURL)
    }

    const closePanels = () => {
        pageTabPanels.forEach((pageTabPanel) => {
            pageTabPanel.ariaHidden = true;
        });
        document.documentElement.classList.remove("overflow-hidden");
        removeLocationHash();
        attachedAnimation(false);
    }

    pageTabsReturnBtns.forEach((returnBtn) => {
        returnBtn.addEventListener("click", (e) => {
            e.preventDefault();
            closePanels();
          
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closePanels();
        }
    });


    // update hash
    document.querySelectorAll('.js-page-tab').forEach(item => {
        item.addEventListener('click', () => {
            global.history.pushState('', '', `#${item.getAttribute('aria-controls')}`);
        });
    });


    if (global.location.hash) {
        const activeTabsTrigger = document.querySelector(`.js-page-tab[href="${global.location.hash}"]`);

        console.log(global.location.hash)

        if (activeTabsTrigger) {
            global.addEventListener('DOMContentLoaded', () => {
                activeTabsTrigger.click();
                activeTabsTrigger.blur();
            });
        }
        attachedAnimation(true)

    } else {
        attachedAnimation(false)
    }

};

export default pageTabs;