import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-card">
      <span className="home-badge">Academic Management System</span>
      <h1 className="home-title">Welcome to Student Portal</h1>
      <p className="home-desc">
        Complete your course enrollment, update academic profile credentials, and verify student records in real time.
      </p>

      <div className="quick-actions">
        <Link to="/registration" className="action-card">
          <span className="action-card-icon">📝</span>
          <h3>Register Student</h3>
          <p>Fill out student information and credentials</p>
        </Link>
        <Link to="/details" className="action-card">
          <span className="action-card-icon">👤</span>
          <h3>View Details</h3>
          <p>Review registered profile information</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
