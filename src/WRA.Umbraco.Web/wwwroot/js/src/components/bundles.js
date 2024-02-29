const bundles = () => {

    const bundleBag = document.querySelector('.js-bundle-bag'),
        bundleCount = bundleBag.querySelector('.js-bundle-count');
    const bundlesContainer = document.querySelector('.js-bundles-form'),
        bundlesForm = bundlesContainer.querySelector('form');

    const bundlePopDetails = document.querySelectorAll('.js-bundle-pop-details');
    const bundleModals = document.querySelectorAll('.js-modal');
    const bundlePopClosers = document.querySelectorAll('.js-modal-close');


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

    //Pop Details

    const closePops = () => {
        bundleModals.forEach((modal) => {
            modal.setAttribute("aria-hidden", "true");
        })
    }

    bundlePopDetails.forEach((bundlePopDetail) => {
        bundlePopDetail.addEventListener("click", (e) => {
            e.preventDefault();
            const getModalId = bundlePopDetail.getAttribute("aria-controls"),
                getModal = document.getElementById(getModalId);

            getModal.setAttribute("aria-hidden", "false");
        });
    });

    bundlePopClosers.forEach((bundlePopCloser) => {
        bundlePopCloser.addEventListener("click", (e) => {
            e.preventDefault();

            const getModalId = bundlePopCloser.getAttribute("aria-controls"),
                getModal = document.getElementById(getModalId);

            getModal.setAttribute("aria-hidden", "true");
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closePops();
        }
    });

};

export default bundles;