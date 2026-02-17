import { useMemo, useState } from 'react';

const products = [
  { id: 1, name: 'Classic Tee', category: 'Clothing', price: 24.99, image: '👕' },
  { id: 2, name: 'Running Shoes', category: 'Footwear', price: 69.99, image: '👟' },
  { id: 3, name: 'Leather Wallet', category: 'Accessories', price: 34.99, image: '👛' },
  { id: 4, name: 'Wireless Headphones', category: 'Electronics', price: 129.99, image: '🎧' },
  { id: 5, name: 'Sports Watch', category: 'Electronics', price: 89.99, image: '⌚' },
  { id: 6, name: 'Travel Backpack', category: 'Accessories', price: 54.99, image: '🎒' }
];

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="page">
      <header className="topbar">
        <h1>FreshCart</h1>
        <span className="cart-pill">Cart: {cartCount}</span>
      </header>

      <main className="layout">
        <section className="catalog">
          <h2>Shop Products</h2>

          <div className="controls">
            <input
              type="search"
              placeholder="Search products"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="grid">
            {filteredProducts.map((product) => (
              <article className="card" key={product.id}>
                <div className="emoji" aria-hidden>
                  {product.image}
                </div>
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <strong>${product.price.toFixed(2)}</strong>
                <button onClick={() => addToCart(product)}>Add to cart</button>
              </article>
            ))}
          </div>
        </section>

        <aside className="cart">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p className="empty">No items yet.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <div>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <footer>
            <span>Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </footer>
        </aside>
      </main>
    </div>
  );
}
