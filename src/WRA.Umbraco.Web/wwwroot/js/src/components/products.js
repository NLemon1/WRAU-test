const products = () => {

    //DOM presentation elements
    const productResults = document.querySelector('.js-product-collection');
    //const collectionTitle = document.querySelector('.js-collection-title');
    const listingsTitle = document.querySelector('.js-listings-title');
    //const currentBreadcrumb = document.querySelector('.js-breadcrumb-current');
    const resultsLoader = document.querySelector('.js-results-loader');

    //NEED TO LOAD ALL TAXONOMY OPTIONS FIRST, separate from filedterd results load

    //DOM event elements
    const productSubcategoryDropdown = document.querySelector('.js-collection-category-filter');
    const productTaxonomyDropdown = document.querySelector('.js-taxonomy-filter');
    const productTaxonomyContainer = document.querySelector('.js-taxonomy-container');

    //Static vars
    const apiEndpointUrl = "/GetProducts";
    let pageNumber = 1;
    const pageSize = 100;
    let taxonomyArray = ["All"];

    //Urls

    const windowLoadQueryString = window.location.search;
    const urlParams = new URLSearchParams(windowLoadQueryString);

    let taxonomy = "";

    if (urlParams.has("taxonomy")) {
        taxonomy = urlParams.get("taxonomy");
    }

    let type = "";

    if (urlParams.has("type")) {
        taxonomy = urlParams.get("type");
    }

    let subcategory = window.productDataSubCategory; 

    let category = "";

 /*   if (urlParams.has("category")) {
        category = urlParams.get("category");
    }*/

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
                //console.log(result);

                const setCTA = result.productType == "Products" ? `<a href="${result.url}" id="add-to-cart" class="btn btn-secondary btn-sm border-0  flex-grow-1">Add To Cart</a>` : `<a href="${result.url}" id="view-product" class="btn btn-primary btn-sm flex-grow-1">Register</a>`;

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
            });

        } else {
            productResults.innerHTML = (`<div class="d-block col-md-10 mx-auto h5 text-center">No results. Try again.</div>`);
        }

        handleIndicators(false, resultsLoader);
    }

    const loadTaxonomyTerms = (results) => {
        if (results.length > 0) {
            results.forEach((result) => {

                if (result.taxonomy != "All" && !taxonomyArray.includes(result.taxonomy, taxonomyArray)) {
                    taxonomyArray.push(result.taxonomy);
                    populateTaxonomy();
                }
            })
        }
    }

    const populateTaxonomy = () => {

        productTaxonomyDropdown.innerHTML = "";//clear <option> tags

        if (taxonomyArray.length > 1) {
            productTaxonomyContainer.removeAttribute("hidden");
        } else {
            productTaxonomyContainer.setAttribute("hidden", "hidden");
        }

        taxonomyArray.forEach((taxonomyOption) => {

            const checkIfActive = taxonomyOption == taxonomy ? "selected" : "";

            productTaxonomyDropdown.innerHTML += (
                `
                <option ${checkIfActive} value="${taxonomyOption}">${taxonomyOption}</option>
                `
            )
        });

    }

    postResults = () => {

        handleIndicators(true, resultsLoader);
       // updateDomElements(category);

        const checkTax = taxonomy === "All" ? "" : taxonomy; 

        let bodyObject = {
            "productType": decodeURIComponent(type), //Events, Products, Courses
            "category": decodeURIComponent(category), //Professional Development, Publications, Conferences/Conventions, etc.
            "subCategory": decodeURIComponent(subcategory),//children of category
            "taxonomy": decodeURIComponent(checkTax),//Reference Manuals, Books, Virtual, etc.
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
            //console.log(res);
            renderResults(res);
            loadTaxonomyTerms(res);
        });
    }

    const killResults = () => {
        productResults.innerHTML = "";
    }

    const urlHandler = (isTaxonomy) => {

        if (isTaxonomy) {
            urlParams.set('taxonomy', taxonomy);
            window.history.pushState({ id: `${taxonomy}` }, '', `${location.pathname}?taxonomy=${taxonomy}`);
        }
       
    }

    const updateDomElements = (titleText) => {
        listingsTitle.innerHTML = titleText;
    }

    const resetDropdown = (dropdownElement, setValue) => {
        dropdownElement.value = setValue;
    }


    //Event Handlers
    if (productSubcategoryDropdown) {
        productSubcategoryDropdown.addEventListener("change", (e) => {
            e.preventDefault();
            category = e.target.value;
            window.location.href = category;
        })
    }

    if (productTaxonomyDropdown) {

        productTaxonomyDropdown.addEventListener("change", (e) => {
            e.preventDefault();

            killResults();

            taxonomy = e.target.value;

            urlHandler(true, true);
            postResults();

        })
    }

    window.addEventListener("popstate", () => {

        killResults();

        const popUrlParams = new URLSearchParams(window.location.search);

        if (popUrlParams.has("taxonomy")) {
            taxonomy = popUrlParams.get("taxonomy");
            resetDropdown(productTaxonomyDropdown, taxonomy);
        } else {
            taxonomy = "";
            resetDropdown(productTaxonomyDropdown, "All");
        }


        postResults();

    });

    //Page Load

    postResults();

};

export default products;