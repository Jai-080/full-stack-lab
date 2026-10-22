import React, { useState, useEffect } from "react";
import "./App.css";

const API = "http://localhost:5000/api/products";

const initialProducts = [
  {
    _id: "p1",
    title: "Dell Inspiron Laptop (i5, 8GB RAM)",
    description: "Well maintained student laptop with charger and protective sleeve. Excellent battery health.",
    price: 25000,
    seller: "Ravi Kumar",
    contact: "ravi@example.com",
    category: "Electronics"
  },
  {
    _id: "p2",
    title: "Hercules Mountain Bicycle",
    description: "21-speed gears, front suspension, barely ridden for 3 months. Perfect for campus commuting.",
    price: 5000,
    seller: "Anjali Sharma",
    contact: "anjali@example.com",
    category: "Bikes & Vehicles"
  },
  {
    _id: "p3",
    title: "Mechanical Keyboard (RGB Blue Switches)",
    description: "Custom mechanical gaming & coding keyboard with hot-swappable tactile switches.",
    price: 2400,
    seller: "Jayachandran",
    contact: "jaya@example.com",
    category: "Accessories"
  }
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    seller: "",
    contact: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadProducts = async () => {
    try {
      const res = await fetch(API);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setProducts(data);
        }
      }
    } catch (err) {
      console.log("Backend offline, using local listings");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.seller || !form.contact) {
      alert("Please fill in all required fields!");
      return;
    }

    setIsSubmitting(true);
    const newProduct = {
      _id: "p" + Date.now(),
      ...form,
      price: Number(form.price),
    };

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        loadProducts();
      } else {
        setProducts([newProduct, ...products]);
      }
    } catch (err) {
      // Local fallback
      setProducts([newProduct, ...products]);
    }

    setForm({ title: "", description: "", price: "", seller: "", contact: "" });
    setIsSubmitting(false);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.seller && p.seller.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="marketplace-wrapper">
      <header className="market-header">
        <div className="header-logo-group">
          <span className="logo-badge">🏷️</span>
          <div>
            <h1>Classifieds Marketplace</h1>
            <p className="logo-sub">Browse verified local listings &bull; Post items for sale</p>
          </div>
        </div>

        <div className="header-stats">
          <span className="stat-pill">📦 {products.length} Active Listings</span>
        </div>
      </header>

      <div className="container">
        {/* Post Advertisement Section */}
        <section className="post-section">
          <div className="section-title-wrap">
            <h2>📢 Post a Classified Ad</h2>
            <p className="section-desc">Reach thousands of buyers in your local campus community</p>
          </div>

          <form onSubmit={addProduct} className="form-grid">
            <div className="form-field full-width">
              <label>Product Title *</label>
              <input
                name="title"
                placeholder="e.g. Ergonomic Office Chair, Apple iPad Air..."
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field full-width">
              <label>Item Description *</label>
              <textarea
                name="description"
                rows="2"
                placeholder="Provide details about condition, specifications, age, and reason for sale..."
                value={form.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-field">
              <label>Price (₹) *</label>
              <input
                name="price"
                type="number"
                min="0"
                placeholder="e.g. 2500"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Seller Name *</label>
              <input
                name="seller"
                placeholder="e.g. Jayachandran"
                value={form.seller}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Contact Email *</label>
              <input
                name="contact"
                type="email"
                placeholder="e.g. jaya@example.com"
                value={form.contact}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field submit-field">
              <button type="submit" className="post-btn" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "+ Publish Listing"}
              </button>
            </div>
          </form>
        </section>

        {/* Listings Section */}
        <section className="listings-section">
          <div className="listings-bar">
            <div>
              <h2>Available Listings</h2>
              <span className="count-label">Showing {filteredProducts.length} items</span>
            </div>

            <div className="search-wrap">
              <input
                type="text"
                placeholder="🔍 Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-listings">
              <span className="no-icon">📦</span>
              <p>No products match your search.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((p) => (
                <div key={p._id} className="product-card">
                  <div className="card-top-bar">
                    <span className="category-pill">{p.category || "Classified"}</span>
                    <span className="price-tag">₹{p.price.toLocaleString()}</span>
                  </div>

                  <h3 className="product-title">{p.title}</h3>
                  <p className="product-desc">{p.description}</p>

                  <div className="card-footer">
                    <div className="seller-box">
                      <span className="seller-icon">👤</span>
                      <div className="seller-meta">
                        <span className="seller-name">{p.seller}</span>
                        <a href={`mailto:${p.contact}`} className="seller-email">
                          {p.contact}
                        </a>
                      </div>
                    </div>

                    <a href={`mailto:${p.contact}?subject=Inquiry%20about%20${encodeURIComponent(p.title)}`} className="contact-btn">
                      Contact Seller &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
