// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clrbtn = document.getElementById("clear-cart-btn");

// --- Utility functions ---
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// --- Render product list ---
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // attach add-to-cart event listeners
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(parseInt(btn.dataset.id));
    });
  });
}

// --- Render cart list ---
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  if (cart.length === 0) {
    // keep ul empty (important for Cypress tests)
    return;
  }

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} 
      <button class="remove-from-cart-btn" data-index="${index}">Remove</button>`;
    cartList.appendChild(li);
  });

  // attach remove event listeners
  document.querySelectorAll(".remove-from-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(parseInt(btn.dataset.index));
    });
  });
}

// --- Add item to cart ---
function addToCart(productId) {
  const cart = getCart();  // get existing cart from sessionStorage
  const product = products.find((p) => p.id === productId);
  cart.push(product);      // add product to cart
  saveCart(cart);          // save back to sessionStorage
  renderCart();
}

// --- Remove item from cart ---
function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

// --- Clear cart ---
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// attach clear button listener
clrbtn.addEventListener("click", clearCart);

// --- Initial render ---
renderProducts();
renderCart();
