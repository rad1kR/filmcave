import {
  showNavigation,
  navHide,
  searchBarOpen,
  searchBarToggle,
  searchBarClose,
  searchBarHide,
  searchBarInput,
  renderSearchingList,
  mobileMenuButton,
  mobileMenuClose,
  showMobileMenu,
  hideMobileMenu,
} from "./navigation.js";

import { renderHeader, changeSlide, autoChangeSlide } from "./header.js";
import {
  moviesBtn,
  tvshowsBtn,
  renderTrendingMovies,
  renderTrendingTvshows,
  renderTopRatedSection,
  showTvshowSection,
  showMoviesSection,
  renderPeoplePopular,
} from "./main.js";

import { themeSwitcher, checkTheme, changeTheme } from "./themeSwitcher.js";

// theme switcher
checkTheme();
themeSwitcher.addEventListener("change", changeTheme);

// navigation
showNavigation();
document.addEventListener("scroll", navHide);
searchBarOpen.addEventListener("click", searchBarToggle);
searchBarClose.addEventListener("click", searchBarHide);
searchBarInput.addEventListener("input", renderSearchingList);
mobileMenuButton.addEventListener("click", showMobileMenu);
mobileMenuClose.addEventListener("click", hideMobileMenu);

// header
renderHeader();
changeSlide();
setInterval(autoChangeSlide, 5000);

// main
renderTrendingMovies();
renderTrendingTvshows();
moviesBtn.addEventListener("click", showMoviesSection);
tvshowsBtn.addEventListener("click", showTvshowSection);
renderTopRatedSection();
renderPeoplePopular();
