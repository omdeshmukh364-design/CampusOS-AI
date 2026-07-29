import { useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  FileText,
} from "lucide-react";

function Assignments({ onBack }) {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      subject: "Java Programming",
      division: "SY AIML A",
      title: "OOP Assignment",
      description: "Implement Inheritance and Polymorphism.",
      dueDate: "2026-07-20",
      marks: 20,
      status: "Active",
    },
    {
      id: 2,
      subject: "DBMS",
      division: "SY AIML B",
      title: "Normalization",
      description: "Normalize the given database.",
      dueDate: "2026-07-24",
      marks: 15,
      status: "Active",
    },
  ]);

  const [subject, setSubject] = useState("Java Programming");
  const [division, setDivision] = useState("SY AIML A");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [marks, setMarks] = useState(20);
  const [search, setSearch] = useState("");

  const addAssignment = () => {
    if (!title || !description || !dueDate) {
      alert("Please fill all fields.");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      subject,
      division,
      title,
      description,
      dueDate,
      marks,
      status: "Active",
    };

    setAssignments([...assignments, newAssignment]);

    setTitle("");
    setDescription("");
    setDueDate("");
    setMarks(20);

    alert("Assignment Published Successfully!");
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((item) => item.id !== id));
  };

  const filteredAssignments = assignments.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.division.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <button
        onClick={onBack}
        className="mb-6 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        ← Back
      </button>

      <div className="rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="text-3xl font-bold">
          Assignment Management
        </h1>

        <p className="mt-2 text-gray-500">
          Create, publish and manage assignments.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold">
              Subject
            </label>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option>Java Programming</option>
              <option>DBMS</option>
              <option>Artificial Intelligence</option>
              <option>Computer Networks</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Division
            </label>

            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option>SY AIML A</option>
              <option>SY AIML B</option>
              <option>TY AIML A</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Assignment Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border p-3"
              placeholder="Enter assignment title"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Maximum Marks
            </label>

            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block font-semibold">
              Description
            </label>

            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border p-3"
              placeholder="Assignment description..."
            />

          </div>

                    <div>

            <label className="mb-2 block font-semibold">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Upload PDF
            </label>

            <input
              type="file"
              accept=".pdf"
              className="w-full rounded-xl border p-3"
            />

          </div>

        </div>

        <button
          onClick={addAssignment}
          className="mt-8 flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3 text-white hover:bg-green-700"
        >
          <Plus size={18} />
          Publish Assignment
        </button>

        {/* Search */}

        <div className="mt-10">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assignments..."
              className="w-full rounded-xl border py-3 pl-12 pr-4"
            />

          </div>

        </div>

        {/* Assignment Table */}

        <div className="mt-8 overflow-x-auto">

          <table className="min-w-full border-collapse">

            <thead>

              <tr className="bg-blue-600 text-white">

                <th className="p-4 text-left">Title</th>

                <th className="p-4 text-left">Subject</th>

                <th className="p-4 text-left">Division</th>

                <th className="p-4 text-center">Marks</th>

                <th className="p-4 text-center">Due Date</th>

                <th className="p-4 text-center">Status</th>

                <th className="p-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredAssignments.map((assignment) => (

                <tr
                  key={assignment.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">

                    <div className="font-semibold">
                      {assignment.title}
                    </div>

                    <div className="text-sm text-gray-500">
                      {assignment.description}
                    </div>

                  </td>

                  <td className="p-4">
                    {assignment.subject}
                  </td>

                  <td className="p-4">
                    {assignment.division}
                  </td>

                  <td className="p-4 text-center">
                    {assignment.marks}
                  </td>

                  <td className="p-4 text-center">
                    {assignment.dueDate}
                  </td>

                  <td className="p-4 text-center">

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {assignment.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200">
                        <Eye size={18} />
                      </button>

                      <button className="rounded-lg bg-yellow-100 p-2 text-yellow-700 hover:bg-yellow-200">
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteAssignment(assignment.id)}
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

          {filteredAssignments.length === 0 && (

            <div className="py-12 text-center text-gray-500">

              <FileText
                size={50}
                className="mx-auto mb-4 text-gray-300"
              />

              No assignments found.

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Assignments;