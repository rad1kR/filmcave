import { moviesPopular, imgPathBackdropOriginal } from "./variables.js";

const carousel = document.querySelector("[data-slides]");
export const buttons = document.querySelectorAll("[data-carousel-button]");

// render carousel
export async function renderHeader() {
  const moviesPopularData = await fetch(moviesPopular).then((resp) =>
    resp.json()
  );
  const top5 = moviesPopularData.results.slice(0, 5);
  top5.forEach((item) => {
    let listItem = document.createElement("li");
    listItem.classList.add("slide");
    listItem.style.backgroundImage = `url(${
      imgPathBackdropOriginal + item.backdrop_path
    })`;
    listItem.innerHTML = `
        <a href="../pages/overview.html#${item.id}%${item.title}">
          <h1>${item.title}</h1>
        </a>
      `;
    carousel.appendChild(listItem);
  });

  const slides = Array.from(document.querySelectorAll(".slide"));
  slides[0].setAttribute("data-active", "");
}

// change slide by arrow
export function changeSlide() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1;
      const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]");
      const activeSlide = slides.querySelector("[data-active]");
      let newIndex = [...slides.children].indexOf(activeSlide) + offset;
      if (newIndex < 0) newIndex = slides.children.length - 1;
      if (newIndex >= slides.children.length) newIndex = 0;
      slides.children[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;
    });
  });
}

// auto change slide
export function autoChangeSlide() {
  const slides = document.querySelector("[data-slides]");
  const activeSlide = slides.querySelector("[data-active]");
  let newIndex = [...slides.children].indexOf(activeSlide);
  newIndex++;
  if (newIndex >= slides.children.length) newIndex = 0;
  slides.children[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
}
