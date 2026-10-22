import React, { useState } from 'react';
import './App.css';

function App() {
  const [val, setVal] = useState('');
  const [status, setStatus] = useState('Pending');
  const [liValue, setLiValue] = useState([
    { text: 'Set up development workspace', status: 'Completed' },
    { text: 'Review component architecture', status: 'In Progress' },
    { text: 'Prepare documentation', status: 'Pending' }
  ]);

  const handleChange = (e) => {
    setVal(e.target.value);
  };

  const handleClick = (e) => {
    if (e) e.preventDefault();
    if (!val.trim()) return;
    setLiValue([...liValue, { text: val.trim(), status }]);
    setVal('');
  };

  const handleDelete = (indexToDelete) => {
    setLiValue(liValue.filter((_, index) => index !== indexToDelete));
  };

  const handleStatusToggle = (index) => {
    const nextStatus = {
      'Pending': 'In Progress',
      'In Progress': 'Completed',
      'Completed': 'Pending'
    };
    setLiValue(liValue.map((item, i) => 
      i === index ? { ...item, status: nextStatus[item.status] || 'Pending' } : item
    ));
  };

  return (
    <div className="todo-wrapper">
      <div className="form todo-card">
        <div className="todo-header">
          <div className="icon-badge">📋</div>
          <div>
            <h1>Task Tracker</h1>
            <p className="subtitle">Manage and track your daily priorities</p>
          </div>
        </div>

        <form onSubmit={handleClick} className="input-group">
          <input
            className="ip"
            type="text"
            value={val}
            onChange={handleChange}
            placeholder="What needs to be done?"
            autoFocus
          />
          <div className="action-row">
            <select
              className="select-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">⏳ Pending</option>
              <option value="In Progress">⚡ In Progress</option>
              <option value="Completed">✅ Completed</option>
            </select>
            <button type="submit" className="btn">
              + Add Task
            </button>
          </div>
        </form>

        <div className="todo-stats">
          <span>Total: <strong>{liValue.length}</strong></span>
          <span>Completed: <strong>{liValue.filter(t => t.status === 'Completed').length}</strong></span>
        </div>

        <ul className="display">
          {liValue.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🎉</span>
              <p>No tasks left! Add a new task above.</p>
            </div>
          ) : (
            liValue.map((item, index) => (
              <li
                key={index}
                className={`todo-item status-${item.status.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="todo-info">
                  <span className="todo-text">{item.text}</span>
                  <span
                    className={`status-pill ${item.status.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleStatusToggle(index)}
                    title="Click to cycle status"
                  >
                    {item.status}
                  </span>
                </div>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                  title="Remove task"
                >
                  &times;
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
