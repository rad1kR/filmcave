import { imgPathPosterW342, imgPathProfileOriginal } from "./variables.js";

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

// reload page after change url
window.addEventListener("popstate", () => {
  location.reload();
});

// overview
const content = document.getElementById("content_wrapper");
const errorMessage = document.getElementById("message_404");
const hashId = location.hash.slice(1).split("%")[0];
const hashName = location.hash
  .split("%")
  .slice(1)
  .join()
  .replaceAll(",", " ")
  .replaceAll("20", "");
const movieById = `https://api.themoviedb.org/3/movie/${hashId}?api_key=85e427c9db254e2001d7afd5f1b36332&language=en-US`;
const tvshowById = `https://api.themoviedb.org/3/tv/${hashId}?api_key=85e427c9db254e2001d7afd5f1b36332&language=en-US`;
const peopleById = `https://api.themoviedb.org/3/person/${hashId}?api_key=85e427c9db254e2001d7afd5f1b36332&language=en-US`;
const movieCredits = `https://api.themoviedb.org/3/movie/${hashId}/credits?api_key=85e427c9db254e2001d7afd5f1b36332&language=en-US`;
const movieReviews = `https://api.themoviedb.org/3/movie/${hashId}/reviews?api_key=85e427c9db254e2001d7afd5f1b36332&language=en-US&page=1`;
const tvshowCredits = `https://api.themoviedb.org/3/tv/${hashId}/aggregate_credits?api_key=85e427c9db254e2001d7afd5f1b36332&language=en-US`;
const tvshowReviews = `https://api.themoviedb.org/3/tv/${hashId}/reviews?api_key=85e427c9db254e2001d7afd5f1b36332&language=en-US&page=1`;
const peopleCredits = `https://api.themoviedb.org/3/person/${hashId}/combined_credits?api_key=85e427c9db254e2001d7afd5f1b36332&language=en-US`;

async function renderOverview() {
  const movieByIdData = await fetch(movieById).then((resp) => {
    if (resp.status == 200) {
      return resp.json();
    }
  });

  const tvshowByIdData = await fetch(tvshowById).then((resp) => {
    if (resp.status == 200) {
      return resp.json();
    }
  });

  const peopleByIdData = await fetch(peopleById).then((resp) => resp.json());

  // ==================== generate movie summary ====================
  if (movieByIdData !== undefined && movieByIdData.title === hashName) {
    const movieCreditsData = await fetch(movieCredits).then((resp) =>
      resp.json()
    );
    const movieCreditTop10 = movieCreditsData.cast.slice(0, 10);
    const movieReviewsData = await fetch(movieReviews).then((resp) =>
      resp.json()
    );

    // basic info section
    const basicInfo = document.createElement("div");
    basicInfo.classList.add("basic_info_wrapper");
    basicInfo.innerHTML = `
      <img src="${imgPathPosterW342 + movieByIdData.poster_path}" alt="${
      movieByIdData.title
    }">
      <div class="overview_wrapper">
        <h2>${movieByIdData.title}</h2>
        <p>${movieByIdData.release_date
          .split("-")
          .reverse()
          .join()
          .replaceAll(",", ".")
          .replace(/\b0/g, "")}</p>
        <p>${movieByIdData.genres
          .map((item) => item.name)
          .join()
          .replaceAll(",", " / ")}</p>
        <p>${movieByIdData.overview}</p>
      </div>
    `;
    content.appendChild(basicInfo);

    // casting section
    const heading = document.createElement("h3");
    heading.innerHTML = `Top billed cast`;
    heading.classList.add("overview_heading");
    content.appendChild(heading);

    const cast = document.createElement("div");
    cast.classList.add("cast_wrapper");
    movieCreditTop10.forEach((item) => {
      if (item.profile_path !== null) {
        const profileItem = document.createElement("li");
        profileItem.innerHTML = `
          <div class="profile_card">
            <img src="${imgPathProfileOriginal + item.profile_path}" alt="${
          item.name
        }">
            <h3>${item.name}</h3>
          </div>
      `;
        cast.appendChild(profileItem);
      }
    });
    content.appendChild(cast);

    // reviews section
    if (movieReviewsData.results.length !== 0) {
      const heading = document.createElement("h3");
      heading.innerHTML = `Reviews`;
      heading.classList.add("overview_heading");
      content.appendChild(heading);
    }

    const reviews = document.createElement("div");
    reviews.classList.add("reviews_wrapper");
    movieReviewsData.results.forEach((item) => {
      const reviewItem = document.createElement("li");
      reviewItem.innerHTML = `
        <div>
          <p>A review by <span>${item.author}</span><p>
          <p>${item.content}</p>
        </div>
      `;
      reviews.appendChild(reviewItem);
    });
    content.appendChild(reviews);
  }

  // ==================== generate tv show summary ====================
  else if (tvshowByIdData !== undefined && tvshowByIdData.name === hashName) {
    const tvshowCreditsData = await fetch(tvshowCredits).then((resp) =>
      resp.json()
    );
    const tvshowCreditTop10 = tvshowCreditsData.cast.slice(0, 10);
    const tvshowReviewsData = await fetch(tvshowReviews).then((resp) =>
      resp.json()
    );

    // basic info section
    const basicInfo = document.createElement("div");
    basicInfo.classList.add("basic_info_wrapper");
    basicInfo.innerHTML = `
      <img src="${imgPathPosterW342 + tvshowByIdData.poster_path}">
      <div class="overview_wrapper">
        <h2>${tvshowByIdData.name}</h2>
        <p>${tvshowByIdData.first_air_date
          .split("-")
          .reverse()
          .join()
          .replaceAll(",", ".")
          .replace(/\b0/g, "")}</p>
        <p>${tvshowByIdData.genres
          .map((item) => item.name)
          .join()
          .replaceAll(",", " / ")}</p>
        <p>${tvshowByIdData.overview}</p>
      </div>
    `;
    content.appendChild(basicInfo);

    // casting section
    const heading = document.createElement("h3");
    heading.innerHTML = `Top billed cast`;
    heading.classList.add("overview_heading");
    content.appendChild(heading);

    const cast = document.createElement("div");
    cast.classList.add("cast_wrapper");
    tvshowCreditTop10.forEach((item) => {
      if (item.profile_path !== null) {
        const profileItem = document.createElement("li");
        profileItem.innerHTML = `
          <div class="profile_card">
            <img src="${imgPathProfileOriginal + item.profile_path}" alt="${
          item.name
        }">
            <h3>${item.name}</h3>
          </div>
      `;
        cast.appendChild(profileItem);
      }
    });
    content.appendChild(cast);

    // reviews section
    if (tvshowReviewsData.results.length !== 0) {
      const heading = document.createElement("h3");
      heading.innerHTML = `Reviews`;
      heading.classList.add("overview_heading");
      content.appendChild(heading);
    }

    const reviews = document.createElement("div");
    reviews.classList.add("reviews_wrapper");
    tvshowReviewsData.results.forEach((item) => {
      const reviewItem = document.createElement("li");
      reviewItem.innerHTML = `
        <div>
          <p>${item.author}<p>
          <p>${item.content}</p>
        </div>
      `;
      reviews.appendChild(reviewItem);
    });
    content.appendChild(reviews);
  }

  // ==================== generate people summary ====================
  else if (peopleByIdData !== undefined && peopleByIdData.name === hashName) {
    // basic info section
    const peopleCreditsData = await fetch(peopleCredits).then((resp) =>
      resp.json()
    );
    const peopleCreditsTop10 = peopleCreditsData.cast.slice(0, 10);
    const basicInfo = document.createElement("div");
    basicInfo.classList.add("basic_info_wrapper");
    basicInfo.innerHTML = `
      <img src="${imgPathProfileOriginal + peopleByIdData.profile_path}" alt="${
      peopleByIdData.name
    }">
      <div class="overview_wrapper">
        <h2>${peopleByIdData.name}</h2>
        <p>${peopleByIdData.birthday
          .split("-")
          .reverse()
          .join()
          .replaceAll(",", ".")
          .replace(/\b0/g, "")}</p>
        <p>${peopleByIdData.place_of_birth}</p>
        <p>${peopleByIdData.biography}</p>
      </div>
    `;
    content.appendChild(basicInfo);

    // casting section
    const heading = document.createElement("h3");
    heading.innerHTML = `Know for`;
    heading.classList.add("overview_heading");
    content.appendChild(heading);

    const cast = document.createElement("div");
    cast.classList.add("cast_wrapper");
    peopleCreditsTop10.forEach((item) => {
      if (item.poster_path !== null) {
        const profileItem = document.createElement("li");
        profileItem.innerHTML = `
        <div class="profile">
          <img src="${imgPathPosterW342 + item.poster_path}" alt="${
          item.title || item.name
        }">
          <h3>${item.title}</h3>
        </div>
    `;
        cast.appendChild(profileItem);
      }
    });
    content.appendChild(cast);
  } else {
    errorMessage.style.display = "flex";
  }
}

renderOverview();
