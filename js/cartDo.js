document.addEventListener("DOMContentLoaded", function () {
  const decreaseBtns = document.querySelectorAll(".decrease");
  const increaseBtns = document.querySelectorAll(".increase");
  const removeBtns = document.querySelectorAll(".remove-item");
  const quantityValues = document.querySelectorAll(".quantity-value");
  const totalPrice = document.querySelector(".cart-total-price");

  const prices = [3900, 3300, 2600]; // Prices for Raiden, Rias, and Okumura cards

  function updateTotalPrice() {
    let total = 0;
    document.querySelectorAll(".cart-item").forEach((item, index) => {
      const quantity = parseInt(
        item.querySelector(".quantity-value").textContent
      );
      total += prices[index] * quantity;
    });
    totalPrice.textContent = `रु ${total}`;
  }

  // Handle quantity change
  decreaseBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const quantity = parseInt(quantityValues[index].textContent);
      if (quantity > 1) {
        quantityValues[index].textContent = quantity - 1;
        updateTotalPrice();
      }
    });
  });

  increaseBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const quantity = parseInt(quantityValues[index].textContent);
      quantityValues[index].textContent = quantity + 1;
      updateTotalPrice();
    });
  });

  // Handle item removal
  removeBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const item = btn.closest(".cart-item");
      item.remove();
      updateTotalPrice();
    });
  });

  // Initial total price calculation
  updateTotalPrice();
});
