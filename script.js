// Products list
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM references
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Get cart from sessionStorage
function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render products
function renderProducts() {
  productList.innerHTML = ""; 

  products.forEach((product) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${product.name} - $${product.price} `;
    li.appendChild(span);

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";

    btn.addEventListener("click", () => {
      addToCart(product.id);
    });

    li.appendChild(btn);
    productList.appendChild(li);
  });
}

// Render cart
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}


function addToCart(productId) {
  let cart = getCart();
  const product = products.find((p) => p.id === productId);
  if (product) {
cart.push({ id: product.id, name: product.name, price: product.price });
    saveCart(cart);
      saveCart(cart);
      renderCart();
    }
  }
}

// Clear cart
clearCartBtn.addEventListener("click", () => {
  sessionStorage.removeItem("cart");
  renderCart();
});

// Initialize
renderProducts();
renderCart();
