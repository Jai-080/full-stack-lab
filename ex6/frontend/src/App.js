import React, { useState, useEffect } from "react";
import "./App.css";

const API = "http://localhost:5000/api/posts";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, user: "Alex Rivers", text: "Excited to launch our new full stack project! React + Express makes building dynamic apps so smooth 🚀" },
    { id: 2, user: "Maya Chen", text: "Practicing CSS Grid and Flexbox today. Responsive web design is pure art when done right ✨" }
  ]);
  const [user, setUser] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadPosts = async () => {
    try {
      const res = await fetch(API);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setPosts(data);
        }
      }
    } catch (err) {
      console.log("Backend not active, showing local feed state.");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const addPost = async (e) => {
    e.preventDefault();
    if (!user.trim() || !text.trim()) {
      alert("Please fill both user name and post content!");
      return;
    }

    setIsSubmitting(true);
    const newPost = { id: Date.now(), user: user.trim(), text: text.trim() };

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user.trim(), text: text.trim() }),
      });
      if (res.ok) {
        loadPosts();
      } else {
        setPosts([newPost, ...posts]);
      }
    } catch (err) {
      // Backend offline fallback - still updates UI nicely
      setPosts([newPost, ...posts]);
    }

    setText("");
    setIsSubmitting(false);
  };

  return (
    <div className="blog-wrapper">
      <div className="container">
        <header className="blog-header">
          <div className="logo-section">
            <div className="app-icon">💬</div>
            <div>
              <h1>Mini Microblog</h1>
              <p className="blog-tagline">Share your thoughts and connect with the community</p>
            </div>
          </div>
          <span className="post-counter">{posts.length} Posts</span>
        </header>

        <section className="create-box">
          <form onSubmit={addPost} className="form">
            <div className="input-row">
              <span className="input-icon">👤</span>
              <input
                type="text"
                className="user-input"
                placeholder="Your Name (e.g. Jayachandran)"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>

            <textarea
              className="text-input"
              rows="3"
              placeholder="What's on your mind today?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>

            <div className="form-actions">
              <span className="char-count">{text.length} chars</span>
              <button type="submit" className="post-btn" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Update 🚀"}
              </button>
            </div>
          </form>
        </section>

        <section className="feed-section">
          <div className="feed-title-bar">
            <h3>Community Feed</h3>
            <span className="live-pill">● Live</span>
          </div>

          <ul className="posts-feed">
            {posts.map((p) => {
              const avatarLetter = (p.user || "A").charAt(0).toUpperCase();
              return (
                <li key={p.id} className="post-card">
                  <div className="post-avatar">{avatarLetter}</div>
                  <div className="post-content">
                    <div className="post-top-meta">
                      <strong className="post-author">{p.user}</strong>
                      <span className="post-time">Recent</span>
                    </div>
                    <p className="post-text">{p.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;
