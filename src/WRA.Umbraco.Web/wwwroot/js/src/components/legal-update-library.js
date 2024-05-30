const legalUpdateLibrary = () => {

    const params = new URLSearchParams(window.location.search);
    const resultsList = document.querySelector('.js-legal-update-library-list');

    if (!resultsList) return;

    const yearFilter = document.querySelector('.js-legal-update-library-year-filter');
    const mobileTopicFilter = document.querySelector('.js-legal-update-library-mobile-topic-filter');
    const topicFilters = document.querySelectorAll('.js-legal-update-library-topic-filter');
    const resetTopicsBtn = document.querySelector('.js-legal-update-library-reset-topics');

    let selectedYear= params.has('year') ? params.get('year') : '';
    let selectedTopic = params.has('topic') ? [params.get('topic')] : [];

    const paginationContainer = document.querySelector('.js-legal-update-library-list-pagination');
    let pageNumber = 1;
    const pageSize = 10;
    let totalResults = 0;
    let totalResultPages = 0;

    getResults();
    handleFilterEvents();

    ///

    const scrollBackTop = () => {
        resultsList.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    }

    function clearResults() {
        resultsList.innerHTML = '';
    }

    function getResults() {
        fetch('/legalupdates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "year": selectedYear,
                "topics": selectedTopic,
                "pagination": {
                    "pageNumber": pageNumber,
                    "pageSize": pageSize
                }
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                //console.log(data);

                renderResults(data.legalUpdates);
                handleCardToggles();

                totalResults = data.searchInfo.totalResults;
                totalResultPages = Math.ceil(totalResults / pageSize);
                createPagination(totalResultPages);
            });
    }

    function renderResults(results) {
        clearResults();

        if (results.length) {
            results.forEach(result => {
                let publishDate = new Date(result.publishDate);

                resultsList.innerHTML += `
                    <div class="mb-4 p-4 bg-light">
                        <div class="d-flex flex-column-reverse flex-lg-row justify-content-lg-between align-items-lg-center">
                            <strong>${result.name}</strong>
                            <strong class="fs-xs">
                                Published <time itemprop="dateCreated" datetime="${publishDate}">${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}</time>
                            </strong>
                        </div>
                        <div class="legal-update-content my-2 fs-sm">${result.content}</div>
                        <button class="legal-update-toggle d-none me-3" type="button">Show More</button>
                        <a class="text-decoration-none fw-bold" href="${result.pdf}" target="_blank">View PDF</a>
                    </div>
                `;
            });
        } else {
            resultsList.innerHTML = '<div class="pb-5 pb-lg-10 text-center">Sorry, there are no results that match the search criteria.</div>';
        }
    }

    function handleCardToggles() {
        const contentContainers = document.querySelectorAll('.legal-update-content');

        contentContainers.forEach(container => {
            const toggle = container.nextElementSibling;

            // only enable/show toggling if needed
            if (container.scrollHeight > container.clientHeight) {
                toggle.classList.remove('d-none');

                toggle.addEventListener('click', (e) => {
                    let toggle = e.target;

                    if (container.classList.contains('legal-update-content--expanded')) {
                        toggle.innerText = 'Show More';
                        container.classList.remove('legal-update-content--expanded');
                    } else {
                        toggle.innerText = 'Show Less';
                        container.classList.add('legal-update-content--expanded');
                    }
                });
            }
        });
    }

    function handleFilterEvents() {
        yearFilter.addEventListener('change', (e) => {
            if (e.target.value === '') {
                params.delete('year');
            } else {
                params.set('year', e.target.value);
            }

            selectedYear = e.target.value;
            window.history.pushState({ path: window.location.pathname + '?' + params.toString() }, '', window.location.pathname + '?' + params.toString());
            getResults();
        });

        mobileTopicFilter.addEventListener('change', (e) => {
            if (e.target.value === '') {
                params.delete('topic');
                selectedTopic = [];
            } else {
                params.set('topic', e.target.value);
                selectedTopic = [e.target.value];
            }

            window.history.pushState({ path: window.location.pathname + '?' + params.toString() }, '', window.location.pathname + '?' + params.toString());
            getResults();
        });

        topicFilters.forEach(filter => {
            filter.addEventListener('change', (e) => {
                if (e.target.value === '') {
                    params.delete('topic');
                    selectedTopic = [];
                } else {
                    params.set('topic', e.target.value);
                    selectedTopic = [e.target.value];
                }

                window.history.pushState({ path: window.location.pathname + '?' + params.toString() }, '', window.location.pathname + '?' + params.toString());
                getResults();
            });
        });

        resetTopicsBtn.addEventListener('click', (e) => {
            topicFilters.forEach(filter => {
                filter.checked = false;
                params.delete('topic');
                selectedTopic = [];
                window.history.pushState({ path: window.location.pathname + '?' + params.toString() }, '', window.location.pathname + '?' + params.toString());
                getResults();
            });
        });
    }

    function clearPagination() {
        if (paginationContainer.nextElementSibling !== null) {
            if (paginationContainer.nextElementSibling.tagName == 'BUTTON') {
                paginationContainer.nextElementSibling.remove();
            }
        }

        if (paginationContainer.previousElementSibling !== null) {
            if (paginationContainer.previousElementSibling.tagName == 'BUTTON') {
                paginationContainer.previousElementSibling.remove();
            }
        }

        paginationContainer.innerHTML = '';
    }

    function createPagination(totalPages) {

        totalResultPages = parseInt(totalResultPages);

        clearPagination();

        if (totalPages > 1) {
            paginationContainer.classList.add('py-4');

            for (var i = 0; i < totalPages; i++) {
                let li = document.createElement('li');

                li.setAttribute('role', 'button');
                li.setAttribute('title', `Go to page ${i + 1}`);

                if (pageNumber == (i + 1)) {
                    li.classList.add('current');
                }

                // only shows pagination numbers -+3 of current for results more than 7 pages
                if (totalPages > 6) {
                    if ((i < pageNumber && i > (pageNumber - 5)) || (i > (pageNumber - 1) && i < ((pageNumber - 1) + 4))) {
                        li.classList.add('d-inline-block');
                    } else {
                        li.classList.add('d-none');
                        li.setAttribute('aria-hidden', 'true');
                    }
                }

                li.textContent = i + 1;

                li.addEventListener('click', (e) => {
                    e.preventDefault();

                    pageNumber = e.target.textContent;

                    clearResults();
                    getResults();
                    scrollBackTop();
                });

                paginationContainer.appendChild(li);
            }

            if (pageNumber > 1) { // show previous button

                let prevBtn = document.createElement('button');
                prevBtn.classList.add('btn-prev');
                prevBtn.setAttribute('title', 'Go to previous page');

                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();

                    pageNumber -= 1;

                    clearResults();
                    getResults();
                    scrollBackTop();
                });

                paginationContainer.before(prevBtn);
            }

            if (pageNumber < totalPages) { // show next button

                let nextBtn = document.createElement('button');
                nextBtn.classList.add('btn-next');
                nextBtn.setAttribute('title', 'Go to next page');

                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();

                    pageNumber += 1;

                    clearResults();
                    getResults();
                    scrollBackTop();
                });

                paginationContainer.after(nextBtn);
            }
        }
    }
};

export default legalUpdateLibrary;