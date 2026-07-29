import { useEffect, useState } from "react";
import FacultyNavbar from "../components/faculty/FacultyNavbar";
import { getFacultyInsights } from "../services/facultyAPI";
import {
  Users,
  ClipboardCheck,
  BookOpen,
  CalendarDays,
  Bell,
  GraduationCap,
  Bot,
} from "lucide-react";

import FacultySidebar from "../components/faculty/FacultySidebar";
import Card from "../components/common/Card";

function FacultyDashboard({ faculty, setPage }) {
  const [dashboardData, setDashboardData] = useState(null);
const [loading, setLoading] = useState(true);
const [currentPage, setCurrentPage] = useState("faculty-dashboard");

useEffect(() => {
  if (currentPage !== "dashboard") {
    setPage(currentPage);
  }
}, [currentPage]);


useEffect(() => {
  loadDashboard();
}, []);

const loadDashboard = async () => {
  try {
    const response = await getFacultyInsights("faculty001");
   setDashboardData(
  response || {
    students: 126,
    attendance: 92,
    pendingGrading: 8,
    subjects: 5,
    summary: [],
    alerts: [],
  }
);
  } catch (error) {
    console.error("Dashboard Error:", error);
  } finally {
    setLoading(false);
  }
};

if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      Loading Faculty Dashboard...
    </div>
  );
}

  const cards = [
  {
    title: "Students",
    value: dashboardData?.students ?? 126,
    subtitle: "Registered Students",
    trend: "+12 this semester",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    border: "border-blue-500",
  },
  {
    title: "Attendance",
    value: `${dashboardData?.attendance ?? 92}%`,
    subtitle: "Average Attendance",
    trend: "+3% this week",
    icon: ClipboardCheck,
    color: "bg-green-100 text-green-600",
    border: "border-green-500",
  },
  {
    title: "Assignments",
    value: dashboardData?.pendingGrading ?? 8,
    subtitle: "Pending Evaluation",
    trend: "2 due today",
    icon: BookOpen,
    color: "bg-orange-100 text-orange-600",
    border: "border-orange-500",
  },
  {
    title: "Subjects",
    value: dashboardData?.subjects ?? 5,
    subtitle: "Teaching Subjects",
    trend: "Current Semester",
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-600",
    border: "border-purple-500",
  },
];

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#EAF2FF_0%,_#F7F9FF_60%,_#EDF7FF_100%)] p-5">

      <div className="flex gap-6">

        {/* Sidebar */}

       <FacultySidebar
  currentPage={currentPage}
  setPage={setPage}
  onLogout={() => setPage("landing")}
/>

        {/* Main */}

        <main className="flex-1">

          {/* Header */}
{/* Welcome Banner */}

<div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-8 text-white shadow-xl">

  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">

    <div>

      <h1 className="text-4xl font-bold">
        👋 Welcome,
        {" "}
        {faculty?.displayName || "Professor"}
      </h1>

      <p className="mt-3 text-blue-100 text-lg">
        CampusOS.AI Faculty Portal
      </p>

      <div className="mt-6 flex flex-wrap gap-5 text-sm">

        <span className="rounded-full bg-white/20 px-4 py-2">
          📅 {new Date().toLocaleDateString()}
        </span>

        <span className="rounded-full bg-white/20 px-4 py-2">
          🎓 Semester V
        </span>

        <span className="rounded-full bg-white/20 px-4 py-2">
          🏫 AIML Department
        </span>

        <span className="rounded-full bg-white/20 px-4 py-2">
          📖 Academic Year 2026-27
        </span>

      </div>

    </div>

    <div className="mt-6 md:mt-0">

      <div className="rounded-2xl bg-white/15 px-6 py-5 backdrop-blur">

        <p className="text-sm text-blue-100">
          Logged in as
        </p>
        <h2 className="mt-2 text-xl font-semibold">
          {faculty?.email}
        </h2>

      </div>

    </div>

  </div>

</div>
          {/* Cards */}

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card) => {

              const Icon = card.icon;

              return (

                <Card
  key={card.title}
  className={`p-6 border-t-4 ${card.border} shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300`}
>
  <div className="flex items-center justify-between">

    <div>

      <p className="text-gray-500 text-sm">
        {card.subtitle}
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        {card.value}
      </h2>

      <p className="mt-3 text-sm text-green-600 font-medium">
        {card.trend}
      </p>

    </div>

    <div className={`rounded-2xl p-5 ${card.color}`}>
      <Icon size={34} />
    </div>

  </div>

  <div className="mt-5 border-t pt-3">
    <p className="font-semibold text-gray-700">
      {card.title}
    </p>
  </div>

</Card>
              );
            })}

          </div>

          {/* Quick Actions */}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            <Card className="p-6">

              <h2 className="text-xl font-bold">

                Quick Actions

              </h2>

              <div className="mt-6 grid grid-cols-2 gap-4">

               <button
  onClick={() => setPage("faculty-attendance")}
  className="rounded-xl bg-blue-600 p-4 text-white hover:bg-blue-700"
>
  Upload Attendance
</button>

<button
  onClick={() => setPage("faculty-assignments")}
  className="rounded-xl bg-green-600 p-4 text-white hover:bg-green-700"
>
  New Assignment
</button>

<button
  onClick={() => setPage("faculty-notices")}
  className="rounded-xl bg-purple-600 p-4 text-white hover:bg-purple-700"
>
  Publish Notice
</button>

<button
  onClick={() => setPage("faculty-marks")}
  className="rounded-xl bg-orange-500 p-4 text-white hover:bg-orange-600"
>
  Upload Marks
</button>

              </div>

            </Card>

            {/* AI */}

            <Card className="p-6">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-blue-100 p-3">

                  <Bot
                    className="text-blue-600"
                    size={28}
                  />

                </div>

                <div>

                  <h2 className="text-xl font-bold">

                    AI Assistant

                  </h2>

                  <p className="text-gray-500">

                    Faculty Productivity

                  </p>

                </div>

              </div>

              <div className="mt-6 rounded-2xl bg-blue-50 p-5">

  <div className="space-y-3">

    {dashboardData?.summary?.map((item, index) => (

      <p
        key={index}
        className="text-gray-700"
      >
        🤖 {item}
      </p>

    ))}

  </div>

</div>

              <button
  onClick={() => setPage("faculty-ai")}
  className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700"
>
  Open AI Assistant
</button>

            </Card>

          </div>

          {/* Analytics */}

<div className="mt-8 grid lg:grid-cols-2 gap-6">

  <Card className="p-6">

    <h2 className="text-xl font-bold mb-4">
      Attendance Overview
    </h2>

    <div className="space-y-4">

      <div>

        <div className="flex justify-between">
          <span>SY AIML A</span>
          <span>92%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
          <div className="bg-green-600 h-3 rounded-full w-[92%]"></div>
        </div>

      </div>

      <div>

        <div className="flex justify-between">
          <span>SY AIML B</span>
          <span>88%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
          <div className="bg-blue-600 h-3 rounded-full w-[88%]"></div>
        </div>

      </div>

      <div>

        <div className="flex justify-between">
          <span>TY AIML</span>
          <span>95%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
          <div className="bg-purple-600 h-3 rounded-full w-[95%]"></div>
        </div>

      </div>

    </div>

  </Card>

  <Card className="p-6">

    <h2 className="text-xl font-bold mb-4">
      Assignment Status
    </h2>

    <div className="space-y-3">

      <div className="flex justify-between">
        <span>Submitted</span>
        <span className="font-bold text-green-600">
          84
        </span>
      </div>

      <div className="flex justify-between">
        <span>Pending</span>
        <span className="font-bold text-orange-600">
          18
        </span>
      </div>

      <div className="flex justify-between">
        <span>Late Submission</span>
        <span className="font-bold text-red-600">
          6
        </span>
      </div>

    </div>

  </Card>

</div>

{/* Student Performance */}

<Card className="mt-8 p-6">

  <h2 className="text-xl font-bold mb-6">
    Student Performance
  </h2>

  <div className="grid md:grid-cols-4 gap-6">

    <div className="rounded-xl bg-green-50 p-5">

      <p className="text-gray-500">
        Top Performer
      </p>

      <h3 className="mt-2 text-2xl font-bold text-green-700">
        Sneha Sharma
      </h3>

      <p className="text-gray-500">
        CGPA 9.72
      </p>

    </div>

    <div className="rounded-xl bg-blue-50 p-5">

      <p className="text-gray-500">
        Average Marks
      </p>

      <h3 className="mt-2 text-2xl font-bold text-blue-700">
        78%
      </h3>

    </div>

    <div className="rounded-xl bg-red-50 p-5">

      <p className="text-gray-500">
        Students At Risk
      </p>

      <h3 className="mt-2 text-2xl font-bold text-red-700">
        7
      </h3>

    </div>

    <div className="rounded-xl bg-purple-50 p-5">

      <p className="text-gray-500">
        Placement Eligible
      </p>

      <h3 className="mt-2 text-2xl font-bold text-purple-700">
        92%
      </h3>

    </div>

  </div>

</Card>

{/* Schedule & Deadlines */}

<div className="mt-8 grid lg:grid-cols-2 gap-6">

  {/* Today's Schedule */}

  <Card className="p-6">

    <h2 className="text-xl font-bold mb-5">
      Today's Schedule
    </h2>

    <div className="space-y-4">

      <div className="border-l-4 border-blue-600 pl-4">

        <p className="font-semibold">
          Java Programming
        </p>

        <p className="text-gray-500">
          9:00 AM • Lab 402
        </p>

      </div>

      <div className="border-l-4 border-green-600 pl-4">

        <p className="font-semibold">
          DBMS
        </p>

        <p className="text-gray-500">
          11:00 AM • Room 301
        </p>

      </div>

      <div className="border-l-4 border-purple-600 pl-4">

        <p className="font-semibold">
          AI Practical
        </p>

        <p className="text-gray-500">
          2:00 PM • Lab 201
        </p>

      </div>

    </div>

  </Card>

  {/* Upcoming Deadlines */}

  <Card className="p-6">

    <h2 className="text-xl font-bold mb-5">
      Upcoming Deadlines
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between">

        <span>Upload Mid Sem Marks</span>

        <span className="text-red-600 font-semibold">
          Tomorrow
        </span>

      </div>

      <div className="flex justify-between">

        <span>Publish Assignment 4</span>

        <span className="text-orange-600 font-semibold">
          2 Days
        </span>

      </div>

      <div className="flex justify-between">

        <span>Faculty Meeting</span>

        <span className="text-blue-600 font-semibold">
          Friday
        </span>

      </div>

      <div className="flex justify-between">

        <span>Attendance Submission</span>

        <span className="text-green-600 font-semibold">
          Completed
        </span>

      </div>

    </div>

  </Card>

</div>

{/* Today's Schedule & Upcoming Tasks */}

<div className="mt-8 grid gap-6 lg:grid-cols-2">

  {/* Today's Schedule */}

  <Card className="p-6 shadow-lg">

    <h2 className="text-2xl font-bold mb-5">
      📅 Today's Schedule
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between border-b pb-3">
        <span className="font-semibold">09:00 AM</span>
        <span>Java Programming</span>
      </div>

      <div className="flex justify-between border-b pb-3">
        <span className="font-semibold">11:00 AM</span>
        <span>DBMS</span>
      </div>

      <div className="flex justify-between border-b pb-3">
        <span className="font-semibold">02:00 PM</span>
        <span>AI Lab</span>
      </div>

      <div className="flex justify-between">
        <span className="font-semibold">04:00 PM</span>
        <span>Mentoring</span>
      </div>

    </div>

  </Card>

  {/* Upcoming Tasks */}

  <Card className="p-6 shadow-lg">

    <h2 className="text-2xl font-bold mb-5">
      ✅ Upcoming Tasks
    </h2>

    <div className="space-y-4">

      <div className="rounded-xl bg-blue-50 p-4">
        📌 Upload Today's Attendance
      </div>

      <div className="rounded-xl bg-green-50 p-4">
        📚 Evaluate Pending Assignments
      </div>

      <div className="rounded-xl bg-yellow-50 p-4">
        📝 Publish Internal Marks
      </div>

      <div className="rounded-xl bg-purple-50 p-4">
        👨‍🏫 Faculty Meeting - 5:00 PM
      </div>

    </div>

  </Card>

</div>

{/* Latest Notices & Faculty Performance */}

<div className="mt-8 grid gap-6 lg:grid-cols-2">

  {/* Latest Notices */}

  <Card className="p-6 shadow-lg">

    <h2 className="text-2xl font-bold mb-5">
      📢 Latest Notices
    </h2>

    <div className="space-y-4">

      <div className="rounded-xl border-l-4 border-blue-600 bg-blue-50 p-4">
        <h3 className="font-semibold">
          Mid Semester Examination
        </h3>
        <p className="text-gray-500 text-sm">
          Exam starts from 25 July.
        </p>
      </div>

      <div className="rounded-xl border-l-4 border-green-600 bg-green-50 p-4">
        <h3 className="font-semibold">
          Hackathon Registration
        </h3>
        <p className="text-gray-500 text-sm">
          Last Date: 18 July
        </p>
      </div>

      <div className="rounded-xl border-l-4 border-orange-500 bg-orange-50 p-4">
        <h3 className="font-semibold">
          Faculty Meeting
        </h3>
        <p className="text-gray-500 text-sm">
          Friday • 5:00 PM
        </p>
      </div>

    </div>

  </Card>

  {/* Faculty Performance */}

  <Card className="p-6 shadow-lg">

    <h2 className="text-2xl font-bold mb-5">
      📊 Faculty Performance
    </h2>

    <div className="space-y-5">

      <div>

        <div className="flex justify-between mb-2">
          <span>Attendance Completion</span>
          <span>92%</span>
        </div>

        <div className="h-3 rounded-full bg-gray-200">
          <div className="h-3 w-[92%] rounded-full bg-green-500"></div>
        </div>

      </div>

      <div>

        <div className="flex justify-between mb-2">
          <span>Assignments Evaluated</span>
          <span>80%</span>
        </div>

        <div className="h-3 rounded-full bg-gray-200">
          <div className="h-3 w-[80%] rounded-full bg-blue-600"></div>
        </div>

      </div>

      <div>

        <div className="flex justify-between mb-2">
          <span>Marks Uploaded</span>
          <span>70%</span>
        </div>

        <div className="h-3 rounded-full bg-gray-200">
          <div className="h-3 w-[70%] rounded-full bg-purple-600"></div>
        </div>

      </div>

    </div>

  </Card>

</div>

          {/* Recent Activity */}

                    {/* Recent Activity */}


          <Card className="mt-8 p-6">

            <h2 className="text-xl font-bold">
              Recent Activities
            </h2>

            <div className="mt-6 space-y-4">

              {dashboardData?.alerts?.map((alert, index) => (

                <div
                  key={index}
                  className={`flex items-center gap-3 rounded-xl p-4 ${
                    alert.type === "danger"
                      ? "bg-red-100"
                      : alert.type === "warning"
                      ? "bg-yellow-100"
                      : "bg-green-100"
                  }`}
                >

                  <Bell size={20} />

                  <span>
                    {alert.message}
                  </span>

                </div>

              ))}


              <div className="flex items-center gap-3">

                <BookOpen className="text-blue-600" />

                Assignment published for AIML.

              </div>


              <div className="flex items-center gap-3">

                <Bell className="text-orange-600" />

                New notice published.

              </div>


              <div className="flex items-center gap-3">

                <CalendarDays className="text-purple-600" />

                Timetable updated.

              </div>

            </div>

          </Card>

          </main>

      </div>

    </div>
  );
}

export default FacultyDashboard;