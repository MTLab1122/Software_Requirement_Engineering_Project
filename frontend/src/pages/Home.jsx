import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home({ user, apiBase }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user.role === 'student') {
      fetch(`${apiBase}/students/${user.id}/registrations`)
        .then(res => res.json())
        .then(courses => {
          setStats({
            enrolledCourses: courses.length,
            totalCredits: courses.reduce((sum, c) => sum + (c.credits || 0), 0)
          });
        })
        .catch(err => {
          console.error('Error loading stats:', err);
          // Silently fail for stats, don't show alert
        });
    }
  }, [user, apiBase]);

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1>Welcome to University Learning Management System</h1>
        <p className="hero-subtitle">Your comprehensive platform for academic excellence</p>
      </div>

      <div className="features-grid">
        <Link to="/courses" className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Courses</h3>
          <p>Browse and register for courses. Access course materials, lectures, and resources.</p>
        </Link>

        <Link to="/assignments" className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>Assignments</h3>
          <p>View assignments, submit your work, and track your grades.</p>
        </Link>

        <Link to="/quizzes" className="feature-card">
          <div className="feature-icon">✏️</div>
          <h3>Quizzes</h3>
          <p>Take online quizzes and assessments for your courses.</p>
        </Link>

        <Link to="/timetable" className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>Timetable</h3>
          <p>View your weekly schedule and class timings.</p>
        </Link>

        <Link to="/fees" className="feature-card">
          <div className="feature-icon">💰</div>
          <h3>Fee Structure</h3>
          <p>View fee breakdown and payment information.</p>
        </Link>

        <Link to="/contacts" className="feature-card">
          <div className="feature-icon">📞</div>
          <h3>Contacts</h3>
          <p>Find faculty and administrative staff contact information.</p>
        </Link>

        <Link to="/complaints" className="feature-card">
          <div className="feature-icon">📮</div>
          <h3>Complaint Box</h3>
          <p>Submit complaints and feedback to the administration.</p>
        </Link>

        <Link to="/dashboard" className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Dashboard</h3>
          <p>View your academic progress and statistics.</p>
        </Link>
      </div>

      {user.role === 'student' && stats && (
        <div className="quick-stats">
          <div className="stat-card">
            <h3>{stats.enrolledCourses}</h3>
            <p>Enrolled Courses</p>
          </div>
          <div className="stat-card">
            <h3>{stats.totalCredits}</h3>
            <p>Total Credits</p>
          </div>
        </div>
      )}

      <div className="announcements">
        <h2>📢 Announcements</h2>
        <div className="announcement-item">
          <strong>Registration Open:</strong> Course registration for Spring 2024 semester is now open. Register before December 20, 2024.
        </div>
        <div className="announcement-item">
          <strong>Fee Payment Deadline:</strong> Last date for fee payment is December 25, 2024. Late fees will apply after this date.
        </div>
        <div className="announcement-item">
          <strong>Library Hours:</strong> Library will remain open from 8 AM to 10 PM Monday through Friday.
        </div>
      </div>
    </div>
  );
}

export default Home;

