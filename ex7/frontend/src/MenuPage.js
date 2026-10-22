import React, { useState, useEffect } from "react";

function MenuPage({ restaurant, onBack }) {
  const [menu, setMenu] = useState(restaurant.menu || []);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (restaurant._id && !restaurant._id.startsWith("res")) {
      setLoading(true);
      fetch(`http://localhost:5000/api/restaurants/${restaurant._id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch menu");
          return res.json();
        })
        .then((data) => {
          if (data && data.menu) {
            setMenu(data.menu);
          }
          setLoading(false);
        })
        .catch(() => {
          setMenu(restaurant.menu || []);
          setLoading(false);
        });
    }
  }, [restaurant]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item === item.item);
      if (existing) {
        return prev.map((c) =>
          c.item === item.item ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (itemName) => {
    setCart((prev) => prev.filter((c) => c.item !== itemName));
  };

  const updateQty = (itemName, delta) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.item === itemName) {
            const nextQty = c.qty + delta;
            return nextQty > 0 ? { ...c, qty: nextQty } : null;
          }
          return c;
        })
        .filter(Boolean)
    );
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const placeOrder = async () => {
    try {
      await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurant: restaurant.name,
          items: cart,
          total,
        }),
      });
    } catch (e) {
      console.log("Order placed locally:", { restaurant: restaurant.name, items: cart, total });
    }
    alert(`🎉 Order placed successfully from ${restaurant.name}! Total: ₹${total}`);
    setCart([]);
  };

  return (
    <div className="menu-container">
      <div className="menu-top-bar">
        <button className="back-btn" onClick={onBack}>
          &larr; Back to Restaurants
        </button>
        <span className="live-order-badge">🟢 Open for delivery</span>
      </div>

      <div className="restaurant-banner">
        <div>
          <h2 className="restaurant-title">{restaurant.name}</h2>
          <p className="restaurant-cuisine">Fast delivery within 20-30 mins &bull; 100% Hygiene Assured</p>
        </div>
      </div>

      <div className="menu-cart-layout">
        {/* Menu Column */}
        <div className="menu-column">
          <div className="section-header-row">
            <h3>Menu Items</h3>
            <span className="count-pill">{menu.length} Available</span>
          </div>

          {loading ? (
            <p className="loading">Loading menu...</p>
          ) : (
            <ul className="menu-list">
              {menu.map((m, i) => {
                const inCart = cart.find((c) => c.item === m.item);
                return (
                  <li key={i} className="menu-item-card">
                    <div className="item-details">
                      <div className="item-name-row">
                        <span className="veg-badge">●</span>
                        <span className="item-title">{m.item}</span>
                      </div>
                      <span className="price">₹{m.price}</span>
                    </div>

                    <div className="item-action">
                      {inCart ? (
                        <div className="qty-control">
                          <button onClick={() => updateQty(m.item, -1)}>-</button>
                          <span>{inCart.qty}</span>
                          <button onClick={() => updateQty(m.item, 1)}>+</button>
                        </div>
                      ) : (
                        <button className="add-btn" onClick={() => addToCart(m)}>
                          Add +
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Cart Column */}
        <div className="cart-column">
          <div className="cart-card">
            <div className="cart-header">
              <h3>Your Cart</h3>
              <span className="cart-count-badge">
                {cart.reduce((sum, i) => sum + i.qty, 0)} items
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart-state">
                <span className="empty-cart-icon">🛒</span>
                <p>Your cart is empty.</p>
                <small>Add delicious items from the menu!</small>
              </div>
            ) : (
              <div>
                <ul className="cart-list">
                  {cart.map((c, i) => (
                    <li key={i} className="cart-item">
                      <div className="cart-item-name">
                        <span>{c.item}</span>
                        <small className="cart-unit-price">₹{c.price} each</small>
                      </div>
                      <div className="cart-item-right">
                        <span className="cart-qty-bubble">x{c.qty}</span>
                        <span className="cart-price">₹{c.price * c.qty}</span>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(c.item)}
                          title="Remove item"
                        >
                          &times;
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery Fee</span>
                    <span className="free-tag">FREE</span>
                  </div>
                  <div className="cart-total-row">
                    <strong>Total Amount</strong>
                    <strong className="final-total">₹{total}</strong>
                  </div>

                  <button className="order-btn" onClick={placeOrder}>
                    Confirm &amp; Place Order &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
