import {cart} from "./checkout.js";
import {products} from "../data/products.js";


let finalHtml = '';
let productGrid = document.querySelector('.products-grid');
renderProducts();
totalCartQuantity();

      


productGrid.innerHTML = finalHtml;

const addToCartButton = document.querySelectorAll('.js-add-to-cart')
addToCartButton.forEach((cartButton,index)=>{

cartButton.addEventListener('click',()=>{

  const dataObject = cartButton.dataset

  const productId = dataObject.productId;
  
  addToCart(productId)
  totalCartQuantity()

  });
});




let selectQuantity = document.querySelectorAll('.js-select-option')

selectQuantity.forEach((select)=>{

  select.addEventListener('change',()=>{
  const productId = select.dataset.productId;
    selectedquantityCartUpdate(productId,select);
  });
});



function renderProducts(){

  products.forEach((product,index)=>{
    
    const html = `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src=${product.image}>
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-40.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${product.priceCents}
    </div>

    <div class="product-quantity-container " >
      <select class="js-select-option" data-product-id=${product.id}>
        <option selected value="1">1</option>
        <option value="2" class = "js-option" >2</option>
        <option value="3" class = "js-option"  >3</option>
        <option value="4" class = "js-option"  >4</option>
        <option value="5" class = "js-option"  >5</option>
        <option value="6" class = "js-option"  >6</option>
        <option value="7" class = "js-option"  >7</option>
        <option value="8" class = "js-option"  >8</option>
        <option value="9" class = "js-option"  >9</option>
        <option value="10" class = "js-option"  >10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
      Add to Cart
    </button>
  </div>`

  finalHtml += html
  })
};







function addToCart(productId){
  let matchingItem = null

  /* cart.forEach((item)=>{
  if(productId === item.id){
      matchingItem = item;
  };
  }); */

/*

  // shorter form

  matchingItem = cart.find((item)=>{
  return item.id === productId
  })

  */

  // shorter form

  matchingItem = cart.find((item)=> item.id === productId)

  /*
  if(matchingItem){
  const itemPushToCart = cart.push({
                          id : productId,
                          quantity : 1
                          })

  matchingItem.quantity += 1;
  }else{
  itemPushToCart
  };
      */
  // shorter form (tenary operator)

  matchingItem ? matchingItem.quantity += 1 : cart.push({
                                              id : productId,
                                              quantity : 1
                                          })


  localStorage.setItem('cart',JSON.stringify(cart))
  console.log(cart)
};






function totalCartQuantity(){
  let totalQuantity = 0;

  cart.forEach((item)=>{
      totalQuantity += item.quantity;
  })
  document.querySelector('.js-cart-quantity').innerHTML = totalQuantity

  //console.log(totalQuantity)
  //console.log(typeof totalQuantity)
  }




function selectedquantityCartUpdate(productId,select){

  let matchingItem = null;
      cart.forEach((cartItem)=>{
  console.log(`caet item is ${cartItem}`)
  if(productId === cartItem.id ){
      matchingItem = cartItem;

  };
  });


  if(matchingItem){

      matchingItem.quantity += Number(select.value)
      totalCartQuantity()
      console.log(cart)
  }else{
      addToCart(productId)
      totalCartQuantity()
      console.log(cart)
  };
};
    