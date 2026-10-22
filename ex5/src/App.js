import React, { useState } from "react";
import LeaveForm from "./LeaveForm";
import "./App.css";

function App() {
  const [balance, setBalance] = useState({
    casual: 10,
    sick: 7,
    medical: 5,
  });

  const [leaves, setLeaves] = useState([
    { id: 1, name: "Jayachandran", type: "casual", days: 2 }
  ]);

  const addLeave = (leave) => {
    const { name, type, days } = leave;
    const d = parseInt(days);

    if (balance[type] < d) {
      alert(`Insufficient balance! You only have ${balance[type]} days of ${type} leave remaining.`);
      return;
    }

    const newLeave = { id: Date.now(), name, type, days: d };
    setLeaves([...leaves, newLeave]);

    // Deduct from balance
    setBalance({ ...balance, [type]: balance[type] - d });
  };

  return (
    <div className="portal-wrapper">
      <div className="container">
        <header className="portal-header">
          <div className="portal-icon">🏢</div>
          <div>
            <h1>Leave Management Portal</h1>
            <p className="portal-subtitle">Track leave balances and submit employee requests</p>
          </div>
        </header>

        <section className="balance-section">
          <h3>Current Leave Balance</h3>
          <div className="balance-grid">
            <div className="balance-card casual">
              <div className="card-top">
                <span className="card-title">Casual Leave</span>
                <span className="card-icon">🌴</span>
              </div>
              <div className="card-count">{balance.casual}</div>
              <div className="card-label">Days Available</div>
            </div>

            <div className="balance-card sick">
              <div className="card-top">
                <span className="card-title">Sick Leave</span>
                <span className="card-icon">🩺</span>
              </div>
              <div className="card-count">{balance.sick}</div>
              <div className="card-label">Days Available</div>
            </div>

            <div className="balance-card medical">
              <div className="card-top">
                <span className="card-title">Medical Leave</span>
                <span className="card-icon">🏥</span>
              </div>
              <div className="card-count">{balance.medical}</div>
              <div className="card-label">Days Available</div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>Apply for Leave</h3>
          <LeaveForm onAdd={addLeave} />
        </section>

        <section className="history-section">
          <div className="section-title-row">
            <h3>Recent Applications</h3>
            <span className="count-pill">{leaves.length} records</span>
          </div>

          {leaves.length === 0 ? (
            <div className="empty-table-state">
              <span className="empty-table-icon">📄</span>
              <p>No leave applications submitted yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="leave-table">
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Leave Type</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((l) => (
                    <tr key={l.id}>
                      <td className="emp-name">
                        <span className="emp-avatar">{l.name.charAt(0).toUpperCase()}</span>
                        {l.name}
                      </td>
                      <td>
                        <span className={`type-badge badge-${l.type}`}>
                          {l.type.charAt(0).toUpperCase() + l.type.slice(1)}
                        </span>
                      </td>
                      <td className="days-cell">{l.days} {l.days === 1 ? 'day' : 'days'}</td>
                      <td>
                        <span className="approved-pill">✓ Approved</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
