import {
  moviesNowPlaying,
  moviesPopular,
  moviesTopRated,
  moviesUpcoming,
  imgPathPosterW342,
} from "./variables.js";

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

import { renderCardItem } from "./renderCardItem.js";

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

// movies by select
const moviesWrapper = document.getElementById("movies_wrapper");
const subNavigationInput = document.getElementById("sub_navigation_input");
const subNavigationSelect = document.getElementById("sub_navigation_select");

renderCardItem(moviesNowPlaying, imgPathPosterW342, moviesWrapper);

function renderMoviesPage() {
  if (subNavigationSelect.value === "Now Playing") {
    moviesWrapper.innerHTML = "";
    renderCardItem(moviesNowPlaying, imgPathPosterW342, moviesWrapper);
  } else if (subNavigationSelect.value === "Popular") {
    moviesWrapper.innerHTML = "";
    renderCardItem(moviesPopular, imgPathPosterW342, moviesWrapper);
  } else if (subNavigationSelect.value === "Top Rated") {
    moviesWrapper.innerHTML = "";
    renderCardItem(moviesTopRated, imgPathPosterW342, moviesWrapper);
  } else if (subNavigationSelect.value === "Upcoming") {
    moviesWrapper.innerHTML = "";
    renderCardItem(moviesUpcoming, imgPathPosterW342, moviesWrapper);
  }
}

// search bar
subNavigationSelect.addEventListener("change", renderMoviesPage);

subNavigationInput.addEventListener("input", () => {
  const inputValue = subNavigationInput.value;
  const searchMovies = `https://api.themoviedb.org/3/search/movie?api_key=85e427c9db254e2001d7afd5f1b36332&language=en-US&query=${inputValue}&page=1&include_adult=false`;
  moviesWrapper.innerHTML = "";
  renderCardItem(searchMovies, imgPathPosterW342, moviesWrapper);
});
