import React, { useState } from "react";

function LeaveForm({ onAdd }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("casual");
  const [days, setDays] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !days) {
      alert("Please fill all fields!");
      return;
    }

    if (parseInt(days) <= 0) {
      alert("Days must be greater than zero!");
      return;
    }

    onAdd({ name: name.trim(), type, days });

    // clear inputs
    setName("");
    setType("casual");
    setDays("");
  };

  return (
    <form onSubmit={handleSubmit} className="leave-form">
      <div className="form-input-group name-group">
        <label>Employee Name</label>
        <input
          type="text"
          placeholder="e.g. John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-input-group type-group">
        <label>Leave Category</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="casual">Casual Leave</option>
          <option value="sick">Sick Leave</option>
          <option value="medical">Medical Leave</option>
        </select>
      </div>

      <div className="form-input-group days-group">
        <label>No. of Days</label>
        <input
          type="number"
          min="1"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          required
        />
      </div>

      <div className="form-action-group">
        <button type="submit" className="submit-btn">
          Apply Leave
        </button>
      </div>
    </form>
  );
}

export default LeaveForm;
