import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Quizzes({ user, apiBase }) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user.role === 'student') {
      fetch(`${apiBase}/students/${user.id}/registrations`)
        .then(res => res.json())
        .then(courses => {
          const courseIds = courses.map(c => c.id);
          Promise.all(courseIds.map((id, idx) => 
            fetch(`${apiBase}/courses/${id}/quizzes`)
              .then(res => res.json())
              .then(quizzes => quizzes.map(q => ({ ...q, courseId: id })))
              .catch(err => {
                console.error(`Error fetching quizzes for course ${id}:`, err);
                return [];
              })
          )).then(quizArrays => {
            const allQuizzes = quizArrays.flat();
            setQuizzes(allQuizzes);
            setLoading(false);
          }).catch(err => {
            console.error('Error loading quizzes:', err);
            setLoading(false);
          });
        })
        .catch(err => {
          console.error('Error loading courses:', err);
          setLoading(false);
        });
    }
  }, [user, apiBase]);

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setAnswers({});
  };

  const handleSubmitQuiz = async () => {
    if (selectedQuiz.questions.some((q, idx) => answers[idx] === undefined)) {
      alert('Please answer all questions');
      return;
    }

    setSubmitting(true);
    const answerArray = selectedQuiz.questions.map((q, idx) => answers[idx] || 0);
    
    const res = await fetch(`${apiBase}/quizzes/${selectedQuiz.id}/attempt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: user.id,
        answers: answerArray
      })
    });

    setSubmitting(false);
    if (res.ok) {
      const data = await res.json();
      alert(`Quiz submitted! Your score: ${data.attempt.score.toFixed(1)} / ${selectedQuiz.maxPoints}`);
      setSelectedQuiz(null);
      setAnswers({});
      window.location.reload();
    } else {
      const data = await res.json().catch(() => ({ message: 'Submission failed' }));
      alert(data.message || 'Submission failed');
    }
  };

  if (user.role !== 'student') {
    return <div className="page-container">Quizzes available for students only.</div>;
  }

  if (selectedQuiz) {
    return (
      <div className="page-container">
        <div className="quiz-container">
          <div className="quiz-header">
            <h2>{selectedQuiz.title}</h2>
            <button onClick={() => setSelectedQuiz(null)} className="btn-secondary">Back</button>
          </div>
          <p className="quiz-info">Time Limit: {selectedQuiz.timeLimit} minutes | Points: {selectedQuiz.maxPoints}</p>
          
          <div className="quiz-questions">
            {selectedQuiz.questions.map((question, qIdx) => (
              <div key={question.id} className="question-card">
                <h4>Question {qIdx + 1}: {question.question}</h4>
                <div className="options-list">
                  {question.options.map((option, optIdx) => (
                    <label key={optIdx} className="option-label">
                      <input
                        type="radio"
                        name={`question-${qIdx}`}
                        value={optIdx}
                        checked={answers[qIdx] === optIdx}
                        onChange={() => setAnswers({ ...answers, [qIdx]: optIdx })}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmitQuiz}
            disabled={submitting}
            className="btn-primary submit-quiz-btn"
          >
            {submitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Available Quizzes</h1>

      {loading ? (
        <p>Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <div className="empty-state">
          <p>No quizzes available. You may not be enrolled in any courses.</p>
          <Link to="/courses" className="btn-primary">Browse Courses</Link>
        </div>
      ) : (
        <div className="quizzes-grid">
          {quizzes.map(quiz => (
            <div key={quiz.id} className="quiz-card">
              <h3>{quiz.title}</h3>
              <Link to={`/courses/${quiz.courseId}`} className="course-link">
                Course: {quiz.courseId}
              </Link>
              <div className="quiz-details">
                <p><strong>Questions:</strong> {quiz.questions.length}</p>
                <p><strong>Time Limit:</strong> {quiz.timeLimit} minutes</p>
                <p><strong>Points:</strong> {quiz.maxPoints}</p>
              </div>
              <button onClick={() => handleStartQuiz(quiz)} className="btn-primary">
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Quizzes;

