import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  BookOpen,
  GraduationCap,
  CalendarDays,
  Bell,
  Bot,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    page: "faculty-dashboard",
  },
  {
    name: "Students",
    icon: Users,
    page: "faculty-students",
  },
  {
    name: "Attendance",
    icon: ClipboardCheck,
    page: "faculty-attendance",
  },
  {
    name: "Assignments",
    icon: BookOpen,
    page: "faculty-assignments",
  },
  {
    name: "Marks",
    icon: GraduationCap,
    page: "faculty-marks",
  },
  {
    name: "Timetable",
    icon: CalendarDays,
    page: "faculty-timetable",
  },
  {
    name: "Notices",
    icon: Bell,
    page: "faculty-notices",
  },
  {
    name: "Placements",
    icon: GraduationCap,
    page: "faculty-placements",
  },
  {
    name: "AI Assistant",
    icon: Bot,
    page: "faculty-ai",
  },
  {
    name: "Profile",
    icon: User,
    page: "faculty-profile",
  },
  {
    name: "Settings",
    icon: Settings,
    page: "faculty-settings",
  },
];

function FacultySidebar({
  currentPage,
  setPage,
  onLogout,
}) {
  return (
    <aside className="w-72 rounded-3xl border border-gray-200 bg-white shadow-xl flex flex-col">

      <div className="border-b p-8">
        <h1 className="text-3xl font-bold">
          Campus<span className="text-blue-600">OS.AI</span>
        </h1>

        <p className="mt-2 text-gray-500">
          Faculty Portal
        </p>
      </div>

      <div className="flex-1 space-y-2 p-5">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.page}
              onClick={() => setPage(item.page)}
              className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition
                ${
                  currentPage === item.page
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-blue-50"
                }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="border-t p-5">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-4 rounded-2xl bg-red-50 px-5 py-4 text-red-600 hover:bg-red-100"
        >
          <LogOut size={20} />

          Logout
        </button>
      </div>

    </aside>
  );
}

export default FacultySidebar;