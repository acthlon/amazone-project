import {productsInOrder} from "../data/orderItems.js";
import {totalCartQuantity} from "./amazone.js";


let finalHtml = ''

renderOrderProducts()
document.querySelector('.js-cart-quantity').innerHTML = totalCartQuantity()


function renderOrderProducts(){
    
    productsInOrder.forEach((productItem)=>{

      const orderProductHtml = `

            <div class="product-image-container">
              <img src="${productItem.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${productItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: August 15
              </div>
              <div class="product-quantity">
                Quantity: ${productItem.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
        `;
    finalHtml += orderProductHtml;    

    });
   

        const orderDetail = document.querySelector('.js-order-details-grid');

        orderDetail.innerHTML = finalHtml;
};