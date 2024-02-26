const products = () => {

    //DOM presentation elements
    const productResults = document.querySelector('.js-product-collection');
    const collectionTitle = document.querySelector('.js-collection-title');
    const listingsTitle = document.querySelector('.js-listings-title');
    const currentBreadcrumb = document.querySelector('.js-breadcrumb-current');
    const resultsLoader = document.querySelector('.js-results-loader');


    //DOM event elements
    const productCategoryDropdown = document.querySelector('.js-collection-category-filter');
    const productSubCategoryDropdown = document.querySelector('.js-collection-subcategory-filter');
    const productSubCategoryContainer = document.querySelector('.js-collection-subcategory-container');

    //Static vars
    const apiEndpointUrl = "/GetProducts";
    let pageNumber = 1;
    const pageSize = 100;
    let subcategoryArray = ["All"];

    //Urls

    const windowLoadQueryString = window.location.search;
    const urlParams = new URLSearchParams(windowLoadQueryString);

    let type = "";

    if (urlParams.has("type")) {
        type = urlParams.get("type");
    }

    let subcategory = ""; 

    if (urlParams.has("subcategory")) {
        subcategory = urlParams.get("subcategory");
    }
    
    let category = "";

    if (urlParams.has("category")) {
        category = urlParams.get("category");
    }

    //Results

    const handleIndicators = (show, waitLoaderElement) => {
        if (show == true) {
            waitLoaderElement.hidden = false;
        } else {
            waitLoaderElement.hidden = true;
        }
    }

    const renderResults = (results) => {

        if (results.length > 0) {

            results.forEach((result) => {

                //How we determine button display text?
                const setCTA = result.taxonomy == "Reference Manuals" || result.taxonomy == "Books" ? `<a href="${result.url}" id="add-to-cart" class="btn btn-secondary btn-sm border-0  flex-grow-1">Add To Cart</a>` : `<a href="${result.url}" id="view-product" class="btn btn-primary btn-sm flex-grow-1">View Product</a>`;

                productResults.innerHTML += (
                    `
                    <div class="col-md-6 col-lg-4">
                        <div class="card-class bg-light p-4 h-100 d-flex flex-column align-items-start">
                            <p class="fs-xs">Class <span class="fw-bold">Credit Hours: XXXX</span></p>
                            <p class="d-inline-block mb-4 px-2 py-1 bg-white fw-semibold fs-sm text-uppercase">${result.taxonomy}</p>
                            <h3 class="fs-lg text-capitalize fw-semibold mb-4">${result.title}</h3>

                            <div class="d-block mb-1">
                                <span class="h3 fw-bold">
                                    ${result.memberPrice}
                                </span>
                                <span class="fs-sm" style="color: var(--bs-gray-30)">
                                    &nbsp;member pricing
                                </span>
                            </div>
                            <div class="d-block fs-sm mb-0" style="color: var(--bs-gray-30)">
                                ${result.price} &nbsp;non-member pricing
                            </div>

                            <div class="d-flex self-align-end flex-column flex-md-row align-items-center gap-3 mt-auto pt-3">
                                ${setCTA}
                            </div>

                        </div>
                    </div>

                    `
                );

                if (result.subCategory != "All" && !subcategoryArray.includes(result.subCategory, subcategoryArray)) {
                    subcategoryArray.push(result.subCategory);
                    populateSubCategories();
                }

            });

        } else {
            productResults.innerHTML = (`<div class="d-block col-md-10 mx-auto h5 text-center">No results. Try again.</div>`);
        }

        handleIndicators(false, resultsLoader);
        console.log(subcategoryArray);
    }

    const populateSubCategories = () => {

        productSubCategoryDropdown.innerHTML = "";//clear <option> tags

        if (subcategoryArray.length > 1) {
            productSubCategoryContainer.removeAttribute("hidden");
        } else {
            productSubCategoryContainer.setAttribute("hidden", "hidden");
        }

        subcategoryArray.forEach((subCatOption) => {
            productSubCategoryDropdown.innerHTML += (
                `
                <option value="${subCatOption}">${subCatOption}</option>
                `
            )
        });

    }

    postResults = () => {

        handleIndicators(true, resultsLoader);
        updateDomElements(category);

        let bodyObject = {
            "productType": decodeURIComponent(type), //Events, Products, Courses
            "category": decodeURIComponent(category), //Professional Development, Publications, Conferences/Conventions, etc.
            "subCategory": decodeURIComponent(subcategory == "All" ? "" : subcategory),//children of category
            "taxonomy": "",//Reference Manuals, Books, Virtual, etc.
            "pagination": {
                "pageNumber": pageNumber,
                "pageSize": pageSize
            }
        };

        const bodyRequest = JSON.stringify(bodyObject);

        console.log(bodyRequest);

        fetch(apiEndpointUrl,
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            referrerPolicy: "no-referrer",
            body: bodyRequest
        }).then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
            renderResults(res);

        });
    }

    const killResults = () => {
        productResults.innerHTML = "";
    }

    const urlHandler = (isCategory, isSubCategory) => {

        if (isCategory && !isSubCategory) {
            urlParams.set('category', category);
            window.history.pushState({ id: `${type}-category-${category}` }, '', `${location.pathname}?type=${type}&category=${category}`);
        }

        if (isCategory && isSubCategory) {
            urlParams.set('category', category);
            urlParams.set('subcategory', subcategory);
            window.history.pushState({ id: `${type}-category-${category}subcategory-${subcategory}` }, '', `${location.pathname}?type=${type}&category=${category}&subcategory=${subcategory}`);
        }
       
    }

    const updateDomElements = (titleText) => {
        collectionTitle.innerHTML = titleText;
        currentBreadcrumb.innerHTML = titleText;
        listingsTitle.innerHTML = titleText;
    }

    const resetDropdown = (dropdownElement, setValue) => {
        dropdownElement.value = setValue;
    }


    //Event Handlers
    if (productCategoryDropdown) {

        productCategoryDropdown.addEventListener("change", (e) => {
            e.preventDefault();

            killResults();

            category = e.target.value;

            //clearing subcategory dropdown
            subcategory = "";
            subcategoryArray = ["All"];
            productSubCategoryContainer.setAttribute("hidden", "hidden");
            productSubCategoryDropdown.innerHTML = "";//clear <option> tags

            if (productSubCategoryDropdown) {
                resetDropdown(productSubCategoryDropdown, "");
            }

            urlHandler(true, false);
            postResults();

        })
    }

    if (productSubCategoryDropdown) {

        productSubCategoryDropdown.addEventListener("change", (e) => {
            e.preventDefault();

            killResults();

            updateDomElements(category);
            subcategory = e.target.value;;

            urlHandler(true, true);
            postResults();

        })
    }

    window.addEventListener("popstate", () => {

        killResults();

        const popUrlParams = new URLSearchParams(window.location.search);

        if (popUrlParams.has("category") && !popUrlParams.has("subcategory")) {

            category = popUrlParams.get("category");
            resetDropdown(productCategoryDropdown, category);
            resetDropdown(productSubCategoryDropdown, "All");


        } else if (popUrlParams.has("category") && popUrlParams.has("subcategory")) {

            category = popUrlParams.get("category");
            subcategory = popUrlParams.get("subcategory");
            resetDropdown(productCategoryDropdown, category);

            if (productSubCategoryDropdown) {
                resetDropdown(productSubCategoryDropdown, subcategory);
            }

        } else {
            category = "";
            subcategory = "";
            resetDropdown(productSubCategoryDropdown, "All");
        }
        
        postResults();

    });

    //Page Load

    postResults();

};

export default products;