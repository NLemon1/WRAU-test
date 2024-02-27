const courseSearch = () => {

    //DOM presentation elements
    const resultsLoader = document.querySelector('.js-results-loader-courses');
    const courseSearchForm = document.getElementById('course-search');

    //DOM event elements
    const productCategoryDropdown = document.querySelector('.js-courses-category-filter');
    const productSubCategoryDropdown = document.querySelector('.js-courses-subcategory-filter');
    const productSubCategoryContainer = document.querySelector('.js-courses-subcategory-container');

    //Static vars
    const actionInitial = courseSearchForm.getAttribute("action");
    const apiEndpointUrl = "/GetProducts";
    let pageNumber = 1;
    const pageSize = 100;
    let subcategoryArray = ["All"];

    let category = "";
    let subcategory = ""; 

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
                if (result.subCategory != "All" && !subcategoryArray.includes(result.subCategory, subcategoryArray)) {
                    subcategoryArray.push(result.subCategory);
                    populateSubCategories();
                }
            });
        }

        handleIndicators(false, resultsLoader);
    }

    const populateSubCategories = () => {

        productSubCategoryDropdown.innerHTML = "";//clear <option> tags

        if (subcategoryArray.length > 1 && category !== "") {
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

        let bodyObject = {
            "productType": "Courses", //Events, Products, Courses
            "category": category, //Professional Development, Publications, Conferences/Conventions, etc.
            "subCategory": subcategory == "All" ? "" : subcategory,//children of category
            "taxonomy": "",//Reference Manuals, Books, Virtual, etc.
            "pagination": {
                "pageNumber": pageNumber,
                "pageSize": pageSize
            }
        };

        const bodyRequest = JSON.stringify(bodyObject);

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
        });
    }

    const resetDropdown = (dropdownElement, setValue) => {
        dropdownElement.value = setValue;
    }

    //Event Handlers
    if (productCategoryDropdown) {
        productCategoryDropdown.addEventListener("change", (e) => {
            e.preventDefault();
            category = e.target.value;
            //clearing subcategory dropdown
            subcategory = "";
            subcategoryArray = ["All"];
            productSubCategoryContainer.setAttribute("hidden", "hidden");
            productSubCategoryDropdown.innerHTML = "";//clear <option> tags

            if (productSubCategoryDropdown) {
                resetDropdown(productSubCategoryDropdown, "");
            }

            postResults();
        })
    }

    if (productSubCategoryDropdown) {

        productSubCategoryDropdown.addEventListener("change", (e) => {
            e.preventDefault();
            subcategory = e.target.value;
            postResults();
        })
    }

    let updatedAction = false;

    const updateActionUrl = () => {

        const setParams = subcategory !== "" ? `${actionInitial}?type=Courses&category=${category}&subcategory=${subcategory}` : `${actionInitial}?type=Courses&category=${category}`;
        courseSearchForm.setAttribute("action", setParams);

        updatedAction = true;

        if (updatedAction) {
            courseSearchForm.submit();
        }
    }

    courseSearchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        updateActionUrl();
    })

    //Page Load

    postResults();

};

export default courseSearch;