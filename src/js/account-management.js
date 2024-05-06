const updateTabs = document.querySelectorAll("#update")
const updateContainer = document.querySelector("#update-container")
const updateContent = document.querySelectorAll('#update-content')

updateContainer.addEventListener("click", (e)=> {
  const clicked = e.target.closest("#update")
  if(!clicked) return
  updateTabs.forEach(el => {
    el.classList.remove("active-dash")
  })
  updateContent.forEach(cont => {
    cont.classList.add("hidden")
  })
  clicked.classList.add("active-dash")
  console.log(clicked.dataset.update);
  document.querySelector(`.update-${clicked.dataset.update}`).classList.remove("hidden")
})