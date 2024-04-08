import expandableTextCards from './components/expandable-text-cards';
import header from './components/header';
import nav from './components/nav';
import swiper from './components/swiper';
import tabs from './components/tabs';
import { dialogs, formsAccessDialog } from './components/dialogs';
import homeHero from './components/home-hero';
import playList from './components/playlist';
import hotTipLibrary from './components/hot-tip-library';
import alert from './components/alert';
import articleFilters from './components/article-filters';
import multimediaFilters from './components/multimedia-filters';
import calendar from './components/calendar';
import quantitySelector from './components/quantity-selector';
import checkout from './components/checkout';
import products from './components/products';
import courseSearch from './components/course-search';
import bundles from './components/bundles';
import popModal from './components/popmodal';
import print from './components/print';
import pageTabs from './components/page-tabs';

expandableTextCards();
header();
nav();
swiper();
tabs();
dialogs();
formsAccessDialog();
homeHero();
playList();
hotTipLibrary();
alert();
articleFilters();
multimediaFilters();
quantitySelector();
checkout();
popModal();

if (document.body.classList.contains("page-template-subCategoryPage")) {
    products();
}

if (document.getElementById("ec")) {
    calendar();
}

if (document.getElementById("course-search")) {
    courseSearch();
}

if (document.body.classList.contains("page-template-bundlePage")) {
    bundles();
}

print();

if (document.querySelector(".js-page-tab")) {
    pageTabs();
}