const legalUpdateLibrary = () => {

    const params = new URLSearchParams(window.location.search);
    const containers = document.querySelectorAll('.js-legal-update-library');

    if (!containers.length) return;

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

};

export default legalUpdateLibrary;