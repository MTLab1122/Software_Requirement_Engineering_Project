const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ==================== USERS DATA ====================
const users = [
  { id: 1, username: 'student1', password: 'pass123', role: 'student', name: 'John Doe', email: 'john.doe@university.edu' },
  { id: 2, username: 'faculty1', password: 'pass123', role: 'faculty', name: 'Dr. Sarah Smith', email: 'sarah.smith@university.edu', department: 'Computer Science' },
  { id: 3, username: 'admin1', password: 'pass123', role: 'admin', name: 'Admin User', email: 'admin@university.edu' },
  { id: 4, username: 'faculty2', password: 'pass123', role: 'faculty', name: 'Dr. Michael Johnson', email: 'michael.johnson@university.edu', department: 'Mathematics' },
  { id: 5, username: 'faculty3', password: 'pass123', role: 'faculty', name: 'Dr. Emily Davis', email: 'emily.davis@university.edu', department: 'Physics' },
];

// ==================== COURSES DATA (5 Courses) ====================
const courses = [
  {
    id: 'CS101',
    title: 'Introduction to Computer Science',
    department: 'Computer Science',
    instructor: 'Dr. Sarah Smith',
    instructorId: 2,
    schedule: { day: 'Monday', time: '10:00-12:00', room: 'CS-101' },
    capacity: 50,
    enrolled: 0,
    credits: 3,
    prerequisites: [],
    description: 'Fundamental concepts of computer science including programming basics, algorithms, and data structures.',
    semester: 'Fall 2024'
  },
  {
    id: 'CS201',
    title: 'Data Structures and Algorithms',
    department: 'Computer Science',
    instructor: 'Dr. Sarah Smith',
    instructorId: 2,
    schedule: { day: 'Wednesday', time: '10:00-12:00', room: 'CS-201' },
    capacity: 40,
    enrolled: 0,
    credits: 3,
    prerequisites: ['CS101'],
    description: 'Advanced data structures, algorithm analysis, and problem-solving techniques.',
    semester: 'Fall 2024'
  },
  {
    id: 'MATH201',
    title: 'Calculus II',
    department: 'Mathematics',
    instructor: 'Dr. Michael Johnson',
    instructorId: 4,
    schedule: { day: 'Tuesday', time: '14:00-16:00', room: 'MATH-301' },
    capacity: 45,
    enrolled: 0,
    credits: 4,
    prerequisites: ['MATH101'],
    description: 'Continuation of Calculus I covering integration techniques, sequences, and series.',
    semester: 'Fall 2024'
  },
  {
    id: 'PHYS101',
    title: 'General Physics I',
    department: 'Physics',
    instructor: 'Dr. Emily Davis',
    instructorId: 5,
    schedule: { day: 'Thursday', time: '09:00-11:00', room: 'PHYS-101' },
    capacity: 60,
    enrolled: 0,
    credits: 4,
    prerequisites: [],
    description: 'Mechanics, thermodynamics, and wave motion fundamentals.',
    semester: 'Fall 2024'
  },
  {
    id: 'CS301',
    title: 'Database Systems',
    department: 'Computer Science',
    instructor: 'Dr. Sarah Smith',
    instructorId: 2,
    schedule: { day: 'Friday', time: '13:00-15:00', room: 'CS-301' },
    capacity: 35,
    enrolled: 0,
    credits: 3,
    prerequisites: ['CS201'],
    description: 'Database design, SQL, normalization, and database management systems.',
    semester: 'Fall 2024'
  }
];

// ==================== REGISTRATIONS ====================
const registrations = [];

// ==================== ASSIGNMENTS DATA ====================
const assignments = [
  {
    id: 1,
    courseId: 'CS101',
    title: 'Programming Basics Assignment',
    description: 'Write a program to calculate factorial of a number. Submit your code and output.',
    dueDate: '2024-12-15',
    maxPoints: 100,
    submissions: []
  },
  {
    id: 2,
    courseId: 'CS101',
    title: 'Algorithm Analysis',
    description: 'Analyze the time complexity of given algorithms and provide Big-O notation.',
    dueDate: '2024-12-20',
    maxPoints: 100,
    submissions: []
  },
  {
    id: 3,
    courseId: 'CS201',
    title: 'Implement Binary Search Tree',
    description: 'Implement a BST with insert, delete, and search operations.',
    dueDate: '2024-12-18',
    maxPoints: 100,
    submissions: []
  },
  {
    id: 4,
    courseId: 'MATH201',
    title: 'Integration Techniques',
    description: 'Solve 10 integration problems using various techniques.',
    dueDate: '2024-12-16',
    maxPoints: 100,
    submissions: []
  },
  {
    id: 5,
    courseId: 'PHYS101',
    title: 'Newton\'s Laws Lab Report',
    description: 'Write a lab report on experiments demonstrating Newton\'s laws of motion.',
    dueDate: '2024-12-17',
    maxPoints: 100,
    submissions: []
  }
];

// ==================== QUIZZES DATA ====================
const quizzes = [
  {
    id: 1,
    courseId: 'CS101',
    title: 'Quiz 1: Programming Fundamentals',
    questions: [
      { id: 1, question: 'What is a variable?', type: 'multiple-choice', options: ['A storage location', 'A function', 'A loop', 'A condition'], correct: 0 },
      { id: 2, question: 'What does HTML stand for?', type: 'multiple-choice', options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Mark Language'], correct: 0 }
    ],
    timeLimit: 30, // minutes
    maxPoints: 50,
    attempts: []
  },
  {
    id: 2,
    courseId: 'CS201',
    title: 'Quiz 1: Data Structures',
    questions: [
      { id: 1, question: 'What is the time complexity of binary search?', type: 'multiple-choice', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correct: 1 },
      { id: 2, question: 'Which data structure follows LIFO?', type: 'multiple-choice', options: ['Queue', 'Stack', 'Array', 'Linked List'], correct: 1 }
    ],
    timeLimit: 25,
    maxPoints: 50,
    attempts: []
  },
  {
    id: 3,
    courseId: 'MATH201',
    title: 'Quiz 1: Integration',
    questions: [
      { id: 1, question: 'What is the integral of x^2?', type: 'multiple-choice', options: ['x^3/3', 'x^3', '2x', 'x^2/2'], correct: 0 }
    ],
    timeLimit: 20,
    maxPoints: 50,
    attempts: []
  }
];

// ==================== COURSE CONTENT ====================
const courseContent = [
  {
    id: 1,
    courseId: 'CS101',
    title: 'Week 1: Introduction to Programming',
    type: 'lecture',
    content: 'Introduction to programming concepts, variables, data types, and basic operations.',
    materials: ['lecture-slides-week1.pdf', 'sample-code-week1.zip'],
    date: '2024-12-01'
  },
  {
    id: 2,
    courseId: 'CS101',
    title: 'Week 2: Control Structures',
    type: 'lecture',
    content: 'If-else statements, loops, and conditional logic.',
    materials: ['lecture-slides-week2.pdf'],
    date: '2024-12-08'
  },
  {
    id: 3,
    courseId: 'CS201',
    title: 'Week 1: Arrays and Lists',
    type: 'lecture',
    content: 'Introduction to arrays, dynamic arrays, and list data structures.',
    materials: ['arrays-lecture.pdf'],
    date: '2024-12-01'
  }
];

// ==================== FEE STRUCTURE ====================
const feeStructure = [
  { id: 1, category: 'Tuition Fee (per credit)', amount: 5000, description: 'Standard tuition fee per credit hour' },
  { id: 2, category: 'Registration Fee', amount: 2000, description: 'One-time registration fee per semester' },
  { id: 3, category: 'Library Fee', amount: 500, description: 'Library access and resources fee per semester' },
  { id: 4, category: 'Lab Fee (CS courses)', amount: 1000, description: 'Laboratory fee for computer science courses' },
  { id: 5, category: 'Lab Fee (Physics courses)', amount: 1500, description: 'Laboratory fee for physics courses' },
  { id: 6, category: 'Student Activity Fee', amount: 300, description: 'Student activities and events fee' },
  { id: 7, category: 'Technology Fee', amount: 800, description: 'IT services and online platform access' }
];

// ==================== CONTACTS ====================
const contacts = {
  faculty: [
    { id: 2, name: 'Dr. Sarah Smith', email: 'sarah.smith@university.edu', phone: '+1-234-567-8901', department: 'Computer Science', office: 'CS Building, Room 205', officeHours: 'Mon-Wed 2:00-4:00 PM' },
    { id: 4, name: 'Dr. Michael Johnson', email: 'michael.johnson@university.edu', phone: '+1-234-567-8902', department: 'Mathematics', office: 'Math Building, Room 312', officeHours: 'Tue-Thu 1:00-3:00 PM' },
    { id: 5, name: 'Dr. Emily Davis', email: 'emily.davis@university.edu', phone: '+1-234-567-8903', department: 'Physics', office: 'Physics Building, Room 108', officeHours: 'Mon-Fri 10:00-12:00 PM' }
  ],
  admin: [
    { id: 1, name: 'Registrar Office', email: 'registrar@university.edu', phone: '+1-234-567-8000', office: 'Administration Building, Room 101', hours: 'Mon-Fri 9:00 AM - 5:00 PM' },
    { id: 2, name: 'Student Affairs', email: 'studentaffairs@university.edu', phone: '+1-234-567-8001', office: 'Administration Building, Room 102', hours: 'Mon-Fri 8:00 AM - 6:00 PM' },
    { id: 3, name: 'Financial Aid Office', email: 'financialaid@university.edu', phone: '+1-234-567-8002', office: 'Administration Building, Room 103', hours: 'Mon-Fri 9:00 AM - 4:00 PM' },
    { id: 4, name: 'IT Support', email: 'itsupport@university.edu', phone: '+1-234-567-8003', office: 'Tech Building, Room 201', hours: 'Mon-Fri 8:00 AM - 8:00 PM' }
  ]
};

// ==================== COMPLAINTS ====================
const complaints = [];

// ==================== TIMETABLE HELPER ====================
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// ==================== API ROUTES ====================

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Get all courses
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Get course by ID
app.get('/api/courses/:courseId', (req, res) => {
  const course = courses.find(c => c.id === req.params.courseId);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  res.json(course);
});

// Get student registrations
app.get('/api/students/:studentId/registrations', (req, res) => {
  const studentId = parseInt(req.params.studentId, 10);
  const studentCourses = registrations
    .filter(r => r.studentId === studentId)
    .map(r => {
      const course = courses.find(c => c.id === r.courseId);
      return course ? { ...course, registrationDate: r.date } : null;
    })
    .filter(c => c !== null);
  res.json(studentCourses);
});

// Register for course
app.post('/api/students/:studentId/register', (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId, 10);
    const { courseId } = req.body;
    
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }
    
    const course = courses.find(c => c.id === courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (registrations.some(r => r.studentId === studentId && r.courseId === courseId)) {
      return res.status(400).json({ message: 'Already registered for this course' });
    }

    if (course.enrolled >= course.capacity) {
      return res.status(400).json({ message: 'Course is full' });
    }

    const studentCourseIds = registrations
      .filter(r => r.studentId === studentId)
      .map(r => r.courseId);
    const missingPrereqs = course.prerequisites.filter(p => !studentCourseIds.includes(p));
    if (missingPrereqs.length > 0) {
      return res.status(400).json({ message: 'Missing prerequisites', missingPrereqs });
    }

    const studentCourses = registrations
      .filter(r => r.studentId === studentId)
      .map(r => courses.find(c => c.id === r.courseId))
      .filter(c => c !== null);
    
    const hasConflict = studentCourses.some(c => 
      c && c.schedule.day === course.schedule.day && c.schedule.time === course.schedule.time
    );
    if (hasConflict) {
      return res.status(400).json({ message: 'Schedule conflict' });
    }

    registrations.push({ studentId, courseId, date: new Date().toISOString() });
    course.enrolled++;
    res.json({ message: 'Registered successfully' });
  } catch (error) {
    console.error('Error registering for course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Drop course
app.post('/api/students/:studentId/drop', (req, res) => {
  const studentId = parseInt(req.params.studentId, 10);
  const { courseId } = req.body;
  const index = registrations.findIndex(r => r.studentId === studentId && r.courseId === courseId);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Registration not found' });
  }
  
  const course = courses.find(c => c.id === courseId);
  if (course) course.enrolled--;
  registrations.splice(index, 1);
  res.json({ message: 'Dropped successfully' });
});

// Get assignments for a course
app.get('/api/courses/:courseId/assignments', (req, res) => {
  const courseAssignments = assignments.filter(a => a.courseId === req.params.courseId);
  res.json(courseAssignments);
});

// Get all assignments for a student
app.get('/api/students/:studentId/assignments', (req, res) => {
  const studentId = parseInt(req.params.studentId, 10);
  const studentCourseIds = registrations
    .filter(r => r.studentId === studentId)
    .map(r => r.courseId);
  const studentAssignments = assignments
    .filter(a => studentCourseIds.includes(a.courseId))
    .map(a => ({
      ...a,
      submission: a.submissions.find(s => s.studentId === studentId) || null
    }));
  res.json(studentAssignments);
});

// Submit assignment
app.post('/api/assignments/:assignmentId/submit', (req, res) => {
  try {
    const assignmentId = parseInt(req.params.assignmentId, 10);
    const { studentId, submissionText, fileUrl } = req.body;
    
    if (!studentId || !submissionText) {
      return res.status(400).json({ message: 'Student ID and submission text are required' });
    }
    
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    const existingIndex = assignment.submissions.findIndex(s => s.studentId === parseInt(studentId, 10));
    const submission = {
      studentId: parseInt(studentId, 10),
      submissionText: submissionText.trim(),
      fileUrl: fileUrl || null,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      grade: null
    };

    if (existingIndex >= 0) {
      assignment.submissions[existingIndex] = submission;
    } else {
      assignment.submissions.push(submission);
    }

    res.json({ message: 'Assignment submitted successfully', submission });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get quizzes for a course
app.get('/api/courses/:courseId/quizzes', (req, res) => {
  const courseQuizzes = quizzes.filter(q => q.courseId === req.params.courseId);
  res.json(courseQuizzes);
});

// Get quiz by ID
app.get('/api/quizzes/:quizId', (req, res) => {
  const quiz = quizzes.find(q => q.id === parseInt(req.params.quizId, 10));
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  res.json(quiz);
});

// Submit quiz attempt
app.post('/api/quizzes/:quizId/attempt', (req, res) => {
  try {
    const quizId = parseInt(req.params.quizId, 10);
    const { studentId, answers } = req.body;
    
    if (!studentId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Student ID and answers array are required' });
    }
    
    const quiz = quizzes.find(q => q.id === quizId);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (answers.length !== quiz.questions.length) {
      return res.status(400).json({ message: 'Number of answers does not match number of questions' });
    }

    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) score++;
    });

    const points = (score / quiz.questions.length) * quiz.maxPoints;
    const attempt = {
      studentId: parseInt(studentId, 10),
      answers,
      score: points,
      completedAt: new Date().toISOString()
    };

    quiz.attempts.push(attempt);
    res.json({ message: 'Quiz submitted successfully', attempt });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get course content
app.get('/api/courses/:courseId/content', (req, res) => {
  const content = courseContent.filter(c => c.courseId === req.params.courseId);
  res.json(content);
});

// Get student status (grades, progress)
app.get('/api/students/:studentId/status', (req, res) => {
  const studentId = parseInt(req.params.studentId, 10);
  const studentCourseIds = registrations
    .filter(r => r.studentId === studentId)
    .map(r => r.courseId);

  const status = studentCourseIds.map(courseId => {
    const course = courses.find(c => c.id === courseId);
    const courseAssignments = assignments.filter(a => a.courseId === courseId);
    const courseQuizzes = quizzes.filter(q => q.courseId === courseId);
    
    const assignmentSubmissions = courseAssignments.flatMap(a => 
      a.submissions.filter(s => s.studentId === studentId)
    );
    const quizAttempts = courseQuizzes.flatMap(q =>
      q.attempts.filter(a => a.studentId === studentId)
    );

    const avgAssignmentGrade = assignmentSubmissions.length > 0
      ? assignmentSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / assignmentSubmissions.length
      : 0;
    
    const avgQuizGrade = quizAttempts.length > 0
      ? quizAttempts.reduce((sum, a) => sum + a.score, 0) / quizAttempts.length
      : 0;

    return {
      courseId,
      courseTitle: course?.title,
      assignmentsCompleted: assignmentSubmissions.length,
      assignmentsTotal: courseAssignments.length,
      quizzesCompleted: quizAttempts.length,
      quizzesTotal: courseQuizzes.length,
      averageGrade: (avgAssignmentGrade + avgQuizGrade) / 2 || 0
    };
  });

  res.json(status);
});

// Get timetable for student
app.get('/api/students/:studentId/timetable', (req, res) => {
  const studentId = parseInt(req.params.studentId, 10);
  const studentCourseIds = registrations
    .filter(r => r.studentId === studentId)
    .map(r => r.courseId);
  
  const timetable = daysOfWeek.map(day => ({
    day,
    courses: courses
      .filter(c => studentCourseIds.includes(c.id) && c.schedule.day === day)
      .map(c => ({
        courseId: c.id,
        title: c.title,
        time: c.schedule.time,
        room: c.schedule.room,
        instructor: c.instructor
      }))
  }));

  res.json(timetable);
});

// Get fee structure
app.get('/api/fees', (req, res) => {
  res.json(feeStructure);
});

// Calculate student fees
app.get('/api/students/:studentId/fees', (req, res) => {
  const studentId = parseInt(req.params.studentId, 10);
  const studentCourseIds = registrations
    .filter(r => r.studentId === studentId)
    .map(r => r.courseId);
  
  const enrolledCourses = courses.filter(c => studentCourseIds.includes(c.id));
  const totalCredits = enrolledCourses.reduce((sum, c) => sum + c.credits, 0);
  
  const tuitionFeeItem = feeStructure.find(f => f.category.includes('Tuition'));
  const registrationFeeItem = feeStructure.find(f => f.category.includes('Registration'));
  const libraryFeeItem = feeStructure.find(f => f.category.includes('Library'));
  const activityFeeItem = feeStructure.find(f => f.category.includes('Activity'));
  const techFeeItem = feeStructure.find(f => f.category.includes('Technology'));
  
  const tuitionFee = totalCredits * (tuitionFeeItem?.amount || 0);
  const registrationFee = registrationFeeItem?.amount || 0;
  const libraryFee = libraryFeeItem?.amount || 0;
  const labFee = enrolledCourses.reduce((sum, c) => {
    if (c.department === 'Computer Science') {
      const csLabFee = feeStructure.find(f => f.category.includes('Lab Fee (CS'));
      return sum + (csLabFee?.amount || 0);
    } else if (c.department === 'Physics') {
      const physLabFee = feeStructure.find(f => f.category.includes('Lab Fee (Physics'));
      return sum + (physLabFee?.amount || 0);
    }
    return sum;
  }, 0);
  const activityFee = activityFeeItem?.amount || 0;
  const techFee = techFeeItem?.amount || 0;

  const total = tuitionFee + registrationFee + libraryFee + labFee + activityFee + techFee;

  res.json({
    breakdown: {
      tuitionFee,
      registrationFee,
      libraryFee,
      labFee,
      activityFee,
      techFee
    },
    totalCredits,
    total,
    courses: enrolledCourses.map(c => ({ id: c.id, title: c.title, credits: c.credits }))
  });
});

// Get contacts
app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

// Submit complaint
app.post('/api/complaints', (req, res) => {
  try {
    const { studentId, subject, message, category } = req.body;
    
    if (!studentId || !subject || !message) {
      return res.status(400).json({ message: 'Missing required fields: studentId, subject, message' });
    }
    
    const complaint = {
      id: complaints.length + 1,
      studentId: parseInt(studentId, 10),
      subject: subject.trim(),
      message: message.trim(),
      category: category || 'general',
      status: 'pending',
      submittedAt: new Date().toISOString(),
      response: null
    };
    complaints.push(complaint);
    res.json({ message: 'Complaint submitted successfully', complaint });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get complaints for student
app.get('/api/students/:studentId/complaints', (req, res) => {
  const studentId = parseInt(req.params.studentId, 10);
  const studentComplaints = complaints.filter(c => c.studentId === studentId);
  res.json(studentComplaints);
});

// Admin: Get all complaints
app.get('/api/admin/complaints', (req, res) => {
  const complaintsWithStudent = complaints.map(c => ({
    ...c,
    student: users.find(u => u.id === c.studentId)?.name || 'Unknown'
  }));
  res.json(complaintsWithStudent);
});

// Admin: Get all registrations
app.get('/api/admin/registrations', (req, res) => {
  const result = registrations.map(r => ({
    student: users.find(u => u.id === r.studentId)?.name || 'Unknown',
    course: courses.find(c => c.id === r.courseId)?.title || 'Unknown',
    courseId: r.courseId,
    registrationDate: r.date
  }));
  res.json(result);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`LMS API ready with ${courses.length} courses, ${assignments.length} assignments, ${quizzes.length} quizzes`);
});
