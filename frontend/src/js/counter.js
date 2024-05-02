const collectionContainer = document.querySelector("#collection-container");
const quickViewSection = document.querySelector("#quickview-section");
const overlayModel = document.querySelector("#overlay");
const quickViewClose = document.querySelector("#quickview-close")
const quickViewContainer = document.querySelector("#quickview-container")
export const state = {
  quickView: {},
};
export const HeroSectionData = () => {
  fetch("Business Logics/hero-data.json")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("hero-title").innerText = data.hero.title;
      document.getElementById("hero-subtitle").innerText = data.hero.subtitle;
      document.getElementById("hero-button").innerText = data.hero.buttonText;
      document.getElementById("hero-button").href = data.hero.buttonLink;
      document.getElementById("hero-image").src = data.hero.imageSrc;
    });
};

export const AboutCompanyData = () => {
  // Determine the context (e.g., mobile or web)
  const context = "web";

  fetch("Business Logics/company-about-content.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("company-about-container");
      const content =
        context === "mobile"
          ? data.companyAbout.mobileApp
          : data.companyAbout.webApp;

      content.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add(
          "flex",
          "flex-col",
          "items-center",
          "py-5",
          "border-b-2",
          "border-b-slate-400/30",
          "lg:border-none"
        );

        const span = document.createElement("span");
        span.classList.add(
          "block",
          "font-medium",
          "text-center",
          "text-base",
          "sm:text-lg",
          "text-gray-500"
        );
        span.innerText = item.title;

        const h1 = document.createElement("h1");
        h1.classList.add(
          "font-semibold",
          "text-center",
          "text-lg",
          "sm:text-xl",
          "text-gray-900"
        );
        h1.innerText = item.subtitle;

        const a = document.createElement("a");
        a.href = item.link;
        a.appendChild(span);
        a.appendChild(h1);

        div.appendChild(a);
        container.appendChild(div);
      });
    });
};

/**
 * Update On the collection
 */
export async function loadCollection() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  renderCollection(data.products);
}
function renderCollection(data) {
  collectionContainer.innerHTML = "";
  const items = data.filter((item) => item.id > 27);
  items.forEach((data) => {
    console.log(data);
    const html = `
    <!-- Product 1 -->
    <div id="${data.id}"
      class="flex flex-col gap-2 bg-white dark:bg-slate-800  shadow-lg overflow-hidden rounded-lg"
    >
      <div class="group flex flex-col gap-1 overflow-hidden">
        <span
          class="block relative "
        >
        <span class="absolute -top-2 -left-2 w-16 h-16 flex items-center font-mono justify-center text-2xl z-20 text-white dark:text-greay-200 rounded-full bg-indigo-600">${Math.floor(
          data.discountPercentage
        )}%</span>
          <img
            class="block object-cover w-full  group-hover:opacity-80 transition-opacity duration-200 ease-in-out"
            src="${data.images[0]}"
            alt="Shoes Image"
            
          />
          <div
            class="absolute top-1/2 transform scale-0 group-hover:scale-100 transition-transform duration-300 -translate-y-1/2 left-1/2 -translate-x-1/2 mx-auto z-10"
          >
            <div id="${data.id}" class="flex gap-4 justify-between py-3 px-2">
              <a
                id='quickview-button'
                href="#"
                class="block relative svg-store after:-top-8 after:-left-3 after:content-['View']"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 svgs stroke-white hover:stroke-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="block svg-store after:content-['Like'] after:-top-5 after:left-14"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 svgs stroke-white hover:stroke-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="block svg-store after:content-['Cart'] after:-top-5 after:right-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 svgs stroke-white hover:stroke-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </span>
        <div class="flex flex-col px-1 dark:bg-slate-800">
          <span
            class="text-xl text-gray-500 font-medium dark:text-gray-200"
            >${data.title}</span
          >
          <p
            class="mt-3 truncate text-2xl text-gray-900 font-semibold dark:text-slate-200"
          >
          ${data.description}
          </p>
          <div class="flex gap-4 ">
            <h1 class="flex items-center mt-1 text-2xl text-gray-600 dark:text-gray-200 font-mono font-bold">${
              data.rating
            }</h1>
            <div class="flex items-center gap-1">
              <p class="text-3xl text-center text-yellow-500" >&#9733;</p>
              <p class="text-3xl text-center text-yellow-500" >&#9733;</p>
              <p class="text-3xl text-center text-yellow-500" >&#9733;</p>
              <p class="text-3xl text-center text-yellow-500" >&#9733;</p>
              <p class="text-3xl text-center">&#9733;</p>
            </div>
          </div>
          
          <div
            class="flex py-2 items-center justify-between mt-5 mb-5"
          >
            <div class="flex gap-5 items-center">
              <del class="text-lg text-gray-700 mt-2 font-medium dark:text-gray-300"
                >${data.price}</del
              >
              <p
                class="text-xl transform scale-150 font-medium text-indigo-600 dark:text-gray-50"
              >
              ${
                data.discountPercentage === 0
                  ? data.price - 1
                  : (
                      data.price -
                      (data.price * data.discountPercentage) / 100
                    ).toFixed(1)
              }
              </p>
            </div>
            <div>
              <button
                class="py-2 px-5 rounded-full text-white z-10 text-xl font-medium hover:bg-indigo-500 active:bg-indigo-700 focus:ring-1 focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all duration-300 bg-indigo-600 transform"
              >
                Add to bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    collectionContainer.insertAdjacentHTML("afterbegin", html);
  });
  quickViewFun(items);
}

function quickViewFun(data) {
  console.log(data);
  // const quickViewButton = document.querySelector("#quickview-button");
  collectionContainer.addEventListener("click", (e) => {
    e.preventDefault();
    const clicked = e.target.closest("#quickview-button");
    if (!clicked) return;
    const parent = clicked.parentElement.id;
    const quickItem = data.find((d) => d.id === Number(parent));
    state.quickView = quickItem;
    console.log(state);
    openQuickModel()
    
  });
}
// Open Quick View Model
function openQuickModel(){
  quickViewSection.classList.remove("hidden");
  overlayModel.classList.remove("hidden")
}
function closeWQuickModel(){
  quickViewSection.classList.add("hidden");
  overlayModel.classList.add("hidden")
}
// Event Handlers
quickViewClose.addEventListener("click", closeWQuickModel)
overlayModel.addEventListener('click', closeWQuickModel)
document.addEventListener("keydown", (e)=> {
  if(e.key === "Escape"){
    closeWQuickModel()
  }else return
})
// Load Spinner
const renderSpinner = () => {
  setTimeout(() => {
    quickViewContainer.innerHTML =""
    const html = `
  <div class="absolute w-full h-full z-10 right-0 top-0 bg-neutral flex items-center justify-center">
    <p class="animate-spin">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-24 h-24 svgs "
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    </p>
  </div>
  `;
  }, 2000);
  quickViewContainer.insertAdjacentHTML("afterbegin", html)
};
