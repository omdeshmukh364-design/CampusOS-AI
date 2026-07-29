import { useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  Pin,
  Plus,
} from "lucide-react";

function Notices({ onBack }) {

const [title,setTitle]=useState("");
const [category,setCategory]=useState("Academic");
const [audience,setAudience]=useState("All Students");
const [priority,setPriority]=useState("High");
const [description,setDescription]=useState("");
const [publishDate,setPublishDate]=useState("");
const [expiryDate,setExpiryDate]=useState("");
const [search,setSearch]=useState("");

const [notices,setNotices]=useState([
{
id:1,
title:"Mid Semester Exam",
category:"Examination",
audience:"All Students",
priority:"High",
publishDate:"2026-07-18",
status:"Published",
},
{
id:2,
title:"AI Workshop",
category:"Event",
audience:"SY AIML A",
priority:"Medium",
publishDate:"2026-07-20",
status:"Published",
},
]);

const publishNotice=()=>{

if(!title || !description){

alert("Fill all required fields");

return;

}

setNotices([
{
id:Date.now(),
title,
category,
audience,
priority,
publishDate,
status:"Published",
},
...notices
]);

setTitle("");
setDescription("");

alert("Notice Published Successfully");

};

const filteredNotices=notices.filter((notice)=>

notice.title.toLowerCase().includes(search.toLowerCase())

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
Notice Management
</h1>

<p className="mt-2 text-gray-500">
Publish and manage campus notices.
</p>

<div className="mt-8 grid gap-5 md:grid-cols-4">

<div className="rounded-xl bg-blue-50 p-5">
<p>Total Notices</p>
<h2 className="text-3xl font-bold">{notices.length}</h2>
</div>

<div className="rounded-xl bg-green-50 p-5">
<p>Published Today</p>
<h2 className="text-3xl font-bold">2</h2>
</div>

<div className="rounded-xl bg-yellow-50 p-5">
<p>Scheduled</p>
<h2 className="text-3xl font-bold">1</h2>
</div>

<div className="rounded-xl bg-red-50 p-5">
<p>Pinned</p>
<h2 className="text-3xl font-bold">1</h2>
</div>

      </div>

      {/* Create Notice Form */}

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Notice Title"
          className="rounded-xl border p-3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option>Academic</option>
          <option>Examination</option>
          <option>Placement</option>
          <option>Holiday</option>
          <option>Event</option>
          <option>Circular</option>
        </select>

        <select
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option>All Students</option>
          <option>SY AIML A</option>
          <option>SY AIML B</option>
          <option>TY AIML A</option>
          <option>Faculty</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <div className="md:col-span-2">

          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Notice Description"
            className="w-full rounded-xl border p-3"
          />

        </div>

        <input
          type="date"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
          className="rounded-xl border p-3"
        />

        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="rounded-xl border p-3"
        />

        <input
          type="file"
          accept=".pdf"
          className="md:col-span-2 rounded-xl border p-3"
        />

      </div>

      <button
        onClick={publishNotice}
        className="mt-6 flex items-center gap-2 rounded-xl bg-purple-600 px-8 py-3 text-white hover:bg-purple-700"
      >
        <Plus size={18}/>
        Publish Notice
      </button>

      {/* Search */}

      <div className="relative mt-8">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search Notices..."
          className="w-full rounded-xl border py-3 pl-12 pr-4"
        />

      </div>

      {/* Notice Table */}

      <div className="mt-8 overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="bg-purple-600 text-white">

              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Audience</th>
              <th className="p-4 text-center">Priority</th>
              <th className="p-4 text-center">Date</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredNotices.map((notice)=>(

              <tr
                key={notice.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 font-semibold">
                  {notice.title}
                </td>

                <td className="p-4">
                  {notice.category}
                </td>

                <td className="p-4">
                  {notice.audience}
                </td>

                <td className="p-4 text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      notice.priority==="High"
                        ? "bg-red-100 text-red-700"
                        : notice.priority==="Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {notice.priority}
                  </span>

                </td>

                <td className="p-4 text-center">
                  {notice.publishDate}
                </td>

                <td className="p-4 text-center">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                    {notice.status}
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

                    <button className="rounded-lg bg-green-100 p-2 text-green-700 hover:bg-green-200">
                      <Pin size={18}/>
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

export default Notices;