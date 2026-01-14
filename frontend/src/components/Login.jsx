import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🏛️ University LMS</h1>
          <p className="login-subtitle">Learning Management System</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="demo-accounts">
          <p><strong>Demo Accounts:</strong></p>
          <ul>
            <li>Student: <code>student1</code> / <code>pass123</code></li>
            <li>Admin: <code>admin1</code> / <code>pass123</code></li>
            <li>Faculty: <code>faculty1</code> / <code>pass123</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
