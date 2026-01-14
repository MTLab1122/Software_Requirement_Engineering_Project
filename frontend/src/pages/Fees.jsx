import React, { useEffect, useState } from 'react';

function Fees({ user, apiBase }) {
  const [feeStructure, setFeeStructure] = useState([]);
  const [studentFees, setStudentFees] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${apiBase}/fees`).then(res => res.json()).catch(err => {
        console.error('Error loading fee structure:', err);
        return [];
      }),
      user.role === 'student' 
        ? fetch(`${apiBase}/students/${user.id}/fees`).then(res => res.json()).catch(err => {
            console.error('Error loading student fees:', err);
            return null;
          })
        : Promise.resolve(null)
    ]).then(([structure, student]) => {
      setFeeStructure(structure);
      setStudentFees(student);
      setLoading(false);
    }).catch(err => {
      console.error('Error loading fees:', err);
      alert('Failed to load fee information. Please try again.');
      setLoading(false);
    });
  }, [user, apiBase]);

  return (
    <div className="page-container">
      <h1>Fee Structure</h1>

      {loading ? (
        <p>Loading fee information...</p>
      ) : (
        <div className="fees-container">
          <section className="fee-section">
            <h2>General Fee Structure</h2>
            <div className="fee-table">
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.map(fee => (
                    <tr key={fee.id}>
                      <td>{fee.category}</td>
                      <td>${fee.amount.toLocaleString()}</td>
                      <td>{fee.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {user.role === 'student' && studentFees && (
            <section className="fee-section">
              <h2>My Fee Breakdown</h2>
              <div className="student-fees-card">
                <div className="fees-summary">
                  <h3>Enrolled Courses ({studentFees.totalCredits} Credits)</h3>
                  <ul className="courses-list">
                    {studentFees.courses.map(course => (
                      <li key={course.id}>
                        {course.id}: {course.title} ({course.credits} credits)
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="fee-breakdown">
                  <h3>Fee Breakdown</h3>
                  <div className="breakdown-item">
                    <span>Tuition Fee ({studentFees.totalCredits} credits × $5,000):</span>
                    <span>${studentFees.breakdown.tuitionFee.toLocaleString()}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Registration Fee:</span>
                    <span>${studentFees.breakdown.registrationFee.toLocaleString()}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Library Fee:</span>
                    <span>${studentFees.breakdown.libraryFee.toLocaleString()}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Lab Fee:</span>
                    <span>${studentFees.breakdown.labFee.toLocaleString()}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Student Activity Fee:</span>
                    <span>${studentFees.breakdown.activityFee.toLocaleString()}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Technology Fee:</span>
                    <span>${studentFees.breakdown.techFee.toLocaleString()}</span>
                  </div>
                  <div className="breakdown-total">
                    <span><strong>Total Fee:</strong></span>
                    <span><strong>${studentFees.total.toLocaleString()}</strong></span>
                  </div>
                </div>

                <div className="payment-info">
                  <p><strong>Payment Deadline:</strong> December 25, 2024</p>
                  <p><strong>Payment Methods:</strong> Online payment, Bank transfer, Cash at registrar office</p>
                  <button className="btn-primary">Pay Now</button>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default Fees;

