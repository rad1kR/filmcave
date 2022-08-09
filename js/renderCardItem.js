// cards for movies / tv shows
export async function renderCardItem(url, imgPath, wrapper) {
  const data = await fetch(url).then((resp) => resp.json());
  data.results.forEach((item) => {
    if (item.poster_path !== null) {
      const cardItem = document.createElement("li");
      cardItem.innerHTML = `
          <div class="card">
              <a href="../pages/overview.html#${item.id}%${
        item.title || item.name
      }">
                <img src="${imgPath + item.poster_path}" alt="${
        item.tietle || item.name
      }">
                <p class="badge">${item.vote_average.toFixed(1)}</p>
                <div class="text_wrapper">
                    <h3>${item.title || item.name}</h3>
                    <p class="date">${(
                      item.release_date || item.first_air_date
                    ).slice(0, 4)}
                </div>
              </a>
          </div>
        `;
      wrapper.appendChild(cardItem);
    }
  });
}

// cards for people
export async function rednerProfile(url, imgPath, wrapper) {
  const data = await fetch(url).then((resp) => resp.json());
  data.results.forEach((item) => {
    if (item.profile_path !== null) {
      const profileItem = document.createElement("li");
      profileItem.innerHTML = `
          <div class="profile_card">
              <a href="../pages/overview.html#${item.id}%${item.name}">
                  <img src="${imgPath + item.profile_path}" alt="${item.name}">
                  <div>
                      <h3>${item.name}</h3>
                  </div>
              </a>
          </div>
      `;
      wrapper.appendChild(profileItem);
    }
  });
}
