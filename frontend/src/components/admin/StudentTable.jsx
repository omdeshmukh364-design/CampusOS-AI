import { useEffect, useState } from "react";
import { Pencil, Trash2, Search, Users } from "lucide-react";
import StudentRow from "./StudentRow";
import {
  getStudents,
  deleteStudent,
} from "../../services/studentService";

function StudentTable({ refresh }) {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");

  const loadStudents = async () => {
    const data = await getStudents();

    setStudents(data);
    setFilteredStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, [refresh]);

  useEffect(() => {
    const result = students.filter((student) => {
      const keyword = search.toLowerCase();

      return (
        student.name?.toLowerCase().includes(keyword) ||
        student.email?.toLowerCase().includes(keyword) ||
        student.rollNo?.toLowerCase().includes(keyword) ||
        student.department?.toLowerCase().includes(keyword)
      );
    });

    setFilteredStudents(result);
  }, [search, students]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this student?"
    );

    if (!confirmDelete) return;

    await deleteStudent(id);

    loadStudents();
  };

  return (
    <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <Users className="text-blue-600" />

          <h2 className="text-2xl font-bold">
            Students
          </h2>
        </div>

        <div className="relative">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="rounded-xl border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
          />

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Roll</th>

              <th className="p-4 text-left">Department</th>

              <th className="p-4 text-left">Semester</th>

              <th className="p-4 text-left">CGPA</th>

              <th className="p-4 text-left">Attendance</th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="py-8 text-center text-gray-500"
                >
                  No students found.
                </td>

              </tr>

            ) : (

              filteredStudents.map((student) => (
  <StudentRow
    key={student.id}
    student={student}
    onDelete={handleDelete}
    onEdit={(student) => {
      console.log(student);
    }}
  />
))
)

            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default StudentTable;