import '@styles/main.scss';

import {getCartFromLocalStorage, preventNegativeValues} from "/src/shared/functions.js";

const COEFS = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3
}

// const pizzaMenu = [
//   {
//     id: 1,
//     title: 'Italian',
//     img: '@styles/src/assets/images/Italian.png',
//     filling: 'Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...',
//     price: 8.35,
//     quantity: 1,
//     isAvailable: true,
//     type: 'meat',
//     size: 28,
//     is_popular: false,
//   },
//   {
//     id: 2,
//     title: 'Venecia',
//     img: '@styles/src/assets/images/pizzavenecia.png',
//     filling: 'Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...',
//     price: 10,
//     quantity: 1,
//     isAvailable: true,
//     type: 'mushroom',
//     size: 28,
//     is_popular: false,
//   },
//   {
//     id: 3,
//     title: 'Meat',
//     img: '@styles/src/assets/images/miasnaia.png',
//     filling: 'Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...',
//     price: 10,
//     quantity: 1,
//     isAvailable: true,
//     type: 'meat',
//     size: 28,
//     is_popular: false,
//   },
//   {
//     id: 4,
//     title: 'Cheese',
//     img: '@styles/src/assets/images/pizzacheese.png',
//     filling: 'Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...',
//     price: 10,
//     quantity: 1,
//     isAvailable: true,
//     type: 'vegetarian',
//     size: 28,
//     is_popular: false,
//   },
//   {
//     id: 5,
//     title: 'Argentina',
//     img: '@styles/src/assets/images/pizzaargentina.png',
//     filling: 'Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...',
//     price: 8.35,
//     quantity: 1,
//     isAvailable: true,
//     type: "vegetarian",
//     size: 28,
//     is_popular: true,
//   },
//   {
//     id: 6,
//     title: 'Gribnaia',
//     img: '@styles/src/assets/images/gribnaya.png',
//     filling: 'Filling:  onion, potato, tomato, mushrooms, cheese, olives, meat...',
//     price: 10,
//     quantity: 1,
//     isAvailable: true,
//     type: "mushroom",
//     size: 28,
//     is_popular: true,
//   },
//   {
//     id: 7,
//     title: 'Tomato',
//     img: '@styles/src/assets/images/pizzatomato.png',
//     filling: 'Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...',
//     price: 10,
//     quantity: 1,
//     isAvailable: true,
//     type: "tomato",
//     size: 28,
//     is_popular: true,
//   },
//   {
//     id: 8,
//     title: 'Italian x2',
//     img: '@styles/src/assets/images/pizzaitalian2.png',
//     filling: 'Filling: onion, potato, tomato, mushrooms, cheese, olives, meat...',
//     price: 10,
//     quantity: 1,
//     isAvailable: false,
//     type: "italian",
//     size: 28,
//     is_popular: true,
//   }
// ];

async function loadPizzas() {
  try {
      const response = await fetch('http://localhost:3000/api/pizzas/findAllPizzas')
      const result = await response.json();
      return result.data;
  }
  catch(e) {
    console.log(e)
  }
}

loadPizzas()
.then((pizzaMenu) => {
  const pizzaTemplate = document.querySelector('#pizzaCardTemplate');
  if (pizzaTemplate) {

  pizzaMenu.forEach((item) => {
   let menuCard = pizzaTemplate.content.cloneNode(true);
   menuCard.querySelector('.menu__cards__item__type').dataset.type = item.type; // отсюда взять селектор
   menuCard.querySelector('.menu__cards__item__type').dataset.id = item.id;
   menuCard.querySelector('.menu__cards__item__type').dataset.price = item.price;
   menuCard.querySelector('.menu__cards__item__type').dataset.size = item.size;
   menuCard.querySelector('.menu__cards__item__img').setAttribute('src', item.img);
   menuCard.querySelector('.menu__cards__item__title').textContent = item.title;
   menuCard.querySelector('.menu__cards__item__filling').textContent = item.filling;
   menuCard.querySelector('.menu__cards__item__price span').textContent = item.price;
   menuCard.querySelector('.menu__cards__item__quantity').textContent = item.quantity;
   menuCard.querySelector('.total-price').textContent = item.price;

   changeQuantity(menuCard, item.price);
   handleSizeChange(menuCard);

   if (!item.isAvailable) {
    menuCard.querySelector('.menu__cards__item').setAttribute('disabled', true);
    menuCard.querySelector('.btn.btn--wide').textContent = 'Out of sale';
   }

  if(!item.is_popular) {
    document.querySelector('.menu__cards').appendChild(menuCard);
  }
  document.querySelector('.mostPopular__cards').appendChild(menuCard);
});
}
})
.catch((e) => {
  console.error('Не удалось загрузить пиццы', e)
})


const productCards = document.querySelectorAll('.menu__cards__item');

if(productCards) {
productCards.forEach((card) => {
  const addBtn = card.querySelector('.orderBtn');
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = Number(card.querySelector('.menu__cards__item__type').dataset.id)
    const quantity = Number(card.querySelector('.menu__cards__item__quantity').textContent)
    const size = Number(card.querySelector('.menu__cards__item__type').dataset.size)
    const totalPrice = Number(card.querySelector('.menu__cards__item__type').dataset.price)
    addToCart(id, quantity, size, totalPrice)
  })
})
}




// filter btn handler
// querySelectorAll, forEach, addEventListener
const menuFilterBtns = document.querySelectorAll(".menu__top .btn");
const menuCards = document.querySelectorAll('.menu__cards .menu__cards__item')

function displayAllCards() {
  menuCards.forEach((card) => {
    card.classList.remove('d--none')
  })
}

function renderCardQuantity(selector, counter) {
  selector.innerText = counter;
}

let cart = [];

function addToCart(...data) {
  const id = data[0];
  const quantity = data[1];
  const size = data[2];
  const totalPrice = data[3];

  pizzaMenu.forEach((item) => {
    if (item.id === id) {
      cart.push({
        id: id,
        total: quantity * totalPrice,
        quantity: quantity,
        size: size
      })

      localStorage.setItem('cart', JSON.stringify(cart))

      console.log(localStorage);

      // TODO убрать дублирование по ID из корзины
    }
  })
}

function changeQuantity(productCard, basePrice) {
  let cardCounter = 0;

  const minusBtn = productCard.querySelector('.menu__cards__minus');
  const plusBtn = productCard.querySelector('.menu__cards__plus');
  const quantity = productCard.querySelector('.menu__cards__item__quantity');
  const totalPriceElement = productCard.querySelector('.total-price');

  minusBtn.addEventListener('click', (e) => {
    cardCounter--;
    console.log(cardCounter);
    cardCounter = preventNegativeValues(cardCounter);
        console.log(cardCounter);
    renderCardQuantity(quantity, cardCounter);
    calculateTotalCostOnCartItem(Number(quantity.textContent), basePrice, totalPriceElement);
  })

  plusBtn.addEventListener('click', (e) => {
    cardCounter++;
    renderCardQuantity(quantity, cardCounter);
    calculateTotalCostOnCartItem(Number(quantity.textContent), basePrice, totalPriceElement);
  });

  
}

function calculateTotalCostOnCartItem(quantity, basePrice, totalElement) {
  console.log(quantity, basePrice);
  let totalCost = basePrice * quantity;
  totalElement.textContent = `${totalCost.toFixed(2)}`
}

function dropSizeBtnsStyle(btns) {
  btns.forEach((btn) => {
    btn.classList.remove('btn--gradient--right');
  })
}

function handleSizeChange(productCard) {

  const sizeBtns = productCard.querySelectorAll(`.menu__cards__item__size`);
  const cardAttributeContainer = productCard.querySelector('.menu__cards__item__type');
  const priceElement = productCard.querySelector('.menu__cards__item__price');
  let price = Number(priceElement.textContent.split("").slice(0, -1).join(""))
  let totalPrice = 0;

  sizeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      dropSizeBtnsStyle(sizeBtns);
      btn.classList.add('btn--gradient--right');

      const size = Number(btn.textContent);
      cardAttributeContainer.dataset.size = size;

      switch(size) {
        case 28:
          totalPrice = Number(price * 2).toFixed(2);
        break;
        case 33:
          totalPrice = Number(price * 3).toFixed(2);
        break;
        default:
          totalPrice = Number(price * 1).toFixed(2);
        break;
      }

       priceElement.innerHTML = `${totalPrice}<sup>$</sup>`;
       cardAttributeContainer.dataset.price = totalPrice;
    })
  })
//   btnRounded.forEach(btn => {
//   btn.addEventListener('click', () => {
//     btn.classList.add('btn--gradient--right');
//     if (btn.nextElementSibling !== null) {
//       if (btn.nextElementSibling.classList.contains('btn--gradient--right')) {
//         btn.nextElementSibling.classList.remove('btn--gradient--right')
//       }
//     }
//     if (btn.previousElementSibling !== null) {
//       if (btn.previousElementSibling.classList.contains('btn--gradient--right')) {
//         btn.previousElementSibling.classList.remove('btn--gradient--right')
//       }
//     }
//   });
// })
}



// function calculateTotalPrice(quantity, price) {
//   let totalPrice = quantity * price
//   return totalPrice
// }

// function renderPrice(totalPriceEl, totalPrice){
//   totalPriceEl.textContent = totalPrice
// }





const cartQuantity = document.querySelector('.cart__quantity');

// отрисовываем количество товаров в корзине в хедере
function renderCartItems() {
  const cartItemsFromLocalStorage = getCartFromLocalStorage();
  if (cartItemsFromLocalStorage) {
    const cartItems = Array.from(JSON.parse(cartItemsFromLocalStorage)).length;
    cartQuantity.textContent = cartItems;
  }
}

setInterval(renderCartItems, 500);

// Переход на страницу корзины после клика по иконке
document.getElementById('buttonCart').addEventListener('click', function() {
  window.location.href = '/cart.html';
});



if (location.pathname === '/cart.html') {
  const cartFromLocalStorage = Array.from(JSON.parse(getCartFromLocalStorage()));

  let resultCart = []; // массив товаров, добавленных в корзину

  function renewCartFromLocalStorage () {
    cartFromLocalStorage.forEach((item) => {
      pizzaMenu.forEach((menuItem) => {
        if (item.id === menuItem.id) {
          const cartItem = {
            id: item.id,
            title: menuItem.title,
            totalPrice: item.total,
            img: menuItem.img,
            quantity: item.quantity
          }
          resultCart.push(cartItem);
        }
      })
    });
  }

  // Рендер карточек пицц на странице корзины
  function renderCartPizzas() {
    const pizzaCartTemplate = document.querySelector('#pizzaCartItemTemplate');
    const cartBlockItem = document.querySelector('#cartBlockItems');

    renewCartFromLocalStorage();

    if (pizzaCartTemplate && cartBlockItem) {
      resultCart.forEach((cartItem) => {
        const clonedItem = pizzaCartTemplate.content.cloneNode(true);

        const cartTitle = clonedItem.querySelector('.cart__block__item__title');
        const cartImg = clonedItem.querySelector('.cart__block__item__img');
        const cartPrice = clonedItem.querySelector('.cart__block__item__price span');
        const cartQiantity = clonedItem.querySelector('.cart__block__item__quantity span');
        const cartDeleteBtn = clonedItem.querySelector('.btn.btn-danger');
        const cartQuantityForBtns = clonedItem.querySelector('.quantity-value');

        cartTitle.textContent = cartItem.title;
        cartImg.setAttribute('src',  cartItem.img);
        cartPrice.textContent = cartItem.totalPrice
        cartQiantity.textContent = cartItem.quantity;
        cartDeleteBtn.dataset.id = cartItem.id;
        cartQuantityForBtns.textContent = cartItem.quantity;
        cartBlockItem.appendChild(clonedItem);

        console.log('cart pizzas rendered');
      })
    } else {
      console.log('тут не надо рендерить корзину');
    }
  }

  renderCartPizzas();


  // test
  const cartTotalPriceElement = document.querySelector('.cart__total-price');
  if (cartTotalPriceElement) {
  let cartTotalPrice = Number(cartTotalPriceElement.textContent);

  }

  document.querySelectorAll('.cart__block__item').forEach((item) => {
        const cart__minus__btn = item.querySelector(".btn-minus");
        const cart__plus__btn = item.querySelector(".btn-plus");
        const quantityForBtns = item.querySelector('.quantity-value');
        let currentQuantity = Number(item.querySelector('.cart__block__item__quantity span').textContent);
        let currentPrice = Number(item.querySelector('.cart__block__item__price span').textContent);

        let priceForOne = Number(currentPrice / currentQuantity);

        cart__minus__btn.addEventListener('click', (e) => {
          e.preventDefault();
          currentQuantity--;

          quantityForBtns.textContent = currentQuantity;
          cartTotalPrice -= currentQuantity * priceForOne;
          renewCartTotalPrice(cartTotalPrice, cartTotalPriceElement);
          item.querySelector('.cart__block__item__price span').textContent =  Number(priceForOne * currentQuantity);
          item.querySelector('.cart__block__item__quantity span').textContent = currentQuantity;
        });

        cart__plus__btn.addEventListener('click', (e) => {
          e.preventDefault();

          currentQuantity++;

          quantityForBtns.textContent = currentQuantity;

          console.log(cartTotalPrice, currentQuantity, priceForOne);

          cartTotalPrice += currentQuantity * priceForOne;
          renewCartTotalPrice(cartTotalPrice, cartTotalPriceElement);
          item.querySelector('.cart__block__item__price span').textContent =  Number(priceForOne * currentQuantity);
          item.querySelector('.cart__block__item__quantity span').textContent = currentQuantity;
        })
  })

  function renewCartTotalPrice(price, priceElement) {
    priceElement.textContent = price;
  }

  function clearCart() {
    document.querySelector('#cartBlockItems').innerHTML = '';
   }
//  const cartBlockItems = document.querySelector('#cartBlockItems');
//   if (cartBlockItems) {
//     cartBlockItems.innerHTML = '';
//   } else {
//     console.warn('Элемент #cartBlockItems не найден на странице');
//   }

 
  
//   if (cartTotalPriceElement) {
//     cartTotalPriceElement.textContent = '0.00';
//      } 
//      else {
//     ;
//   }
 
  

  
  
  // if (cartTotalPrice) {
  //   cartTotalPriceElement.textContent = '0.00';
  // } else {
  //   console.error('Элемент .cart__total-price не найден на странице!');
    
  
  function removeCartFromLocalStorage() {
    localStorage.removeItem('cart');
  }

  function clearCartTotalPrice() {
    document.querySelector('.cart__total-price').textContent = "0";
  }
 
  const clearCartBtn = document.querySelector('#clearCartBtn');

    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        clearCart();
        removeCartFromLocalStorage();
        clearCartTotalPrice();
        })
    }

    document.querySelectorAll('.btn-danger').forEach((button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      const itemId = parseInt(button.getAttribute('data-id'));
      removeFromCart(itemId);
    })
  });


  function removeFromCart(itemId) {
    const cartFromStorage = localStorage.getItem('cart');
    if (!cartFromStorage) return;

      let cart = JSON.parse(cartFromStorage);

      cart = cart.filter(item => item.id !== itemId);

      localStorage.setItem('cart', JSON.stringify(cart));

  }
  if (document.querySelector('#orderBtn')) {
  document.querySelector('#orderBtn').addEventListener('click', (evt) => {
    evt.preventDefault();
    alert('Заказ успешно оформлен! Спасибо за покупку!');
  })
  }


  function calculateCartTotalFirstTime() {
      let cartPrice = 0;
      
      resultCart.forEach((cartItem) => {
        cartPrice += cartItem.totalPrice; 
      });

      
      cartPrice = Number(cartPrice.toFixed(2));

      
      const totalPriceElement = document.querySelector('.cart__total-price');
      if (totalPriceElement) {
        totalPriceElement.textContent = cartPrice;
      }
    }

  calculateCartTotalFirstTime();
}


// const pizzaPromise = new Promise((resolve, reject) => {
//     const pizzaReady = true;
//     setTimeout(() => {
//         if (pizzaReady) {
//             resolve('Пицца готова')
//         } else {
//             reject('Упс')
//         }
//     }, 5000)
// });

// pizzaPromise
// .then((message) => {
//     console.log(message);
// })
// .catch((message) => {
//     console.error(message)
// })
// .finally((message) => {
//     console.log('finally');
// })


// form send
const contactForm = document.querySelector('#contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let emailValue = contactForm.querySelector('#email').value;
  fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      email: emailValue
    }
  })
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error);
  })
});


/*
const pizzas = await fetch('http://localhost:3001/pizzas')
pizzas.


*/

// async await
async function createUser(userData) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    
    const newUser = await response.json();
    console.log('Создан новый пользователь:', newUser);
    return newUser;
  } catch (error) {
    console.error('Не удалось создать пользователя:', error);
  }
}

// Использование
createUser({
  name: 'Павел Зотов',
  email: 'pavel@example.com'
});



const modal = document.getElementById('orderModal');
const openBtn = document.getElementById('openOrderModal');
const closeBtn = document.querySelector('.close');
const orderForm = document.getElementById('orderForm');


function openModal() {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
} 

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; 
  orderForm.reset(); 
  clearErrors(); 
document.querySelectorAll('.openOrderModal').forEach((button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      const itemId = parseInt(button.getAttribute('data-id'));
      removeOrderModal(modalId);
    })
  });
}
