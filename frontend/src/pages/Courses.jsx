import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Courses({ user, apiBase }) {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${apiBase}/courses`).then(res => res.json()).catch(err => {
        console.error('Error loading courses:', err);
        return [];
      }),
      user.role === 'student' 
        ? fetch(`${apiBase}/students/${user.id}/registrations`).then(res => res.json()).catch(err => {
            console.error('Error loading registrations:', err);
            return [];
          })
        : Promise.resolve([])
    ]).then(([allCourses, enrolled]) => {
      setCourses(allCourses);
      setMyCourses(enrolled);
      setLoading(false);
    }).catch(err => {
      console.error('Error loading data:', err);
      alert('Failed to load courses. Please try again.');
      setLoading(false);
    });
  }, [user, apiBase]);

  const handleRegister = async (courseId) => {
    try {
      const res = await fetch(`${apiBase}/students/${user.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registered successfully!');
        window.location.reload();
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Error registering for course:', err);
      alert('Failed to register. Please try again.');
    }
  };

  const handleDrop = async (courseId) => {
    if (!confirm('Are you sure you want to drop this course?')) return;
    try {
      const res = await fetch(`${apiBase}/students/${user.id}/drop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Course dropped successfully!');
        window.location.reload();
      } else {
        alert(data.message || 'Drop failed');
      }
    } catch (err) {
      console.error('Error dropping course:', err);
      alert('Failed to drop course. Please try again.');
    }
  };

  const myCourseIds = new Set(myCourses.map(c => c.id));

  return (
    <div className="page-container">
      <h1>Course Catalog</h1>
      <p className="page-subtitle">Browse and register for courses</p>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="courses-grid">
          {courses.map(course => {
            const isEnrolled = myCourseIds.has(course.id);
            return (
              <div key={course.id} className="course-card">
                <div className="course-header">
                  <h3>{course.id}: {course.title}</h3>
                  <span className="course-credits">{course.credits} Credits</span>
                </div>
                <div className="course-info">
                  <p><strong>Department:</strong> {course.department}</p>
                  <p><strong>Instructor:</strong> {course.instructor}</p>
                  <p><strong>Schedule:</strong> {course.schedule.day}, {course.schedule.time}</p>
                  <p><strong>Room:</strong> {course.schedule.room}</p>
                  <p><strong>Enrolled:</strong> {course.enrolled} / {course.capacity}</p>
                  {course.prerequisites.length > 0 && (
                    <p><strong>Prerequisites:</strong> {course.prerequisites.join(', ')}</p>
                  )}
                </div>
                <p className="course-description">{course.description}</p>
                <div className="course-actions">
                  <Link to={`/courses/${course.id}`} className="btn-secondary">View Details</Link>
                  {user.role === 'student' && (
                    isEnrolled ? (
                      <button onClick={() => handleDrop(course.id)} className="btn-danger">
                        Drop Course
                      </button>
                    ) : (
                      <button onClick={() => handleRegister(course.id)} className="btn-primary">
                        Register
                      </button>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Courses;

