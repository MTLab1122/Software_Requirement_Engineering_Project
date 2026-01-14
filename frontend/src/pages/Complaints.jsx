import React, { useEffect, useState } from 'react';

function Complaints({ user, apiBase }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    category: 'general'
  });

  useEffect(() => {
    if (user.role === 'student') {
      fetch(`${apiBase}/students/${user.id}/complaints`)
        .then(res => res.json())
        .then(data => {
          setComplaints(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error loading complaints:', err);
          alert('Failed to load complaints. Please try again.');
          setLoading(false);
        });
    } else if (user.role === 'admin') {
      fetch(`${apiBase}/admin/complaints`)
        .then(res => res.json())
        .then(data => {
          setComplaints(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error loading complaints:', err);
          alert('Failed to load complaints. Please try again.');
          setLoading(false);
        });
    }
  }, [user, apiBase]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.message.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    const res = await fetch(`${apiBase}/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: user.id,
        ...formData
      })
    });

    setSubmitting(false);
    try {
      const data = await res.json();
      if (res.ok) {
        alert('Complaint submitted successfully!');
        setFormData({ subject: '', message: '', category: 'general' });
        window.location.reload();
      } else {
        alert(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Error submitting complaint:', err);
      alert('Failed to submit complaint. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <h1>Complaint Box</h1>
      <p className="page-subtitle">Submit your complaints and feedback</p>

      {user.role === 'student' && (
        <section className="complaint-form-section">
          <h2>Submit a Complaint</h2>
          <form onSubmit={handleSubmit} className="complaint-form">
            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="form-input"
              >
                <option value="general">General</option>
                <option value="academic">Academic</option>
                <option value="financial">Financial</option>
                <option value="facility">Facility</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="form-input"
                placeholder="Enter complaint subject"
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="form-input"
                rows="6"
                placeholder="Describe your complaint or feedback..."
                required
              />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </form>
        </section>
      )}

      <section className="complaints-list-section">
        <h2>{user.role === 'admin' ? 'All Complaints' : 'My Complaints'}</h2>
        {loading ? (
          <p>Loading complaints...</p>
        ) : complaints.length === 0 ? (
          <div className="empty-state">
            <p>No complaints submitted yet.</p>
          </div>
        ) : (
          <div className="complaints-list">
            {complaints.map(complaint => (
              <div key={complaint.id} className="complaint-card">
                <div className="complaint-header">
                  <h3>{complaint.subject}</h3>
                  <span className={`status-badge ${complaint.status}`}>
                    {complaint.status}
                  </span>
                </div>
                <div className="complaint-meta">
                  <span><strong>Category:</strong> {complaint.category}</span>
                  {user.role === 'admin' && (
                    <span><strong>Student:</strong> {complaint.student}</span>
                  )}
                  <span><strong>Submitted:</strong> {new Date(complaint.submittedAt).toLocaleString()}</span>
                </div>
                <p className="complaint-message">{complaint.message}</p>
                {complaint.response && (
                  <div className="complaint-response">
                    <strong>Response:</strong>
                    <p>{complaint.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Complaints;

