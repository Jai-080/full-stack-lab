import React, { useEffect, useState } from "react";

const fallbackRestaurants = [
  {
    _id: "res1",
    name: "A2B Vegetarian Delights",
    cuisine: "North & South Indian • Pure Veg",
    rating: "4.6",
    time: "20-25 mins",
    icon: "🍛",
    menu: [
      { item: "Paneer Butter Masala", price: 180 },
      { item: "Special Veg Biryani", price: 150 },
      { item: "Crispy Masala Dosa", price: 90 },
      { item: "Fresh Mango Lassi", price: 60 }
    ],
  },
  {
    _id: "res2",
    name: "Pizza Hut Express",
    cuisine: "Gourmet Pizzas • Pasta • Sides",
    rating: "4.5",
    time: "30-35 mins",
    icon: "🍕",
    menu: [
      { item: "Cheese Burst Pizza", price: 200 },
      { item: "Stuffed Garlic Bread", price: 120 },
      { item: "Creamy White Sauce Pasta", price: 160 },
      { item: "Choco Lava Cake", price: 89 }
    ],
  },
  {
    _id: "res3",
    name: "The Burger Guild",
    cuisine: "Smash Burgers • Crispy Fries",
    rating: "4.7",
    time: "15-20 mins",
    icon: "🍔",
    menu: [
      { item: "Crispy Chicken Supreme", price: 170 },
      { item: "Double Veg Smash Burger", price: 140 },
      { item: "Loaded Peri-Peri Fries", price: 99 },
      { item: "Belgian Chocolate Shake", price: 120 }
    ],
  }
];

function RestaurantList({ onSelect }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setRestaurants(data);
        } else {
          setRestaurants(fallbackRestaurants);
        }
        setLoading(false);
      })
      .catch(() => {
        setRestaurants(fallbackRestaurants);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="section-intro">
        <h2>Popular Restaurants Near You</h2>
        <p className="section-subtext">Order from your favorite kitchens with fast doorstep delivery</p>
      </div>

      {loading ? (
        <div className="loading-box">
          <div className="spinner"></div>
          <p className="loading">Finding best restaurants...</p>
        </div>
      ) : (
        <div className="restaurant-grid">
          {restaurants.map((r, i) => {
            const icons = ["🍛", "🍕", "🍔", "🍜"];
            const icon = r.icon || icons[i % icons.length];
            const rating = r.rating || "4.5";
            const time = r.time || "25-30 min";
            const cuisine = r.cuisine || "Multi-cuisine • Fast Food";
            const menuCount = r.menu ? r.menu.length : 4;

            return (
              <div
                key={r._id}
                className={`restaurant-card accent-${i % 4}`}
                onClick={() => onSelect(r)}
              >
                <div className="card-badge-row">
                  <span className="card-food-icon">{icon}</span>
                  <span className="rating-pill">★ {rating}</span>
                </div>

                <div className="card-body">
                  <h3 className="restaurant-name">{r.name}</h3>
                  <p className="cuisine-text">{cuisine}</p>
                  <div className="card-footer-info">
                    <span className="time-badge">⏱ {time}</span>
                    <span className="restaurant-sub">{menuCount} items available</span>
                  </div>
                </div>

                <button className="view-menu-btn">View Menu &rarr;</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RestaurantList;
