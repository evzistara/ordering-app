import { menuArray } from "./data.js";
const order = document.querySelector(".order");
const orderedItems = document.querySelector(".ordered-items");
const totalPrice = document.querySelector(".total-price");
const btnOrder = document.querySelector(".btn-order")
const dialog = document.querySelector('dialog')
const btnClose = document.querySelector('.btn-close')
const paymentForm = document.querySelector('form')
const thankYou = document.querySelector('.thank-you')


function renderMenu() {
  return menuArray
    .map((item) => {
      return `<div class="flex-big underline" id="${item.name}">
        <div class="flex">
            <p class="emoji">${item.emoji}</p>
            <div class="menu-item__details">
                <h3>${item.name}</h3>
                <p>${item.ingredients.join(", ")}</p>
                <p>$${item.price}</p>
            </div>
            </div>
            <button class="btn-add" data-${item.name}="${item.name}">+</button>
        </div>`;
    })
    .join("");
}

document.querySelector(".menu").innerHTML += renderMenu();

document.addEventListener("click", (e) => {
  if (e.target.dataset.pizza) {
    renderOrder(e.target.dataset.pizza);
  }
  if (e.target.dataset.hamburger) {
    renderOrder(e.target.dataset.hamburger);
  }
  if (e.target.dataset.beer) {
    renderOrder(e.target.dataset.beer);
  }
});

let foodOrder = [];

function renderOrder(orderedItem) {
  order.classList.remove("hidden");
  thankYou.classList.add('hidden');

  const orderedFood = menuArray.filter((food) => food.name === orderedItem)[0];
  foodOrder.push(orderedFood);

  const orderHtml = foodOrder
    .map((food) => {
      return `<div class="flex-big">
        <p>${food.name}</p>
        <p>$${food.price}</p>
    </div>`;
    })
    .join("");

  const total = foodOrder.reduce((total, current) => {
    return total + current.price;
  }, 0);

  orderedItems.innerHTML = orderHtml;
  totalPrice.innerHTML = `<div class="flex-big">
        <p>Total price</p>
        <p>$${total}</p>
    </div>`;
}

btnOrder.addEventListener('click', ()=>{
dialog.showModal();
})
btnClose.addEventListener('click', ()=>{
    dialog.close();
})

paymentForm.addEventListener('submit', handleForm)

function handleForm(e){
    e.preventDefault()

    dialog.close()

     order.classList.add('hidden');
  thankYou.classList.remove('hidden');
    const orderFormData = new FormData(paymentForm);
    const customerName = orderFormData.get('name').split(" ")
    thankYou.innerHTML = `Thanks, ${customerName[0]}! Your order is on the way!`
}