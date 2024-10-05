// "use strict";

const searchInput = document.getElementById("searchInput");
document.getElementById("searchBtn").addEventListener("click", () => {
  loadPhones(searchInput.value);
});

const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const response = await fetch(url);
  const data = await response.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (items, dataLimit) => {
  const showAll = document.getElementById("showAll");

  if (dataLimit && items.length >= 9) {
    items = items.slice(0, 9);
    // showAll.classList.remove("hidden");
  } // else showAll.classList.add("hidden");

  const allItems = document.getElementById("allItems");
  allItems.innerHTML = "";
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
            onclick="productDetails('${slug}')"
            class="btn border-none hover:border-none px-10 bg-blue-500 text-white hover:bg-blue-600"
            >
            Show Details
            </button>
        </div>`;

    allItems.appendChild(div);
  });
};

let turn = true;
const showAll = document.getElementById("showAll");
showAll.addEventListener("click", () => {
  if (turn) {
    loadPhones("apple");
    showAll.innerText = "Show Less";
    turn = false;
  } else {
    loadPhones("apple", 10);
    showAll.innerText = "Show All";
    turn = true;
  }
});

// Show product details

const loadDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();

  makeDetails(data.data);
};

const makeDetails = (item) => {
  document.getElementById("modalImg").setAttribute("src", item.image);
  document.getElementById("modalTitle").innerText = item.name;
  document.getElementById("Storage").innerText = item.mainFeatures.storage;
  document.getElementById("Display").innerText = item.mainFeatures.displaySize;
  document.getElementById("Chipset").innerText = item.mainFeatures.chipSet;
  document.getElementById("Memory").innerText = item.mainFeatures.memory;
  document.getElementById("Slug").innerText = item.slug;
  document.getElementById("ReleaseDate").innerText = item.releaseDate;
  document.getElementById("Brand").innerText = item.brand;
  document.getElementById("GPS").innerText = item.others.GPS;

  my_modal_5.showModal();
};

const productDetails = (id) => {
  loadDetails(id);
};

loadPhones("apple", 10);
