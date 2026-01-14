# 🏛️ University Learning Management System (LMS)

A comprehensive, university-level Learning Management System with course registration, assignments, quizzes, timetable, fee management, contacts, and complaint system - all in one integrated platform.

## ✨ Features

### 🎓 Course Management
- **5 Pre-loaded Courses** with full details
- Course registration and drop functionality
- Prerequisite checking
- Schedule conflict detection
- Course capacity management
- Detailed course pages with content, assignments, and quizzes

### 📝 Assignments
- View all assignments for enrolled courses
- Submit assignments online
- Track submission status and grades
- View assignment details and due dates
- Overdue assignment indicators

### ✏️ Quizzes
- Interactive online quizzes
- Multiple-choice questions
- Time limits and scoring
- Quiz attempts tracking
- Instant score feedback

### 📅 Timetable
- Weekly schedule view (Monday-Friday)
- Saturday and Sunday marked as off days
- Course timings, rooms, and instructors
- Visual timetable grid layout

### 💰 Fee Structure
- Complete fee breakdown
- Per-credit tuition calculation
- Registration, library, lab, activity, and technology fees
- Student-specific fee calculation based on enrolled courses
- Payment information and deadlines

### 📞 Contacts Directory
- Faculty contact information (email, phone, office, office hours)
- Administrative staff contacts
- Department-wise organization
- Easy-to-use contact cards

### 📮 Complaint Box
- Submit complaints and feedback
- Categorized complaints (academic, financial, facility, etc.)
- Track complaint status
- Admin view of all complaints
- Response system

### 📊 Dashboard
- Student academic progress tracking
- Assignment and quiz completion status
- Average grades per course
- Quick overview of enrolled courses

### 🏠 Home Page
- Feature overview cards
- Quick statistics
- Announcements section
- Easy navigation to all features

### 👨‍💼 Admin Dashboard
- View all course registrations
- Monitor all complaints
- System-wide overview

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** installed
- **npm** (comes with Node.js)

### Installation

1. **Clone or download the project**

2. **Install dependencies:**

```powershell
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ..\frontend
npm install
```

Or use the convenience script:
```powershell
npm run install:all
```

### Running the Application

#### Option 1: Use PowerShell Script (Easiest)

Double-click `start-all.ps1` or run:
```powershell
.\start-all.ps1
```

This starts both servers automatically in separate windows.

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```powershell
cd backend
npm start
```
Backend runs on: `http://localhost:4000`

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173` (or the URL shown in terminal)

Open the frontend URL in your browser.

## 👤 Demo Accounts

- **Student**: `student1` / `pass123`
- **Admin**: `admin1` / `pass123`
- **Faculty**: `faculty1` / `pass123`

## 📚 Course Catalog

The system comes with 5 pre-loaded courses:

1. **CS101** - Introduction to Computer Science (3 credits)
2. **CS201** - Data Structures and Algorithms (3 credits)
3. **MATH201** - Calculus II (4 credits)
4. **PHYS101** - General Physics I (4 credits)
5. **CS301** - Database Systems (3 credits)

Each course includes:
- Assignments
- Quizzes
- Course content/materials
- Schedule information
- Prerequisites

## 🎯 User Roles

### Student
- Register/drop courses
- View timetable
- Submit assignments
- Take quizzes
- View grades and progress
- Submit complaints
- View fee structure

### Admin
- View all registrations
- View all complaints
- System administration

### Faculty
- View enrolled students (limited in current demo)

## 🛠️ Technology Stack

### Backend
- **Node.js** with **Express.js**
- RESTful API
- In-memory data storage (for demo/prototype)

### Frontend
- **React 18**
- **React Router** for navigation
- **Vite** for fast development
- Modern, responsive CSS

## 📁 Project Structure

```
SRE_Project/
├── backend/
│   ├── server.js          # Express API server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main app with routing
│   │   ├── main.jsx       # React entry point
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   └── Navigation.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── Assignments.jsx
│   │   │   ├── Quizzes.jsx
│   │   │   ├── Timetable.jsx
│   │   │   ├── Fees.jsx
│   │   │   ├── Contacts.jsx
│   │   │   ├── Complaints.jsx
│   │   │   └── AdminDashboard.jsx
│   │   └── styles.css     # Comprehensive styling
│   ├── index.html
│   └── package.json
├── start-all.ps1          # Startup script
├── start-backend.ps1
├── start-frontend.ps1
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/login` - User login

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:courseId` - Get course details
- `GET /api/courses/:courseId/assignments` - Get course assignments
- `GET /api/courses/:courseId/quizzes` - Get course quizzes
- `GET /api/courses/:courseId/content` - Get course content

### Student Operations
- `GET /api/students/:studentId/registrations` - Get student courses
- `POST /api/students/:studentId/register` - Register for course
- `POST /api/students/:studentId/drop` - Drop course
- `GET /api/students/:studentId/assignments` - Get student assignments
- `GET /api/students/:studentId/timetable` - Get student timetable
- `GET /api/students/:studentId/fees` - Get student fees
- `GET /api/students/:studentId/status` - Get student academic status
- `GET /api/students/:studentId/complaints` - Get student complaints

### Assignments
- `POST /api/assignments/:assignmentId/submit` - Submit assignment

### Quizzes
- `GET /api/quizzes/:quizId` - Get quiz details
- `POST /api/quizzes/:quizId/attempt` - Submit quiz attempt

### Fees
- `GET /api/fees` - Get fee structure

### Contacts
- `GET /api/contacts` - Get faculty and admin contacts

### Complaints
- `POST /api/complaints` - Submit complaint
- `GET /api/admin/complaints` - Get all complaints (admin)

## 🎨 Features Highlights

- ✅ **Modern UI/UX** - Clean, professional design
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Real-time Updates** - Immediate feedback on actions
- ✅ **Comprehensive Navigation** - Easy access to all features
- ✅ **Role-based Access** - Different views for students, admin, faculty
- ✅ **Data Validation** - Prerequisites, capacity, schedule conflicts
- ✅ **Status Tracking** - Assignment submissions, quiz attempts, complaint status

## 🐛 Troubleshooting

### Port Already in Use
If port 4000 or 5173 is busy, modify:
- `backend/server.js` - Change PORT
- `frontend/vite.config.mts` - Change server.port

### Dependencies Not Found
Run `npm install` in both `backend` and `frontend` directories.

### "This site can't be reached"
1. Ensure both servers are running
2. Use the exact URL shown in the frontend terminal
3. Check Windows Firewall settings

## 📝 Notes

- This is a **prototype/demo** system using in-memory data storage
- Data resets when the server restarts
- For production use, integrate with a database (MongoDB, PostgreSQL, etc.)
- Add authentication tokens (JWT) for security
- Implement file uploads for assignment submissions
- Add email notifications

## 🎓 Academic Use

This system demonstrates:
- Full-stack web development
- RESTful API design
- React routing and state management
- Modern UI/UX principles
- System integration
- User role management
- Data validation and business logic

## 📄 License

This project is created for educational purposes as part of the SRE Project.

---

**Built with ❤️ for University Course Registration System**
