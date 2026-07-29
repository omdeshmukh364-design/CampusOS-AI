import { Pencil, Trash2 } from "lucide-react";

function StudentRow({ student, onDelete, onEdit }) {
  return (
    <tr className="border-b hover:bg-blue-50 transition">

      <td className="p-4 font-medium">
        {student.name}
      </td>

      <td className="p-4">
        {student.email}
      </td>

      <td className="p-4">
        {student.rollNo}
      </td>

      <td className="p-4">
        {student.department}
      </td>

      <td className="p-4">
        {student.semester}
      </td>

      <td className="p-4">
        {student.cgpa}
      </td>

      <td className="p-4">
        {student.attendance}%
      </td>

      <td className="p-4">
        <div className="flex justify-center gap-3">

          <button
            onClick={() => onEdit(student)}
            className="rounded-lg bg-yellow-100 p-2 text-yellow-700 hover:bg-yellow-200"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(student.id)}
            className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </td>

    </tr>
  );
}

export default StudentRow;