import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration({ setFormData }) {
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ studentName, email, password });
    navigate("/details");
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h1>Student Registration</h1>
        <p>Enter your details to create your student record</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>Student Full Name</label>
          <input
            type="text"
            className="form-input"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="e.g. Jayachandran"
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. jaya@university.edu"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter secure password"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Complete Registration &rarr;
        </button>
      </form>
    </div>
  );
}

export default Registration;
