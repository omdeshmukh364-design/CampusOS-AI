import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";

import Card from "../common/Card";
import {
  getTimetable,
  createLecture,
  updateLecture,
  deleteLecture,
} from "../../services/timetableService";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const emptyForm = {
  day: "Monday",
  startTime: "",
  endTime: "",
  subject: "",
  department: "AIML",
  semester: 3,
  division: "SY AIML A",
  facultyId: "",
  facultyName: "",
  room: "",
};

function Timetable() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [conflictError, setConflictError] = useState(null);
  const [filterDivision, setFilterDivision] = useState("");
  const [saving, setSaving] = useState(false);

  const loadTimetable = async () => {
    setLoading(true);
    try {
      const data = await getTimetable(
        filterDivision ? { division: filterDivision } : {}
      );
      setLectures(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load timetable:", error);
      setLectures([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTimetable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDivision]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setConflictError(null);
  };

  const handleSubmit = async () => {
    if (!form.startTime || !form.endTime || !form.subject || !form.room || !form.facultyName) {
      setConflictError({ message: "Please fill in all fields." });
      return;
    }

    setSaving(true);
    setConflictError(null);

    const payload = {
      ...form,
      semester: Number(form.semester),
      facultyId: form.facultyId || form.facultyName,
    };

    try {
      const result = editingId
        ? await updateLecture(editingId, payload)
        : await createLecture(payload);

      if (!result.ok) {
        setConflictError(
          result.data?.detail || { message: "Could not save lecture." }
        );
        return;
      }

      resetForm();
      loadTimetable();
    } catch (error) {
      console.error("Failed to save lecture:", error);
      setConflictError({
        message: "Could not reach the server. Is the backend running?",
      });
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (lecture) => {
    setEditingId(lecture.id);
    setForm({
      day: lecture.day,
      startTime: lecture.startTime,
      endTime: lecture.endTime,
      subject: lecture.subject,
      department: lecture.department,
      semester: lecture.semester,
      division: lecture.division,
      facultyId: lecture.facultyId,
      facultyName: lecture.facultyName,
      room: lecture.room,
    });
    setConflictError(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lecture slot?")) return;
    await deleteLecture(id);
    loadTimetable();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-8 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <CalendarDays size={32} />
          <div>
            <h1 className="text-3xl font-bold">Timetable Management</h1>
            <p className="mt-1 text-blue-100">
              Institution-wide scheduling with automatic conflict detection.
            </p>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {editingId ? "Edit Lecture" : "Add Lecture"}
          </h2>
          {editingId && (
            <button
              onClick={resetForm}
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Cancel edit
            </button>
          )}
        </div>

        {conflictError && (
          <div className="mt-4 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-red-700">
            <AlertTriangle size={20} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">{conflictError.message}</p>
              {conflictError.conflicts?.map((c, i) => (
                <p key={i} className="mt-1 text-sm">
                  {c.type === "room" ? "Room" : "Faculty"} already booked:{" "}
                  {c.subject} ({c.day} {c.startTime}–{c.endTime})
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <select
            value={form.day}
            onChange={(e) => setForm({ ...form, day: e.target.value })}
            className="rounded-xl border p-3"
          >
            {DAYS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <input
            type="time"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            className="rounded-xl border p-3"
          />

          <input
            type="time"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            className="rounded-xl border p-3"
          />

          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="Subject"
            className="rounded-xl border p-3"
          />

          <input
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            placeholder="Department"
            className="rounded-xl border p-3"
          />

          <input
            type="number"
            value={form.semester}
            onChange={(e) => setForm({ ...form, semester: e.target.value })}
            placeholder="Semester"
            className="rounded-xl border p-3"
          />

          <input
            value={form.division}
            onChange={(e) => setForm({ ...form, division: e.target.value })}
            placeholder="Division (e.g. SY AIML A)"
            className="rounded-xl border p-3"
          />

          <input
            value={form.facultyName}
            onChange={(e) => setForm({ ...form, facultyName: e.target.value })}
            placeholder="Faculty Name"
            className="rounded-xl border p-3"
          />

          <input
            value={form.room}
            onChange={(e) => setForm({ ...form, room: e.target.value })}
            placeholder="Room / Lab"
            className="rounded-xl border p-3"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Plus size={18} />
          {saving ? "Saving..." : editingId ? "Update Lecture" : "Add Lecture"}
        </button>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">All Lectures</h2>
          <input
            value={filterDivision}
            onChange={(e) => setFilterDivision(e.target.value)}
            placeholder="Filter by division..."
            className="rounded-xl border px-4 py-2 text-sm"
          />
        </div>

        {loading ? (
          <p className="mt-6 text-gray-500">Loading timetable...</p>
        ) : lectures.length === 0 ? (
          <p className="mt-6 text-gray-500">No lectures scheduled yet.</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4 text-left">Day</th>
                  <th className="p-4 text-left">Time</th>
                  <th className="p-4 text-left">Subject</th>
                  <th className="p-4 text-left">Division</th>
                  <th className="p-4 text-left">Faculty</th>
                  <th className="p-4 text-left">Room</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lectures.map((lecture) => (
                  <tr key={lecture.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{lecture.day}</td>
                    <td className="p-4">
                      {lecture.startTime} – {lecture.endTime}
                    </td>
                    <td className="p-4 font-semibold">{lecture.subject}</td>
                    <td className="p-4">{lecture.division}</td>
                    <td className="p-4">{lecture.facultyName}</td>
                    <td className="p-4">{lecture.room}</td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => startEdit(lecture)}
                          className="rounded-lg bg-yellow-100 p-2 text-yellow-700 hover:bg-yellow-200"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(lecture.id)}
                          className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Timetable;