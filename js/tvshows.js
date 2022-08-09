import {
  tvshowsAiringToday,
  tvshowsOnTheAir,
  tvshowsPopular,
  tvshowsTopRated,
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

// tv shows
const tvshowsWrapper = document.getElementById("tvshows_wrapper");
const subNavigationInput = document.getElementById("sub_navigation_input");
const subNavigationSelect = document.getElementById("sub_navigation_select");
const subNavigationOption = document.querySelectorAll(
  "#sub_navigation_select option"
);

renderCardItem(tvshowsAiringToday, imgPathPosterW342, tvshowsWrapper);

function renderTvshowsPage() {
  if (subNavigationSelect.value === "Airing Today") {
    tvshowsWrapper.innerHTML = "";
    renderCardItem(tvshowsAiringToday, imgPathPosterW342, tvshowsWrapper);
  } else if (subNavigationSelect.value === "On The Air") {
    tvshowsWrapper.innerHTML = "";
    renderCardItem(tvshowsOnTheAir, imgPathPosterW342, tvshowsWrapper);
  } else if (subNavigationSelect.value === "Popular") {
    tvshowsWrapper.innerHTML = "";
    renderCardItem(tvshowsPopular, imgPathPosterW342, tvshowsWrapper);
  } else if (subNavigationSelect.value === "Top Rated") {
    tvshowsWrapper.innerHTML = "";
    renderCardItem(tvshowsTopRated, imgPathPosterW342, tvshowsWrapper);
  }
}

subNavigationSelect.addEventListener("change", renderTvshowsPage);

subNavigationInput.addEventListener("input", () => {
  const inputValue = subNavigationInput.value;
  const searchTvshows = `
  https://api.themoviedb.org/3/search/tv?api_key=85e427c9db254e2001d7afd5f1b36332&language=en-US&page=1&query=${inputValue}&include_adult=false`;
  tvshowsWrapper.innerHTML = "";
  renderCardItem(searchTvshows, imgPathPosterW342, tvshowsWrapper);
});
