import { useState } from "react";
import {
Search,
Plus,
Eye,
Pencil,
Trash2,
Send,
} from "lucide-react";

function Placements({ onBack }){

const [company,setCompany]=useState("");

const [role,setRole]=useState("");

const [pkg,setPkg]=useState("");

const [cgpa,setCgpa]=useState("");

const [branch,setBranch]=useState("AIML");

const [deadline,setDeadline]=useState("");

const [driveDate,setDriveDate]=useState("");

const [location,setLocation]=useState("");

const [search,setSearch]=useState("");

const [placements,setPlacements]=useState([
{
id:1,
company:"TCS",
role:"Software Engineer",
package:"7 LPA",
branch:"AIML",
deadline:"2026-08-05",
status:"Open",
},
{
id:2,
company:"Infosys",
role:"System Engineer",
package:"5 LPA",
branch:"AIML",
deadline:"2026-08-10",
status:"Upcoming",
},
]);

const addPlacement=()=>{

if(!company || !role || !pkg){

alert("Fill all required fields");

return;

}

setPlacements([
...placements,
{
id:Date.now(),
company,
role,
package:pkg,
branch,
deadline,
status:"Open",
},
]);

setCompany("");
setRole("");
setPkg("");
setCgpa("");
setDeadline("");
setDriveDate("");
setLocation("");

};

const filteredPlacements=placements.filter(item=>

item.company.toLowerCase().includes(search.toLowerCase())||

item.role.toLowerCase().includes(search.toLowerCase())

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
Placement Management
</h1>

<p className="mt-2 text-gray-500">
Manage campus recruitment drives.
</p>

<div className="mt-8 grid gap-5 md:grid-cols-4">

<div className="rounded-xl bg-blue-50 p-5">
<p>Total Companies</p>
<h2 className="text-3xl font-bold">
{placements.length}
</h2>
</div>

<div className="rounded-xl bg-green-50 p-5">
<p>Active Drives</p>
<h2 className="text-3xl font-bold">8</h2>
</div>

<div className="rounded-xl bg-yellow-50 p-5">
<p>Placed Students</p>
<h2 className="text-3xl font-bold">124</h2>
</div>

<div className="rounded-xl bg-purple-50 p-5">
<p>Highest Package</p>
<h2 className="text-3xl font-bold">18 LPA</h2>
</div>

      </div>

      {/* Add Placement Drive */}

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company Name"
          className="rounded-xl border p-3"
        />

        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Job Role"
          className="rounded-xl border p-3"
        />

        <input
          value={pkg}
          onChange={(e) => setPkg(e.target.value)}
          placeholder="Package (LPA)"
          className="rounded-xl border p-3"
        />

        <input
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
          placeholder="Minimum CGPA"
          className="rounded-xl border p-3"
        />

        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option>AIML</option>
          <option>CSE</option>
          <option>IT</option>
          <option>ENTC</option>
          <option>Mechanical</option>
        </select>

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="rounded-xl border p-3"
        />

        <input
          type="date"
          value={driveDate}
          onChange={(e) => setDriveDate(e.target.value)}
          className="rounded-xl border p-3"
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="rounded-xl border p-3"
        />

      </div>

      <button
        onClick={addPlacement}
        className="mt-6 flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3 text-white hover:bg-green-700"
      >
        <Plus size={18} />
        Add Placement Drive
      </button>

      {/* Search */}

      <div className="relative mt-8">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Company or Role..."
          className="w-full rounded-xl border py-3 pl-12 pr-4"
        />

      </div>

      {/* Placement Table */}

      <div className="mt-8 overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="bg-blue-600 text-white">

              <th className="p-4">Company</th>
              <th className="p-4">Role</th>
              <th className="p-4">Package</th>
              <th className="p-4">Branch</th>
              <th className="p-4">Deadline</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredPlacements.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 font-semibold">
                  {item.company}
                </td>

                <td className="p-4">
                  {item.role}
                </td>

                <td className="p-4">
                  {item.package}
                </td>

                <td className="p-4">
                  {item.branch}
                </td>

                <td className="p-4">
                  {item.deadline}
                </td>

                <td className="p-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      item.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Upcoming"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
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

                    <button className="rounded-lg bg-purple-100 p-2 text-purple-700 hover:bg-purple-200">
                      <Send size={18}/>
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

    </div>

  </div>

);

}

export default Placements;