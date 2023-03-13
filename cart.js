import { PRODUTO as produto } from './products.js';
//  CONST PARA PEGAR ITEM NO LOCALSTORAGE

// INCREMENTAR-DECREMENTAR

function updateCart() {
  const localCart = localStorage.getItem('cartProducts');

  //  CONVERTER JSON EM TXT
  const convertLocalCart = JSON.parse(localCart);
  // console.log(typeof convertLocalCart);
  const productList = document.getElementById('tBody');
  const reduceCart = convertLocalCart.forEach((element) => {
    let newArray = [];
    newArray.forEach((item) => {});
    // console.log(element);
  });
  function incrementProduct(id) {
    const localCart = localStorage.getItem('cartProducts');
    const convertLocalCart = JSON.parse(localCart);
    const newArray = convertLocalCart.map((item) => {
      if (item.id === parseInt(id)) {
        return {
          ...item,
          quantidade: item.quantidade++,
        };
      }
      return item;
    });
    console.log(id);
  }

  //  TABELA CART
  const productHtmlArray = convertLocalCart.map(
    (item) =>
      `
     <tr class="soma-produtos" >
    
     <td><a class="remove-btn" data-id="${item.id}" href="#"><ion-icon id="my-btn"  name="trash-outline" ></ion-icon></a></td>
     <td><img src="${item.url}" alt=""></td>
     <td><h5>${item.name}</h5></td>
     <td> <h5 class="cart-product-price">$${item.price}</h5></td>
     <td id="myList">
     <button data-id="${item.id}" class="p-2 m-1 rounded">-</button>
     <span id="quantity" class="quantity">0</span>
     <button type="button" onclick="incrementProduct(${item.id})" class="p-2 m-1 rounded" value="0">+</button>
     </td>
     <td><h5 class="total-price price">${item.price}</h5></td>
   </tr>
   `
  );
  const productHtml = productHtmlArray.join('');
  productList.innerHTML = productHtml;

  // REMOVER DO CART
  const removeProductButtons = document.getElementsByClassName('remove-btn');
  // console.log(removeProductButtons);
  for (var i = 0; i < removeProductButtons.length; i++) {
    const dataId = removeProductButtons[i].getAttribute('data-id');
    removeProductButtons[i].addEventListener('click', function (event) {
      handleRemoveId(dataId);
      event.target.parentElement.parentElement.parentElement.remove();
    });
  }
}

function handleRemoveId(id) {
  const localCart = localStorage.getItem('cartProducts');
  //  CONVERTER JSON EM TXT
  const convertLocalCart = JSON.parse(localCart);
  const newArray = convertLocalCart.filter((item) => item.id !== parseInt(id));
  console.log(newArray);
  const converteJson = JSON.stringify(newArray);
  localStorage.setItem('cartProducts', converteJson);
  updateCart();
}

updateCart();

// SOMAR PRODUTOS
// let totalAmount = 0;
// const cart_products = document.getElementsByClassName('soma-produtos');
// for (var i = 0; i < cart_products.length; i++) {
//   console.log(cart_products[i]);
//   const productPrice = cart_products[i]
//     .getElementsByClassName('cart-product-price')[0]
//     .innerText.replace('$', '');
//   console.log(productPrice);
//   const productQuantity =
//     cart_products[i].getElementsByClassName('product-qtd-input')[0].value;

//   totalAmount += productPrice * productQuantity;
//   const subTotal = cart_products[i].getElementsByClassName('total-price')[0];
//   const subTotalParagraph =
//     cart_products[i].getElementsByClassName('subtotal')[0];
//   console.log(subTotal);
// }
// console.log(totalAmount);
