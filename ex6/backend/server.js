const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let posts = []; // temporary in-memory storage

// Get all posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// Add a new post
app.post("/api/posts", (req, res) => {
  const { user, text } = req.body;
  if (!user || !text) {
    return res.status(400).json({ error: "User and text required" });
  }
  const newPost = { id: Date.now(), user, text };
  posts.unshift(newPost); // add to top
  res.json(newPost);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
