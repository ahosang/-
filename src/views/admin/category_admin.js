import { get, post, patch, delete as del } from '../api.js';
import { getCookieValue } from '../utils/cookie.js'
import removeContainer from './remove_container.js';

const $ = (selector) => document.querySelector(selector);

function initFunc() {
  $('.category-menu').addEventListener('click', () => {
    removeContainer();
    openCategoryMenu();
  });
}

async function openCategoryMenu() {
  const categoriesData = await get('/api/category');
  $('.category-menu').classList.add('isClicked');

  const productContainerHTML = `<section class="categories-container">
  <button class="button add-button">추가</button>
  <button class="button close-button">닫기</button>
<div class="columns title-container">
  <div class="column is-2 row-name">카테고리명</div>
  <div class="column is-2 row-products">항목</div>
</div>
</section>`;

  await $('.admin-menu').insertAdjacentHTML('afterend', productContainerHTML);
  categoriesData.forEach(async (category, index) => {
    await renderCategory(category);
    if (index == categoriesData.length - 1) {
      modifyCategory();
      deleteCategory();
    }
  });

  $('.close-button').addEventListener('click', closeSection);
  $('.add-button').addEventListener('click', addCategory);
}

function closeSection() {
  $('.category-menu').classList.remove('isClicked');
  $('.categories-container').remove();
}

function addCategory() {
  $('.add-button').classList.add('none');
  $('.close-button').classList.add('none');

  const categoryModalHtml = `<label class="add-category-modal">
  <input class="input is-rounded category-input" type="text" name="name" placeholder="추가 할 카테고리 이름을 입력하세용" />
  <button class="button add-category-button">추가</button>
  <button class="button close-modal-button">닫기</button>
</label>`;
  $('.admin-menu').insertAdjacentHTML('afterend', categoryModalHtml);

  $('.add-category-button').addEventListener('click', async () => {
    const inputValue = $('.category-input').value;

    await postCategory(inputValue);

    $('.add-category-modal').remove();
    refreshData();
  });

  $('.close-modal-button').addEventListener('click', () => {
    $('.add-category-modal').remove();
    refreshData();
  });
}

async function postCategory(inputValue) {
  const inputValueObject = {
    name: inputValue,
  };

  await post('/api/admin/category', inputValueObject);
}

async function fetchProducts(index) {
  const TOKEN = 'token';
  const res = await fetch(`/api/products?page=${index}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookieValue(TOKEN)}`,
    },
  });
  const data = await res.json();

  return data;
}

async function renderCategory(category) {
  const { _id, name } = await category;
  const fetchProductsData = await get('/api/products');
  const pageOneProducts = fetchProductsData['products'];
  let { products } = await category;
  let productsTotalData = pageOneProducts;


  let totalPage = fetchProductsData['totalPage'];

  for (let i = 2; i <= totalPage; i++) {
    (await fetchProducts(i))['products'].forEach((product) => {
      productsTotalData.push(product);
    });
  }


  const productsArr = products.reduce((arr, productId) => {
    const currentProductIndex = productsTotalData.findIndex(
      (product) => product._id === productId
    );

    if (currentProductIndex !== -1) {
      arr.push(productsTotalData[currentProductIndex]['name']);
    }

    return arr;
  }, []);

  let categorySection = document.createElement('div');

  categorySection.setAttribute('class', 'columns items-container');
  categorySection.setAttribute('id', _id);
  categorySection.innerHTML = `<div class="column is-2 row-name">${name}</div>
<div class="column is-8 row-products">${[...productsArr]}</div>
<div class="column is-1"><button id="${_id}" class="button column modify-button">수정</button></div>
<div class="column is-1"><button id="${_id}" class="button column delete-button">삭제</button></div>
`;

  $('.categories-container').append(categorySection);
}

function deleteCategory() {
  const deleteBtn = document.querySelectorAll('.delete-button');
  deleteBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
      const currentId = e.target.getAttribute('id');

      if (!$('.is-danger')) { alert('삭제 하려면 다시 한 번 눌러주세요!'); }

      e.target.setAttribute(
        'class',
        'button column is-danger delete-button-confirm'
      );


      $('.delete-button-confirm').addEventListener('click', async () => {
        await del('/api/admin/category', currentId);
        refreshData();
      });
    });
  });
}

function modifyCategory() {
  const modifyBtn = document.querySelectorAll('.modify-button');
  modifyBtn.forEach((button) => {
    button.addEventListener('click', async (e) => {
      if ($('.modify-category-modal')) { $('.modify-category-modal').remove(); }

      const currentId = e.target.getAttribute('id');

      const categoryModifyModalHtml = `<label class="modify-category-modal">
  <input class="input is-rounded modify-category-input" type="text" name="name" placeholder="카테고리 이름을 입력하세요." />
  <button class="button modify-category-button">수정</button>
  <button class="button close-modify-button">닫기</button>  
</label>`;
      await e.currentTarget.parentNode.parentNode.insertAdjacentHTML(
        'beforebegin',
        categoryModifyModalHtml
      );

      $('.close-modify-button').addEventListener('click', () => {
        $('.modify-category-modal').remove();
      });

      $('.modify-category-button').addEventListener('click', async () => {
        const modifyValue = { name: $('.modify-category-input').value };
        await patch('/api/admin/category', currentId, modifyValue);
        $('.categories-container').remove();
      });
    });
  });
}

function refreshData() {
  $('.categories-container').remove();
  openCategoryMenu();
}

export { initFunc as showCategories };
