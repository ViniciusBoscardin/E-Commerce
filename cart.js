import { PRODUTO as produto } from './products.js';

function updateCart() {
  //  CONST PARA PEGAR ITEM NO LOCALSTORAGE
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
     <button data-id="${item.id}-decrement" class="p-2 m-1 rounded decrement">-</button>
     <span id="quantity" value="${item.quantidade}" class="quantity">${item.quantidade}</span>
     <button type="button" data-id="${item.id}-increment" class="p-2 m-1 rounded increment">+</button>
     </td>
     <td><h5 class="total-price price"></h5></td>
   </tr>
   `
  );
  const productHtml = productHtmlArray.join('');
  productList.innerHTML = productHtml;

  // INCREMENT-DECREMENT
  const incrementButtons = document.querySelectorAll('.increment');
  const decrementButtons = document.querySelectorAll('.decrement');

  for (let index = 0; index < incrementButtons.length; index++) {
    const element = incrementButtons[index];
    const id = element.dataset.id;
    element.addEventListener('click', () => {
      incrementProduct(id);
    });
  }
  for (let index = 0; index < decrementButtons.length; index++) {
    const element = decrementButtons[index];
    const id = element.dataset.id;
    element.addEventListener('click', () => {
      incrementProduct(id);
    });
  }

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

function incrementProduct(id) {
  const regex = /-.*/;
  // essa linha declara uma expressão regular que será usada mais adiante para remover um pedaço de texto do parâmetro "id".
  const resultado = id.replace(regex, '');
  // essa linha usa a expressão regular declarada anteriormente para remover um pedaço de texto do "id", armazenando o resultado na variável "resultado".
  const determinaOperacao = /^[^-]+-/;
  // essa linha declara outra expressão regular que será usada para extrair uma operação (incrementar ou decrementar) do "id".
  const operacao = id.replace(determinaOperacao, '');
  // essa linha usa a expressão regular declarada anteriormente para extrair a operação do "id", armazenando o resultado na variável "operacao".
  const localCart = localStorage.getItem('cartProducts');
  // essa linha obtém o valor armazenado no localStorage com a chave "cartProducts" e armazena na variável "localCart".
  const convertLocalCart = JSON.parse(localCart);
  // essa linha converte o valor obtido do localStorage (que é uma string JSON) para um objeto JavaScript, armazenando o resultado na variável "convertLocalCart".
  console.log(operacao);
  const newArray = convertLocalCart
    // essa linha cria um novo array "newArray" a partir do array "convertLocalCart", usando o método "map" para percorrer cada elemento do array.
    .map((item) => {
      if (item.id === parseInt(resultado)) {
        // dentro do loop "map", essa linha verifica se o "id" do item atual é igual ao "resultado" convertido para um número inteiro.
        if (operacao === 'increment') {
          return {
            ...item,
            quantidade: ++item.quantidade,
          };
        }
        // se a operação for "incrementar", essa linha retorna um novo objeto com a mesma estrutura do objeto original, mas com a propriedade "quantidade" incrementada em 1.
        if (item.quantidade === 0) {
          handleRemoveId(item.id);
          return;
        }
        // se a quantidade do item for igual a 0 e a operação for "decrementar", essa linha chama a função "handleRemoveId" com o "id" do item como parâmetro e retorna "undefined" (que será filtrado depois).
        return {
          ...item,
          quantidade: --item.quantidade,
        };
        // se nenhuma das condições anteriores for verdadeira, essa linha retorna o objeto original com a propriedade "quantidade" decrementada em 1 (se a operação for "decrementar").
      }
      return item;
      // se o "id" do item atual não for igual ao "resultado" convertido para um número inteiro, essa linha simplesmente retorna o item original.
    })
    .filter(Boolean);
  // depois de percorrer todos os elementos do array com o método "map", essa linha remove todos os elementos que são "falsy" (ou seja, que são "undefined", "null", "false", "0", "", etc).
  console.log(newArray);
  const converteJson = JSON.stringify(newArray);
  localStorage.setItem('cartProducts', converteJson);
  updateCart();
}

// SOMAR PRODUTOS NO CART
let totalAmount = 0;

const cartProducts = document.getElementsByClassName('soma-produtos');

for (let i = 0; i < cartProducts.length; i++) {
  const productPrice = parseFloat(
    cartProducts[i]
      .getElementsByClassName('cart-product-price')[0]
      .innerText.replace('$', '')
  );

  const productQuantity = parseInt(
    cartProducts[i].getElementsByClassName('quantity')[0].getAttribute('value')
  );

  const subTotalAmount = productQuantity * productPrice;
  const subTotal = cartProducts[i].getElementsByClassName('total-price')[0];
  subTotal.textContent = subTotalAmount.toFixed(2);

  totalAmount += subTotalAmount;
}

console.log(totalAmount.toFixed(2));

// Nestas linhas, estamos:
// Selecionando o elemento com o ID sub-total e armazenando-o na variável subTotalParagraph.
//  Em seguida, estamos definindo o conteúdo de subTotalParagraph como o valor final de totalAmount. Isso atualizará o subtotal total no carrinho de compras.
const subTotalParagraph = document.getElementById('sub-total');
subTotalParagraph.textContent = totalAmount.toFixed(2);
// console.log(subTotalParagraph);
console.log(totalAmount.toFixed(2)); // Valor final da soma

const totalEnd = document.getElementById('total-compra');
const totalOfPurchase = totalAmount + 10.0;
totalEnd.textContent = totalOfPurchase.toFixed(2);
console.log(totalAmount);
// Convertendo o objeto myCart em uma string JSON usando o método JSON.stringify() e armazenando-o no armazenamento local do navegador usando o método localStorage.setItem().
const converteJson = JSON.stringify(myCart);
localStorage.setItem('cartProducts', converteJson);

// SOMAR PRODUTOS
// let subTotalAmount = 0;
// let totalAmount = 0;
// Esta linha declara uma variável chamada subTotalAmount e inicializa seu valor para zero. Essa variável será usada para armazenar o valor total dos produtos somados.
// const cart_products = document.getElementsByClassName('soma-produtos');
// console.log(cart_products);
// Esta linha seleciona todos os elementos HTML que possuem a classe soma-produtos e armazena-os em uma constante chamada cart_products.
// for (var i = 0; i < cart_products.length; i++) {
//   Nesta seção de código, estamos executando um loop for para iterar (execução repetida de uma sequência de instruções) sobre cada elemento cart_products selecionado na etapa anterior.
// console.log(cart_products[i]);
// const productPrice = cart_products[i]
//   .getElementsByClassName('cart-product-price')[0]
//   .innerText.replace('$', '');
// console.log(productPrice);
// Dentro do loop, estamos:
// Selecionando o elemento cart-product-price dentro do elemento cart_products[i] e armazenando o preço do produto em productPrice. Observe que estamos usando o método replace() para remover o símbolo $ do preço.
// console.log(productPrice);
// const productQuantity = cart_products[i]
//   .getElementsByClassName('quantity')[0]
//   .getAttribute('value');
// console.log(productQuantity);
// Selecionando o atributo value do elemento quantity (getAttribute) dentro do elemento cart_products[i] e armazenando a quantidade de produtos em productQuantity.
// console.log(productQuantity);
//   subTotalAmount += productQuantity * productPrice;
//   const subTotal = cart_products[i].getElementsByClassName('total-price')[0];
//   subTotal.textContent = subTotalAmount.toFixed(2);
//   console.log(subTotal);
// }
// Multiplicando o preço do produto pela quantidade de produtos e adicionando o resultado a totalAmount.
// Selecionando o elemento total-price dentro do elemento cart_products[i] e armazenando-o na variável subTotal. Em seguida, estamos definindo o conteúdo de subTotal como o valor atual de totalAmount. Isso atualizará o subtotal no carrinho de compras para cada produto individual.
