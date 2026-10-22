import React, { useState } from "react";
import RestaurantList from "./RestaurantList";
import MenuPage from "./MenuPage";
import "./App.css";

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <div className="food-app-wrapper">
      <header className="food-header">
        <div className="header-brand">
          <span className="brand-logo-icon">🍔</span>
          <div>
            <h1 className="brand-title">FoodieExpress</h1>
            <span className="brand-tagline">Fast &amp; Fresh Food Delivery</span>
          </div>
        </div>
        <div className="delivery-loc-badge">
          <span className="loc-icon">📍</span>
          <span>Campus Block • 25 min</span>
        </div>
      </header>

      <main className="container">
        {!selectedRestaurant ? (
          <RestaurantList onSelect={setSelectedRestaurant} />
        ) : (
          <MenuPage
            restaurant={selectedRestaurant}
            onBack={() => setSelectedRestaurant(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
