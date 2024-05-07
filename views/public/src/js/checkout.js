import { customerLoadData } from "./counter.js";

customerLoadData();
const deliveryContainer = document.querySelector("#delivery-container");
const deliveryCards = document.querySelectorAll("#delivery-card");
const paymentContainer = document.querySelector("#payment-container")
const paymentTabs = document.querySelectorAll("#payment-tab")
const paymentContents = document.querySelectorAll("#payment-content")
deliveryContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest("#delivery-card");
  console.log(clicked);
  // Method 1
  // if (clicked.classList.contains("card--active-check")) {
  //   clicked.classList.add("card-original");
  //   clicked.classList.remove("card--active-check ");
  // } else {
  //   clicked.classList.remove("card-original");
  //   clicked.classList.add("card--active-check");
  // }
  // Method 2 Has Highr performance
  deliveryCards.forEach(el => {
    el.classList.remove("card--active-check")
  })
  deliveryCards.forEach(el => {
    el.classList.add("card-original")
  })
  clicked.classList.add("card--active-check")
  clicked.classList.remove("card-original")

});
// deliveryContainer.classList.contains;
paymentContainer.addEventListener("click", (e)=> {
  const target = e.target.closest("#payment-tab")
  if(!target) return
  // paymentTabs.forEach(tab => {
  //   tab.classList.add("hidden")
  // })
  paymentContents.forEach(cont => {
    cont.classList.add("hidden")
  })
  document.querySelector(`.payment-${target.dataset.mode}`).classList.remove("hidden")
})