import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation({ user, onLogout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">
            <h1>🏛️ University LMS</h1>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
          <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>Dashboard</Link>
          <Link to="/courses" className={isActive('/courses') ? 'active' : ''}>Courses</Link>
          <Link to="/assignments" className={isActive('/assignments') ? 'active' : ''}>Assignments</Link>
          <Link to="/quizzes" className={isActive('/quizzes') ? 'active' : ''}>Quizzes</Link>
          <Link to="/timetable" className={isActive('/timetable') ? 'active' : ''}>Timetable</Link>
          <Link to="/fees" className={isActive('/fees') ? 'active' : ''}>Fees</Link>
          <Link to="/contacts" className={isActive('/contacts') ? 'active' : ''}>Contacts</Link>
          <Link to="/complaints" className={isActive('/complaints') ? 'active' : ''}>Complaints</Link>
          {user.role === 'admin' && (
            <Link to="/admin" className={isActive('/admin') ? 'active' : ''}>Admin</Link>
          )}
          <div className="user-menu">
            <span className="user-name">{user.name || user.username}</span>
            <span className="user-role">({user.role})</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

