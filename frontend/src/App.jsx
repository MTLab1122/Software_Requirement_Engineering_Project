import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Assignments from './pages/Assignments';
import Quizzes from './pages/Quizzes';
import Timetable from './pages/Timetable';
import Fees from './pages/Fees';
import Contacts from './pages/Contacts';
import Complaints from './pages/Complaints';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navigation from './components/Navigation';
import './styles.css';

const API_BASE = 'http://localhost:4000/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        alert('Invalid credentials');
        return;
      }
      const data = await res.json();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      alert('Login failed. Make sure backend is running.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Navigation user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} apiBase={API_BASE} />} />
            <Route path="/dashboard" element={<Dashboard user={user} apiBase={API_BASE} />} />
            <Route path="/courses" element={<Courses user={user} apiBase={API_BASE} />} />
            <Route path="/courses/:courseId" element={<CourseDetail user={user} apiBase={API_BASE} />} />
            <Route path="/assignments" element={<Assignments user={user} apiBase={API_BASE} />} />
            <Route path="/quizzes" element={<Quizzes user={user} apiBase={API_BASE} />} />
            <Route path="/timetable" element={<Timetable user={user} apiBase={API_BASE} />} />
            <Route path="/fees" element={<Fees user={user} apiBase={API_BASE} />} />
            <Route path="/contacts" element={<Contacts user={user} apiBase={API_BASE} />} />
            <Route path="/complaints" element={<Complaints user={user} apiBase={API_BASE} />} />
            {user.role === 'admin' && (
              <Route path="/admin" element={<AdminDashboard user={user} apiBase={API_BASE} />} />
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
