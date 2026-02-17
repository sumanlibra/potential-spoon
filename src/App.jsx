import { useMemo, useState } from 'react'

const products = [
  {
    id: 1,
    name: 'Linen Summer Shirt',
    category: 'Men',
    price: 48,
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Tailored Wide-Leg Trousers',
    category: 'Women',
    price: 62,
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Organic Cotton Hoodie',
    category: 'Unisex',
    price: 54,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1619603364904-c0498317e145?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Minimal Knit Dress',
    category: 'Women',
    price: 76,
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Selvedge Denim Jacket',
    category: 'Men',
    price: 88,
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'Relaxed Cargo Pants',
    category: 'Unisex',
    price: 59,
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
  },
]

export default function App() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [cart, setCart] = useState([])

  const categories = ['All', ...new Set(products.map((product) => product.category))]

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase())
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory
      return matchesQuery && matchesCategory
    })
  }, [query, selectedCategory])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  )

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">New Season • Fresh Drop</p>
          <h1>North Thread Clothing Co.</h1>
          <p className="hero-copy">
            Elevated essentials and everyday silhouettes designed for comfort, crafted
            with premium fabrics.
          </p>
        </div>
        <div className="cart-pill">🛍️ Cart {cartCount}</div>
      </header>

      <main className="layout">
        <section className="catalog">
          <div className="section-head">
            <h2>Shop Clothing</h2>
            <span>{filteredProducts.length} items</span>
          </div>

          <div className="controls">
            <input
              type="search"
              placeholder="Search shirts, hoodies, trousers..."
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
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="card-content">
                  <p className="category">{product.category}</p>
                  <h3>{product.name}</h3>
                  <p className="rating">⭐ {product.rating.toFixed(1)}</p>
                  <div className="card-footer">
                    <strong>${product.price.toFixed(2)}</strong>
                    <button onClick={() => addToCart(product)}>Add</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="cart">
          <h2>Order Summary</h2>
          {cart.length === 0 ? (
            <p className="empty">Your bag is empty. Add your favorite looks.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.name} <small>x {item.quantity}</small>
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
  )
}
