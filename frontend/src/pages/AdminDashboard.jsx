import React, { useEffect, useState } from 'react';

function AdminDashboard({ user, apiBase }) {
  const [registrations, setRegistrations] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${apiBase}/admin/registrations`).then(res => res.json()).catch(err => {
        console.error('Error loading registrations:', err);
        return [];
      }),
      fetch(`${apiBase}/admin/complaints`).then(res => res.json()).catch(err => {
        console.error('Error loading complaints:', err);
        return [];
      })
    ]).then(([regs, comps]) => {
      setRegistrations(regs);
      setComplaints(comps);
      setLoading(false);
    }).catch(err => {
      console.error('Error loading admin data:', err);
      alert('Failed to load admin data. Please try again.');
      setLoading(false);
    });
  }, [apiBase]);

  if (user.role !== 'admin') {
    return <div className="page-container">Access denied. Admin only.</div>;
  }

  return (
    <div className="page-container">
      <h1>Admin Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="admin-dashboard">
          <section className="admin-section">
            <h2>All Course Registrations</h2>
            {registrations.length === 0 ? (
              <p>No registrations yet.</p>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Course ID</th>
                      <th>Registration Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg, idx) => (
                      <tr key={idx}>
                        <td>{reg.student}</td>
                        <td>{reg.course}</td>
                        <td>{reg.courseId}</td>
                        <td>{new Date(reg.registrationDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="admin-section">
            <h2>All Complaints</h2>
            {complaints.length === 0 ? (
              <p>No complaints submitted.</p>
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
                      <span><strong>Student:</strong> {complaint.student}</span>
                      <span><strong>Category:</strong> {complaint.category}</span>
                      <span><strong>Submitted:</strong> {new Date(complaint.submittedAt).toLocaleString()}</span>
                    </div>
                    <p className="complaint-message">{complaint.message}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

