import { get } from "../api.js";
import { ApiUrl } from "../constants/ApiUrl.js";

const $ = (selector) => document.querySelector(selector);
const params = new URLSearchParams(window.location.search);
const keyword = params.get("keyword");
const currentPage = params.get("page");

async function fetchProducts(index) {
  const data = await get(
    `${ApiUrl.PRODUCTS_SEARCH}${keyword}&sortKey=sales&sort=1&page=${index}&perpage=12`
  );
  return data;
}

async function refineData() {
  const { products, totalPage } = await fetchProducts(1);
  let productsTotalData = products;

  for (let i = 2; i <= totalPage; i++) {
    (await fetchProducts(i))["products"].forEach((product) => {
      productsTotalData.push(product);
    });
  }

  (function generatePagenationButton() {
    const paginationHtml = `<nav class="pagination-container" role="navigation" aria-label="pagination">
  <ul class="pagination-list"></ul>
  </nav>`;
  
    $(".footer-container").insertAdjacentHTML("beforebegin", paginationHtml);
  
    for (let i = 1; i <= totalPage; i++) {
      const pageButton = document.createElement("li");
      pageButton.innerHTML = `<a class="pagination-link button-35-white" aria-label="${i}" aria-current="page">${i}</a>`;
      $(".pagination-list").append(pageButton);
    }
  
    const paginationButton = document.querySelectorAll(".pagination-link");
  
    paginationButton.forEach((button) => {
      const currentButton = button.getAttribute("aria-label");
  
      if (currentButton === currentPage) {
        button.classList.add("button-35-brown");
      }
    });
  })();

  let productsArr = [];

  for (let i = 0; i < productsTotalData.length; i += 12) {
    productsArr.push(productsTotalData.slice(i, i + 12));
  }

  return productsArr;
}

async function showProducts() {
  const productsArr = await refineData();

  let currentPageData = productsArr[0];
  if (!currentPageData) {
    $(".search-result-messege").innerText = `검색 결과가 존재하지 않습니다.`;
  }
  (function showProductsInPage() {
    currentPageData = productsArr[currentPage - 1];
    currentPageData.forEach((product) => {
      renderData(product);
    });
  })();

  (function handlePaginationButton() {
    const paginationButton = document.querySelectorAll(".pagination-link");

    paginationButton.forEach((button, i) => {
      button.addEventListener("click", () => {
        window.location.assign(`/search?keyword=${keyword}&page=${i + 1}`);
      });
    });
  })();
}

await showProducts();

async function renderData(product) {
  const { _id, name, brand, price, volume, alcoholDegree, image } = product;
  const imageUrl = "../" + decodeURIComponent(image).split("views")[1];

  let productSection = document.createElement("section");

  productSection.setAttribute("class", "product-container-wrapper");
  productSection.innerHTML = `<div class="product-container" id=${_id}>
  <div class="product-div-container">
    <div class="product-image-wrapper">
      <img src="${imageUrl}" alt="이런! 상품 이미지가 없네요." />
    </div>
    <div class="product-content-container">
      <div class="content-title-wrapper">
        <p class="content-name">${name}</p>
      </div>
      <div class="content-container">
        <p class="content-price">${Number(price).toLocaleString("ko-KR")}원</p>
        <p class="content-brand">${brand}</p>
        <p class="content-alcoholDegree">${alcoholDegree}도</p>
        <p class="content-volume">${volume}ml</p>
      </div>
    </div>
  </div>
</div>`;

  const bodyContainer = document.querySelector(".body-container");
  bodyContainer.append(productSection);
  goToDetailPage();
}

function goToDetailPage() {
  const productContainer = document.querySelectorAll(".product-container");
  productContainer.forEach((container) => {
    container.addEventListener("click", (e) => {
      const productId = e.currentTarget.getAttribute("id");
      window.location.href = `/product-detail?id=${productId}`;
    });
  });
}
