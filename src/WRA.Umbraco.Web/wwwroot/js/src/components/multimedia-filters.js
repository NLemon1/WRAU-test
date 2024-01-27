
const multimediaFilters = () => {

    const filterResults = document.querySelector('.js-multimedia-results');
    if (!filterResults) return;

    const filterBtns = document.querySelectorAll('.js-multimedia-filter');
    const filterDropdown = document.querySelector('.js-multimedia-dropdown');

    const searchForm = document.getElementById('multimedia-search');
    const paginationContainer = document.querySelector('.js-multimedia-pagination');
    const resultsLoader = document.querySelector('.js-results-loader');

    const featuredItems = document.querySelectorAll(".js-featured");

    const apiEndpointUrl = "/Multimedia";
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

    let type = "";

    if (urlParams.has("type")) {
        type = urlParams.get("type");
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

    const featuredHandler = (activeFeature, hideAll) => {

        featuredItems.forEach((featuredItem) => {

            if (hideAll) {
                featuredItem.hidden = true;
            } else {
                const featuretype = featuredItem.dataset.featuredtype;

                if ((featuretype == activeFeature && featuretype !== "all") || (featuretype == "all" && activeFeature == "")) {
                    featuredItem.hidden = false;
                } else {
                    featuredItem.hidden = true;
                }
            }
        })
    }

    const renderResults = (results) => {

        if (searchPhrase !== "") {
            btnStates(true, type);
        } else {
            btnStates(false, type);
        }

        if (results.length > 0) { 

            results.forEach((result) => {

                let setImage = "";

                if (result.isPlaylist) {
                    if (result.thumbnailOverride !== "") {
                        setImage = result.thumbnailOverride;
                    } else {
                        if (result.children[0].thumbnailOverride !== "") {
                            setImage = result.children[0].thumbnailOverride;
                        } else {
                            setImage = `https://i3.ytimg.com/vi/${result.children[0].youTubeId}/maxresdefault.jpg`;
                        }
                    }
                } else {
                    setImage = result.thumbnailOverride !== "" ? result.thumbnailOverride : `https://i3.ytimg.com/vi/${result.youTubeId}/maxresdefault.jpg`;
                }

                const setChip = result.isPlaylist ? "<span class=\"chip chip--no-hover\">Playlist</span>" : `<span class=\"chip chip--no-hover align-self-start\">${result.type}</span>`;//need to change this property when playlist is added
                const setCSS = result.isPlaylist ? "card-media--playlist" : "";

                filterResults.innerHTML += (
                    `
                    <div class="d-block col-md-6 col-lg-4">
                        <a href="${result.url}" class="card card-media ${setCSS} p-4 flex-md-column align-items-start text-decoration-none">
                            <div class="ratio ratio-16x9 mb-3 card-media__img">
                                <img src="${setImage}" loading="lazy" class="img-fluid" width="660" height="330" alt="${result.title}">
                            </div>
                            <div class="d-flex flex-row align-items-center justify-content-between w-100">
                                <time class="fs-xs fw-bold" datetime="${result.date}">
                                    ${result.dateDisplay}
                                </time>
                                ${setChip}
                            </div>
                            <h3 class="h6 mb-2">${result.title}</h3>
                            <p class="fs-sm">${result.description}</p>
                        </a>
                    </div>
                    `
                );

                if (result.children.length) {

                    result.children.forEach((resultChild) => {

                        const setChildImage = resultChild.thumbnailOverride !== "" ? resultChild.thumbnailOverride : `https://i3.ytimg.com/vi/${resultChild.youTubeId}/maxresdefault.jpg`;

                        filterResults.innerHTML += (
                            `
                            <div class="d-block col-md-6 col-lg-4">
                                <a href="${resultChild.url}" class="card card-media p-4 flex-md-column align-items-start text-decoration-none">
                                    <div class="ratio ratio-16x9 mb-3 card-media__img">
                                        <img src="${setChildImage}" loading="lazy" class="img-fluid" width="660" height="330" alt="${resultChild.title}">
                                    </div>
                                    <div class="d-flex flex-row align-items-center justify-content-between w-100">
                                        <time class="fs-xs fw-bold" datetime="${resultChild.date}">
                                            ${resultChild.dateDisplay}
                                        </time>
                                    </div>
                                    <h3 class="h6 mb-2">${resultChild.title}</h3>
                                    <p class="fs-sm">${resultChild.description}</p>
                                </a>
                            </div>
                            `
                        );
                    })
                }
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
            "mediaType": decodeURIComponent(type), //need to decode for API post
            "category": "",
            "pagination": {
                "pageNumber": pageNumber,
                "pageSize": pageSize
            }
        }
        if (type == "" && searchPhrase !== "") {
            featuredHandler(type, true);
        } else {
            featuredHandler(type, false);
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

            //console.log(res.multimediaItems);

            renderResults(res.multimediaItems);

           totalResults = res.searchResultInfo.totalResults;
           totalResultPages = Math.ceil(totalResults / pageSize);
           createPagination(paginationContainer, totalResultPages);
        });
    }

    const urlHandler = (istype) => {

        if (istype) { //uses type buttons
            urlParams.set('type', type);
            window.history.pushState({ id: `type-${type}` }, '', `${location.pathname}?type=${type}`);
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
            type = filterBtn.value;
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
        pageNumber = 1;

        type = e.target.value;
        urlHandler(true);
        postResults();

    })

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        killResults();

        type = "";
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

        if (popUrlCatParams.has("type")) {
            type = popUrlCatParams.get("type");
            featuredHandler(type, false);
            resetElements(true);
        } else {
            type = "";
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

        type = "";
        searchPhrase = urlParams.get("search");
        searchForm.querySelector('input').value = searchPhrase;
        postResults();
    } else {

        pageNumber = 1;
        createPagination(paginationContainer, filterResults.dataset.cattotal);
        postResults();
    }

};

export default multimediaFilters;