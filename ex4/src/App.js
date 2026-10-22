import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./Home";
import Registration from "./Registration";
import Details from "./Details";
import "./App.css";

function Navigation() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <span className="brand-icon">🎓</span>
        <span>EduPortal</span>
      </Link>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          Home
        </Link>
        <Link to="/registration" className={`nav-link ${location.pathname === '/registration' ? 'active' : ''}`}>
          Registration
        </Link>
        <Link to="/details" className={`nav-link ${location.pathname === '/details' ? 'active' : ''}`}>
          Details
        </Link>
      </div>
    </nav>
  );
}

function App() {
  const [formData, setFormData] = useState(null);

  return (
    <Router>
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration setFormData={setFormData} />} />
          <Route path="/details" element={<Details formData={formData} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
