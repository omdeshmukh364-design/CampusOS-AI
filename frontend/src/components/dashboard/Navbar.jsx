import { Bell, Search, LogOut } from "lucide-react";

function Navbar({ student, onLogout }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-[#E5E7EB] bg-white/85 p-5 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] backdrop-blur">

      {/* Left */}

      <div>
        <h2 className="text-2xl font-bold text-[#111827]">
          {greeting}, {student?.fullName || "Student"} 👋
        </h2>

        <p className="text-[#6B7280]">
          Welcome back to CampusOS.AI
        </p>

        <p className="text-sm text-blue-600 mt-1">
          {student?.department || "Artificial Intelligence & Machine Learning"}
        </p>
      </div>

      {/* Right */}

      <div className="flex flex-wrap items-center gap-3">

        {/* Search */}

        <div className="flex items-center rounded-2xl border border-[#E5E7EB] bg-[#F4F7FF] px-4 py-2">
          <Search size={18} className="text-[#6B7280]" />

          <input
            placeholder="Search..."
            className="ml-2 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Notification */}

        <button className="rounded-2xl border border-[#E5E7EB] bg-white p-3 hover:bg-[#F4F7FF]">
          <Bell size={20} />
        </button>

        {/* Profile */}

        <div className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F4F7FF] px-3 py-2">

          <img
            src={`https://ui-avatars.com/api/?name=${
              student?.fullName || "Student"
            }&background=2563eb&color=fff`}
            alt="Profile"
            className="h-11 w-11 rounded-full"
          />

          <div>
            <h3 className="font-semibold text-[#111827]">
              {student?.fullName || "Student"}
            </h3>

            <p className="text-sm text-[#6B7280]">
              {student?.year || ""} {student?.department || ""}
            </p>

            <p className="text-xs text-blue-600">
              {student?.email}
            </p>
          </div>
        </div>

        {/* Logout */}

        <button
          onClick={onLogout}
          className="flex items-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;