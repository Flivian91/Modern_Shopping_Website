// import { mainFun } from "./counter";
/**
 * All Varibale
 *  */
// Menu Model
const menuSection = document.querySelector("#menu");
const menuButton = document.querySelector("#menu-button");
const menuClose = document.querySelector("#menu-close");
const overlay = document.querySelector("#overlay");
// Search Model
const searchSection = document.querySelector("#search");
const searchButton = document.querySelectorAll("#search-button");
const searchClose = document.querySelector("#search-close");
const searchInput = document.querySelector("#search-input");
// Cart Model
const cartSection = document.querySelector("#cart");
const cartButton = document.querySelector("#cart-button");
const cartClose = document.querySelector("#cart-close");
// Dark Mode
const sunButton = document.querySelector("#sun");
const moonButton = document.querySelector("#moon");
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
// Side bar
const sideMenuContainer = document.querySelector("#side-menu-container");
/**
 * Main Functionality On the Menu Part
 */
menuButton.addEventListener("click", openMenuModel);
menuClose.addEventListener("click", closeMenuModel);
overlay.addEventListener("click", closeMenuModel);
// Allow User close the Model By clicking Escape
window.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  closeMenuModel();
  closeSearchModel();
  closeCartModel();
});
/**
 * Open The Model And Overlay function
 */
function openMenuModel() {
  menuSection.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
/**
 * Close The Model And Overlay function
 */
function closeMenuModel() {
  menuSection.classList.add("hidden");
  overlay.classList.add("hidden");
}

/**
 * Search Functionality part
 */
searchButton.forEach((el) => {
  el.addEventListener("click", () => {
    openSearchModel();
  });
});
searchClose.addEventListener("click", closeSearchModel);
overlay.addEventListener("click", closeSearchModel);
// Open Model when User click ctrl + K
let keysPressed = {};
document.addEventListener("keydown", (e) => {
  keysPressed[e.key] = true;
  if (keysPressed["Control"] && keysPressed["k"]) {
    e.preventDefault();
    openSearchModel();
  }
});
document.addEventListener("keyup", function (e) {
  delete keysPressed[e.key];
});
/**
 * Open Search Model and Overlay
 */
function openSearchModel() {
  searchSection.classList.remove("hidden");
  overlay.classList.remove("hidden");
  searchInput.focus();
}
/**
 * Closw Search Model and Overlay
 */
function closeSearchModel() {
  searchSection.classList.add("hidden");
  overlay.classList.add("hidden");
  searchInput.value = "";
}

/**
 * Cart Functionality part
 */
cartButton.addEventListener("click", openCartModel);
cartClose.addEventListener("click", closeCartModel);
overlay.addEventListener("click", closeCartModel);
// Open Model when User click ctrl + K
let keysClicked = {};
document.addEventListener("keydown", (e) => {
  keysClicked[e.key] = true;
  if (keysClicked["Control"] && keysClicked["o"]) {
    e.preventDefault();
    openCartModel();
  }
});
document.addEventListener("keyup", function (e) {
  delete keysClicked[e.key];
});
/**
 * Open Search Model and Overlay
 */
function openCartModel() {
  cartSection.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
/**
 * Closw Search Model and Overlay
 */
function closeCartModel() {
  cartSection.classList.add("hidden");
  overlay.classList.add("hidden");
}

/**
 * Dark Mode Functionality
 */
/**
 * Icon Toggling
 */
const iconToggle = () => {
  moonButton.classList.toggle("hidden");
  sunButton.classList.toggle("hidden");
};
/**
 * Inital Theme Check When the window Loads
 */
const themCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    moonButton.classList.add("hidden");
    return;
  }
  sunButton.classList.add("hidden");
};
/**
 * invoke The ThemeCheck On Initial load
 */
themCheck();

/**
 * Manual Theme Switch
 */
const themeSwitch = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    iconToggle();
    return;
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    iconToggle();
  }
};
/**
 * Listen to clicks On the Buttons
 */
sunButton.addEventListener("click", () => {
  themeSwitch();
});
moonButton.addEventListener("click", () => {
  themeSwitch();
});

// Loading Categories for Side Menu
const menuSideData = async function () {
  const res = await fetch("https://dummyjson.com/products/categories");
  const items = await res.json();
  sideMenuContainer.innerHTML = ""
  items.forEach((data) => {
    const html = `
    <a class="side-nav-link" href="store.html">${data.at(0).toUpperCase()}${data.slice(1)}</a>
    `;
    sideMenuContainer.insertAdjacentHTML("beforeend", html)
  });
};
menuSideData();
// Customer Bought Functionalities
