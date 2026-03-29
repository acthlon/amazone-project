import {cart} from '../data/cart.js';
import {saveCartToLocalStorage,totalCartQuantity} from './amazone.js';
import { productsInOrder } from "../data/orderItems.js";
import {products} from '../data/products.js'
import deliveryOptions from "../data/deliveryOptions.js"


console.log(cart)

let finalHtml = '';
let productInCart = [];

// localStorage.removeItem(productInCart);

// localStorage.removeItem(cart);
// console.log(cart);
// console.log(localStorage);

// getCartProductFromProducts();


if (document.querySelector('.js-order-summary')) {

    renderCartItems();
    getDeliveryOption();
    renderPaymentSummary();
    deleteCartItem();
    placeOrder();

}



export function cartCount(){
  let totalQuantity = 0;

  cart.forEach((item)=>{
      totalQuantity += item.quantity;
  })

  return totalQuantity;
  // console.log(totalQuantity)
  //console.log(typeof totalQuantity)
  };




function renderPaymentSummary(){

  const totalCartProducts = totalCartQuantity()
  const totalItemPrice = getTotalCartPrice()
  const shipping = 4.99
  const totalBeforeTax =Number((totalItemPrice + shipping).toFixed(2))
  const estimatedTax = ((0.1 * (getTotalCartPrice() + shipping))).toFixed(2)
  const totalCost = (totalBeforeTax + Number(estimatedTax)).toFixed(2)


  console.log(totalCartProducts,totalItemPrice)

    const orderSummaryHtml = `

          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalCartProducts}):</div>
            <div class="payment-summary-money">$${totalItemPrice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${estimatedTax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalCost}</div>
          </div>

          <button class="place-order-button js-place-order-button button-primary">
            Place your order
          </button>

        `
        const orderSummaryContainer = document.querySelector('.js-payment-summary')
        orderSummaryContainer.innerHTML = orderSummaryHtml;
        // renderCartItems()
};




function renderCartItems(){

  let finalHtml = ' '

    let productFromCart = null; 

    cart.forEach((cartItem)=>{
      
      // console.log(cartItem)
      const cartItemId = cartItem.id;
      const deliveryOptionId = cartItem.deliveryOption;



      // const productIndex = productInCart.indexOf(cartProduct)
      productFromCart = products.find((productItem) => productItem.id === cartItemId);
      productFromCart.quantity = cartItem.quantity

      let deliveryOption = null;

      if (deliveryOptionId){
        deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId); 
      }else{
        deliveryOption = deliveryOptions[0]
      }



      
      const delliveryDate = deliveryOption.day


      let cartItemHtml = `
        <div class="cart-item-container">
            <div class="delivery-date js-delivery-date">
              ${delliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${productFromCart.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${productFromCart.name}
                </div>
                <div class="product-price">
                  $${Number((productFromCart.priceCents / 100).toFixed(2))}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${productFromCart.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id = ${productFromCart.id}>
                    Delete
                  </span>
                </div>
              </div>


              <div class="delivery-options">
              
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                
               ${deliveryOptions.map(options => {
                const isChecked = deliveryOptionId === options.id
              
              
              let deliveryPrice; 
              options.price === 0 ? deliveryPrice = 'FREE SHIPPING' : deliveryPrice = options.price
                

               return `<div    class="delivery-option                                        js-delivery-option" 
                      data-product-id ="${productFromCart.id}"
                      data-delivery-id ="${options.id}">
                    <input type="radio" 
                      ${isChecked ? 'checked' : ''} 
                      class="delivery-option-input js-delivery-option-input"
                      name="delivery-option-${productFromCart.id}"
                      >
                    <div>
                      <div class="delivery-option-date">
                        ${options.day}
                      </div>
                      <div class="delivery-option-price">
                        $${deliveryPrice}
                      </div>
                    </div>
                  </div>`;
                 
               }).join('')}
               

              </div>
            </div>
          </div>
        `
        finalHtml +=cartItemHtml;
    });

  
    const cartItemContainer = document.querySelector('.js-order-summary')

    const itemCount = document.querySelector('.js-item-count')

    itemCount.innerHTML = totalCartQuantity()
    cartItemContainer.innerHTML = finalHtml;
};






/* function renderCartItems() {

    let finalHtml = '';   // ← Reset here

    cart.forEach((cartItem) => {

        const product = products.find(p => p.id === cartItem.id);
        if (!product) return;

        const selectedDeliveryId = cartItem.deliveryOption || "1";   // default to first option 

        // Get the correct delivery option object
        const deliveryOption = deliveryOptions.find(opt => opt.id === selectedDeliveryId) || deliveryOptions[0];

        let cartItemHtml = `
            <div class="cart-item-container">
                <div class="delivery-date js-delivery-date">
                    Delivery date: ${deliveryOption.day}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image" src="${product.image}">

                    <div class="cart-item-details">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">$${Number((product.priceCents / 100).toFixed(2))}</div>
                        <div class="product-quantity">
                            Quantity: <span class="quantity-label">${product.quantity}</span>
                            <span class="update-quantity-link link-primary">Update</span>
                            <span class="delete-quantity-link js-delete-quantity-link link-primary" 
                                  data-product-id="${product.id}">
                                Delete
                            </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">Choose a delivery option:</div>

                        ${deliveryOptions.map(option => {
                            const isChecked = option.id === selectedDeliveryId;

                            return `
                                <div class="delivery-option js-delivery-option" 
                                     data-product-id="${product.id}"
                                     data-delivery-id="${option.id}">
                                    <input type="radio" 
                                           ${isChecked ? 'checked' : ''}
                                           class="delivery-option-input js-delivery-option-input"
                                           name="delivery-option-${product.id}"
                                           value="${option.id}">
                                    <div>
                                        <div class="delivery-option-date">${option.day}</div>
                                        <div class="delivery-option-price">
                                            ${option.price === "FREE SHIPPING" ? option.price : '$' + option.price + ' - Shipping'}
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}

                    </div>
                </div>
            </div>
        `;

        finalHtml += cartItemHtml;
    });

    const cartItemContainer = document.querySelector('.js-order-summary');
    const itemCount = document.querySelector('.js-item-count');

    if (cartItemContainer) cartItemContainer.innerHTML = finalHtml;
    if (itemCount) itemCount.innerHTML = cartCount();
} */







function getTotalCartPrice(){
  let priceTotal = 0;
  cart.forEach((cartProducts)=>{
      const product = products.find(product => product.id === cartProducts.id);
      const deliveryOption = deliveryOptions.find(option => cartProducts.deliveryOption === option.id)

    

      const deliveryPrice = deliveryOption.price
      const subTotal = (cartProducts.quantity * (product.priceCents / 100)) + deliveryPrice
      priceTotal +=subTotal
  });
  return Number(priceTotal.toFixed(2));
  
};




function getCartProductFromProducts(){
        
        let productFromCart = null; 
        cart.forEach((cartItem)=>{
  
        let cartItemId = cartItem.id;

      products.forEach((productItem)=>{
        productFromCart = products.find((productItem) => productItem.id === cartItemId);
        productFromCart.quantity = cartItem.quantity
        
      });
    productInCart.push(productFromCart,
    );   
    });

// return productInCart;
};





function deleteCartItem(){

  finalHtml = ''
  const deleteButtons = document.querySelectorAll('.js-delete-quantity-link')

  deleteButtons.forEach((button)=>{

    button.addEventListener('click',()=>{

      const  productId = button.dataset.productId

      const cartItem = cart.find(item => item.id === productId)
      const indexInCart = cart.indexOf(cartItem)
      console.log(cart.splice(indexInCart,1));
      localStorage.setItem('cart',JSON.stringify(cart));

      console.log(productInCart.splice(0,productInCart.length));
      
renderCartItems()

      console.log(productInCart)

       renderPaymentSummary();     
       deleteCartItem()

    });

  });
      
};




function placeOrder(){


  const orderButton = document.querySelector('.js-place-order-button');

  const productsInOrder = [];
  orderButton.addEventListener('click',()=>{

    productsInOrder.splice(0,productsInOrder.length);

    cart.forEach((cartProduct)=>{

      const product = products.find(product => product.id === cartProduct.id)

    productsInOrder.push(product);
    })
    localStorage.setItem('productsInOrder',JSON.stringify(productsInOrder));

    console.log(productsInOrder);
  });
};





function getDeliveryOption(){

  let selectedDeliveryOption = null;

  const deliveryInputs = document.querySelectorAll('.js-delivery-option')

    // console.log(deliveryOptions.value)

  deliveryInputs.forEach((deliveryOption)=>{

    deliveryOption.addEventListener('change',()=>{

    const productId = deliveryOption.dataset.productId;
    const deliveryOptionId = deliveryOption.dataset.deliveryId

    const cartItemForSelectedDeliveryOption = cart.find(cartItem => cartItem.id === productId);

    cartItemForSelectedDeliveryOption.deliveryOption = deliveryOptionId

    localStorage.setItem('cart',JSON.stringify(cart));

    renderCartItems();
    renderPaymentSummary()

    getDeliveryOption();

  });

  });
};
