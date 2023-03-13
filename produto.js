import { PRODUTO as produto } from './products.js';

// PAGINA PRODUTO INDIVIDUAL
const idProduto = localStorage.getItem('idProduto');
//localStorage sempre salva como string
// console.log(typeof idProduto);
//parseInt converte em número
const filterProduct = produto.filter(
  (item) => item.id === parseInt(idProduto)
)[0];

// APÓS CONVERTIDO BUSCAR DADOS PELO ID
const pathName = document.getElementById('path-name');
const productName = document.getElementById('product-name');
const productImg = document.getElementById('product-img');
const productPrice = document.getElementById('product-price');
productPrice.innerHTML = `$${filterProduct.price}.00`;
productImg.src = filterProduct.url;
console.log(productImg);
productName.innerHTML = filterProduct.name;
pathName.innerHTML = `Home / ${filterProduct.name}`;

// ADD TO CART
const addCart = document.getElementById('add-cart');
addCart.addEventListener('click', () => {
  const cartProducts = localStorage.getItem('cartProducts');
  console.log(cartProducts);
  let myCart = [];
  // '!!' converter uma variável para ser um valor booleano (verdadeiro ou falso)
  if (!!cartProducts) {
    const jsonConvertLocal = JSON.parse(cartProducts);
    myCart.push(...jsonConvertLocal);
    // O método push adiciona valores a um array. Esse método é intencionalmente genérico. Podendo ser utilizado por call() ou apply() em objetos que implementam arrays. O método push depende da propriedade length para determinar onde começar a inserir os valores
  }
  myCart.push(filterProduct);
  const converteJson = JSON.stringify(myCart);
  localStorage.setItem('cartProducts', converteJson);
});
