import expandableTextCards from './components/expandable-text-cards';
import header from './components/header';
import nav from './components/nav';
import swiper from './components/swiper';
import tabs from './components/tabs';
import homeHero from './components/home-hero';
import playList from './components/playlist';
import hotTipLibrary from './components/hot-tip-library';
import alert from './components/alert';
import articleFilters from './components/article-filters';
import multimediaFilters from './components/multimedia-filters';
import calendar from './components/calendar';

expandableTextCards();
header();
nav();
swiper();
tabs();
homeHero();
playList();
hotTipLibrary();
alert();
articleFilters();
multimediaFilters();

if (document.getElementById("ec")) {
    calendar();
}
