import {
  Bell,
  Search,
  LogOut,
  ShieldCheck,
} from "lucide-react";

function AdminNavbar({ admin, onLogout }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg">

      {/* Left */}

      <div>

        <h2 className="text-3xl font-bold text-gray-800">
          {greeting},{" "}
          {admin?.displayName || admin?.name || "Administrator"} 👋
        </h2>

        <p className="mt-1 text-gray-500">
          CampusOS.AI Administration Portal
        </p>

        <p className="mt-1 text-sm text-blue-600">
          {today}
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">

          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="ml-3 w-56 bg-transparent outline-none"
          />

        </div>

        {/* Notification */}

        <button className="relative rounded-2xl border border-gray-200 bg-white p-3 hover:bg-blue-50">

          <Bell
            size={22}
            className="text-blue-600"
          />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        {/* Profile */}

        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2">

          <div className="rounded-full bg-blue-600 p-3">

            <ShieldCheck
              className="text-white"
              size={22}
            />

          </div>

          <div>

            <h3 className="font-semibold text-gray-800">
              {admin?.displayName ||
                admin?.name ||
                "Admin"}
            </h3>

            <p className="text-sm text-gray-500">
              Super Administrator
            </p>

            <p className="text-xs text-blue-600">
              {admin?.email}
            </p>

          </div>

        </div>

        {/* Logout */}

        <button
          onClick={onLogout}
          className="flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default AdminNavbar;