import { useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  Phone,
  Download,
} from "lucide-react";

function Students({ onBack }) {

const [search,setSearch]=useState("");

const [division,setDivision]=useState("SY AIML A");

const [year,setYear]=useState("Second Year");

const [students]=useState([
{
id:1,
name:"Rahul Patil",
roll:"AIML001",
division:"SY AIML A",
year:"Second Year",
attendance:92,
marks:88,
},
{
id:2,
name:"Sneha Sharma",
roll:"AIML002",
division:"SY AIML A",
year:"Second Year",
attendance:95,
marks:93,
},
{
id:3,
name:"Amit Singh",
roll:"AIML003",
division:"SY AIML B",
year:"Second Year",
attendance:68,
marks:61,
},
{
id:4,
name:"Priya Deshmukh",
roll:"AIML004",
division:"SY AIML B",
year:"Second Year",
attendance:84,
marks:79,
},
]);

const filteredStudents=students.filter(student=>

student.name.toLowerCase().includes(search.toLowerCase())

);

const averageAttendance=Math.round(

students.reduce((sum,s)=>sum+s.attendance,0)/students.length

);

const averageMarks=Math.round(

students.reduce((sum,s)=>sum+s.marks,0)/students.length

);

const riskStudents=

students.filter(s=>s.attendance<75).length;

const getStatus=(attendance)=>{

if(attendance>=90) return "Excellent";

if(attendance>=80) return "Good";

if(attendance>=75) return "Average";

return "At Risk";

};

return(

<div className="min-h-screen bg-gray-100 p-8">

<button
onClick={onBack}
className="mb-6 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
>
← Back
</button>

<div className="rounded-3xl bg-white p-8 shadow-xl">

<h1 className="text-3xl font-bold">
Student Management
</h1>

<p className="mt-2 text-gray-500">
Manage students, attendance and academic performance.
</p>

<div className="mt-8 grid gap-5 md:grid-cols-4">

<div className="rounded-xl bg-blue-50 p-5">
<p>Total Students</p>
<h2 className="text-3xl font-bold">
{students.length}
</h2>
</div>

<div className="rounded-xl bg-green-50 p-5">
<p>Avg Attendance</p>
<h2 className="text-3xl font-bold">
{averageAttendance}%
</h2>
</div>

<div className="rounded-xl bg-purple-50 p-5">
<p>Avg Marks</p>
<h2 className="text-3xl font-bold">
{averageMarks}
</h2>
</div>

<div className="rounded-xl bg-red-50 p-5">
<p>At Risk</p>
<h2 className="text-3xl font-bold">
{riskStudents}
</h2>
</div>

</div>

      {/* Filters */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option>First Year</option>
          <option>Second Year</option>
          <option>Third Year</option>
          <option>Final Year</option>
        </select>

        <select
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option>SY AIML A</option>
          <option>SY AIML B</option>
          <option>TY AIML A</option>
          <option>TY AIML B</option>
        </select>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Student..."
            className="w-full rounded-xl border py-3 pl-12 pr-4"
          />

        </div>

      </div>

      {/* Student Table */}

      <div className="mt-8 overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="bg-blue-600 text-white">

              <th className="p-4 text-left">Roll</th>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Division</th>
              <th className="p-4 text-center">Attendance</th>
              <th className="p-4 text-center">Marks</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.map((student) => (

              <tr
                key={student.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {student.roll}
                </td>

                <td className="p-4 font-semibold">
                  {student.name}
                </td>

                <td className="p-4">
                  {student.division}
                </td>

                <td className="p-4 text-center">
                  {student.attendance}%
                </td>

                <td className="p-4 text-center">
                  {student.marks}
                </td>

                <td className="p-4 text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold
                    ${
                      getStatus(student.attendance) === "Excellent"
                        ? "bg-green-100 text-green-700"
                        : getStatus(student.attendance) === "Good"
                        ? "bg-blue-100 text-blue-700"
                        : getStatus(student.attendance) === "Average"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {getStatus(student.attendance)}
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

                    <button className="rounded-lg bg-green-100 p-2 text-green-700 hover:bg-green-200">
                      <Phone size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Bottom Buttons */}

      <div className="mt-8 flex flex-wrap gap-4">

        <button className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
          Add Student
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700">
          <Download size={18} />
          Export Excel
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-white hover:bg-purple-700">
          <Download size={18} />
          Export PDF
        </button>

      </div>

    </div>

  </div>

);

}

export default Students;