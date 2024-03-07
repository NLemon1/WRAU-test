const courseSearch = () => {

    //DOM event elements
    const productCategoryDropdown = document.querySelector('.js-category-filter');
    const productSubCategoryDropdowns = document.querySelectorAll('.js-subcategory-filter');
    const productSubCategoryContainers = document.querySelectorAll('.js-subcategory-container');
    const productSubmit = document.querySelector('.js-courses-submit');

    const courseSearchForm = document.getElementById('course-search');

    //Static vars

    let activeCat = "";
    let activeSubCat = "";

    productCategoryDropdown.addEventListener("change", (e) => {

        const categoryValue = e.target.value;
        activeCat = categoryValue;

        productSubCategoryContainers.forEach((productSubCategoryContainer) => {
            if (productSubCategoryContainer.dataset.id === categoryValue) {
                productSubCategoryContainer.hidden = false;
            } else {
                productSubCategoryContainer.hidden = true;
            }
        })

        if (activeCat !== "") {
            productSubmit.disabled = false;
        } else {
            productSubmit.disabled = true;
        }

    });

    productSubCategoryDropdowns.forEach((productSubCategoryDropdown) => {
        productSubCategoryDropdown.addEventListener("change", (e) => {
            activeSubCat = e.target.value;
        });
    });

    productSubmit.addEventListener("click", (e)=> {

        if (activeSubCat !== "") {
            courseSearchForm.setAttribute("action", activeSubCat);
        } else {
            courseSearchForm.setAttribute("action", activeCat);
        }

       courseSearchForm.submit();

    });

};

export default courseSearch;