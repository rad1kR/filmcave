// theme switcher
export const themeSwitcher = document.getElementById("theme_switcher");

export function checkTheme() {
  const themeFromStorage = localStorage.getItem("theme");
  if (themeFromStorage === "light") {
    themeSwitcher.checked = true;
    document.documentElement.setAttribute("data-theme", themeFromStorage);
  }
}

export function changeTheme(e) {
  document.documentElement.setAttribute(
    "data-theme",
    e.target.checked ? "light" : "dark"
  );

  localStorage.clear();
  const activeTheme = document.documentElement.dataset.theme;
  localStorage.setItem("theme", activeTheme);
}
