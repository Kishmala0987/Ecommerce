import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref,push,onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { addCartToHTMl,carts } from "./script.js"
const appSettings = {
  databaseURL:"https://orders-d51bc-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const productNameInDB = ref(database, "productName")
const productQuantityInDB = ref(database, "producQuantity")
const priceInDB = ref(database, "price")


const addButtonEl = document.getElementById("checkout-btn")

addButtonEl.addEventListener("click", () => {
  const cartElements = document.querySelectorAll('.itemCart');

  cartElements.forEach(cartElement => {
    const product_name = cartElement.querySelector('.item-name')?.innerText.trim();
    const product_quantity = cartElement.querySelector('.quantity')?.innerText.trim();
    const amount = cartElement.querySelector('.Cart-totalPrice')?.innerText.trim();

    if (product_name) {
      push(productNameInDB, product_name);
      push(productQuantityInDB, product_quantity);
      push(priceInDB, amount);
      console.log(`${product_name} added to database`);

    } 
  });
  cleardata();
});
function cleardata(){
  localStorage.removeItem("cart");
    carts.length = 0; // Correct way to empty the array
    addCartToHTMl();
};

//fetching data//
onValue(productNameInDB,function(snapshot){
  console.log(snapshot)
})
