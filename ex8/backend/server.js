const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/classifiedsDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// Schema
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  seller: String,
  contact: String,
});

const Product = mongoose.model("Product", productSchema);

// Auto-seed sample data
async function seedData() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      {
        title: "Used Laptop",
        description: "Dell i5 8GB RAM, good condition",
        price: 25000,
        seller: "Ravi Kumar",
        contact: "ravi@example.com",
      },
      {
        title: "Mountain Bicycle",
        description: "Almost new, rarely used",
        price: 5000,
        seller: "Anjali Sharma",
        contact: "anjali@example.com",
      },
    ]);
    console.log("Sample products added!");
  }
}
seedData();

// Routes
app.get("/api/products", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json({ message: "Product added successfully!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
