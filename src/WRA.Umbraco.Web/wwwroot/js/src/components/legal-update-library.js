const legalUpdateLibrary = () => {

    const params = new URLSearchParams(window.location.search);
    const containers = document.querySelectorAll('.js-legal-update-library');

    if (!containers.length) return;

    handleCardToggles();

    containers.forEach(container => {
        const yearFilter = container.querySelector('.js-legal-update-library-year-filter');
        //const mobileTopicGroupFilter = container.querySelector('.js-legal-update-library-mobile-topic-group-filter');
        const mobileTopicFilter = container.querySelector('.js-legal-update-library-mobile-topic-filter');
        const topicFilters = container.querySelectorAll('.js-legal-update-library-topic-filter');

        yearFilter.addEventListener('change', (e) => {
            if (e.target.value === '') {
                params.delete('year');
            } else {
                params.set('year', e.target.value);
            }

            window.history.pushState({ path: window.location.pathname + '?' + params.toString() }, '', window.location.pathname + '?' + params.toString());
        });

        //mobileTopicGroupFilter.addEventListener('change', (e) => {
        //    console.log(e.target.value);
        //});

        mobileTopicFilter.addEventListener('change', (e) => {
            if (e.target.value === '') {
                params.delete('topic');
            } else {
                params.set('topic', e.target.value);
            }

            window.history.pushState({ path: window.location.pathname + '?' + params.toString() }, '', window.location.pathname + '?' + params.toString());
        });

        topicFilters.forEach(filter => {
            filter.addEventListener('change', (e) => {
                if (e.target.value === '') {
                    params.delete('topic');
                } else {
                    params.set('topic', e.target.value);
                }

                window.history.pushState({ path: window.location.pathname + '?' + params.toString() }, '', window.location.pathname + '?' + params.toString());
            });
        });
    });

    function handleCardToggles() {
        const toggles = document.querySelectorAll('.legal-update-toggle');

        toggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                let toggle = e.target;
                let content = e.target.previousElementSibling;

                if (content.classList.contains('legal-update-content--expanded')) {
                    toggle.innerText = 'Show More';
                    content.classList.remove('legal-update-content--expanded');
                } else {
                    toggle.innerText = 'Show Less';
                    content.classList.add('legal-update-content--expanded');
                }
            });
        });
    }
};

export default legalUpdateLibrary;