import {
  LayoutDashboard,
  Users,
  UserCog,
  Building2,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  Briefcase,
  Bell,
  Bot,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    page: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    page: "students",
    icon: Users,
  },
  {
    title: "Faculty",
    page: "faculty",
    icon: UserCog,
  },
  {
    title: "Departments",
    page: "departments",
    icon: Building2,
  },
  {
    title: "Subjects",
    page: "subjects",
    icon: BookOpen,
  },
  {
    title: "Timetable",
    page: "timetable",
    icon: CalendarDays,
  },
  {
    title: "Attendance",
    page: "attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Marks",
    page: "marks",
    icon: GraduationCap,
  },
  {
    title: "Placements",
    page: "placements",
    icon: Briefcase,
  },
  {
    title: "Notices",
    page: "notices",
    icon: Bell,
  },
  {
    title: "AI Analytics",
    page: "ai",
    icon: Bot,
  },
  {
    title: "Settings",
    page: "settings",
    icon: Settings,
  },
];

function AdminSidebar({
  currentPage,
  setCurrentPage,
  onLogout,
}) {
  return (
    <aside className="flex h-screen w-72 flex-col rounded-3xl border border-gray-200 bg-white shadow-xl">

      {/* Logo */}

      <div className="border-b p-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Campus
          <span className="text-blue-600">OS</span>.AI
        </h1>

        <p className="mt-2 text-gray-500">
          Admin Portal
        </p>

      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto p-5 space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <button
              key={item.page}
              onClick={() => setCurrentPage(item.page)}
              className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-200
              ${
                currentPage === item.page
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>
            </button>
          );
        })}

      </div>

      {/* Logout */}

      <div className="border-t p-5">

        <button
          onClick={onLogout}
          className="flex w-full items-center gap-4 rounded-2xl bg-red-50 px-5 py-4 text-red-600 transition hover:bg-red-100"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;