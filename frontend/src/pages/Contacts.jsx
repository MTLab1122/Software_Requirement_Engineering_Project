import React, { useEffect, useState } from 'react';

function Contacts({ user, apiBase }) {
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase}/contacts`)
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading contacts:', err);
        alert('Failed to load contacts. Please try again.');
        setLoading(false);
      });
  }, [apiBase]);

  return (
    <div className="page-container">
      <h1>Contacts</h1>
      <p className="page-subtitle">Faculty and Administrative Staff Directory</p>

      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <div className="contacts-container">
          <section className="contacts-section">
            <h2>👨‍🏫 Faculty</h2>
            <div className="contacts-grid">
              {contacts.faculty.map(faculty => (
                <div key={faculty.id} className="contact-card">
                  <h3>{faculty.name}</h3>
                  <p className="contact-dept">{faculty.department}</p>
                  <div className="contact-details">
                    <p><strong>Email:</strong> <a href={`mailto:${faculty.email}`}>{faculty.email}</a></p>
                    <p><strong>Phone:</strong> <a href={`tel:${faculty.phone}`}>{faculty.phone}</a></p>
                    <p><strong>Office:</strong> {faculty.office}</p>
                    <p><strong>Office Hours:</strong> {faculty.officeHours}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="contacts-section">
            <h2>🏛️ Administrative Staff</h2>
            <div className="contacts-grid">
              {contacts.admin.map(admin => (
                <div key={admin.id} className="contact-card">
                  <h3>{admin.name}</h3>
                  <div className="contact-details">
                    <p><strong>Email:</strong> <a href={`mailto:${admin.email}`}>{admin.email}</a></p>
                    <p><strong>Phone:</strong> <a href={`tel:${admin.phone}`}>{admin.phone}</a></p>
                    <p><strong>Office:</strong> {admin.office}</p>
                    <p><strong>Hours:</strong> {admin.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Contacts;

