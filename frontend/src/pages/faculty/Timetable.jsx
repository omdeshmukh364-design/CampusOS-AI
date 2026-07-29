import { useState } from "react";
import {
Search,
Plus,
Eye,
Pencil,
Trash2,
} from "lucide-react";

function Timetable({ onBack }){

const [search,setSearch]=useState("");

const [subject,setSubject]=useState("Java Programming");

const [division,setDivision]=useState("SY AIML A");

const [day,setDay]=useState("Monday");

const [room,setRoom]=useState("");

const [startTime,setStartTime]=useState("");

const [endTime,setEndTime]=useState("");

const [lectures,setLectures]=useState([
{
id:1,
day:"Monday",
time:"09:00 - 10:00",
subject:"Java Programming",
division:"SY AIML A",
room:"Lab 402",
status:"Upcoming",
},
{
id:2,
day:"Monday",
time:"11:00 - 12:00",
subject:"DBMS",
division:"SY AIML B",
room:"301",
status:"Completed",
},
]);

const addLecture=()=>{

if(!room || !startTime || !endTime){

alert("Fill all fields");

return;

}

setLectures([
...lectures,
{
id:Date.now(),
day,
time:`${startTime} - ${endTime}`,
subject,
division,
room,
status:"Upcoming",
},
]);

setRoom("");

setStartTime("");

setEndTime("");

};

const filteredLectures=lectures.filter(item=>

item.subject.toLowerCase().includes(search.toLowerCase())||

item.room.toLowerCase().includes(search.toLowerCase())

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
Timetable Management
</h1>

<p className="mt-2 text-gray-500">
Manage weekly lecture schedule.
</p>

<div className="mt-8 grid gap-5 md:grid-cols-4">

<div className="rounded-xl bg-blue-50 p-5">
<p>Today's Lectures</p>
<h2 className="text-3xl font-bold">4</h2>
</div>

<div className="rounded-xl bg-green-50 p-5">
<p>This Week</p>
<h2 className="text-3xl font-bold">24</h2>
</div>

<div className="rounded-xl bg-yellow-50 p-5">
<p>Completed</p>
<h2 className="text-3xl font-bold">2</h2>
</div>

<div className="rounded-xl bg-red-50 p-5">
<p>Remaining</p>
<h2 className="text-3xl font-bold">2</h2>
</div>

      </div>

      {/* Add Lecture */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <select
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option>Java Programming</option>
          <option>DBMS</option>
          <option>Artificial Intelligence</option>
          <option>Computer Networks</option>
        </select>

        <select
          value={division}
          onChange={(e)=>setDivision(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option>SY AIML A</option>
          <option>SY AIML B</option>
          <option>TY AIML A</option>
        </select>

        <select
          value={day}
          onChange={(e)=>setDay(e.target.value)}
          className="rounded-xl border p-3"
        >
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
        </select>

        <input
          type="time"
          value={startTime}
          onChange={(e)=>setStartTime(e.target.value)}
          className="rounded-xl border p-3"
        />

        <input
          type="time"
          value={endTime}
          onChange={(e)=>setEndTime(e.target.value)}
          className="rounded-xl border p-3"
        />

        <input
          value={room}
          onChange={(e)=>setRoom(e.target.value)}
          placeholder="Room Number"
          className="rounded-xl border p-3"
        />

      </div>

      <button
        onClick={addLecture}
        className="mt-6 flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3 text-white hover:bg-green-700"
      >
        <Plus size={18}/>
        Add Lecture
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
          placeholder="Search Subject or Room..."
          className="w-full rounded-xl border py-3 pl-12 pr-4"
        />

      </div>

      {/* Timetable */}

      <div className="mt-8 overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="bg-blue-600 text-white">

              <th className="p-4">Day</th>
              <th className="p-4">Time</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Division</th>
              <th className="p-4">Room</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredLectures.map((lecture)=>(

              <tr
                key={lecture.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {lecture.day}
                </td>

                <td className="p-4">
                  {lecture.time}
                </td>

                <td className="p-4 font-semibold">
                  {lecture.subject}
                </td>

                <td className="p-4">
                  {lecture.division}
                </td>

                <td className="p-4">
                  {lecture.room}
                </td>

                <td className="p-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      lecture.status==="Upcoming"
                        ? "bg-green-100 text-green-700"
                        : lecture.status==="Completed"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {lecture.status}
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

      <div className="mt-8 flex gap-4">

        <button className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
          Download Timetable
        </button>

        <button className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700">
          Export Excel
        </button>

      </div>

    </div>

  </div>

);

}

export default Timetable;