import { productData } from './productData.js'
import { cart } from './cart.js'
import { samsungData } from './samsung.js'
import { priceRangeData } from './pricerange.js'
import { sizeData } from './size.js'


let quantityInputs = document.querySelectorAll('#quantity')
for (var i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i]
  input.addEventListener('change', quantityChanged)
}


const generatingProducts = (productcatogary = productData) => {

  let productRow = document.querySelector('.product-row')
  return productRow.innerHTML = productcatogary.map((x) => {
    let { img, title, price, id } = x
    return `
    <div class="product | col-lg-3 col-md-4 col-sm-6" id="${id}">
      <div class="product-img">
        <img src="${img}" alt="hard drive" width="200px">
        <p class="product-title">${title}</p>
    </div>
    <div class="product-desc">  
      <div class="ratings">
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
    </div>  
      <span class="product-price">${price}</span>
    </div>
    <div class="product-icons">
      <i class="bi bi-cart-plus" cart-icon title="add to cart"></i>
      <i class="bi bi-eye" eye-icon title="view product"></i>
      <i class="bi bi-heart" wishlist-icon title="add to wishlist"></i>
    </div>
    </div>`
  }).join("")
  
}
generatingProducts()
let homePage = document.querySelector('.home')
homePage.addEventListener('click', ()=>{
  generatingProducts(productData)
  viewProduct()
  addingItemsToCart()

}) 

let brands = document.querySelectorAll('.brands-li')
brands.forEach(element =>
  element.addEventListener('click', (e)=>{
    if(e.target.innerHTML == "Samsung"){
      generatingProducts(samsungData)
      viewProduct()
      addingItemsToCart()
    }
    else if(e.target.innerHTML == "Rs. 1000-3000"){
      generatingProducts(priceRangeData)
      addingItemsToCart()
      viewProduct()
    }
    else if(e.target.innerHTML == "32GB"){
      generatingProducts(sizeData)
      addingItemsToCart()
      viewProduct()
    }
}))


function quantityChanged(e) {
  let input = e.target
  if (isNaN(input.value) || input.value < 1) {
    input.value = 1
  }
  updateCartTotal()
}


const showCart = () => {
  let cartIcons = document.querySelector('.cart-icons')
  cartIcons.addEventListener('click', () => {
    let cart = document.querySelector('.cart')
    let cartInner = document.querySelector('.cart-inner')
    let closeCartBtn = document.querySelector('.cart .cancel')

    cart.setAttribute('show-cart-before', 'show')
    cartInner.setAttribute('show-cart', 'show')

    closeCartBtn.addEventListener('click', closeCart)
    cart.addEventListener('click', closeCart)
    cartInner.addEventListener('click', (e) => {
      e.stopPropagation()
    })

    function closeCart() {
      cart.removeAttribute('show-cart-before')
      cartInner.removeAttribute('show-cart')
    }
  })

}
showCart()

let totalPriceEl = document.querySelector('.total-price')
const updateCartTotal = () => {
    let total = 0

    let priceEl = document.querySelectorAll('.price')
    let quantityEl = document.querySelectorAll('#quantity')
    
  let totalPrice = 0
  let removeSymbols = /[A-Za-z\.$]+/g
  priceEl.forEach(element =>{
    let parsedPrice = parseFloat(element.textContent.replace(removeSymbols, ""))
    totalPrice = totalPrice + parsedPrice
  })

  let inputVal = 0
  quantityEl.forEach(input =>{
    inputVal = input.value
  })

  total = total + (totalPrice * inputVal);
  totalPriceEl.textContent = total
}
let currencies = {
  usa: 280, 
  yuan: 45,
  pound: 340,
  riyal: 60,
  euro: 125
}
let productPrice = document.querySelectorAll('.product-price')
let currencyDropdown = document.querySelector('.currency-dropdown');


  const changeCurrency = (currencySymbol, currencyVal) => {

    gettingDefaultPrices()
    let removeSymbols = /[A-Za-z\.$]+/g

    productPrice.forEach(price =>{
      let priceEl = parseInt(price.textContent.replace(removeSymbols, ""))
      let newPrice = priceEl / currencyVal
      price.innerHTML = currencySymbol + newPrice.toFixed(2)
    })
    
  }
  let defaultPrices = []
const gettingDefaultPrices = () =>{

  productPrice.forEach(price =>{
    defaultPrices.push(price.innerHTML)

  })
    productPrice.forEach((price, index) =>{
      price.innerHTML = defaultPrices[index]
    })
}

currencyDropdown.addEventListener('change', () =>{
let {usa, euro, yuan, pound, riyal} = currencies
  if(currencyDropdown.value === 'USA'){
    changeCurrency('$ ', usa)
  }
  else if(currencyDropdown.value === 'EU'){
    changeCurrency('Eu ', euro)
  }
  else if(currencyDropdown.value === 'CHINA'){
    changeCurrency('Yu ', yuan)
  }
  else if(currencyDropdown.value === 'UK'){
    changeCurrency('P ', pound)
  }
  else if(currencyDropdown.value === 'GULF'){
    changeCurrency('SR ', riyal)
  }
  else if(currencyDropdown.value === 'PKR'){
    gettingDefaultPrices()
  }
  
}) 

const addingItemsToCart = () => {
  let cartPlus = document.querySelectorAll('[cart-icon]')
  cartPlus.forEach(item => {
    item.addEventListener('click', (e) => {
      let parentEl = e.target.parentElement.parentElement
      let productImg = parentEl.querySelector('.product-img img').src
      let productTitle = parentEl.querySelector('.product-title').innerHTML
      let productPrice = parentEl.querySelector('.product-price').innerHTML
      let productId = parentEl.id
      let title = document.querySelectorAll('.title')
      


      cart[0].img = productImg
      cart[0].title = productTitle
      cart[0].price = productPrice
      cart[0].id = productId
      let cartRow = document.querySelector('.cart-row')

      for(var i=0; i<title.length; i++){
        if(title[i].innerHTML === productTitle){
          alert('alredy added')
          return
        }
      }

      cartRow.innerHTML += cart.map((x) => {
        let { img, title, price, id } = x


          return `
          <div class="cart-product d-flex align-items-center gap-3 border" id="${id}">
          <div class="img">
          <img src="${img}" width="80px">
          </div>
          <div class="cart-desc">
          <div class="title">${title}</div>
          <div class="price text-blue">${price}</div>
          </div>
          <div class="d-flex justify-content-end align-items-center">
          <input type="number" value="1" id="quantity" style="width: 40px; height: 25px;">
          <i class="bi bi-trash text-blue fs-3" style="cursor: pointer;" title="remove item"></i>
          </div>
          </div>`
        })
        cartCount()
        document.querySelectorAll('.bi-trash').forEach(item => { item.addEventListener('click', removeItem) })
        document.querySelectorAll('#quantity').forEach(item => { item.addEventListener('change', quantityChanged) })
        
        updateCartTotal()
        console.log('item added to cart');
      
    })
  })
}
addingItemsToCart()

const cartCount = () => {
  let cartRow = document.querySelector('.cart-row')
  let count = cartRow.childElementCount
  document.querySelector('.cart-count').innerHTML = count
}

const removeItem = (e) => {
  let parentEl = e.target.parentElement.parentElement
  parentEl.remove()
  cartCount()
  updateCartTotal()
}
const viewProduct = () => {
  const eyeIcon = document.querySelectorAll('[eye-icon]')
  eyeIcon.forEach(item => {
    item.addEventListener('click', (e) => {
      let viewProductDetails = document.querySelector('.view-product')
      let viewProductInner = document.querySelector('.view-product-inner')
      viewProductDetails.setAttribute('show', '')
      viewProductInner.setAttribute('show', '')

      let parentEl = e.target.parentElement.parentElement
      let productImg = parentEl.querySelector('.product-img img').src
      let productTitle = parentEl.querySelector('.product-title').innerHTML
      let productPrice = parentEl.querySelector('.product-price').innerHTML


      viewProductInner.innerHTML = `
      <div class="d-flex flex-column align-items-center justify-content-center">
         <img src="${productImg}" width="300px" height="300px">
         <p class="title text-blue">${productTitle}</p>
         <div class="text-center">
             <p class="details">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam voluptatum, delectus, quam nesciunt ipsam ducimus error facilis suscipit quis velit alias ex fuga obcaecati eum iure atque, dolor eius! Ipsa?</p>
             <p class="price text-blue">${productPrice}</p>
            </div>
            <div class="text-end">
            <button class="add-cart-btn rounded-1">Add To Cart</button>
        </div>
        <div class="close-view position-absolute top-0 display-6" style="right: 10px; cursor: pointer;">&times;</div>
        </div>`

      document.querySelector('.close-view').addEventListener('click', closeView)
    })
  })
  closeView()
}
viewProduct()

function closeView() {
  let viewProductDetails = document.querySelector('.view-product')
  let viewProductInner = document.querySelector('.view-product-inner')

  viewProductDetails.addEventListener('click', closeView)
  viewProductInner.addEventListener('click', (e) => {
    e.stopPropagation()
  })
  viewProductDetails.removeAttribute('show')
  viewProductInner.removeAttribute('show')
}

let catogaries = document.querySelector('.catogaries')
let catogariesIcon = document.querySelector('.catogaries-icon')
let cancelBtn = document.querySelector('.remove-catogaries')

catogariesIcon.addEventListener('click', ()=>{
  catogaries.setAttribute('show', '')
})
cancelBtn.addEventListener('click', ()=>{
  catogaries.removeAttribute('show')
})

$(document).ready(function () {

  $("#search-bar").on("keyup", function () {
      var value = $(this).val().toLowerCase();

      $(".product").filter(function () {

          $(this).toggle($(this).text().toLowerCase().
              indexOf(value) > -1)
      });
  });
});

// let reviewBtn = document.querySelector('.review-btn')
// let newReview = document.createElement('div')

// reviewBtn.addEventListener('click', () =>{
//   let swiperInner = document.querySelector('.swiper-wrapper')
//   let reviewName = document.querySelector('#name').value
//   let msg = document.querySelector('#review-box').value
//   newReview.innerHTML = 'hello world' 
//   swiperInner.append(newReview.innerHTML)
// })






function animatingSearch() {

  let prevScrollPos = window.pageYOffset;
  const searchBar = document.getElementById("search-bar-div");

  window.addEventListener("scroll", () => {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
      // Scrolling up
      searchBar.classList.remove("show-bar");
    } else {
      // Scrolling down
      searchBar.classList.add("show-bar");
    }

    prevScrollPos = currentScrollPos;
  });

}
animatingSearch()

