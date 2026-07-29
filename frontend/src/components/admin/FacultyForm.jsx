import { useState } from "react";
import { UserPlus } from "lucide-react";
import { addFaculty } from "../../services/facultyService";

function FacultyForm({ refreshFaculty }) {
  const [faculty, setFaculty] = useState({
    name: "",
    email: "",
    employeeId: "",
    department: "",
    designation: "",
    phone: "",
    experience: "",
    subjects: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600";

  const validate = () => {
    const err = {};

    if (!faculty.name.trim())
      err.name = "Faculty name is required";
    else if (!/^[A-Za-z ]+$/.test(faculty.name))
      err.name = "Only letters allowed";

    if (!faculty.email.trim())
      err.email = "Email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(faculty.email)
    )
      err.email = "Invalid email";

    if (!faculty.employeeId.trim())
      err.employeeId = "Employee ID required";

    if (!faculty.department.trim())
      err.department = "Department required";

    if (!faculty.designation.trim())
      err.designation = "Designation required";

    if (!/^\d{10}$/.test(faculty.phone))
      err.phone = "Phone must be 10 digits";

    if (faculty.experience === "")
      err.experience = "Experience required";
    else if (
      !Number.isInteger(Number(faculty.experience))
    )
      err.experience = "Numbers only";

    if (!faculty.subjects.trim())
      err.subjects = "Enter at least one subject";

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "phone")
      value = value.replace(/\D/g, "").slice(0, 10);

    if (name === "experience")
      value = value.replace(/\D/g, "");

    if (name === "name")
      value = value.replace(/[^A-Za-z ]/g, "");

    setFaculty({
      ...faculty,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await addFaculty({
        ...faculty,
        experience: Number(faculty.experience),
        subjects: faculty.subjects
          .split(",")
          .map((s) => s.trim()),
      });

      alert("Faculty Added Successfully");

      setFaculty({
        name: "",
        email: "",
        employeeId: "",
        department: "",
        designation: "",
        phone: "",
        experience: "",
        subjects: "",
      });

      setErrors({});

      refreshFaculty();

    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <div className="mb-8 flex items-center gap-3">
        <UserPlus className="text-blue-600" />
        <h2 className="text-3xl font-bold">
          Add Faculty
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >

        <div>
          <input
            className={inputClass}
            placeholder="Faculty Name"
            name="name"
            value={faculty.name}
            onChange={handleChange}
          />
          <p className="text-sm text-red-500">
            {errors.name}
          </p>
        </div>

        <div>
          <input
            className={inputClass}
            placeholder="College Email"
            name="email"
            value={faculty.email}
            onChange={handleChange}
          />
          <p className="text-sm text-red-500">
            {errors.email}
          </p>
        </div>

        <div>
          <input
            className={inputClass}
            placeholder="Employee ID"
            name="employeeId"
            value={faculty.employeeId}
            onChange={handleChange}
          />
          <p className="text-sm text-red-500">
            {errors.employeeId}
          </p>
        </div>

        <div>
          <input
            className={inputClass}
            placeholder="Department"
            name="department"
            value={faculty.department}
            onChange={handleChange}
          />
          <p className="text-sm text-red-500">
            {errors.department}
          </p>
        </div>

        <div>
          <input
            className={inputClass}
            placeholder="Designation"
            name="designation"
            value={faculty.designation}
            onChange={handleChange}
          />
          <p className="text-sm text-red-500">
            {errors.designation}
          </p>
        </div>

        <div>
          <input
            className={inputClass}
            placeholder="Experience (Years)"
            name="experience"
            value={faculty.experience}
            onChange={handleChange}
          />
          <p className="text-sm text-red-500">
            {errors.experience}
          </p>
        </div>

        <div>
          <input
            className={inputClass}
            placeholder="Phone Number"
            name="phone"
            value={faculty.phone}
            onChange={handleChange}
          />
          <p className="text-sm text-red-500">
            {errors.phone}
          </p>
        </div>

        <div>
          <input
            className={inputClass}
            placeholder="Subjects (Comma separated)"
            name="subjects"
            value={faculty.subjects}
            onChange={handleChange}
          />
          <p className="text-sm text-red-500">
            {errors.subjects}
          </p>
        </div>

        <button
          disabled={loading}
          className="col-span-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white hover:bg-blue-700"
        >
          {loading ? "Adding Faculty..." : "➕ Add Faculty"}
        </button>

      </form>

    </div>
  );
}

export default FacultyForm;