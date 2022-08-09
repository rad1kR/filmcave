import {
  moviesTrending,
  tvshowsTrending,
  imgPathPosterW342,
  moviesTopRated,
  tvshowsTopRated,
  imgPathPosterW92,
  imgPathProfileOriginal,
  txtDarkColor,
  secondaryDarkColor,
  peoplePopular,
} from "./variables.js";

import { rednerProfile, renderCardItem } from "./renderCardItem.js";

// trending section
export const moviesBtn = document.getElementById("btn_movies");
export const tvshowsBtn = document.getElementById("btn_tvshows");
export const moviesSection = document.getElementById("trending_wrapper_movies");
export const tvshowsSection = document.getElementById(
  "trending_wrapper_tvshows"
);

export async function renderTrendingMovies() {
  renderCardItem(moviesTrending, imgPathPosterW342, moviesSection);
  moviesBtn.style.backgroundColor = "#ff9b57";
}

export async function renderTrendingTvshows() {
  renderCardItem(tvshowsTrending, imgPathPosterW342, tvshowsSection);
  tvshowsSection.style.visibility = "hidden";
}

export function showMoviesSection() {
  tvshowsSection.style.visibility = "hidden";
  tvshowsSection.scrollLeft = 0;
  moviesSection.style.visibility = "visible";
  moviesBtn.style.backgroundColor = secondaryDarkColor;
  tvshowsBtn.style.backgroundColor = txtDarkColor;
}

export function showTvshowSection() {
  moviesSection.style.visibility = "hidden";
  moviesSection.scrollLeft = 0;
  tvshowsSection.style.visibility = "visible";
  moviesBtn.style.backgroundColor = txtDarkColor;
  tvshowsBtn.style.backgroundColor = secondaryDarkColor;
}

// top rated section
const topRatedMoviesSection = document.getElementById("top_rated_movies");
const topRatedTvshowsSection = document.getElementById("top_rated_tvshows");

export async function renderTopRatedSection() {
  const moviesTopRatedData = await fetch(moviesTopRated).then((resp) =>
    resp.json()
  );
  const tvshowsTopRatedData = await fetch(tvshowsTopRated).then((resp) =>
    resp.json()
  );
  const moviesTop10 = moviesTopRatedData.results.slice(0, 10);
  const tvshowsTop10 = tvshowsTopRatedData.results.slice(0, 10);

  moviesTop10.forEach((item) => {
    const moviesListItem = document.createElement("li");
    moviesListItem.innerHTML = `
      <a href="../pages/overview.html#${item.id}%${item.title}">
        <img src="${imgPathPosterW92 + item.poster_path}" alt="${item.title}">
        <p>${item.title} (${item.release_date.slice(0, 4)})</p>
      </a>
      <p>${item.vote_average.toFixed(1)}</p>
    `;
    topRatedMoviesSection.appendChild(moviesListItem);
  });

  tvshowsTop10.forEach((item) => {
    const tvshowsListItem = document.createElement("li");
    tvshowsListItem.innerHTML = `
      <a href="../pages/overview.html#${item.id}%${item.name}">
        <img src="${imgPathPosterW92 + item.poster_path}" alt="${item.name}">
        <p>${item.name} (${item.first_air_date.slice(0, 4)})</p>
      </a>
      <p>${item.vote_average.toFixed(1)}</p>
    `;
    topRatedTvshowsSection.appendChild(tvshowsListItem);
  });
}

// people section
const peoplePopularSection = document.getElementById("people_wrapper");

export function renderPeoplePopular() {
  rednerProfile(peoplePopular, imgPathProfileOriginal, peoplePopularSection);
}
