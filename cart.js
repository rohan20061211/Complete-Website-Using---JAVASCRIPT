const cartList = document.querySelector("[data-cart-list]");
const emptyState = document.querySelector("[data-cart-empty]");
const subtotalNode = document.querySelector("[data-subtotal]");
const taxNode = document.querySelector("[data-tax]");
const totalNode = document.querySelector("[data-total]");

const renderCart = () => {
  const cart = Store.getCart();
  if (cart.length === 0) {
    cartList.innerHTML = "";
    emptyState.style.display = "block";
    updateSummary();
    return;
  }

  emptyState.style.display = "none";
  cartList.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>${item.tag}</p>
          <p class="price">${Store.formatCurrency(item.price)}</p>
          <div class="qty-control">
            <button class="button secondary" data-dec="${item.id}">-</button>
            <input type="number" min="1" value="${item.qty}" data-qty="${item.id}">
            <button class="button secondary" data-inc="${item.id}">+</button>
          </div>
        </div>
        <div>
          <button class="button secondary" data-remove="${item.id}">Remove</button>
        </div>
      </div>
    `
    )
    .join("");

  cartList.querySelectorAll("[data-inc]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = Store.getCart().find((entry) => entry.id === btn.dataset.inc);
      if (item) Store.updateQty(item.id, item.qty + 1);
      renderCart();
    });
  });

  cartList.querySelectorAll("[data-dec]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = Store.getCart().find((entry) => entry.id === btn.dataset.dec);
      if (item) Store.updateQty(item.id, item.qty - 1);
      renderCart();
    });
  });

  cartList.querySelectorAll("[data-qty]").forEach((input) => {
    input.addEventListener("change", () => {
      Store.updateQty(input.dataset.qty, input.value);
      renderCart();
    });
  });

  cartList.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      Store.removeFromCart(btn.dataset.remove);
      renderCart();
    });
  });

  updateSummary();
};

const updateSummary = () => {
  const subtotal = Store.getSubtotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  subtotalNode.textContent = Store.formatCurrency(subtotal);
  taxNode.textContent = Store.formatCurrency(tax);
  totalNode.textContent = Store.formatCurrency(total);
};

renderCart();
