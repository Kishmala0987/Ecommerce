import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref,onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
  databaseURL:"https://orders-d51bc-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const item = document.getElementById("cart-items");
const app = initializeApp(appSettings);
const database = getDatabase(app);
const productNameInDB = ref(database, "productName");
const productQuantityInDB = ref(database, "producQuantity");
const priceInDB = ref(database, "price");



//fetching data//
onValue(productNameInDB, function(snapshot) {
  // Fetch the values from Firebase
  let productNames = Object.values(snapshot.val());
  
  // Fetch product quantities
  onValue(productQuantityInDB, function(quantitySnapshot) {
    let productQuantities = Object.values(quantitySnapshot.val());
    
    // Fetch product prices
    onValue(priceInDB, function(priceSnapshot) {
      let productPrices = Object.values(priceSnapshot.val());

      
      // Loop through the fetched data and add it to the HTML
      for (let i = 0; i < productNames.length; i++) {
        let valName = productNames[i];
        let valQuantity = productQuantities[i];  // Corrected to fetch quantity
        let valPrice = productPrices[i];         // Corrected to fetch price
        
        // Adding each product name, quantity, and price to the HTML
        addtoHTML(valName, valQuantity, valPrice);
      }
    });
  });
});

function addtoHTML(valName, valQuantity, valPrice) {
  // Get the tbody element by its ID
  const tbody = document.getElementById('cart-items');

  // Create a new row and cells
  const row = document.createElement('tr');
  const nameCell = document.createElement('td');
  const quantityCell = document.createElement('td');
  const priceCell = document.createElement('td');

  // Set the text content of each cell
  nameCell.textContent = valName;
  quantityCell.textContent = valQuantity;
  priceCell.textContent = valPrice;

  // Append the cells to the row
  row.appendChild(nameCell);
  row.appendChild(quantityCell);
  row.appendChild(priceCell);

  // Append the row to the tbody
  tbody.appendChild(row);
}

function clearItemsListEl() {
  item.innerHTML = ""
}