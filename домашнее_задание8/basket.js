'use strict';

const basketEl = document.querySelector('.basket');
document.querySelector('.cartIconWrap').addEventListener('click', () => {
	basketEl.classList.toggle('hidden');
});

const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
	if (!event.target.closest('.addToCart')) {
		return;
	}
	const featuredItem = event.target.closest('.featuredItem');
	const id = +featuredItem.dataset.id
	const name = featuredItem.dataset.name
	const price = +featuredItem.dataset.price

	addToCart(id, name, price);
});

function addToCart(id, name, price) {
	if (!(id in basket)) {
		basket[id] = {
			id,
			name,
			price,
			count: 0,
		}
	}
	basket[id].count++;
	basketTotalValueEl.textContent = getTotalBasketValue();
	basketTotalEl.textContent =
		`Товаров в корзине на сумму: $${getTotalBasketPrice().toFixed(2)}`;
	renderProductInBasket(id);
}

function getTotalBasketValue() {
	return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
	return Object.values(basket)
		.reduce((acc, product) => acc + product.price * product.count, 0);
}

function renderProductInBasket(id) {
	const basketRowEl = basketEl.querySelector(`.basketRow[data-productId="${id}"]`);
	if (!basketRowEl) {
		renderNewProductInBasket(id);
		return;
	}
	basketRowEl.querySelector('.productCount').textContent = basket[id].count;
	basketRowEl.querySelector('.productTotalRow')
		.textContent = basket[id].count * basket[id].price;
}

function renderNewProductInBasket(productId) {
	const product = `
	<div class="basketRow" data-productId="${productId}">
		<div>${basket[productId].name}</div>
		<div>
			<span class="productCount">${basket[productId].count}</span> шт.
		</div>
		<div>$${basket[productId].price}</div>
		<div>
			$<span class="productTotalRow">
			${((basket[productId].count * basket[productId].price).toFixed(2))
		}
			</span > шт.
		</div >
	</div >
	`;
	basketTotalEl.insertAdjacentHTML("beforebegin", product);
}
