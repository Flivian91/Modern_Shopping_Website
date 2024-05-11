import { customerLoadData } from "./counter.js";
customerLoadData();
// dashboard section
const dashboardContainer = document.querySelector("#dashboard-links");
const dashboardContent = document.querySelectorAll("#dash-content");
const dashboardTab = document.querySelectorAll("#dash");
// Menu
const dashMenuSection = document.querySelector("#dash-phone-section");
const dashMenuButton = document.querySelector("#dash-menu-button");
const dashMenuClose = document.querySelector("#dash-menu-close");
const dashOverlay = document.querySelector("#overlay");
const dashMenuContainer = document.querySelector("#dash-menu-container");
const dashMenuTab = document.querySelectorAll("#dash-menu");
//to load curretn user's name
const currentUser = document.getElementById("currentUser");
const userEmail = document.getElementById("userEmail");

let firstName,email

/**
 * DashBoard Functionalities
 */
dashboardContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest("#dash");
  // Gaurd Class
  if (!clicked) return;
  console.log(clicked.dataset.dash);
  // clear all the active dashboard link
  dashboardTab.forEach((el) => {
    el.classList.remove("active-dash");
  });
  // Clear All the active Dashboard Content area
  // Enable active Dask Tab
  clicked.classList.add("active-dash");
  // Display Content based on clicked link
  document.querySelector("#progress-bar").classList.remove("hidden");
  setTimeout(() => {
    dashboardContent.forEach((cont) => {
      cont.classList.add("hidden");
    });
    document
      .querySelector(`.dash-${clicked.dataset.dash}`)
      .classList.remove("hidden");
    document.querySelector("#progress-bar").classList.add("hidden");
  }, 2000);
});
/**
 * Dashboard Menu trasition
 */
dashMenuContainer.addEventListener("click", (e) => {
  const target = e.target.closest("#dash-menu");
  if (!target) return;

  // clear all the active dashboard Menu link
  dashMenuTab.forEach((el) => {
    el.classList.remove("active-dash");
  });

  // Clear All the active Dashboard Content area
  dashboardContent.forEach((cont) => {
    cont.classList.add("hidden");
  });
  // Enable active Dask Tab
  target.classList.add("active-dash");
  closeDashMenu();
  document
    .querySelector(`.dash-${target.dataset.dash}`)
    .classList.remove("hidden");
});
/**
 * Dashboard Menu Functionalities
 */
// Handlers
dashMenuClose.addEventListener("click", closeDashMenu);
dashOverlay.addEventListener("click", closeDashMenu);
dashMenuButton.addEventListener("click", openDashMenu);

// Open Dash Menu functionalities
function openDashMenu() {
  dashMenuSection.classList.remove("hidden");
  dashOverlay.classList.remove("hidden");
}
function closeDashMenu() {
  dashMenuSection.classList.add("hidden");
  dashOverlay.classList.add("hidden");
}

//fetch for the current user
async function getUser(){
  firstName = localStorage.getItem('user-name');
  if(user==null){
    try{
      const res = await fetch('/users/current');
      firstName = await res.json().firstName;
      email = await res.json().email;
    }
    catch(error){
      console.log("Error fetching for name: "+ error);
    }
  
    localStorage.setItem('user-name', firstName);
    firstName = localStorage.getItem('user-name') 
    localStorage.setItem('user-email', email);
    email = localStorage.getItem('user-email');
  }

  else{
    currentUser.innerText = firstName;
    userEmail.innerText = email;
  }
}