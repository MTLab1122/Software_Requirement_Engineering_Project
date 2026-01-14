import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ user, apiBase }) {
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.role === 'student') {
      fetch(`${apiBase}/students/${user.id}/status`)
        .then(res => res.json())
        .then(data => {
          setStatus(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error loading dashboard:', err);
          alert('Failed to load dashboard. Please try again.');
          setLoading(false);
        });
    }
  }, [user, apiBase]);

  if (user.role !== 'student') {
    return <div className="page-container">Dashboard available for students only.</div>;
  }

  return (
    <div className="page-container">
      <h1>My Dashboard</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="dashboard-grid">
          {status.map((courseStatus) => (
            <div key={courseStatus.courseId} className="dashboard-card">
              <h3>{courseStatus.courseTitle}</h3>
              <div className="status-metrics">
                <div className="metric">
                  <span className="metric-label">Assignments:</span>
                  <span className="metric-value">
                    {courseStatus.assignmentsCompleted} / {courseStatus.assignmentsTotal}
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Quizzes:</span>
                  <span className="metric-value">
                    {courseStatus.quizzesCompleted} / {courseStatus.quizzesTotal}
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Average Grade:</span>
                  <span className="metric-value">
                    {courseStatus.averageGrade.toFixed(1)}%
                  </span>
                </div>
              </div>
              <Link to={`/courses/${courseStatus.courseId}`} className="view-course-btn">
                View Course Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {status.length === 0 && !loading && (
        <div className="empty-state">
          <p>You haven't enrolled in any courses yet.</p>
          <Link to="/courses" className="btn-primary">Browse Courses</Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

