const homeHero = () => {

    const tab = document.querySelector('.js-calendar-tab');
    const tabPanel = document.querySelector('.js-calendar-panel');

    if (!tab) return;

    tab.addEventListener("click", (e) => {
        e.preventDefault();
        tabPanel.classList.toggle("is-active");
        tab.classList.toggle("is-active");
    });

};

export default homeHero;