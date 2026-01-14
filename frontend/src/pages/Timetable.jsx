import React, { useEffect, useState } from 'react';

function Timetable({ user, apiBase }) {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.role === 'student') {
      fetch(`${apiBase}/students/${user.id}/timetable`)
        .then(res => res.json())
        .then(data => {
          setTimetable(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error loading timetable:', err);
          alert('Failed to load timetable. Please try again.');
          setLoading(false);
        });
    }
  }, [user, apiBase]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  if (user.role !== 'student') {
    return <div className="page-container">Timetable available for students only.</div>;
  }

  return (
    <div className="page-container">
      <h1>My Timetable</h1>
      <p className="page-subtitle">Weekly Schedule (Monday - Friday)</p>

      {loading ? (
        <p>Loading timetable...</p>
      ) : (
        <div className="timetable-container">
          <div className="timetable-grid">
            {days.map(day => {
              const dayData = timetable.find(t => t.day === day);
              const courses = dayData ? dayData.courses : [];

              return (
                <div key={day} className="timetable-day">
                  <h3 className="day-header">{day}</h3>
                  {courses.length === 0 ? (
                    <div className="no-class">No classes</div>
                  ) : (
                    <div className="day-courses">
                      {courses.map((course, idx) => (
                        <div key={idx} className="timetable-course">
                          <div className="course-time">{course.time}</div>
                          <div className="course-title">{course.title}</div>
                          <div className="course-details">
                            <span>{course.courseId}</span>
                            <span>{course.room}</span>
                          </div>
                          <div className="course-instructor">{course.instructor}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="timetable-note">
            <p><strong>Note:</strong> Saturday and Sunday are off days. Classes are scheduled Monday through Friday only.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Timetable;

