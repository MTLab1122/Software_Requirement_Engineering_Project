import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CourseDetail({ user, apiBase }) {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${apiBase}/courses/${courseId}`).then(res => {
        if (!res.ok) throw new Error('Course not found');
        return res.json();
      }),
      fetch(`${apiBase}/courses/${courseId}/assignments`).then(res => res.json()).catch(() => []),
      fetch(`${apiBase}/courses/${courseId}/quizzes`).then(res => res.json()).catch(() => []),
      fetch(`${apiBase}/courses/${courseId}/content`).then(res => res.json()).catch(() => [])
    ]).then(([courseData, assignmentsData, quizzesData, contentData]) => {
      setCourse(courseData);
      setAssignments(assignmentsData);
      setQuizzes(quizzesData);
      setContent(contentData);
      setLoading(false);
    }).catch(err => {
      console.error('Error loading course details:', err);
      alert('Failed to load course details. Please try again.');
      setLoading(false);
    });
  }, [courseId, apiBase]);

  if (loading) return <div className="page-container">Loading...</div>;
  if (!course) return <div className="page-container">Course not found</div>;

  return (
    <div className="page-container">
      <div className="course-detail-header">
        <h1>{course.id}: {course.title}</h1>
        <p className="course-meta">
          {course.department} • {course.credits} Credits • {course.semester}
        </p>
      </div>

      <div className="course-detail-grid">
        <div className="course-main">
          <section className="detail-section">
            <h2>Course Information</h2>
            <div className="info-grid">
              <div><strong>Instructor:</strong> {course.instructor}</div>
              <div><strong>Schedule:</strong> {course.schedule.day}, {course.schedule.time}</div>
              <div><strong>Room:</strong> {course.schedule.room}</div>
              <div><strong>Capacity:</strong> {course.enrolled} / {course.capacity}</div>
              {course.prerequisites.length > 0 && (
                <div><strong>Prerequisites:</strong> {course.prerequisites.join(', ')}</div>
              )}
            </div>
            <p className="course-description-full">{course.description}</p>
          </section>

          <section className="detail-section">
            <h2>Course Content</h2>
            {content.length === 0 ? (
              <p>No content available yet.</p>
            ) : (
              <div className="content-list">
                {content.map(item => (
                  <div key={item.id} className="content-item">
                    <h4>{item.title}</h4>
                    <p className="content-type">{item.type}</p>
                    <p>{item.content}</p>
                    {item.materials && item.materials.length > 0 && (
                      <div className="materials">
                        <strong>Materials:</strong>
                        <ul>
                          {item.materials.map((mat, idx) => (
                            <li key={idx}>{mat}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <small>Posted: {new Date(item.date).toLocaleDateString()}</small>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="detail-section">
            <h2>Assignments ({assignments.length})</h2>
            {assignments.length === 0 ? (
              <p>No assignments yet.</p>
            ) : (
              <div className="assignments-list">
                {assignments.map(assignment => (
                  <div key={assignment.id} className="assignment-item">
                    <h4>{assignment.title}</h4>
                    <p>{assignment.description}</p>
                    <div className="assignment-meta">
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      <span>Points: {assignment.maxPoints}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="detail-section">
            <h2>Quizzes ({quizzes.length})</h2>
            {quizzes.length === 0 ? (
              <p>No quizzes yet.</p>
            ) : (
              <div className="quizzes-list">
                {quizzes.map(quiz => (
                  <div key={quiz.id} className="quiz-item">
                    <h4>{quiz.title}</h4>
                    <div className="quiz-meta">
                      <span>Questions: {quiz.questions.length}</span>
                      <span>Time Limit: {quiz.timeLimit} minutes</span>
                      <span>Points: {quiz.maxPoints}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;

