const alert = () => {

    const closeAlert = document.querySelector('.js-alert-close');
    const alertBanner = document.getElementById('site-alert');

    const setCookie = (timestamp, exp) => {

        const now = new Date();
        const minutes = 60 * 24 * parseInt(exp);//1 month
        now.setTime(now.getTime() + (minutes * 60 * 1000));

        document.cookie = `wra_alert_banner=${timestamp};expires=` + now.toUTCString() + ";";
    }

    if (closeAlert !== null) {
        closeAlert.addEventListener("click", (e) => {
            e.preventDefault();
            alertBanner.remove();

            const timestamp = alertBanner.dataset.timestamp;
            const exp = alertBanner.dataset.expiration;
            setCookie(timestamp, exp);
        })
    }

};

export default alert;