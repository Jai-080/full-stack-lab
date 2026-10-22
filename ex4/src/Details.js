import React from "react";
import { Link } from "react-router-dom";

function Details({ formData }) {
  if (!formData) {
    return (
      <div className="details-card">
        <div className="empty-details-box">
          <div className="empty-icon">📂</div>
          <h2>No Student Record Found</h2>
          <p className="home-desc">Please complete the registration form to view your profile details.</p>
          <Link to="/registration" className="btn-secondary">
            Go to Registration &rarr;
          </Link>
        </div>
      </div>
    );
  }

  // Get initials for avatar
  const initials = formData.studentName
    ? formData.studentName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "ST";

  return (
    <div className="details-card">
      <div className="profile-avatar">{initials}</div>
      <span className="status-badge">✓ Active Student</span>
      <h2 style={{ margin: "0 0 20px" }}>Student Details</h2>

      <div className="details-grid">
        <div className="detail-row">
          <span className="detail-label">Full Name:</span>
          <span className="detail-val">{formData.studentName}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email Address:</span>
          <span className="detail-val">{formData.email}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Password:</span>
          <span className="detail-val">••••••••</span>
        </div>
      </div>

      <Link to="/registration" className="btn-secondary">
        Register Another Student
      </Link>
    </div>
  );
}

export default Details;
