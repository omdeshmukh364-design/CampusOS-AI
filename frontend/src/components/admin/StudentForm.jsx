import { useState } from "react";
import { UserPlus } from "lucide-react";
import { addStudent } from "../../services/studentService";

function StudentForm({ refreshStudents }) {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    rollNo: "",
    department: "",
    semester: "",
    phone: "",
    cgpa: "",
    attendance: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err = {};

    // Name
    if (!student.name.trim()) {
      err.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(student.name)) {
      err.name = "Only letters are allowed";
    }

    // Email
    if (!student.email.trim()) {
      err.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(student.email)
    ) {
      err.email = "Invalid email";
    }

    // Roll Number
    if (!student.rollNo) {
      err.rollNo = "Roll Number required";
    } else if (!/^\d+$/.test(student.rollNo)) {
      err.rollNo = "Numbers only";
    }

    // Department
    if (!student.department.trim()) {
      err.department = "Department required";
    }

    // Semester
    const sem = Number(student.semester);

    if (!student.semester) {
      err.semester = "Semester required";
    } else if (!Number.isInteger(sem) || sem < 1 || sem > 8) {
      err.semester = "Semester must be between 1-8";
    }

    // Phone
    if (!/^\d{10}$/.test(student.phone)) {
      err.phone = "Phone must be exactly 10 digits";
    }

    // CGPA
    const cgpa = Number(student.cgpa);

    if (student.cgpa === "") {
      err.cgpa = "CGPA required";
    } else if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
      err.cgpa = "CGPA must be between 0-10";
    }

    // Attendance
    const attendance = Number(student.attendance);

    if (student.attendance === "") {
      err.attendance = "Attendance required";
    } else if (
      !Number.isInteger(attendance) ||
      attendance < 0 ||
      attendance > 100
    ) {
      err.attendance = "Attendance must be 0-100";
    }

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    if (name === "rollNo") {
      newValue = value.replace(/\D/g, "");
    }

    if (name === "semester") {
      newValue = value.replace(/\D/g, "").slice(0, 1);
    }

    if (name === "attendance") {
      newValue = value.replace(/\D/g, "").slice(0, 3);
    }

    if (name === "cgpa") {
      newValue = value.replace(/[^0-9.]/g, "");
    }

    if (name === "name") {
      newValue = value.replace(/[^A-Za-z ]/g, "");
    }

    setStudent({
      ...student,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await createStudent(student);

      alert("✅ Student Added Successfully");

      setStudent({
        name: "",
        email: "",
        rollNo: "",
        department: "",
        semester: "",
        phone: "",
        cgpa: "",
        attendance: "",
      });

      setErrors({});

      refreshStudents();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600";

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <div className="mb-8 flex items-center gap-3">
        <UserPlus className="text-blue-600" />
        <h2 className="text-3xl font-bold">
          Add Student
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >

        <div>
          <input
            className={inputStyle}
            placeholder="Full Name"
            name="name"
            value={student.name}
            onChange={handleChange}
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.name}
          </p>
        </div>

        <div>
          <input
            className={inputStyle}
            placeholder="College Email"
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.email}
          </p>
        </div>

        <div>
          <input
            className={inputStyle}
            placeholder="Roll Number"
            name="rollNo"
            value={student.rollNo}
            onChange={handleChange}
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.rollNo}
          </p>
        </div>

        <div>
          <input
            className={inputStyle}
            placeholder="Department"
            name="department"
            value={student.department}
            onChange={handleChange}
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.department}
          </p>
        </div>

        <div>
          <input
            className={inputStyle}
            placeholder="Semester"
            name="semester"
            value={student.semester}
            onChange={handleChange}
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.semester}
          </p>
        </div>

        <div>
          <input
            className={inputStyle}
            placeholder="Phone Number"
            name="phone"
            value={student.phone}
            onChange={handleChange}
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.phone}
          </p>
        </div>

        <div>
          <input
            className={inputStyle}
            placeholder="CGPA"
            name="cgpa"
            value={student.cgpa}
            onChange={handleChange}
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.cgpa}
          </p>
        </div>

        <div>
          <input
            className={inputStyle}
            placeholder="Attendance (%)"
            name="attendance"
            value={student.attendance}
            onChange={handleChange}
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.attendance}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="col-span-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          {loading ? "Adding Student..." : "➕ Add Student"}
        </button>

      </form>
    </div>
  );
}

export default StudentForm;