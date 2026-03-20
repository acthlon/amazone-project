import {cart} from '../data/cart.js';
// import {saveCartToLocalStorage,totalCartQuantity} from './amazone.js';
import {products} from '../data/products.js'



let finalHtml = '';
let productInCart = [];


renderCartItems()
renderPaymentSummary()

deleteCartItem()








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

  const totalCartProducts = getCartProductTotal()
  const totalItemPrice = getTotalCartPrice()
  const shipping = 4.99
  const totalBeforeTax =Number((totalItemPrice + shipping).toFixed(2))
  const estimatedTax = ((0.1 * (getTotalCartPrice() + shipping))).toFixed(2)
  const totalCost = (totalBeforeTax + Number(estimatedTax)).toFixed(2)


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

  getCartProductFromProducts()

    productInCart.forEach((cartProduct)=>{
      let cartItemHtml = `
        <div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${cartProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${cartProduct.name}
                </div>
                <div class="product-price">
                  $${cartProduct.priceCents / 100}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartProduct.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id = ${cartProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-2">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" checked class="delivery-option-input"
                    name="delivery-option-2">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-2">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
        finalHtml +=cartItemHtml;
    });

  
    const cartItemContainer = document.querySelector('.js-order-summary')

    const itemCount = document.querySelector('.js-item-count')

    itemCount.innerHTML = cartCount()
    cartItemContainer.innerHTML = finalHtml;
};


function updateCartPage(){
  document.querySelector('.js-order-summary').innerHTML = finalHtml
  };

    
function getCartProductTotal(){
    let totalProducts = 0;

  productInCart.forEach((cartProduct)=>{
  totalProducts += cartProduct.quantity;
  });
  return totalProducts;
};



function getTotalCartPrice(){
  let priceTotal = 0;
  productInCart.forEach((cartProducts)=>{
      const subTotal = cartProducts.quantity * (cartProducts.priceCents / 100)
      priceTotal +=subTotal
  });
  return Number(priceTotal.toFixed(2));
};




function getCartProductFromProducts(){
        
        let productFromCart = null; 
        cart.forEach((cartItem)=>{
  
        let cartItemId = cartItem.id

      products.forEach((productItem)=>{
        productFromCart = products.find((productItem) => productItem.id === cartItemId);
        productFromCart.quantity = cartItem.quantity
        
      });
    productInCart.push(productFromCart);   
    });

return productInCart;
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



export function placeOrder(){

  const orderButton = document.querySelector('.js-place-order-button');

  const productsInOrder = []
  orderButton.addEventListener('click',()=>{

    productInCart.push(productsInOrder);

  })
}
