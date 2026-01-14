import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Assignments({ user, apiBase }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(null);

  useEffect(() => {
    if (user.role === 'student') {
      fetch(`${apiBase}/students/${user.id}/assignments`)
        .then(res => res.json())
        .then(data => {
          setAssignments(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error loading assignments:', err);
          alert('Failed to load assignments. Please try again.');
          setLoading(false);
        });
    }
  }, [user, apiBase]);

  const handleSubmit = async (assignmentId, submissionText) => {
    if (!submissionText.trim()) {
      alert('Please enter your submission');
      return;
    }

    setSubmitting(assignmentId);
    const res = await fetch(`${apiBase}/assignments/${assignmentId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: user.id,
        submissionText,
        fileUrl: null
      })
    });

    setSubmitting(null);
    try {
      const data = await res.json();
      if (res.ok) {
        alert('Assignment submitted successfully!');
        window.location.reload();
      } else {
        alert(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Error submitting assignment:', err);
      alert('Failed to submit assignment. Please try again.');
    }
  };

  if (user.role !== 'student') {
    return <div className="page-container">Assignments available for students only.</div>;
  }

  return (
    <div className="page-container">
      <h1>My Assignments</h1>

      {loading ? (
        <p>Loading assignments...</p>
      ) : assignments.length === 0 ? (
        <div className="empty-state">
          <p>No assignments found. You may not be enrolled in any courses.</p>
          <Link to="/courses" className="btn-primary">Browse Courses</Link>
        </div>
      ) : (
        <div className="assignments-container">
          {assignments.map(assignment => {
            const dueDate = new Date(assignment.dueDate);
            const isOverdue = dueDate < new Date() && !assignment.submission;
            const isSubmitted = assignment.submission && assignment.submission.status === 'submitted';

            return (
              <div key={assignment.id} className={`assignment-card ${isOverdue ? 'overdue' : ''}`}>
                <div className="assignment-header">
                  <h3>{assignment.title}</h3>
                  <Link to={`/courses/${assignment.courseId}`} className="course-link">
                    {assignment.courseId}
                  </Link>
                </div>
                <p className="assignment-description">{assignment.description}</p>
                <div className="assignment-meta">
                  <span><strong>Due Date:</strong> {dueDate.toLocaleDateString()}</span>
                  <span><strong>Max Points:</strong> {assignment.maxPoints}</span>
                  {isSubmitted && (
                    <span className="status-badge submitted">Submitted</span>
                  )}
                  {isOverdue && !isSubmitted && (
                    <span className="status-badge overdue-badge">Overdue</span>
                  )}
                </div>

                {isSubmitted ? (
                  <div className="submission-info">
                    <p><strong>Submitted:</strong> {new Date(assignment.submission.submittedAt).toLocaleString()}</p>
                    {assignment.submission.grade !== null && (
                      <p><strong>Grade:</strong> {assignment.submission.grade} / {assignment.maxPoints}</p>
                    )}
                    <p className="submission-text">{assignment.submission.submissionText}</p>
                  </div>
                ) : (
                  <div className="submission-form">
                    <textarea
                      placeholder="Enter your submission here..."
                      rows="5"
                      className="submission-input"
                      id={`submission-${assignment.id}`}
                    />
                    <button
                      onClick={() => {
                        const text = document.getElementById(`submission-${assignment.id}`).value;
                        handleSubmit(assignment.id, text);
                      }}
                      disabled={submitting === assignment.id}
                      className="btn-primary"
                    >
                      {submitting === assignment.id ? 'Submitting...' : 'Submit Assignment'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Assignments;

