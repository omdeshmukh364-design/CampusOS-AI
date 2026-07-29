import { Bell, Search, LogOut } from "lucide-react";

function FacultyNavbar({ faculty, onLogout }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-lg">

      {/* Left */}

      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          {greeting},{" "}
          {faculty?.displayName || faculty?.name || "Professor"} 👋
        </h2>

        <p className="mt-1 text-gray-500">
          Welcome to CampusOS.AI Faculty Portal
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="flex items-center rounded-2xl border bg-gray-50 px-4 py-3">

          <Search size={18} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search..."
            className="ml-3 w-52 bg-transparent outline-none"
          />

        </div>

        {/* Notification */}

        <button className="rounded-2xl border p-3 hover:bg-blue-50">
          <Bell className="text-blue-600" size={22} />
        </button>

        {/* Faculty Profile */}

        <div className="flex items-center gap-3 rounded-2xl border bg-gray-50 px-3 py-2">

          <img
            src={`https://ui-avatars.com/api/?name=${
              faculty?.displayName || faculty?.name || "Professor"
            }&background=2563EB&color=fff`}
            alt="Faculty"
            className="h-12 w-12 rounded-full"
          />

          <div>

            <h3 className="font-semibold text-gray-800">
              {faculty?.displayName || faculty?.name || "Professor"}
            </h3>

            <p className="text-sm text-gray-500">
              {faculty?.department || "Faculty"}
            </p>

            <p className="text-xs text-blue-600">
              {faculty?.email}
            </p>

          </div>

        </div>

        {/* Logout */}

        <button
          onClick={onLogout}
          className="flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-white hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default FacultyNavbar;