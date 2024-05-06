import { customerLoadData } from "./counter.js";
const productReview = document.querySelector("#product-review");

customerLoadData()
async function renderProductReview() {
  const res = await fetch("Business Logics/review.json");
  const items = await res.json();
  // productReview.innerHTML =""
  items.reviews.forEach((data) => {
    const html = `
    <div class="flex gap-2 border-b-2 py-5">
      <div class="flex flex-col gap-3">
        <div class="flex gap-3 items-center">
          <div class="flex-none overflow-hidden rounded-full">
            <img
              class="object-cover w-16 h-16"
              src="${data.image}"
              alt="Product"
            />
          </div>
          <div class="flex flex-col gap-1">
            <h1 class="text-lg font-mono font-medium dark:text-gray-200">${data.name}</h1>
            <date class="text-base font-medium text-gray-600"
              >${data.date}</date
            >
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
          </div>
        </div>
        <div>
          <p class="tracking-normal my-1 text-lg text-gray-600 dark:text-gray-400">
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