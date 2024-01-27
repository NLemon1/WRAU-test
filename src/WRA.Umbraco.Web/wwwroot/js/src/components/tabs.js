import AccordionTabs from 'a11y-accordion-tabs';

const tabs = () => {
    // init tabs
    new AccordionTabs();

    // update hash
    document.querySelectorAll('.js-tabs[data-update-hash="true"] .js-tabs-trigger').forEach(item => {
        item.addEventListener('click', () => {
            global.history.pushState('', '', `#${item.getAttribute('aria-controls')}`);
        });
    });

    if (global.location.hash) {
        const activeTabsTrigger = document.querySelector(`.js-tabs[data-update-hash="true"] .js-tabs-trigger[href="${global.location.hash}"]`);

        if (activeTabsTrigger) {
            global.addEventListener('DOMContentLoaded', () => {
                activeTabsTrigger.click();
                activeTabsTrigger.blur();
            });
        }
    }

    // dropdown toggle
    document.querySelectorAll('.js-tabs').forEach(item => {
        const dropdown = item.querySelector('.js-tabs-dropdown');
    
        if (dropdown) {
            dropdown.addEventListener('change', e => {
                item.querySelector(`.js-tabs-trigger[href="${e.target.value}"]`).click();
            });
    
            item.querySelectorAll('.js-tabs-trigger').forEach(tab => {
                tab.addEventListener('click', () => {
                    dropdown.value = tab.getAttribute('href');
                });
            });
        }
    });
};

export default tabs;