const popModal = () => {

    const popBtns = document.querySelectorAll('.js-pop-btn');
    const popModals = document.querySelectorAll('.js-modal');
    const popClosers = document.querySelectorAll('.js-modal-close');

    if (popBtns) {

        const closePops = () => {
            popModals.forEach((modal) => {
                modal.setAttribute("aria-hidden", "true");
            })
        }

        popBtns.forEach((popBtn) => {
            popBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const getModalId = popBtn.getAttribute("aria-controls"),
                    getModal = document.getElementById(getModalId);

                getModal.setAttribute("aria-hidden", "false");
            });
        });

        popClosers.forEach((popCloser) => {
            popCloser.addEventListener("click", (e) => {
                e.preventDefault();

                const getModalId = popCloser.getAttribute("aria-controls"),
                    getModal = document.getElementById(getModalId);

                getModal.setAttribute("aria-hidden", "true");
            });
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                closePops();
            }
        });
    }

};

export default popModal;