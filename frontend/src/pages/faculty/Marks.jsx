import { useState } from "react";
import {
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

function Marks({ onBack }) {

const [subject, setSubject] = useState("Java Programming");

const [division, setDivision] = useState("SY AIML A");

const [assessment, setAssessment] = useState("UT-1");

const [search, setSearch] = useState("");

const [students, setStudents] = useState([
{
id:1,
roll:"AIML001",
name:"Rahul Patil",
marks:82,
},
{
id:2,
roll:"AIML002",
name:"Sneha Sharma",
marks:91,
},
{
id:3,
roll:"AIML003",
name:"Amit Singh",
marks:74,
},
{
id:4,
roll:"AIML004",
name:"Priya Deshmukh",
marks:67,
},
]);

const updateMarks=(id,value)=>{

setStudents(
students.map((student)=>
student.id===id
?{...student,marks:Number(value)}
:student
)
);

};

const getGrade=(marks)=>{

if(marks>=90) return "A+";

if(marks>=80) return "A";

if(marks>=70) return "B";

if(marks>=60) return "C";

return "F";

};

const filteredStudents=students.filter(student=>

student.name.toLowerCase().includes(search.toLowerCase())

);

const average=Math.round(

students.reduce((sum,s)=>sum+s.marks,0)/students.length

);

const highest=Math.max(...students.map(s=>s.marks));

const lowest=Math.min(...students.map(s=>s.marks));

const pass=Math.round(

students.filter(s=>s.marks>=40).length/students.length*100

);

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
Marks Management
</h1>

<p className="mt-2 text-gray-500">
Upload and manage student marks.
</p>

<div className="mt-8 grid gap-5 md:grid-cols-4">

<div className="rounded-xl bg-blue-50 p-5">
<p className="text-gray-500">Average</p>
<h2 className="text-3xl font-bold">{average}</h2>
</div>

<div className="rounded-xl bg-green-50 p-5">
<p className="text-gray-500">Highest</p>
<h2 className="text-3xl font-bold">{highest}</h2>
</div>

<div className="rounded-xl bg-red-50 p-5">
<p className="text-gray-500">Lowest</p>
<h2 className="text-3xl font-bold">{lowest}</h2>
</div>

<div className="rounded-xl bg-yellow-50 p-5">
<p className="text-gray-500">Pass %</p>
<h2 className="text-3xl font-bold">{pass}%</h2>
</div>

</div>

      {/* Filters */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option>Java Programming</option>
          <option>DBMS</option>
          <option>Artificial Intelligence</option>
          <option>Computer Networks</option>
        </select>

        <select
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option>SY AIML A</option>
          <option>SY AIML B</option>
          <option>TY AIML A</option>
        </select>

        <select
          value={assessment}
          onChange={(e) => setAssessment(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option>UT-1</option>
          <option>UT-2</option>
          <option>Assignment</option>
          <option>Practical</option>
          <option>End Semester</option>
        </select>

      </div>

      {/* Search */}

      <div className="relative mt-8">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search Student..."
          className="w-full rounded-xl border py-3 pl-12 pr-4"
        />

      </div>

      {/* Table */}

      <div className="mt-8 overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="bg-blue-600 text-white">

              <th className="p-4 text-left">Roll</th>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-center">Marks</th>
              <th className="p-4 text-center">Grade</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.map((student)=>(

              <tr
                key={student.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {student.roll}
                </td>

                <td className="p-4">
                  {student.name}
                </td>

                <td className="p-4 text-center">

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={student.marks}
                    onChange={(e)=>
                      updateMarks(student.id,e.target.value)
                    }
                    className="w-24 rounded-lg border p-2 text-center"
                  />

                </td>

                <td className="p-4 text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold
                    ${
                      getGrade(student.marks)==="A+"
                        ? "bg-green-100 text-green-700"
                        : getGrade(student.marks)==="A"
                        ? "bg-blue-100 text-blue-700"
                        : getGrade(student.marks)==="B"
                        ? "bg-yellow-100 text-yellow-700"
                        : getGrade(student.marks)==="C"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {getGrade(student.marks)}
                  </span>

                </td>

                <td className="p-4 text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      student.marks>=40
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {student.marks>=40 ? "Pass" : "Fail"}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-2">

                    <button className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200">
                      <Eye size={18}/>
                    </button>

                    <button className="rounded-lg bg-yellow-100 p-2 text-yellow-700 hover:bg-yellow-200">
                      <Pencil size={18}/>
                    </button>

                    <button className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200">
                      <Trash2 size={18}/>
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

        <button
          className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Save Marks
        </button>

        <button
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          <Download size={18}/>
          Export Excel
        </button>

        <button
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
        >
          <Download size={18}/>
          Export PDF
        </button>

      </div>

    </div>

  </div>

);

}

export default Marks;