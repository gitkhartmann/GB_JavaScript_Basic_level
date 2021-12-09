'use strict';

const basketEl = document.querySelector('.basket');
document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {

    if (!event.target.classList.contains('addToCart')) {
    return;
        }

    const prodToCart = event.target.closest('.featuredItem').dataset;
    prodToCart.count ??= 1;

    basket.totalPrice ??= 0;
    basket.totalCounts ??= 0;

    addToCart(prodToCart);

});

function addToCart(prodToCart) {
    const basketHeaderEl = document.querySelector('.basketHeader');
    const divEls = basketHeaderEl.children;

    const checkProductInBasket = () => {
        for (const divEl of divEls) {
            if (divEl.innerText === prodToCart.name) {
                return true;
            }
        }
    };
    
    const changeCountsAndTotal = () => {
        for (const divEl of divEls) {
            if (divEl.innerText === prodToCart.name){
                divEl.nextElementSibling.textContent = prodToCart.count;
            }
            if (divEl.innerText === prodToCart.price){
                divEl.nextElementSibling.textContent =
                    (prodToCart.count * prodToCart.price).toFixed(2);
            }
        }
    };

    const showFinallPriceAndCounts = () => {
        basket.totalCounts++;
        basket.totalPrice += +prodToCart.price;

        const basketTotalDivEl = document.querySelector('.basketTotal');
        basketTotalDivEl.innerHTML = '';
        basketTotalDivEl.insertAdjacentHTML('afterbegin', `
        Товаров в корзине на сумму: ${basket.totalPrice.toFixed(2)} $
        `);

        const basketTotalValueEl = document.querySelector('.basketTotalValue');
        basketTotalValueEl.innerHTML = '';
        basketTotalValueEl.insertAdjacentHTML('afterbegin',
            `${basket.totalCounts}`);
    };
    
    if (!checkProductInBasket()) {
        basketHeaderEl.insertAdjacentHTML('beforeend', `
            <div>${prodToCart.name}</div>
            <div>${prodToCart.count}</div>
            <div>${prodToCart.price}</div>
            <div>${prodToCart.price * prodToCart.count}</div>
        `);
        showFinallPriceAndCounts();
        prodToCart.count++;
    } else {
        changeCountsAndTotal();
        showFinallPriceAndCounts();
        prodToCart.count++;
    }
    
}
