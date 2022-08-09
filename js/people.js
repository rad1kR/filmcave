import { peoplePopular, imgPathProfileOriginal } from "./variables.js";

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

import { rednerProfile } from "./renderCardItem.js";

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

// people
const peopleWrapper = document.getElementById("people_wrapper");
const subNavigationInput = document.getElementById("sub_navigation_input");

rednerProfile(peoplePopular, imgPathProfileOriginal, peopleWrapper);

subNavigationInput.addEventListener("input", () => {
  const inputValue = subNavigationInput.value;
  const searchPeople = `https://api.themoviedb.org/3/search/person?api_key=85e427c9db254e2001d7afd5f1b36332&language=en-US&query=${inputValue}&page=1&include_adult=false`;
  peopleWrapper.innerHTML = "";
  rednerProfile(searchPeople, imgPathProfileOriginal, peopleWrapper);
});
