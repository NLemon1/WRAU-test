const checkout = () => {
    const stateDropdown = document.querySelector('.js-checkout-state');
    const countyField = document.querySelector('.js-checkout-county');
    
    if (stateDropdown) {
        stateDropdown.addEventListener('change', (e) => {
            if (e.target.value == 'WI') {
                countyField.classList.remove('d-none');
            } else {
                countyField.classList.add('d-none');
            }
        });
    }

    ///

    const billingAddressRadio = document.querySelector('.js-alt-billing-address');
    const billingAddressFields = document.querySelector('.js-alt-billing-address-fields');

    if (billingAddressRadio) {
        billingAddressRadio.addEventListener('change', (e) => {
            if (billingAddressRadio.checked) {
                billingAddressFields.classList.remove('d-none');
            } else {
                billingAddressFields.classList.add('d-none');
            }
        });
    }
}

export default checkout;