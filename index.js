const products = [
  {
    id: "drift-denim-jacket",
    name: "Drift Denim Jacket",
    price: 78,
    tag: "Outerwear",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "silkline-blouse",
    name: "Silkline Blouse",
    price: 52,
    tag: "Soft Basics",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ember-knit-dress",
    name: "Ember Knit Dress",
    price: 64,
    tag: "Evening",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "coastline-trousers",
    name: "Coastline Trousers",
    price: 59,
    tag: "Tailored",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: "canvas-sneakers",
    name: "Canvas Sneakers",
    price: 45,
    tag: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sage-sweater",
    name: "Sage Sweater",
    price: 58,
    tag: "Layering",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=600&q=80",
  },
];

const grid = document.querySelector("[data-product-grid]");

const renderProducts = () => {
  if (!grid) return;
  grid.innerHTML = products
    .map(
      (product) => `
      <article class="card">
        <img src="${product.image}" alt="${product.name}">
        <span class="tag">${product.tag}</span>
        <div>
          <h3>${product.name}</h3>
          <p class="price">${Store.formatCurrency(product.price)}</p>
        </div>
        <button class="button primary" data-add="${product.id}">Add to Cart</button>
      </article>
    `
    )
    .join("");

  grid.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = products.find((item) => item.id === btn.dataset.add);
      if (!product) return;
      Store.addToCart(product, 1);
      btn.textContent = "Added ✓";
      setTimeout(() => (btn.textContent = "Add to Cart"), 1000);
    });
  });
};

renderProducts();
