import { useEffect, useState } from "react";
import { ClipboardCheck, AlertTriangle } from "lucide-react";

import Card from "../common/Card";
import { getAttendanceAnalytics } from "../../services/attendanceService";

function Attendance() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState("");

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await getAttendanceAnalytics(
        department ? { department } : {}
      );
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to load attendance analytics:", error);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardCheck size={32} />
            <div>
              <h1 className="text-3xl font-bold">Attendance Analytics</h1>
              <p className="mt-1 text-blue-100">
                Institution-wide attendance across every department.
              </p>
            </div>
          </div>

          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Filter by department..."
            className="rounded-xl border-0 px-4 py-2 text-gray-900"
          />
        </div>
      </div>

      {loading ? (
        <Card className="p-10 text-center text-gray-500">
          Loading attendance analytics...
        </Card>
      ) : !analytics || analytics.totalSessions === 0 ? (
        <Card className="p-10 text-center text-gray-500">
          No attendance sessions recorded yet.
        </Card>
      ) : (
        <>
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold">Overall Attendance</h2>
            <p className="mt-4 text-6xl font-bold text-blue-600">
              {analytics.overallPercentage}%
            </p>
            <p className="mt-2 text-gray-500">
              Across {analytics.totalSessions} recorded sessions
            </p>
            <div className="mt-6 h-4 w-full rounded-full bg-gray-200">
              <div
                className="h-4 rounded-full bg-blue-600"
                style={{ width: `${analytics.overallPercentage}%` }}
              />
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">By Subject</h2>
              <div className="space-y-4">
                {analytics.bySubject.map((s) => (
                  <div key={s.subject}>
                    <div className="flex justify-between">
                      <span>{s.subject}</span>
                      <span>{s.percentage}%</span>
                    </div>
                    <div className="mt-2 h-3 w-full rounded-full bg-gray-200">
                      <div
                        className="h-3 rounded-full bg-green-600"
                        style={{ width: `${s.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">By Division</h2>
              <div className="space-y-4">
                {analytics.byDivision.map((d) => (
                  <div key={d.division}>
                    <div className="flex justify-between">
                      <span>{d.division}</span>
                      <span>{d.percentage}%</span>
                    </div>
                    <div className="mt-2 h-3 w-full rounded-full bg-gray-200">
                      <div
                        className="h-3 rounded-full bg-purple-600"
                        style={{ width: `${d.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Attendance Trend</h2>
            <div className="space-y-3">
              {analytics.trend.map((t) => (
                <div key={t.date} className="flex items-center gap-4">
                  <span className="w-28 text-sm text-gray-500">{t.date}</span>
                  <div className="h-3 flex-1 rounded-full bg-gray-200">
                    <div
                      className="h-3 rounded-full bg-blue-600"
                      style={{ width: `${t.percentage}%` }}
                    />
                  </div>
                  <span className="w-14 text-right text-sm font-semibold">
                    {t.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-600" />
              <h2 className="text-xl font-bold">
                Students Below 75% ({analytics.lowAttendanceStudents.length})
              </h2>
            </div>

            {analytics.lowAttendanceStudents.length === 0 ? (
              <p className="mt-4 text-gray-500">
                No students currently below the threshold.
              </p>
            ) : (
              <div className="mt-4 space-y-2">
                {analytics.lowAttendanceStudents.map((s) => (
                  <div
                    key={s.studentId}
                    className="flex items-center justify-between rounded-xl bg-red-50 p-4"
                  >
                    <span className="font-medium">{s.name}</span>
                    <span className="font-bold text-red-600">
                      {s.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

export default Attendance;