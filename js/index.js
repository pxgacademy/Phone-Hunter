// "use strict";

const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const response = await fetch(url);
  const data = await response.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (items, dataLimit) => {
  const showAll = document.getElementById("showAll");

  if (dataLimit && items.length >= 10) {
    items = items.slice(0, 10);
    showAll.classList.remove("hidden");
  } else showAll.classList.add("hidden");

  const allItems = document.getElementById("allItems");
  items.forEach((item) => {
    const { brand, phone_name, slug, image } = item;
    const div = document.createElement("div");
    div.classList = `border-2 p-5 rounded-lg shadow-lg`;
    div.innerHTML = `<div
        class="flex items-center justify-center p-5 bg-sky-100 rounded-md"
        >
            <img class="" src=${image} alt="" />
        </div>
        <div class="mt-5 space-y-3 text-center">
            <h4 class="text-2xl font-bold">${phone_name}</h4>
            <p>
            ${slug}
            </p>
            <p class="text-xl font-bold">$999</p>
            <button
            class="btn border-none hover:border-none px-10 bg-blue-500 text-white hover:bg-blue-600"
            >
            Show Details
            </button>
        </div>`;

    allItems.appendChild(div);
  });
};

document.getElementById("showAll").addEventListener("click", () => {
  loadPhones("apple");
});

loadPhones("apple", 10);
