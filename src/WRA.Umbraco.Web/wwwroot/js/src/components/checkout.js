const checkout = () => {
    const stateDropdown = document.querySelector('.js-checkout-state');
    const countyField = document.querySelector('.js-checkout-county');

    if (!stateDropdown) return;

    stateDropdown.addEventListener('change', (e) => {
        if (e.target.value == 'WI') {
            countyField.classList.remove('d-none');
        } else {
            countyField.classList.add('d-none');
        }
    });
}

export default checkout;