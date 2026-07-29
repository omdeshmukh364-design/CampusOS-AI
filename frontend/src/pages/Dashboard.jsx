import { useEffect, useState } from "react";
import { Bot, CalendarCheck, Mail, Sparkles, CalendarDays } from "lucide-react";
import Card from "../components/common/Card";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import QuickStats from "../components/dashboard/QuickStats";
import { getTimetable } from "../services/timetableService";
import { getStudentAttendance } from "../services/attendanceService";

function Dashboard({
  student,
  onLogout,
  onOpenAI,
  onOpenProfile,
  onAttendance,
  onAssignments,
  onStudyPlanner,
   onPlacements,
}) {
  const [lectures, setLectures] = useState([]);
  const [loadingTimetable, setLoadingTimetable] = useState(true);

  useEffect(() => {
    const loadTimetable = async () => {
      setLoadingTimetable(true);
      try {
        const filters = {};
        if (student?.department) filters.department = student.department;
        if (student?.semester) filters.semester = student.semester;

        const data = await getTimetable(filters);
        setLectures(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load timetable:", error);
        setLectures([]);
      } finally {
        setLoadingTimetable(false);
      }
    };

    loadTimetable();
  }, [student?.department, student?.semester]);

  const [attendance, setAttendance] = useState(null);
  const [loadingAttendance, setLoadingAttendance] = useState(true);

  useEffect(() => {
    const loadAttendance = async () => {
      if (!student?.email) {
        setLoadingAttendance(false);
        return;
      }

      setLoadingAttendance(true);
      try {
        const data = await getStudentAttendance(student.email);
        setAttendance(data);
      } catch (error) {
        console.error("Failed to load attendance:", error);
        setAttendance(null);
      } finally {
        setLoadingAttendance(false);
      }
    };

    loadAttendance();
  }, [student?.email]);

  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const sortedLectures = [...lectures].sort((a, b) => {
    const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#EAF2FF_0%,_#F7F9FF_60%,_#EDF7FF_100%)] p-4 lg:p-6">
  <div className="flex min-h-screen gap-6">

    <Sidebar
  activePage="Dashboard"
  onDashboard={() => {}}
  onOpenProfile={onOpenProfile}
  onAttendance={onAttendance}
  onAssignments={onAssignments}
  onStudyPlanner={onStudyPlanner}
  onPlacements={onPlacements}
  onOpenAI={onOpenAI}
/>
    <main className="flex-1">

      <Navbar
        student={student}
        onLogout={onLogout}
      />



          <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">

            {/* Welcome Card */}

            <Card className="border-[#E5E7EB] p-6 shadow-[0_20px_60px_-12px_rgba(37,99,235,0.16)]">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Today at a glance
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    Welcome back,
                    {" "}
                    {student?.name || "Student"} 👋
                  </h2>

                  <p className="mt-4 text-gray-600">
                    {student?.department || "Artificial Intelligence & Machine Learning"}
                  </p>

                  <p className="text-gray-500">
                    {student?.year || "3rd Year"} • Roll No:
                    {" "}
                    {student?.rollNo || "AIML001"}
                  </p>

                  <p className="text-gray-500">
                    {student?.email}
                  </p>

                </div>

                <div className="rounded-2xl bg-blue-100 p-3">
                  <Sparkles className="text-blue-600" size={24} />
                </div>

              </div>

            </Card>

            {/* AI Assistant */}

            <Card className="border-[#E5E7EB] p-6 shadow-[0_20px_60px_-12px_rgba(37,99,235,0.16)]">

              <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-blue-100 p-3">
                  <Bot className="text-blue-600" size={24} />
                </div>

                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-sm text-gray-500">
                    Ask anything
                  </p>
                </div>

              </div>

              <div className="mt-5 rounded-2xl bg-[#F4F7FF] p-4 text-gray-600">
                Hi {student?.fullName || "Student"},
                AI recommends checking today's assignments and attendance.
              </div>

              <button
                onClick={onOpenAI}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
              >
                🤖 Open AI Assistant
              </button>

 

            </Card>

          </div>

          <QuickStats
            attendance={attendance}
            loadingAttendance={loadingAttendance}
          />

          <Card className="mt-6 p-6">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-blue-600" />
              <h3 className="font-semibold text-lg">
                My Timetable
              </h3>
            </div>

            {loadingTimetable ? (
              <p className="mt-4 text-gray-500">Loading timetable...</p>
            ) : sortedLectures.length === 0 ? (
              <p className="mt-4 text-gray-500">
                No lectures scheduled yet for your department.
              </p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="p-3 text-left">Day</th>
                      <th className="p-3 text-left">Time</th>
                      <th className="p-3 text-left">Subject</th>
                      <th className="p-3 text-left">Division</th>
                      <th className="p-3 text-left">Faculty</th>
                      <th className="p-3 text-left">Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedLectures.map((lecture) => (
                      <tr key={lecture.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{lecture.day}</td>
                        <td className="p-3">
                          {lecture.startTime} – {lecture.endTime}
                        </td>
                        <td className="p-3 font-semibold">{lecture.subject}</td>
                        <td className="p-3">{lecture.division}</td>
                        <td className="p-3">{lecture.facultyName}</td>
                        <td className="p-3">{lecture.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <div className="mt-6 grid gap-6 lg:grid-cols-4">

            <Card className="p-6">

              <div className="flex items-center gap-3">
                <CalendarCheck className="text-blue-600" />
                <h3 className="font-semibold">
                  Attendance
                </h3>
              </div>

              <p className="mt-4 text-gray-600">
                Current Attendance
              </p>

              <h2 className="mt-2 text-4xl font-bold text-green-600">
                {loadingAttendance
                  ? "..."
                  : attendance?.totalCount
                  ? `${attendance.percentage}%`
                  : "No data yet"}
              </h2>

            </Card>

            <Card className="p-6">

              <div className="flex items-center gap-3">
                <Bot className="text-blue-600" />
                <h3 className="font-semibold">
                  Pending Assignments
                </h3>
              </div>

              <h2 className="mt-4 text-4xl font-bold text-gray-400">
                —
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Coming soon
              </p>

            </Card>

            <Card className="p-6">

              <div className="flex items-center gap-3">
                <Sparkles className="text-blue-600" />
                <h3 className="font-semibold">
                  Placement Status
                </h3>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-gray-400">
                —
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Coming soon
              </p>

            </Card>

            <Card className="p-6">

              <div className="flex items-center gap-3">
                <Mail className="text-blue-600" />
                <h3 className="font-semibold">
                  Slashy AI
                </h3>
              </div>

              <p className="mt-4 text-gray-600">
                AI Email, Calendar & Productivity Automation
              </p>

              <button
                onClick={onOpenAI}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
              >
                Open Assistant
              </button>

            </Card>

          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;