// show navigation after load
const navigation = document.querySelector("nav");
const footer = document.querySelector("footer");

export function showNavigation() {
  setTimeout(() => {
    navigation.style.top = "0";
    footer.style.visibility = "visible";
  }, 100);
}

// hide nav on scroll
const nav = document.getElementById("nav");
export let scrollPosition = window.scrollY;

export function navHide() {
  let currentScrollPosition = window.scrollY;
  scrollPosition > currentScrollPosition
    ? (nav.style.top = "0")
    : (nav.style.top = "-4rem");
  scrollPosition = currentScrollPosition;
}

// search bar
export const searchBarOpen = document.getElementById("search_bar_open");
const searchBar = document.getElementById("search_bar_container");
export const searchBarClose = document.getElementById("search_bar_close");
export const searchBarInput = document.querySelector("#search_bar input");
const searchList = document.getElementById("search_list");

export function searchBarHide() {
  searchBar.classList.remove("open");
  searchBarInput.value = "";
  searchList.innerHTML = "";
}

export function searchBarToggle() {
  searchBar.classList.toggle("open");
  searchBarInput.value = "";
  searchList.innerHTML = "";
}

export async function renderSearchingList() {
  searchList.innerHTML = "";
  const searchingItem = searchBarInput.value;
  const searchingData = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=85e427c9db254e2001d7afd5f1b36332&language=en-US&query=${searchingItem}&page=1&include_adult=false`
  ).then((resp) => resp.json());
  searchingData.results.forEach((item) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = `
    <a href="../pages/overview.html#${item.id}%${item.title || item.name}">${
      item.title || item.name
    }</a>
    `;
    searchList.appendChild(listItem);
  });
}

// mobile menu
export const mobileMenuButton = document.getElementById("mobile_menu_button");
export const mobileMenuClose = document.getElementById("mobile_menu_close");
const mobileMenuWrapper = document.getElementById("mobile_menu_wrapper");
const mobileMenu = document.getElementById("mobile_menu");

export function showMobileMenu() {
  mobileMenuWrapper.style.display = "flex";
  setTimeout(() => {
    mobileMenu.style.transform = "translateX(0)";
  }, 1);
}

export function hideMobileMenu() {
  mobileMenuWrapper.style.display = "none";
  mobileMenu.style.transform = "translateX(-100%)";
}
