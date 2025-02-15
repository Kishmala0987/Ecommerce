var menuItems = document.getElementById("menu-items");
menuItems.style.maxHeight = "0px";
function menutoggle() {
    if (menuItems.style.maxHeight == "0px") {
        menuItems.style.maxHeight = "200px";
    }
    else {
        menuItems.style.maxHeight = "0px";
    }
}
/*----for product gallery details------*/
var product_img = document.getElementById("product-img");
var smallImg = document.getElementsByClassName("small-img");

for (let i = 0; i < smallImg.length; i++) {
    smallImg[i].onclick = function () {
        product_img.src = smallImg[i].src;
    }
}
/*-----for account-----*/
var loginForm = document.getElementById("Login-Form");
var RegForm = document.getElementById("Reg-Form");
var Indicator = document.getElementById("Indicator");
const login=document.getElementById('login');
const register=document.getElementById('register');
login.addEventListener('click',()=>{
    RegForm.style.transform = "translateX(300px)";
    loginForm.style.transform = "translateX(300px)";
    Indicator.style.transform = "translateX(0px)";
})
register.addEventListener('click',()=>{
    RegForm.style.transform = "translateX(0px)";
    loginForm.style.transform = "translateX(0px)";
    Indicator.style.transform = "translateX(100px)";
})


/*--cart--*/
let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let cartbtn = document.querySelectorAll('.addCrta-btn')
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');


let listProducts = [];
export let carts = [];
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})
cartbtn.forEach((button) => {
    button.addEventListener('click', (event) => {
        let productElement = event.target.closest('.col-4');
        let product_id = productElement.dataset.id;
        let productName = productElement.querySelector('h4').innerText;
        let productPrice = parseFloat(productElement.querySelector('p').innerText.replace('$', ''));
        let productImage = productElement.querySelector('img').src;
        addToCart({ product_id, productName, productPrice, productImage });
    });
});

// Function to add product to cart
const addToCart = ({ product_id, productName, productPrice, productImage }) => {
    // Check if product already exists in the cart
    let productIndex = carts.findIndex((value) =>
        value.product_id == product_id);

    if (carts.length <= 0) {
        carts = [{
            product_id,
            productName,
            productPrice,
            productImage,
            quantity: 1
        }]
    }
    else if (productIndex < 0) {
        carts.push({
            product_id,
            productName,
            productPrice,
            productImage,
            quantity: 1
        });
    }
    else {
        // Product exists, increment its quantity
        carts[productIndex].quantity = carts[productIndex].quantity + 1;
    }
    addCartToHTMl();
    addCartToMemory();
}

export const addCartToHTMl = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;

    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('itemCart');
            newCart.dataset.id = cart.product_id;
            newCart.innerHTML = `
            <div class="image-cart">
            <img src="${cart.productImage}" alt="">
            </div>
            <div class="item-name">
                        ${cart.productName}
            </div>
            <div class="Cart-totalPrice">
                        $${(cart.productPrice * cart.quantity)}
            </div>
            <div class="cart-quantity">
                <span class="minus">-</span>
                <span class="quantity">${cart.quantity}</span>
                <span class="plus">+</span>
                </div>`;
            listCartHTML.appendChild(newCart);
        });
    }
    else {
        // Show "Cart is Empty" message
        let emptyMessage = document.createElement('div');
        emptyMessage.classList.add('emptyCartMessage');
        emptyMessage.innerText = 'Your Cart is Empty';
        listCartHTML.appendChild(emptyMessage);
    }
    iconCartSpan.innerText = totalQuantity;

}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));

}
listCartHTML.addEventListener('click', (event) => {
    let posClick = event.target;

    if (posClick.classList.contains('minus') || posClick.classList.contains('plus')) {
        let itemCart = posClick.closest('.itemCart'); // Find the closest parent with class 'itemCart'
        let product_id = itemCart.dataset.id; // Access its dataset.id
        let type = posClick.classList.contains('plus') ? 'plus' : 'minus';

        changeQuantity(product_id, type);
    }
});

const changeQuantity = (product_id, type) => {
    let posItemInCart = carts.findIndex(value => value.product_id == product_id);

    if (posItemInCart >= 0) {
        if (type === 'plus') {
            carts[posItemInCart].quantity += 1;
        } else {
            carts[posItemInCart].quantity -= 1;

            if (carts[posItemInCart].quantity <= 0) {
                carts.splice(posItemInCart, 1);
            }
        }
    }

    addCartToMemory();
    addCartToHTMl();
};

/*const initApp = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            listProducts = products;
            renderProductList(); // You can define this function to render products on the page
        })
        .catch(error => console.error('Error fetching products:', error));

    if (localStorage.getItem('cart')) {
        carts = JSON.parse(localStorage.getItem('cart'));
        if (Array.isArray(carts) && carts.length > 0) {
            addCartToHTMl();
        }
    }
};

initApp();*/


