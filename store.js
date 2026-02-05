(() => {
  const STORAGE_KEY = "clothify_cart_v1";

  const formatCurrency = (value) => {
    const formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
    return formatted.replace("₹", "Rs ");
  };

  const getCart = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const saveCart = (cart) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
  };

  const addToCart = (product, qty = 1) => {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...product, qty });
    }
    saveCart(cart);
  };

  const updateQty = (id, qty) => {
    const cart = getCart();
    const item = cart.find((entry) => entry.id === id);
    if (!item) return;
    item.qty = Math.max(1, Number(qty) || 1);
    saveCart(cart);
  };

  const removeFromCart = (id) => {
    const cart = getCart().filter((entry) => entry.id !== id);
    saveCart(cart);
  };

  const clearCart = () => {
    localStorage.removeItem(STORAGE_KEY);
    updateCartCount();
  };

  const getSubtotal = () =>
    getCart().reduce((sum, item) => sum + item.price * item.qty, 0);

  const getCartCount = () =>
    getCart().reduce((sum, item) => sum + item.qty, 0);

  const updateCartCount = () => {
    const count = getCartCount();
    document.querySelectorAll("[data-cart-count]").forEach((node) => {
      node.textContent = count;
    });
  };

  window.Store = {
    getCart,
    saveCart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    getSubtotal,
    getCartCount,
    formatCurrency,
    updateCartCount,
  };

  document.addEventListener("DOMContentLoaded", updateCartCount);
})();
