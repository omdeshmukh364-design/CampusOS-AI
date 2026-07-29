import { useMemo, useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import { deleteFaculty } from "../../services/facultyService";

function FacultyTable({
  faculty,
  refreshFaculty,
  onEdit,
}) {
  const [search, setSearch] = useState("");

  const filteredFaculty = useMemo(() => {
    return faculty.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [faculty, search]);

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this faculty member?"
    );

    if (!ok) return;

    await deleteFaculty(id);

    refreshFaculty();
  };

  return (
    <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          Faculty
        </h2>

        <div className="flex items-center rounded-xl border px-3">

          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            className="p-2 outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-4 text-left">
                Name
              </th>

              <th>Email</th>

              <th>Employee ID</th>

              <th>Department</th>

              <th>Designation</th>

              <th>Experience</th>

              <th>Phone</th>

              <th>Subjects</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredFaculty.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {item.name}
                </td>

                <td>{item.email}</td>

                <td>{item.employeeId}</td>

                <td>{item.department}</td>

                <td>{item.designation}</td>

                <td>
                  {item.experience} yrs
                </td>

                <td>{item.phone}</td>

                <td>
                  {Array.isArray(item.subjects)
                    ? item.subjects.join(", ")
                    : item.subjects}
                </td>

                <td>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        onEdit(item)
                      }
                      className="rounded-lg bg-yellow-100 p-2 text-yellow-600"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      className="rounded-lg bg-red-100 p-2 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default FacultyTable;