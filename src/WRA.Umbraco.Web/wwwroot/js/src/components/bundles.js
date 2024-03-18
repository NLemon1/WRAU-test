const bundles = () => {

    const bundleBag = document.querySelector('.js-bundle-bag'),
        bundleCount = bundleBag.querySelector('.js-bundle-count');
    const bundlesContainer = document.querySelector('.js-bundles-form'),
        bundlesForm = bundlesContainer.querySelector('form');

    //Items Display

    const displayCount = (count) => {
        bundleCount.innerHTML = (
            `${count}`
        );
    }

    const selectedCount = (formElement) => {
        const selectedElement = formElement.querySelectorAll("input[type=checkbox]:checked");

        if (selectedElement.length > 0) {
            bundleBag.hidden = false;
        } else {
            bundleBag.hidden = true;
        }

        displayCount(selectedElement.length);
    }

    bundlesForm.addEventListener("change", (e) => {
        selectedCount(bundlesForm)
    });

};

export default bundles;