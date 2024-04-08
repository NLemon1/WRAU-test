//import AccordionTabs from 'a11y-accordion-tabs';

const pageTabs = () => {
    // init tabs
    //new AccordionTabs();


    const pageTabs = document.querySelectorAll(".js-page-tab");

    pageTabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();

            const tabPanelId = tab.getAttribute("aria-controls");
            const tabPanelTarget = document.getElementById(tabPanelId);

            tabPanelTarget.ariaHidden = false;


        });
    })

    // update hash
    document.querySelectorAll('.js-page-tab').forEach(item => {
        item.addEventListener('click', () => {
            global.history.pushState('', '', `#${item.getAttribute('aria-controls')}`);
        });
    });

    if (global.location.hash) {
        const activeTabsTrigger = document.querySelector(`.js-tab[href="${global.location.hash}"]`);

        if (activeTabsTrigger) {
            global.addEventListener('DOMContentLoaded', () => {
                activeTabsTrigger.click();
                activeTabsTrigger.blur();
            });
        }
    }

};

export default pageTabs;