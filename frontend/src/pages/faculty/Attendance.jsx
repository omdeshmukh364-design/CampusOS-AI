import { useEffect, useState } from "react";
import { ClipboardCheck, Check, X } from "lucide-react";

import { getStudents } from "../../services/rosterService";
import { markAttendance } from "../../services/attendanceService";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function Attendance({ faculty, onBack }) {
  const [department, setDepartment] = useState("AIML");
  const [semester, setSemester] = useState(3);
  const [division, setDivision] = useState("SY AIML A");
  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const [students, setStudents] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [loadingRoster, setLoadingRoster] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const loadRoster = async () => {
    setLoadingRoster(true);
    setResult(null);
    try {
      const data = await getStudents({ department, semester, division });
      const list = Array.isArray(data) ? data : [];
      setStudents(list);

      // default everyone to "present"
      const defaults = {};
      list.forEach((s) => {
        defaults[s.email] = "present";
      });
      setStatusMap(defaults);
    } catch (error) {
      console.error("Failed to load roster:", error);
      setStudents([]);
    } finally {
      setLoadingRoster(false);
    }
  };

  useEffect(() => {
    loadRoster();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleStatus = (email) => {
    setStatusMap((prev) => ({
      ...prev,
      [email]: prev[email] === "present" ? "absent" : "present",
    }));
  };

  const markAll = (status) => {
    const updated = {};
    students.forEach((s) => {
      updated[s.email] = status;
    });
    setStatusMap(updated);
  };

  const dayName = DAYS[new Date(date).getDay() === 0 ? 6 : new Date(date).getDay() - 1];

  const handleSubmit = async () => {
    if (!subject || !room || students.length === 0) {
      setResult({ ok: false, message: "Fill in subject and room, and make sure a roster is loaded." });
      return;
    }

    setSubmitting(true);
    setResult(null);

    const payload = {
      date,
      day: dayName,
      subject,
      department,
      semester: Number(semester),
      division,
      facultyId: faculty?.uid || faculty?.email || "unknown",
      facultyName: faculty?.name || "Unknown Faculty",
      room,
      records: students.map((s) => ({
        studentId: s.email,
        name: s.name,
        rollNo: s.rollNo,
        status: statusMap[s.email] || "present",
      })),
    };

    try {
      const res = await markAttendance(payload);
      if (res.success) {
        setResult({ ok: true, message: `Saved! Session attendance: ${res.percentage}%` });
      } else {
        setResult({ ok: false, message: "Could not save attendance." });
      }
    } catch (error) {
      console.error("Failed to save attendance:", error);
      setResult({ ok: false, message: "Could not reach the server. Is the backend running?" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={onBack}
        className="mb-6 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        ← Back
      </button>

      <div className="rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <ClipboardCheck size={32} className="text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">Mark Attendance</h1>
            <p className="mt-1 text-gray-500">
              Select the class, take attendance, and submit.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-xl border p-3"
          />

          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="rounded-xl border p-3"
          />

          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Room / Lab"
            className="rounded-xl border p-3"
          />

          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department"
            className="rounded-xl border p-3"
          />

          <input
            type="number"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder="Semester"
            className="rounded-xl border p-3"
          />

          <input
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            placeholder="Division (e.g. SY AIML A)"
            className="rounded-xl border p-3"
          />
        </div>

        <button
          onClick={loadRoster}
          className="mt-5 rounded-xl bg-gray-800 px-6 py-3 text-white hover:bg-gray-900"
        >
          Load Roster
        </button>

        {result && (
          <div
            className={`mt-5 rounded-xl p-4 font-medium ${
              result.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {result.message}
          </div>
        )}

        <div className="mt-8">
          {loadingRoster ? (
            <p className="text-gray-500">Loading roster...</p>
          ) : students.length === 0 ? (
            <p className="text-gray-500">
              No students found for this department/semester/division. Check the
              values above and click "Load Roster".
            </p>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-600">{students.length} students</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => markAll("present")}
                    className="rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-200"
                  >
                    Mark All Present
                  </button>
                  <button
                    onClick={() => markAll("absent")}
                    className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                  >
                    Mark All Absent
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {students.map((s) => {
                  const status = statusMap[s.email] || "present";
                  return (
                    <div
                      key={s.email}
                      className="flex items-center justify-between rounded-xl border p-4"
                    >
                      <div>
                        <p className="font-semibold">{s.name}</p>
                        <p className="text-sm text-gray-500">
                          Roll No: {s.rollNo} • {s.email}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleStatus(s.email)}
                        className={`flex items-center gap-2 rounded-xl px-5 py-2 font-medium ${
                          status === "present"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {status === "present" ? (
                          <>
                            <Check size={18} /> Present
                          </>
                        ) : (
                          <>
                            <X size={18} /> Absent
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="mt-8 rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Attendance"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Attendance;