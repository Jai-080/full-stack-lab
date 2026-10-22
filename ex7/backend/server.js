const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/fooappdDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

// Schemas
const restaurantSchema = new mongoose.Schema({
  name: String,
  menu: [{ item: String, price: Number }],
});

const orderSchema = new mongoose.Schema({
  restaurant: String,
  items: [{ item: String, price: Number }],
  total: Number,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
const Order = mongoose.model("Order", orderSchema);

// Automatically seed data if no restaurants exist
async function seedData() {
  const count = await Restaurant.countDocuments();
  if (count === 0) {
    await Restaurant.insertMany([
      {
        name: "A2B",
        menu: [
          { item: "Paneer Butter Masala", price: 180 },
          { item: "Veg Biryani", price: 150 },
        ],
      },
      {
        name: "Pizza Hut",
        menu: [
          { item: "Cheese Pizza", price: 200 },
          { item: "Garlic Bread", price: 120 },
        ],
      },
    ]);
    console.log("Sample restaurants added automatically!");
  }
}
seedData();

// API routes
// Get all restaurants
app.get("/api/restaurants", async (req, res) => {
  const data = await Restaurant.find();
  res.json(data);
});

// Get menu by restaurant ID
app.get("/api/restaurants/:id", async (req, res) => {
  const data = await Restaurant.findById(req.params.id);
  res.json(data);
});

// Place order
app.post("/api/order", async (req, res) => {
  const { restaurant, items, total } = req.body;
  const order = new Order({ restaurant, items, total });
  await order.save();
  res.json({ message: "Order placed successfully!" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
