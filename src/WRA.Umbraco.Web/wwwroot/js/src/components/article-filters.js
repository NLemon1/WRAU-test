const articleFilters = () => {

    const filterResults = document.querySelector('.js-article-results');

    if (!filterResults) return;

    const filterBtns = document.querySelectorAll('.js-article-filter');
    const filterDropdown = document.querySelector('.js-article-dropdown');

    const searchForm = document.getElementById('news-search');
    const paginationContainer = document.querySelector('.js-articles-pagination');
    const resultsLoader = document.querySelector('.js-results-loader');
    const featuredArticles = document.querySelectorAll(".js-featured-article");

    const apiEndpointUrl = "/NewsAndUpdates";
    let pageNumber = 1;
    const pageSize = 15;

    let totalResults = 0;
    let totalResultPages = 0;

    //Urls

    const windowLoadQueryString = window.location.search;
    const urlParams = new URLSearchParams(windowLoadQueryString);

    let searchPhrase = "";

    if (urlParams.has("search")) {
        searchPhrase = urlParams.get("search");
    }

    let category = "";

    if (urlParams.has("category")) {
        category = urlParams.get("category");
    }

    //Results

    const scrollBackTop = () => {
        filterResults.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }

    const handleIndicators = (show, waitLoaderElement) => {
        if (show == true) {
            waitLoaderElement.hidden = false;
        } else {
            waitLoaderElement.hidden = true;
        }
    }

    const killResults = () => {
        filterResults.innerHTML = "";
    }

    const btnStates = (clearAll, setToCat) => {

        filterBtns.forEach((filterBtn) => {
            if (filterBtn.value == setToCat && clearAll !== true) {
                filterBtn.setAttribute("aria-selected", "true");
                filterDropdown.value = setToCat;
            }
            else {
                filterBtn.setAttribute("aria-selected", "false");
            }
        });

        if (filterDropdown.value == setToCat) {
            filterDropdown.value = setToCat;
        } else {
            filterDropdown.value = "";
        }
        
    }

    const featuredArticleHandler = (activeFeature, hideAll) => {

        featuredArticles.forEach((featuredArticle) => {

            if (hideAll) {
                featuredArticle.hidden = true;
            } else {
                const featureCategory = featuredArticle.dataset.featuredcat;

                if ((featureCategory == activeFeature && featureCategory !== "all") || (featureCategory == "all" && activeFeature == "")) {
                    featuredArticle.hidden = false;
                } else {
                    featuredArticle.hidden = true;
                }
            }
        })
    }

    const renderResults = (results) => {

        if (searchPhrase !== "") {
            btnStates(true, category);
        } else {
            btnStates(false, category);
        }

        if (results.length > 0) { 

            results.forEach((result) => {

                const setImage = result.image !== "" ? result.image : filterResults.dataset.fallback;

                filterResults.innerHTML += (
                    `
                        <div class="d-block col-md-6 col-lg-4">
                            <a href="${result.url}" class="news-card news-card--lg text-decoration-none d-block p-4" style="color: var(--bs-dark);">
                                <div class="mb-4 ratio ratio-16x9">
                                    <img src="${setImage}" loading="lazy" class="img-fluid" width="660" height="330" alt="${result.title}">
                                </div>

                                <div class="mb-2 d-flex flex-row align-items-center justify-content-between">
                                    <time class="fs-xs fw-bold" datetime="${result.date}">
                                        ${result.dateDisplay}
                                    </time>
                                    <span class="chip chip--no-hover align-self-start">
                                        ${result.category}
                                    </span>
                                </div>
                                <h3 class="h6 mb-2">${result.title}</h3>
                                <p class="fs-sm">${result.excerpt}</p>
                            </a>
                        </div>
                    `
                );
            });

            } else {
                filterResults.innerHTML = (`<div class="d-block col-md-10 mx-auto h5 text-center">No results. Try again.</div>`);
            }

        handleIndicators(false, resultsLoader);

    }


    const handleClearPagination = (paginationElement) => {

        if (paginationElement.nextElementSibling !== null) {
            if (paginationElement.nextElementSibling.tagName == 'BUTTON') {
                paginationElement.nextElementSibling.remove();
            }
        }

        if (paginationElement.previousElementSibling !== null) {
            if (paginationElement.previousElementSibling.tagName == 'BUTTON') {
                paginationElement.previousElementSibling.remove();
            }
        }

        paginationElement.innerHTML = "";

    }  

    const createPagination = (paginationElement, resultPageCount) => {

        const totalPages = parseInt(resultPageCount);

        handleClearPagination(paginationContainer);//clear first

        //numbered page buttons
        if (totalPages > 1) {

            for (var i = 0; i < totalPages; i++) {

                let li = document.createElement('li');

                li.setAttribute("role", "button");
                li.setAttribute("title", `Go to page ${i + 1}`);

                if (pageNumber == (i + 1)) {
                    li.classList.add("current");
                }

                //only shows pagination numbers -+3 of current for results more than 7 pages
                if (totalPages > 6) {
                    if ((i < pageNumber && i > (pageNumber - 5)) || (i > (pageNumber - 1) && i < ((pageNumber - 1) + 4))) {
                        li.classList.add("d-inline-block");
                    } else {
                        li.classList.add("d-none");
                        li.setAttribute("aria-hidden", "true");
                    }
                }

                li.textContent = i + 1;

                li.addEventListener('click', (e) => {
                    e.preventDefault();
                    pageNumber = e.target.textContent;
                    killResults();
                    postResults();
                    scrollBackTop();
                });

                paginationElement.appendChild(li);
            }
        }

        //next/prev buttons
        if (totalPages > 1) {

            if (pageNumber > 1) { //show previous button

                let prevBtn = document.createElement('button');
                prevBtn.classList.add("btn-prev");
                prevBtn.setAttribute("title", "Go to previous page");

                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();

                    pageNumber -= 1;
                    killResults();
                    postResults();

                    scrollBackTop();
                });

                paginationElement.before(prevBtn);
            }

            if (pageNumber < totalPages) { //show next button

                let nextBtn = document.createElement('button');
                nextBtn.classList.add("btn-next");
                nextBtn.setAttribute("title", "Go to next page");

                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();

                    pageNumber += 1;
                    killResults();
                    postResults();

                    scrollBackTop();
                });

                paginationElement.after(nextBtn);
            }
        }

    }
    

    const postResults = () => {

        handleIndicators(true, resultsLoader);

        let bodyObject = {
            "searchPhrase": searchPhrase,
            "category": decodeURIComponent(category), //need to decode for API post
            "pagination": {
                "pageNumber": pageNumber,
                "pageSize": pageSize
            }
        }
        if (category == "" && searchPhrase !== "") {
            featuredArticleHandler(category, true);
        } else {
            featuredArticleHandler(category, false);
        }

        const bodyRequest = JSON.stringify(bodyObject);

        //console.log(bodyRequest)

        fetch(apiEndpointUrl,
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            referrerPolicy: "no-referrer",
            body: bodyRequest
        }).then(res => {
            return res.json();
        })
        .then(res => {
            //console.log(res);

           renderResults(res.newsRecords);

           totalResults = res.searchResultInfo.totalResults;
           totalResultPages = Math.ceil(totalResults / pageSize);
           createPagination(paginationContainer, totalResultPages);

        });
    }

    const urlHandler = (isCategory) => {

        if (isCategory) { //uses category buttons
            urlParams.set('category', category);
            window.history.pushState({ id: `category-${category}` }, '', `${location.pathname}?category=${category}`);
        } else { //uses search field
            urlParams.set('search', searchPhrase);
            window.history.pushState({ id: 'search-searchPhrase' }, '', `${location.pathname}?search=${searchPhrase}`);
        }

    }

    const resetElements = (resetForm) => {
        if (resetForm) {
            searchForm.querySelector('input').value = "";
        } else {
            btnStates(true);
        }
    }

    //Event Handlers

    filterBtns.forEach((filterBtn) => {
        filterBtn.addEventListener("click", (e) => {
            e.preventDefault();

            resetElements(true);
            killResults();
            searchPhrase = "";
            category = filterBtn.value;
            pageNumber = 1;

            urlHandler(true);
            postResults();
        });
    })

    filterDropdown.addEventListener("change", (e) => {
        e.preventDefault();

        resetElements(true);
        killResults();
        searchPhrase = "";
        category = e.target.value;
        pageNumber = 1;

        urlHandler(true);
        postResults();

    })

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        killResults();

        category = "";
        const textField = searchForm.querySelector('input');
        searchPhrase = textField.value;
        pageNumber = 1;

        urlHandler(false);
        postResults();
    });

    window.addEventListener("popstate", () => {

        killResults();
        pageNumber = 1;

        const popUrlCatParams = new URLSearchParams(window.location.search);

        if (popUrlCatParams.has("category")) {
            category = popUrlCatParams.get("category");
            featuredArticleHandler(category, false);
            resetElements(true);
        } else {
            category = "";
            resetElements(true);
        }

        const popUrlSearchParams = new URLSearchParams(window.location.search);

        if (popUrlSearchParams.has("search")) {
            searchPhrase = popUrlSearchParams.get("search");
            searchForm.querySelector('input').value = searchPhrase;
        } else {
            searchPhrase = "";
            resetElements(true);
        }

        postResults();

    });
    
    // onpage load
    if (urlParams.has("search")) {
        killResults();
        pageNumber = 1;

        category = "";
        searchPhrase = urlParams.get("search");
        searchForm.querySelector('input').value = searchPhrase;
        postResults();
    } else {

        pageNumber = 1;
        createPagination(paginationContainer, filterResults.dataset.cattotal);

    }




};

export default articleFilters;