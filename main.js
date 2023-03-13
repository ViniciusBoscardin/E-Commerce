// LISTA PRODUTOS SHOP
import { PRODUTO as produto } from './products.js';

const localCart = localStorage.getItem('cartProducts');
if (!!localCart) {
  const convertLocalCart = JSON.parse(localCart);
  console.log(localCart);
  // BADGE
  const badge = convertLocalCart.length;
  const spanBadge = document.getElementById('badge');
  spanBadge.innerHTML = badge;
  console.log(badge);
}

function handleProductPage(id) {
  localStorage.setItem('idProduto', id);
  // console.log(window.idP);
  window.location.href = 'sproduct.html';
  // const productImg = document.getElementById('product-img');
}

//GLOBAL-Torna o handleProductPage global
window.handleProductPage = handleProductPage;
const url = window.location.href;

const productList = document.getElementById('productList');
// const productList2 = document.getElementById('product-list-2');
// let productHtml = '';

function rankStar(quantidade) {
  let starHtml = '';
  for (let i = 0; i < quantidade; i++) {
    starHtml += '<ion-icon name="star-sharp"></ion-icon>';
  }
  return starHtml;
}

// PAGINA PRODUTOS
const productHtmlArray = produto.map(
  (item) =>
    `
    <div class="product text-center col-lg-3 col-md-4 col-12">
    <img class="image-fluid" src="${item.url}" alt="" />
    <div class="star">
    ${rankStar(item.rank)}
    </div>
    <h5 class="p-name">${item.name}</h5>
    <h4 class="p-price">$${item.price}</h4>
    <button onclick="handleProductPage(${
      item.id
    })" class="buy-btn">Buy Now</button>
    </div>
    `
);
// O método join() junta todos os elementos de um array (ou um array-like object) em uma string e retorna esta string.
const productHtml = productHtmlArray.join('');
productList.innerHTML = productHtml;

// FORMA ALTERNATIVA
// for (let i = 0; i < produto.length; i++) {
//   const price = produto[i].price;
//   const precoDecimal = price.toFixed(2);
//   productHtml += '<div class="product text-center col-lg-3 col-md-4 col-12">';
//   productHtml +=
//     '<img class="image-fluid" src="' +
//     produto[i].url +
//     '" alt="' +
//     produto[i].name +
//     '" />';
//   productHtml += '<div class="star">';
//   productHtml += rankStar(produto[i].rank);
//   productHtml += '</div>';
//   productHtml += '<h5 class="p-name">' + produto[i].name + '</h5>';
//   productHtml += '<h4 class="p-price">$' + precoDecimal + '</h4>';
//   productHtml +=
//     '<button onclick="console.log("chamou")" class="buy-btn">Buy Now</button>';
//   productHtml += '</div>';
// }
// productList.innerHTML = productHtml;

const products = document.querySelectorAll('.buy-btn');

const values = Object.values(produto);
console.log(values);
for (const value of values) {
  // console.log(value);
}

// for (let i = 0; i < products.length; i++) {
//   products[i].addEventListener('click', () => {
//     return (window.location.href = 'http://127.0.0.1:5501/sproduct.html');
//     console.log('products');
//   });
// }
