const summaryList = document.querySelector("[data-summary-list]");
const summaryTotal = document.querySelector("[data-summary-total]");
const checkoutForm = document.querySelector("[data-checkout-form]");
const successPanel = document.querySelector("[data-success]");

const renderSummary = () => {
  const cart = Store.getCart();
  if (cart.length === 0) {
    summaryList.innerHTML = "<p class=\"notice\">Your cart is empty. Add items before checkout.</p>";
    summaryTotal.textContent = Store.formatCurrency(0);
    return;
  }

  summaryList.innerHTML = cart
    .map(
      (item) => `
      <div class="summary-row">
        <span>${item.name} × ${item.qty}</span>
        <strong>${Store.formatCurrency(item.price * item.qty)}</strong>
      </div>
    `
    )
    .join("");

  summaryTotal.textContent = Store.formatCurrency(Store.getSubtotal());
};

const handleSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(checkoutForm);
  const payload = Object.fromEntries(formData.entries());

  if (Store.getCart().length === 0) {
    alert("Your cart is empty.");
    return;
  }

  localStorage.setItem("clothify_last_order", JSON.stringify(payload));
  Store.clearCart();
  checkoutForm.reset();
  successPanel.style.display = "block";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
};

checkoutForm.addEventListener("submit", handleSubmit);
renderSummary();
