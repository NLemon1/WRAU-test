const hotTipLibrary = () => {
    
    const params = new URLSearchParams(window.location.search);
    const resultsList = document.querySelector('.js-hot-tip-list');

    if (!resultsList) return;

    const mobileCategorySelect = document.querySelector('.js-mobile-hot-tip-category');
    const mobileSubcategorySelect = document.querySelector('.js-mobile-hot-tip-subcategory');
    const desktopSubcategoryFilters = document.querySelectorAll('.js-desktop-subcategory-filter');

    let selectedCategories = params.has('category') ? [params.get('category')] : [];
    let selectedSubcategories = params.has('subcategory') ? [params.get('subcategory')] : [];

    const paginationContainer = document.querySelector('.js-hot-tip-list-pagination');
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
        fetch('/HotTips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "categories": selectedCategories,
                "subcategories": selectedSubcategories,
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

                renderResults(data.hotTips);
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
                let categories = result.categories;
                let subcategories = result.subCategory;
                const question = "<strong>Question:</strong> " + result.question;
                const answer = "<strong>Answer:</strong> " + result.answer;

                resultsList.innerHTML += `
                    <div class="mb-2 p-4 pb-2 bg-light" itemscope itemtype="https://schema.org/Question">
                        <div class="d-flex align-items-lg-center mb-3 fw-semibold" style="font-size: 0.75rem;">
                            <div class="flex-grow-1">
                                ${Object.keys(categories).map(category => {
                                    return `<span class="d-inline-block mb-1 me-1 px-3 py-2 rounded-pill bg-secondary text-white">${result.categories[category]}</span>`;
                                }).join('')}
                                ${Object.keys(subcategories).map(subcategory => {
                                    return `<span class="d-inline-block mb-1 me-1 px-3 py-2 rounded-pill bg-primary text-white">${result.subCategory[subcategory]}</span>`;
                                }).join('')}
                            </div>
                            <time itemprop="dateCreated" datetime="${publishDate}">${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}</time>
                        </div>
                        <div class="hot-tip-content">
                            <div itemprop="name" class="mb-3 hot-tip-content__inner">
                                ${question}
                            </div>
                            <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
                                <div itemprop="text" class="hot-tip-content__inner">
                                    ${answer}
                                </div>
                            </div>
                        </div>
                        <button class="hot-tip-toggle py-3" type="button">Read Answer</button>
                    </div>
                `;
            });
        } else {
            resultsList.innerHTML = '<div class="pb-5 pb-lg-10 text-center">Sorry, there are no results that match the search criteria.</div>';
        }
    }

    function handleCardToggles() {
        const toggles = document.querySelectorAll('.hot-tip-toggle');

        toggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                let toggle = e.target;
                let content = e.target.previousElementSibling;
    
                if (content.classList.contains('hot-tip-content--expanded')) {
                    toggle.innerText = 'Read Answer';
                    content.classList.remove('hot-tip-content--expanded');
                } else {
                    toggle.innerText = 'Close Answer';
                    content.classList.add('hot-tip-content--expanded');
                }
            });
        });
    }

    function handleFilterEvents() {
        mobileCategorySelect.addEventListener('change', (e) => {
            if (e.target.value === '') {
                params.delete('category');
            } else {
                params.set('category', e.target.value);
            }

            params.delete('subcategory'); // if changing category then subcategories no longer match
            window.location.search = params.toString();
        });

        if (mobileSubcategorySelect) {
            mobileSubcategorySelect.addEventListener('change', (e) => {
                if (e.target.value === '') {
                    params.delete('subcategory');
                } else {
                    params.set('subcategory', e.target.value);
                }

                window.location.search = params.toString();
            });
        }

        if (desktopSubcategoryFilters.length) {
            desktopSubcategoryFilters.forEach(filter => {
                filter.addEventListener('click', (e) => {
                    selectedSubcategories = e.target.value;
                    params.set('subcategory', e.target.value);
                    window.location.search = params.toString();
                });
            });
        }
    }

    function clearPagination () {
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

export default hotTipLibrary;