// Load existing cart or create new one
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  saveCart();
}

function showAlert(message) {
  const alertBox = document.createElement("div");
  alertBox.className = "alert alert-success text-center";
  alertBox.textContent = message;
  document.body.prepend(alertBox);
  setTimeout(() => alertBox.remove(), 2500);
}

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const quantityInput = button.previousElementSibling;
      const quantity = parseInt(quantityInput.value) || 1;

      const product = {
        id: button.getAttribute("data-id"),
        name: button.getAttribute("data-name"),
        price: parseFloat(button.getAttribute("data-price")),
        image: button.getAttribute("data-image"),
        quantity: quantity
      };

      addToCart(product);
      showAlert(`${product.name} added to cart (x${quantity})`);
    });
  });
});