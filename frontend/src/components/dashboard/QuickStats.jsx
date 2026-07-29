import {
  Activity,
  BookOpen,
  GraduationCap,
  Clock,
} from "lucide-react";

function QuickStats({ attendance, loadingAttendance }) {
  const attendanceValue = loadingAttendance
    ? "..."
    : attendance?.totalCount
    ? `${attendance.percentage}%`
    : "No data yet";

  const stats = [
    {
      label: "Attendance",
      value: attendanceValue,
      icon: Activity,
      color: "text-green-600",
      bg: "bg-green-100",
      comingSoon: false,
    },
    {
      label: "Pending Assignments",
      value: "—",
      icon: BookOpen,
      color: "text-gray-400",
      bg: "bg-gray-100",
      comingSoon: true,
    },
    {
      label: "CGPA",
      value: "—",
      icon: GraduationCap,
      color: "text-gray-400",
      bg: "bg-gray-100",
      comingSoon: true,
    },
    {
      label: "Study Hours",
      value: "—",
      icon: Clock,
      color: "text-gray-400",
      bg: "bg-gray-100",
      comingSoon: true,
    },
  ];

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg hover:shadow-xl transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {item.label}
                </p>

                <h2 className={`mt-3 text-3xl font-bold ${item.color}`}>
                  {item.value}
                </h2>

                {item.comingSoon && (
                  <p className="mt-1 text-xs text-gray-400">
                    Coming soon
                  </p>
                )}
              </div>

              <div className={`rounded-2xl p-4 ${item.bg}`}>
                <Icon className={item.color} size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default QuickStats;