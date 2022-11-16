import { get } from '../api.js';
import { changeToKoreanTime } from '../utils/useful_functions.js';
import { getCookieValue } from '../utils/cookie.js';
import { Keys } from '../constants/Keys.js';
import { getSavedItems, saveItems } from '../utils/localStorage.js';

async function renderData() {
  const queryString = new Proxy(new URLSearchParams(window.location.search), {
    get: (params, prop) => params.get(prop),
  });
  const currentId = queryString.id;
  const fetchedData = await get('/api/products', currentId);
  const {
    _id,
    category,
    name,
    price,
    volume,
    description,
    alcoholType,
    alcoholDegree,
    manufacturedDate,
  } = fetchedData;

  document.title = `${name} - 한술담 🍶`;

  let productSection = document.createElement('section');

  productSection.setAttribute('class', 'product-container');
  productSection.setAttribute('id', _id);
  productSection.innerHTML = `<div class="product-container">
  <div class="image-warpper">
    <img src="../img/ricewine_icon.png" alt="상품 이미지" />
  </div>
	<div class="content__container">
		<div class="content__main-info">
    <p class="content__item content__name">${name}</p>
    <p class="content__item content__category">${category}</p>
			<p class="content__item content__price">${Number(price).toLocaleString(
        'ko-KR'
      )}원</p>
			<p class="content__desc">${description}</p>
		</div>
		<div class="content__detail-info">
			<p>
				<span class="content__alcoholType">종류</span>
				<span class="content__item content__alcoholType">${alcoholType}</span>
			</p>
			<p>
				<span class="content__alcoholDegree">도수</span>
				<span class="content__item content__alcoholDegree">${alcoholDegree}도</span>
			</p>
			<p>
				<span class="content__volume">용량</span>
				<span class="content__item content__volume">${volume}ml</span>
			</p>
			<p>
				<span class="content__manufacturedDate">제조일자</span>
				<span class="content__item content__manufacturedDate">${changeToKoreanTime(
          manufacturedDate
        )}</span>
			</p>
		</div>
		<div class="button-container">
			<button class="button is-info ml-2" id="order-button">
				주문하기
			</button>
			<button class="button" id="basket-button">장바구니 담기</button>
			<p class="cart-message">
				장바구니에 담았습니다!
			</p>
		</div>
	</div>
</div>`;

  const bodyContainer = document.querySelector('.body-container');

  bodyContainer.append(productSection);

  return fetchedData;
}

async function orderAndCart() {
  let productData = await renderData();

  const orderButton = document.querySelector('#order-button');
  const basketButton = document.querySelector('#basket-button');

  orderButton.addEventListener('click', clickOrder);
  basketButton.addEventListener('click', clickCart);

  function clickOrder() {
    if (confirm('현재 장바구니를 비우고 해당 항목을 주문할까요?')) {
      productData.quantity = 1;
      let tempArr = [productData];

      saveItems(Keys.PRODUCTS_KEY, tempArr);

      if (
        getCookieValue(Keys.TOKEN_KEY) === undefined ||
        getCookieValue(Keys.TOKEN_KEY) == ''
      ) {
        window.location.href = '/order-pay-nonmember';
      } else {
        window.location.href = '/order-pay-member';
      }
    } else {
      window.location.href = '/cart';
    }
  }

  function clickCart() {
    productData['quantity'] = 1;

    if (!getSavedItems(Keys.PRODUCTS_KEY)) {
      // 로컬스토리지 내 PRODUCTS_KEY값이 존재하지 않을 때
      let productArray = [productData];
      saveItems(Keys.PRODUCTS_KEY, productArray);
    } else {
      let cartItems = getSavedItems(Keys.PRODUCTS_KEY);
      const existItemIdx = cartItems.findIndex(
        (product) => product._id === productData._id
      );

      if (existItemIdx === -1) {
        // 로컬스토리지 내 PRODUCTS_KEY값은 존재하나 비어있을 때
        cartItems = [...cartItems, productData];
      } else {
        cartItems[existItemIdx].quantity += 1;
      }
      saveItems(Keys.PRODUCTS_KEY, cartItems);
    }

    // Message
    const cartMessage = document.querySelector('.cart-message');
    cartMessage.classList.add('fade-message');
    setTimeout(() => {
      cartMessage.classList.remove('fade-message');
    }, 1000);
  }
}

orderAndCart();
