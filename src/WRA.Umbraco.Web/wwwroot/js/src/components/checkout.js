const checkout = () => {
    const accountStepHeading = document.querySelector('.js-account-heading');
    const showSignIn = document.querySelector('.js-show-sign-in');
    const showCreateAccount = document.querySelector('.js-show-create-account');
    const signInWrapper = document.querySelector('.js-checkout-sign-in');
    const createAccountWrapper = document.querySelector('.js-checkout-create-account');
    const stateDropdown = document.querySelector('.js-checkout-state');
    const countyField = document.querySelector('.js-checkout-county');

    ///

    if (showSignIn) {
        showSignIn.addEventListener('click', (e) => {
            accountStepHeading.textContent = 'Sign In';
            signInWrapper.classList.remove('d-none');
            createAccountWrapper.classList.add('d-none');
        });
    }

    if (showCreateAccount) {
        showCreateAccount.addEventListener('click', (e) => {
            accountStepHeading.textContent = 'Create Account';
            signInWrapper.classList.add('d-none');
            createAccountWrapper.classList.remove('d-none');
        });
    }

    ///
    
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

    const billingAddressRadios = document.querySelectorAll('.js-billing-address');
    const billingAddressFields = document.querySelector('.js-billing-address-fields');

    if (billingAddressRadios.length) {
        billingAddressRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value == 'different') {
                    billingAddressFields.classList.remove('d-none');
                } else {
                    billingAddressFields.classList.add('d-none');
                }
            });
        });
    }
}

export default checkout;