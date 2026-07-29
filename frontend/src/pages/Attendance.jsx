import Sidebar from "../components/dashboard/Sidebar";
import Card from "../components/common/Card";

const subjects = [
  { name: "Database Management System", attendance: 92 },
  { name: "Java Programming", attendance: 88 },
  { name: "Operating System", attendance: 95 },
  { name: "Python Programming", attendance: 85 },
  { name: "Computer Networks", attendance: 90 },
];

function Attendance({
  onDashboard,
  onProfile,
  onAttendance,
  onAssignments,
  onStudyPlanner,
  onPlacements,
  onOpenAI,
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#EAF2FF_0%,_#F7F9FF_60%,_#EDF7FF_100%)] p-4 lg:p-6">
      <div className="flex min-h-screen gap-6">

        <Sidebar
          activePage="Attendance"
          onDashboard={onDashboard}
          onProfile={onProfile}
          onAttendance={onAttendance}
          onAssignments={onAssignments}
          onStudyPlanner={onStudyPlanner}
          onPlacements={onPlacements}
          onOpenAI={onOpenAI}
        />

        <main className="flex-1">

          <Card className="p-8">
            <h1 className="text-4xl font-bold text-[#111827]">
              Attendance
            </h1>

            <p className="mt-2 text-lg text-[#6B7280]">
              Track your attendance across all subjects.
            </p>
          </Card>

          <Card className="mt-6 p-8 text-center">

            <h2 className="text-2xl font-bold">
              Overall Attendance
            </h2>

            <p className="mt-4 text-6xl font-bold text-blue-600">
              89%
            </p>

            <div className="mt-6 h-4 w-full rounded-full bg-gray-200">
              <div className="h-4 w-[89%] rounded-full bg-blue-600"></div>
            </div>

          </Card>

          <div className="mt-6 space-y-5">

            {subjects.map((subject) => (

              <Card
                key={subject.name}
                className="p-6"
              >

                <div className="flex justify-between">

                  <h3 className="text-lg font-semibold">
                    {subject.name}
                  </h3>

                  <span className="font-bold text-blue-600">
                    {subject.attendance}%
                  </span>

                </div>

                <div className="mt-4 h-3 rounded-full bg-gray-200">

                  <div
                    className="h-3 rounded-full bg-blue-600"
                    style={{
                      width: `${subject.attendance}%`,
                    }}
                  />

                </div>

              </Card>

            ))}

          </div>

        </main>

      </div>
    </div>
  );
}

export default Attendance;