import { useState } from "react";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import StudentLogin from "./pages/StudentLogin";
import FacultyLogin from "./pages/FacultyLogin";
import AdminLogin from "./pages/AdminLogin";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Attendance from "./pages/Attendance";
import Assignments from "./pages/Assignments";
import StudyPlanner from "./pages/StudyPlanner";
import Placements from "./pages/Placements";

import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AIAssistant from "./pages/AIAssistant";

import FacultyAttendance from "./pages/faculty/Attendance";
import FacultyAssignments from "./pages/faculty/Assignments";
import FacultyNotices from "./pages/faculty/Notices";
import FacultyMarks from "./pages/faculty/Marks";
import FacultyStudents from "./pages/faculty/Students";
import FacultyTimetable from "./pages/faculty/Timetable";
import FacultyPlacements from "./pages/faculty/Placements";
import FacultyProfile from "./pages/faculty/Profile";
import FacultySettings from "./pages/faculty/Settings";
import FacultyAIAssistant from "./pages/faculty/AIAssistant";

function App() {
  const [page, setPage] = useState("landing");
  const [student, setStudent] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [admin, setAdmin] = useState(null);

  return (
    <>
      {page === "landing" && (
        <LandingPage onGetStarted={() => setPage("roles")} />
      )}

      {page === "roles" && (
        <LoginPage onSelectRole={(role) => setPage(role)} />
      )}

      {page === "student" && (
        <StudentLogin
          onBack={() => setPage("roles")}
          onLogin={(studentData) => {
            setStudent(studentData);
            setPage("dashboard");
          }}
        />
      )}

      {page === "dashboard" && (
        <Dashboard
          student={student}
          onOpenAI={() => setPage("ai")}
          onOpenProfile={() => setPage("profile")}
          onAttendance={() => setPage("attendance")}
          onAssignments={() => setPage("assignments")}
          onStudyPlanner={() => setPage("study-planner")}
          onPlacements={() => setPage("placements")}
        />
      )}

      {page === "profile" && (
        <Profile
          student={student}
          onDashboard={() => setPage("dashboard")}
          onOpenAI={() => setPage("ai")}
          onOpenProfile={() => setPage("profile")}
          onAttendance={() => setPage("attendance")}
          onAssignments={() => setPage("assignments")}
          onStudyPlanner={() => setPage("study-planner")}
          onPlacements={() => setPage("placements")}
        />
      )}

      {page === "attendance" && (
        <Attendance
          onDashboard={() => setPage("dashboard")}
          onOpenProfile={() => setPage("profile")}
          onAttendance={() => setPage("attendance")}
          onAssignments={() => setPage("assignments")}
          onStudyPlanner={() => setPage("study-planner")}
          onPlacements={() => setPage("placements")}
          onOpenAI={() => setPage("ai")}
        />
      )}

      {page === "assignments" && (
        <Assignments
          onDashboard={() => setPage("dashboard")}
          onOpenProfile={() => setPage("profile")}
          onAttendance={() => setPage("attendance")}
          onAssignments={() => setPage("assignments")}
          onStudyPlanner={() => setPage("study-planner")}
          onPlacements={() => setPage("placements")}
          onOpenAI={() => setPage("ai")}
        />
      )}

      {page === "study-planner" && (
        <StudyPlanner
          onDashboard={() => setPage("dashboard")}
          onOpenProfile={() => setPage("profile")}
          onAttendance={() => setPage("attendance")}
          onAssignments={() => setPage("assignments")}
          onStudyPlanner={() => setPage("study-planner")}
          onPlacements={() => setPage("placements")}
          onOpenAI={() => setPage("ai")}
        />
      )}

      {page === "placements" && (
        <Placements
          onDashboard={() => setPage("dashboard")}
          onOpenProfile={() => setPage("profile")}
          onAttendance={() => setPage("attendance")}
          onAssignments={() => setPage("assignments")}
          onStudyPlanner={() => setPage("study-planner")}
          onPlacements={() => setPage("placements")}
          onOpenAI={() => setPage("ai")}
        />
      )}

      {page === "faculty" && (
        <FacultyLogin
          onBack={() => setPage("roles")}
          onLogin={(facultyData) => {
            setFaculty(facultyData);
            setPage("faculty-dashboard");
          }}
        />
      )}

      {page === "faculty-dashboard" && (
        <FacultyDashboard faculty={faculty} setPage={setPage} />
      )}

      {page === "faculty-attendance" && (
        <FacultyAttendance faculty={faculty} onBack={() => setPage("faculty-dashboard")} />
      )}

      {page === "faculty-assignments" && (
        <FacultyAssignments onBack={() => setPage("faculty-dashboard")} />
      )}

      {page === "faculty-notices" && (
        <FacultyNotices onBack={() => setPage("faculty-dashboard")} />
      )}

      {page === "faculty-marks" && (
        <FacultyMarks onBack={() => setPage("faculty-dashboard")} />
      )}

      {page === "faculty-students" && (
        <FacultyStudents onBack={() => setPage("faculty-dashboard")} />
      )}

      {page === "faculty-timetable" && (
        <FacultyTimetable onBack={() => setPage("faculty-dashboard")} />
      )}

      {page === "faculty-placements" && (
        <FacultyPlacements onBack={() => setPage("faculty-dashboard")} />
      )}

      {page === "faculty-profile" && (
        <FacultyProfile onBack={() => setPage("faculty-dashboard")} />
      )}

      {page === "faculty-settings" && (
        <FacultySettings onBack={() => setPage("faculty-dashboard")} />
      )}

      {page === "faculty-ai" && (
        <FacultyAIAssistant onBack={() => setPage("faculty-dashboard")} />
      )}

      {page === "ai" && (
        <AIAssistant onBack={() => setPage("dashboard")} />
      )}

      {page === "admin" && (
        <AdminLogin
          onBack={() => setPage("roles")}
          onLogin={(adminData) => {
            setAdmin(adminData);
            setPage("admin-dashboard");
          }}
        />
      )}

      {page === "admin-dashboard" && <AdminDashboard admin={admin} />}
    </>
  );
}

export default App;