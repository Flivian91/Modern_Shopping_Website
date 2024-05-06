const collectionContainer = document.querySelector("#collection-container");
const quickViewSection = document.querySelector("#quickview-section");
const overlayModel = document.querySelector("#overlay");
const quickViewContainer = document.querySelector("#quickview-container");
const categoryContainer = document.querySelector("#cartegory-sweep");
const menContainer = document.querySelector("#men-container");
const womenContainer = document.querySelector("#women-container");
const customerContainer = document.querySelector("#customer-container");
const releasecontainer = document.querySelector("#release-container");
const dealscontainer = document.querySelector("#deals-container");
const topSellingcontainer = document.querySelector("#top-selling-container");
const recomendedcontainer = document.querySelector("#recomended-container");
const testimonialContainer = document.querySelector("#testimonial-container");
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
          "lg:border-none",
          "dark:border-b-slate-100/30"
        );

        const span = document.createElement("span");
        span.classList.add(
          "block",
          "font-medium",
          "text-center",
          "text-base",
          "sm:text-lg",
          "text-gray-500",
          "dark:text-gray-100"
        );
        span.innerText = item.title;

        const h1 = document.createElement("h1");
        h1.classList.add(
          "font-semibold",
          "text-center",
          "text-lg",
          "sm:text-xl",
          "text-gray-900",
          "dark:text-gray-300"
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
  // render(data.products);
  // renderCategories(data.products);
}
function renderCollection(data) {
  collectionContainer.innerHTML = "";
  const items = data.filter((item) => item.id > 27);
  items.forEach((data) => {
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
                >${data.price}.00</del
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
                    ).toFixed(2)
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
export async function render() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  collectionContainer.innerHTML = "";
  data.products.forEach((data) => {
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
                >${data.price}.00</del
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
                    ).toFixed(2)
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
  quickViewFun(data.products);
}

function quickViewFun(data) {
  // const quickViewButton = document.querySelector("#quickview-button");
  collectionContainer.addEventListener("click", (e) => {
    e.preventDefault();
    const clicked = e.target.closest("#quickview-button");
    if (!clicked) return;
    const parent = clicked.parentElement.id;
    const quickItem = data.find((d) => d.id === Number(parent));
    state.quickView = quickItem;
    openQuickModel();
    renderSpinner();
    renderQuickView(quickItem);
  });
}
// Open Quick View Model
function openQuickModel() {
  quickViewSection.classList.remove("hidden");
  overlayModel.classList.remove("hidden");
}
function closeWQuickModel() {
  quickViewSection.classList.add("hidden");
  overlayModel.classList.add("hidden");
}
// Event Handlers

overlayModel.addEventListener("click", closeWQuickModel);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeWQuickModel();
  } else return;
});
// Load Spinner
const renderSpinner = () => {
  // quickViewContainer.innerHTML =""
  const html = `
  <div
    class="absolute w-full h-full z-10 right-0 top-0 bg-neutral dark:bg-slate-800 flex items-center justify-center"
  >
    <div class="animate-spin">
      <svg>
        <use
          class="fill-indigo-600"
          href="./public/icons.svg#icon-loader"
        ></use>
      </svg>
    </div>
  </div>
  `;
  quickViewContainer.insertAdjacentHTML("afterbegin", html);
};

/**
 * Display The Quick View Data
 */
function renderQuickView(data) {
  setTimeout(() => {
    quickViewContainer.innerHTML = "";
    const markUp = `
  <div id="${data.id}"
    class="py-4 px-1 relative container mx-auto sm:grid sm:grid-cols-2 sm:gap-4"
  >
    <div class="flex flex-col gap-2">
      <div
        class="flex items-center justify-between px-2 sm:justify-end"
      >
        <a
          href="#"
          class="text-indigo-600 text-lg font-bold sm:hidden hover:text-indigo-500 active:text-indigo-700"
          >View full details</a
        >
        <ion-icon id="quickview-close"
          name="close-outline"
          class="svgs text-indigo-600 cursor-pointer sm:absolute sm:top-4 sm:right-1"
        ></ion-icon>
      </div>
      <div class="p-1">
        <img
          class="rounded-lg"
          src="${data.images[0]}"
          alt="${data.description}"
        />
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <h1 class="text-xl font-bold text-gray-800 dark:text-gray-200 ">
        ${data.title}
        </h1>
        <span class="text-lg text-gray-600 font-medium dark:text-gray-300 ">$${data.price}.00</span>
      </div>
      <div class="flex gap-2">
        <span class="text-lg text-gray-600 font-medium dark:text-gray-300 ">${data.rating}</span>
        <div class="flex gap-1 items-center">
          <ion-icon
            name="star"
            class="svgs text-yellow-500 w-6 h-6"
          ></ion-icon>
          <ion-icon
            name="star"
            class="svgs text-yellow-500 w-6 h-6"
          ></ion-icon>
          <ion-icon
            name="star"
            class="svgs text-yellow-500 w-6 h-6"
          ></ion-icon>
          <ion-icon
            name="star"
            class="svgs text-yellow-500 w-6 h-6"
          ></ion-icon>
          <ion-icon
            name="star-outline"
            class="svgs text-yellow-500 w-6 h-6"
          ></ion-icon>
        </div>
        <div class="hidden sm:block sm:ml-5">
          <a
            href="#"
            class="text-indigo-600 text-lg font-bold hover:text-indigo-500 active:text-indigo-700"
            >See all reviews</a
          >
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h1 class="text-lg text-gray-600 font-medium dark:text-gray-200 ">Color</h1>
        <div class="flex gap-3 items-center">
          <input
            class="w-8 h-8 checked:caret-indigo-700"
            type="radio"
            name="main-color"
            id="main-color"
            checked
          />
          <input
            class="w-8 h-8 checked:caret-indigo-700"
            type="radio"
            name="main-color"
            id="main-color"
          />
        </div>
      </div>
      <div>
        <div class="flex flex-col gap-2">
          <div class="flex justify-between px-2">
            <span class="text-lg text-gray-600 font-medium dark:text-gray-200 ">Size</span>
            <a
              href="#"
              class="text-indigo-600 text-lg font-bold hover:text-indigo-500 active:text-indigo-700"
              >Size guide</a
            >
          </div>
          <div class="flex gap-4 px-2 justify-between sm:justify-start">
            <div class="overview-size">
              <span class="text-white text-xl font-mono font-bold"
                >XXl</span
              >
            </div>
            <div class="overview-size">
              <span class="text-white text-xl font-mono font-bold"
                >XS</span
              >
            </div>
            <div class="overview-size">
              <span class="text-white text-xl font-mono font-bold"
                >S</span
              >
            </div>
            <div class="overview-size">
              <span class="text-white text-xl font-mono font-bold"
                >M</span
              >
            </div>
            <div class="overview-size">
              <span class="text-white text-xl font-mono font-bold"
                >XL</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="flex px-1 py-4 gap-3 flex-col items-center">
        <a
          class="bg-indigo-600 py-2 w-full rounded-lg text-center text-xl text-white hover:bg-indigo-500 active:bg-indigo-700 transition-all duration-300"
          href="#"
          >Add to bag</a
        >
        <a
          href="#"
          class="text-indigo-600 hidden sm:block text-lg font-bold hover:text-indigo-500 active:text-indigo-700"
          >View full details</a
        >
      </div>
    </div>
  </div>
  `;
    quickViewContainer.insertAdjacentHTML("afterbegin", markUp);
    const quickViewClose = document.querySelector("#quickview-close");
    quickViewClose.addEventListener("click", closeWQuickModel);
  }, 2000);
}

/**
 * Display Catetegories
 */
export async function renderCategories() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  categoryContainer.innerHTML = "";
  data.products.forEach((data) => {
    const markUp = `
  <div id='${data.id}' class="swiper-slide">
    <div
      class="flex group flex-col items-center shadow-xl mx-10 relative overflow-hidden rounded-lg bg-white dark:bg-slate-800 pb-4"
    >
    <div class="relative">
      <img
        class="mb-3"
        src="${data.images[0]}"
        alt="Gepa"
      />
      <a href="store.html"
        class="absolute bottom-3 right-0 py-2 px-5 rounded-tl-lg text-white z-10 text-xl font-medium hover:bg-indigo-500 active:bg-indigo-700 focus:ring-1 focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all duration-300 bg-indigo-600 transform translate-x-40 group-hover:translate-x-0"
      >
        Checkout
      </a>
    </div>
      
      <span class="text-xl font-mono font-semibold text-indigo-600 dark:text-gray-200"
        >${data.brand}</span
      >
    </div>
  </div>
  `;
    categoryContainer.insertAdjacentHTML("afterbegin", markUp);
  });
}

/**
 * Men`s Display
 */
export const renderMenCategory = async function () {
  const res = await fetch(
    "https://dummyjson.com/products/category/mens-shirts"
  );
  const items = await res.json();

  // Render HTML
  // menContainer.innerHTML = ""
  items.products.forEach((data) => {
    const html = `
    <a id='${data.id}'
      class="inline-block pb-3 space-x-1 group overflow-hidden shadow-lg bg-white rounded-md dark:bg-slate-800"
      href="store.html"
    >
      <span class="inline-block relative w-full">
        <img
          class="group-hover:opacity-80 object-cover w-full"
          src="${data.images[0]}"
          alt="Image 2"
        />
        <button
          class="absolute bottom-0 right-0 py-2 px-5 rounded-tl-lg text-white z-10 text-xl font-medium hover:bg-indigo-500 active:bg-indigo-700 focus:ring-1 focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all duration-300 bg-indigo-600 transform translate-x-40 group-hover:translate-x-0"
        >
          Add to bag
        </button>
      </span>
      <span
        class="block md:text-center font-medium mt-10 text-xl truncate text-gray-600 dark:text-gray-200"
        >${data.title.at(0).toUpperCase()}${data.title.slice(1)}</span
      >
      <h1
        class="text-lg mt-2 md:text-center text-gray-900 font-medium dark:text-gray-400"
      >
        ${data.description.at(0).toUpperCase()}${data.description.slice(1)}
      </h1>
    </a>
  `;
    menContainer.insertAdjacentHTML("afterbegin", html);
  });
};

/**
 * Women`s Display
 */
export const renderWomenCategory = async function () {
  const res = await fetch(
    "https://dummyjson.com/products/category/womens-shoes"
  );
  const items = await res.json();

  // Render HTML
  // womenContainer.innerHTML = ""
  items.products.forEach((data) => {
    const html = `
    <a id='${data.id}'
      class="inline-block pb-3 space-x-1 group overflow-hidden shadow-lg bg-white rounded-md dark:bg-slate-800"
      href="store.html"
    >
      <span class="inline-block relative w-full">
        <img
          class="group-hover:opacity-80 object-cover w-full"
          src="${data.images[0]}"
          alt="Image 2"
        />
        <button
          class="absolute bottom-0 right-0 py-2 px-5 rounded-tl-lg text-white z-10 text-xl font-medium hover:bg-indigo-500 active:bg-indigo-700 focus:ring-1 focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all duration-300 bg-indigo-600 transform translate-x-40 group-hover:translate-x-0"
        >
          Add to bag
        </button>
      </span>
      <span
        class="block md:text-center font-medium mt-10 text-xl truncate text-gray-600 dark:text-gray-200"
        >${data.title.at(0).toUpperCase()}${data.title.slice(1)}</span
      >
      <h1
        class="text-lg mt-2 md:text-center text-gray-900 font-medium dark:text-gray-400"
      >
      ${data.description.at(0).toUpperCase()}${data.description.slice(1)}
      </h1>
    </a>
  `;
    womenContainer.insertAdjacentHTML("afterbegin", html);
  });
};

// Customer Also Bought Functionalities
export const customerLoadData = async function () {
  const res = await fetch("https://dummyjson.com/products/category/motorcycle");
  const items = await res.json();
  // console.log(items);
  items.products.forEach((data) => {
    const markUp = `
    <div  class="flex flex-col gap-4 mx-2 ">
      <div class="shadow-lg relative pb-10 rounded-lg">
        <img src="${data.images[0]}" alt="Shoe Image" />
        <div
          class="absolute bottom-0 flex items-end justify-end right-0 rounded-lg w-full bg-gradient-to-b from-transparent to-black/80 h-40"
        >
          <span
            class="inline-block mr-5 mb-5 text-white text-xl font-bold"
            >$${data.price}</span
          >
        </div>
      </div>
      <div class="flex flex-col ">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
        ${data.title}
        </h2>
        <p class="text-lg font-medium text-gray-600 dark:text-gray-400">${data.category}</p>
      </div>
      <a
        class="bg-indigo-600 py-2 w-full rounded-lg text-center text-xl text-white hover:bg-indigo-500 active:bg-indigo-700 transition-all duration-300"
        href="#"
        >Add to bag</a
      >
    </div>
    `;
    customerContainer.insertAdjacentHTML("afterbegin", markUp);
  });
};
// Hot deals Data
export const hotDealsData = async function () {
  const res = await fetch(
    "https://dummyjson.com/products/category/mens-watches"
  );
  const items = await res.json();
  console.log();
  renderDiscover(items.products, releasecontainer);
};
// deals Data
export const dealsData = async function () {
  const res = await fetch(
    "https://dummyjson.com/products/category/mens-shirts"
  );
  const items = await res.json();
  renderDiscover(items.products, dealscontainer);
};
// Top Selling
export const topSellingData = async function () {
  const res = await fetch("https://dummyjson.com/products/category/motorcycle");
  const items = await res.json();
  renderDiscover(items.products, topSellingcontainer);
};
// Recommended
export const recommendedData = async function () {
  const res = await fetch("https://dummyjson.com/products/category/skincare");
  const items = await res.json();
  renderDiscover(items.products, recomendedcontainer);
};
function renderDiscover(items, parentEl) {
  parentEl.innerHTML = "";
  items.forEach((data) => {
    const html = `
  <a href="store.html" class="group overflow-hidden flex items-center shadow-md gap-2 px-2 dark:bg-slate-800 rounded-md  hover:dark:bg-slate-800/80">
    <img
      src="${data.images[0]}"
      class="w-24 h-24 shadow-lg rounded  transform group-hover:scale-105 transition-transform duration-300"
      alt="Image"
      hieght="105px"
      width="105px"
    />
    <div class="flex flex-col gap-2">
      <h1 class="dark:text-gray-200">${data.title
        .at(0)
        .toUpperCase()}${data.title.slice(1)}</h1>
      <div class="flex gap-5 items-center">
        <del class="text-lg text-gray-500 mt-1 font-medium dark:text-gray-400"
          >${data.price}.00</del
        >
        <p
          class="text-xl transform scale-110 font-medium text-indigo-600 dark:text-gray-200"
        >
        ${
          data.discountPercentage === 0
            ? data.price - 1
            : (
                data.price -
                (data.price * data.discountPercentage) / 100
              ).toFixed(2)
        }
        </p>
      </div>
    </div>
  </a>
  `;
    parentEl.insertAdjacentHTML("afterbegin", html);
  });
}

export async function testimonialData() {
  const res = await fetch("Business Logics/testimonial.json");
  const items = await res.json();
  testimonialContainer.innerHTML = "";
  items.testimonials.forEach((data) => {
    const html = `
    <div
      class="flex flex-col gap-3 mx-4 md:py-10 md:px-2 md:bg-white dark:bg-slate-800 items-center md:shadow-md md:rounded-md"
    >
      <img src="./public/quotation-right-mark-svgrepo-com.svg" alt="" class="w-16 h-16 fill-indigo-600">
      <p
        class="mt-5 text-xl text-center text-gray-600 md:text-center dark:text-gray-200 md:text-xl"
      >
        ${data.quote}
      </p>
      <h1
        class="font-semibold uppercase text-center text-gray-800 dark:text-gray-400 text-xl md:text-center md:text-2xl md:text-gray-700"
      >
      ${data.name}
      </h1>
      <span
        class="md:text-center text-center font-bold text-indigo-500 uppercase text-xl"
      >
      ${data.title}
      </span>
    </div>
      
  `;
    testimonialContainer.insertAdjacentHTML("afterbegin", html);
  });
}
