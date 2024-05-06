import {render} from "./counter.js";
render()

const filterButton = document.querySelector("#filter-container")
const filtercontainer = document.querySelector("#filter-show")
filterButton.addEventListener("click", (e)=> {
  e.preventDefault()
  filtercontainer.classList.toggle("hidden")
})
