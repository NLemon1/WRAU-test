const courseSearch = () => {

    //DOM presentation elements
    const resultsLoader = document.querySelector('.js-results-loader-courses');

    //DOM event elements
    const productCategoryDropdown = document.querySelector('.js-category-filter');
    const productSubCategoryDropdown = document.querySelector('.js-subcategory-filter');
    const productSubCategoryContainers = document.querySelectorAll('.js-subcategory-container');
    const productSubmit = document.querySelector('.js-courses-submit');

    //Static vars
   // const actionInitial = courseSearchForm.getAttribute("action");

    let activeSubCat = "";

    productCategoryDropdown.addEventListener("change", (e) => {

        const categoryValue = e.target.value;
        activeSubCat = "";

        productSubCategoryContainers.forEach((productSubCategoryContainer) => {
            if (productSubCategoryContainer.dataset.id === categoryValue) {
                productSubCategoryContainer.hidden = false;
                activeSubCat = categoryValue;
            } else {
                productSubCategoryContainer.hidden = true;
            }
        })

        if (activeSubCat !== "") {
            productSubmit.disabled = false;
        } else {
            productSubmit.disabled = true;
        }

    });

};

export default courseSearch;