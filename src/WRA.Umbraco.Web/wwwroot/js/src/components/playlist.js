const playList = () => {

    const player = document.getElementById('js-playlist-player');
    const dateText = document.querySelector('.js-playlist-date');
    const titleText = document.querySelector('.js-playlist-title');
    const descrText = document.querySelector('.js-playlist-description');
    const playlistItems = document.querySelectorAll('.js-playlist-item');

    const updateView = ({ title, description, date, yt }) => {

        window.scrollTo({
            top: 120,
            left: 0,
            behavior: "smooth",
        });

        player.src = `https://www.youtube.com/embed/${yt}?autoplay=1`;
        dateText.innerHTML = date;
        titleText.innerHTML = title;
        descrText.innerHTML = description;
    }

    const handleActive = (activeItem) => {
        const currentActive = document.querySelector('.js-playlist-item[aria-selected="true"]');
        currentActive.setAttribute("aria-selected", "false");
        activeItem.setAttribute("aria-selected", "true");
    }

    playlistItems.forEach((item) => {

        item.addEventListener("click", (e) => {
            e.preventDefault();

            updateView({
                title: item.dataset.title,
                description: item.dataset.description,
                date: item.dataset.date,
                yt: item.dataset.yt
            })

            handleActive(item);
            
        });

    });

};

export default playList;