const expandableTextCards = () => {
    const cards = document.querySelectorAll('.js-expandable-text-card');

    cards.forEach(card => {
        const open = card.querySelector('.js-expandable-text-card__open');
        const close = card.querySelector('.js-expandable-text-card__close');
        const overlay = card.querySelector('.js-expandable-text-card__overlay');

        open.addEventListener('click', () => {
            overlay.classList.add('is-active');
            open.ariaExpanded = true;
            overlay.ariaHidden = false;
        });

        close.addEventListener('click', () => {
            overlay.classList.remove('is-active');
            open.ariaExpanded = false;
            overlay.ariaHidden = true;
        });
    });
};

export default expandableTextCards;