import { customerLoadData } from "./counter.js";
customerLoadData();
const productContainer = document.querySelector("#product-container");
const productTabContainer = document.querySelector("#product-tab-container");
const productTabs = document.querySelectorAll("#product-tab");
const productContents = document.querySelectorAll("#product-content");
const productReview = document.querySelector("#product-review");

const productViewData = async function () {
  // Default 36
  const random = Math.floor(1 + Math.random() * 100);
  const res = await fetch(`https://dummyjson.com/products/${random}`);
  const data = await res.json();
  productContainer.innerHTML = "";
  const html = `
  <div class="flex flex-col gap-2">
    <div class="flex-col gap-2 flex sm:hidden">
      <div class="flex justify-between gap-1 px-1">
        <h1 class="text-xl font-bold text-gray-800 dark:text-gray-200">
          ${data.title}
        </h1>
        <span class="text-xl text-gray-700 font-bold dark:text-white">${data.price}00</span>
      </div>
      <div class="flex gap-2">
        <span class="text-lg text-gray-600 font-medium dark:text-gray-200">${data.rating}</span>
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
        <div class="block ml-3">
          <a
            href="#"
            class="text-indigo-600 text-lg font-bold hover:text-indigo-500 active:text-indigo-700"
            >See all reviews</a
          >
        </div>
      </div>
    </div>
      <div class="p-1 flex flex-col gap-2">
        <img id="display-image"
          class="rounded-lg"
          src="${data.images[0]}"
          alt="Product image"
        />
        <div id="images-container" class="grid grid-cols-3 gap-2">
          <img id="image"
            class="rounded-lg active-image"
            src="${data.images[0]}"
            alt="Product image"
          />
          <img id="image"
            class="rounded-lg"
            src="${data.images[1]}"
            alt="Product image"
          />
          <img id="image"
            class="rounded-lg"
            src="${data.images[2]}"
            alt="Product image"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-4">
    <div class="flex-col gap-2 hidden sm:flex">
      <div class="flex flex-col gap-1">
        <h1 class="text-xl font-bold text-gray-800 dark:text-gray-200">
        ${data.title}
        </h1>
        <span class="text-lg text-gray-600 font-medium dark:text-gray-200">${data.price}00</span>
      </div>
      <div class="flex gap-2">
        <span class="text-lg text-gray-600 font-medium dark:text-gray-400">${data.rating}</span>
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
    </div>
    <div class="flex flex-col gap-2">
      <h1 class="text-lg text-gray-600 font-medium dark:text-gray-200">Color</h1>
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
          <span class="text-lg text-gray-600 font-medium dark:text-gray-200">Size</span>
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
    <div class="flex px-1 py-4 gap-3">
      <a
        class="bg-indigo-600 py-2 w-full rounded-lg text-center text-xl text-white hover:bg-indigo-500 active:bg-indigo-700 transition-all duration-300"
        href="#"
        >Add to bag</a
      >
      <div
        class="group flex w-16 items-center cursor-pointer justify-center rounded-lg hover:bg-gray-200"
      >
        <ion-icon
          name="heart-outline"
          class="w-8 h-8 group-hover:text-pink-600"
        ></ion-icon>
      </div>
    </div>
    <!-- Description Section -->
    <div class="mt-2 px-2">
      <h1 class="text-xl font-bold text-gray-800 dark:text-gray-200">Description</h1>
      <p class="tracking-normal my-4 text-lg text-gray-600 dark:text-gray-400">
      ${data.description}
      </p>
    </div>
    <!-- Share Part -->
    <div class="flex flex-col gap-3 pb-10">
      <h1 class="text-xl font-bold text-gray-800 dark:text-gray-200">Share</h1>
      <div class="flex gap-2 items-center">
        <ion-icon
          name="logo-facebook"
          class="svgs text-indigo-600 cursor-pointer"
        ></ion-icon>
        <ion-icon
          name="logo-instagram"
          class="svgs text-indigo-600 cursor-pointer"
        ></ion-icon>
        <ion-icon
          name="logo-whatsapp"
          class="svgs text-indigo-600 cursor-pointer"
        ></ion-icon>
      </div>
    </div>
  </div>
  `;
  productContainer.insertAdjacentHTML("afterbegin", html);
  loadImages();
};
function loadImages() {
  const displayImage = document.querySelector("#display-image");
  const allImages = document.querySelectorAll("#image");
  const imagesContainer = document.querySelector("#images-container");
  imagesContainer.addEventListener("click", (e) => {
    const clicked = e.target.closest("#image");
    if (!clicked) return;
    const imagesrc = clicked.getAttribute("src");
    allImages.forEach((image) => {
      image.classList.remove("active-image");
    });
    clicked.classList.add("active-image");
    displayImage.setAttribute("src", imagesrc);
  });
}
document.addEventListener("DOMContentLoaded", productViewData);

/**
 * Product Tabs Reviews Functionalities
 */
productTabContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest("#product-tab");
  if (!clicked) return;
  productContents.forEach((cont) => {
    cont.classList.add("hidden");
  });
  productTabs.forEach((tab) => {
    tab.classList.remove("active-product-tab");
  });
  clicked.classList.add("active-product-tab");
  document
    .querySelector(`.product-cont-${clicked.dataset.tab}`)
    .classList.remove("hidden");
});

async function renderProductReview() {
  const res = await fetch("Business Logics/review.json");
  const items = await res.json();
  productReview.innerHTML =""
  items.reviews.forEach((data) => {
    const html = `
    <div class="flex gap-4 border-b-2 dark:border-gray-500">
      <div
        class="flex-none w-16 h-16 overflow-hidden rounded-full"
      >
        <img
          class="object-cover w-16 h-16"
          src="${data.image}"
          alt="Product"
        />
      </div>
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-1">
          <h1
            class="text-lg font-mono font-medium dark:text-gray-200"
          >
          ${data.name}
          </h1>
          <date
            class="text-base font-medium text-gray-600 dark:text-gray-400"
            >${data.date}</date
          >
        </div>
        <div class="flex">
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
        </div>
        <div>
          <p
            class="tracking-normal my-4 text-lg text-gray-600 dark:text-gray-400"
          >
          ${data.review}
          </p>
        </div>
      </div>
    </div>
    `;
    productReview.insertAdjacentHTML("afterbegin", html)
  });
}
renderProductReview()