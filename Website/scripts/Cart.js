document.addEventListener('DOMContentLoaded', () => {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTable = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  function renderCart() {
    cartTable.innerHTML = '';
    let total = 0;

    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td>$${itemTotal.toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Remove</button></td>
      `;
      cartTable.appendChild(row);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  renderCart();

  // Handle remove with quantity prompt
  cartTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const index = parseInt(e.target.dataset.index);
      const item = cartItems[index];

      const inputQty = prompt(`How many units of "${item.name}" (in cart: ${item.quantity}) do you want to remove?`);
      const removeQty = parseInt(inputQty);

      if (!isNaN(removeQty) && removeQty > 0) {
        if (removeQty >= item.quantity) {
          cartItems.splice(index, 1); // Remove entire product
        } else {
          item.quantity -= removeQty; // Reduce quantity
        }
        saveCart();
        renderCart();
      } else {
        alert("Invalid quantity.");
      }
    }
  });
});