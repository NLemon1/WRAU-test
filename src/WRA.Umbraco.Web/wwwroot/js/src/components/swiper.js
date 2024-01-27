import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, Scrollbar, EffectFade } from 'swiper/modules';

const swiper = () => {
    document.querySelectorAll('.js-swiper').forEach(item => {
        let options = {};

        if (item.dataset.options) {
            options = item.dataset.options.replace(/'/g, '"').replace(/,\s*([\]}])/g, '$1');
            options = JSON.parse(options);
        }

        options.modules = [Autoplay, Navigation, Pagination, Scrollbar, EffectFade];


        new Swiper(item, options);
    });
};

export default swiper;