const quantitySelector = () => {
    const quantitySelectors = document.querySelectorAll('.js-quantity-selector');

    if (!quantitySelectors.length) return;

    quantitySelectors.forEach(item => {
        const quantityInput = item.querySelector('.js-quantity-selector-input');
        const incrementBtn = item.querySelector('.js-quantity-selector-increment');
        const decrementBtn = item.querySelector('.js-quantity-selector-decrement');

        incrementBtn.addEventListener('click', () => {
            quantityInput.value++;
        });

        decrementBtn.addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value--;
            }
        });
    });
}

export default quantitySelector;