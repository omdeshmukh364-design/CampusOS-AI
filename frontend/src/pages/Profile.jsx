import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import Card from "../components/common/Card";

import {
  Camera,
  UserPen,
  User,
  GraduationCap,
} from "lucide-react";

function Profile({
  student,
  onDashboard,
  onOpenProfile,
  onAttendance,
  onAssignments,
  onStudyPlanner,
  onPlacements,
  onOpenAI,

}) {
    const [isEditing, setIsEditing] = useState(false);

const [profile, setProfile] = useState({
  name: "Sameer Thakar",
  email: "sameer@gmail.com",
  phone: "+91 9876543210",
  dob: "15 July 2006",
  gender: "Male",
  address: "Pune, Maharashtra",
});
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#EAF2FF_0%,_#F7F9FF_60%,_#EDF7FF_100%)] p-4 lg:p-6">
      <div className="flex min-h-screen gap-6">

        <Sidebar
          activePage="Profile"
          onDashboard={onDashboard}
          onOpenProfile={onOpenProfile}
          onAttendance={onAttendance}
          onAssignments={onAssignments}
          onStudyPlanner={onStudyPlanner}
          onPlacements={onPlacements}
          onOpenAI={onOpenAI}
        />

        <main className="flex-1">

          {/* Profile Heading */}

          <Card className="p-8">
            <h1 className="text-4xl font-bold text-[#111827]">
              My Profile
            </h1>

            <p className="mt-2 text-[#6B7280] text-lg">
              View and manage your personal and academic information.
            </p>
          </Card>

          {/* Profile Card */}

          <Card className="mt-6 flex flex-col items-center p-10">

            <div className="relative">

              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-blue-600 text-6xl font-bold text-white shadow-xl">
                ST
              </div>

              <button className="absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-gray-100">
                <Camera size={18} />
              </button>

            </div>

            <h2 className="mt-6 text-4xl font-bold text-[#111827]">
              Sameer Thakar
            </h2>

            <p className="mt-1 text-lg text-gray-500">
              AIML001
            </p>

            <p className="text-gray-500">
              CSE (AI & ML)
            </p>

            {!isEditing ? (
  <button
    onClick={() => setIsEditing(true)}
    className="mt-7 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
  >
    <UserPen size={18} />
    Edit Profile
  </button>
) : (
  <div className="mt-7 flex gap-3">

    <button
      onClick={() => setIsEditing(false)}
      className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
    >
      Save Changes
    </button>

    <button
      onClick={() => setIsEditing(false)}
      className="rounded-xl bg-gray-300 px-6 py-3 hover:bg-gray-400"
    >
      Cancel
    </button>

  </div>
)}

          </Card>

          {/* Information */}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            {/* Personal */}

            <Card className="p-7">

              <div className="mb-6 flex items-center gap-3">
                <User className="text-blue-600" />
                <h2 className="text-2xl font-bold">
                  Personal Information
                </h2>
              </div>

              <div className="space-y-5">

<div>
<label className="font-semibold">Name</label>

{isEditing ? (
<input
className="mt-1 w-full rounded-lg border p-3"
value={profile.name}
onChange={(e)=>
setProfile({...profile,name:e.target.value})
}
/>
) : (
<p>{profile.name}</p>
)}

</div>

<div>

<label className="font-semibold">
Email
</label>

{isEditing ? (

<input
className="mt-1 w-full rounded-lg border p-3"
value={profile.email}
onChange={(e)=>
setProfile({...profile,email:e.target.value})
}
/>

) : (

<p>{profile.email}</p>

)}

</div>

<div>

<label className="font-semibold">
Phone
</label>

{isEditing ? (

<input
className="mt-1 w-full rounded-lg border p-3"
value={profile.phone}
onChange={(e)=>
setProfile({...profile,phone:e.target.value})
}
/>

) : (

<p>{profile.phone}</p>

)}

</div>

<div>

<label className="font-semibold">
Date of Birth
</label>

{isEditing ? (

<input
className="mt-1 w-full rounded-lg border p-3"
value={profile.dob}
onChange={(e)=>
setProfile({...profile,dob:e.target.value})
}
/>

) : (

<p>{profile.dob}</p>

)}

</div>

<div>

<label className="font-semibold">
Gender
</label>

{isEditing ? (

<input
className="mt-1 w-full rounded-lg border p-3"
value={profile.gender}
onChange={(e)=>
setProfile({...profile,gender:e.target.value})
}
/>

) : (

<p>{profile.gender}</p>

)}

</div>

<div>

<label className="font-semibold">
Address
</label>

{isEditing ? (

<textarea
className="mt-1 w-full rounded-lg border p-3"
rows={3}
value={profile.address}
onChange={(e)=>
setProfile({...profile,address:e.target.value})
}
/>

) : (

<p>{profile.address}</p>

)}

</div>

</div>

            </Card>

            {/* Academic */}

            <Card className="p-7">

              <div className="mb-6 flex items-center gap-3">
                <GraduationCap className="text-blue-600" />
                <h2 className="text-2xl font-bold">
                  Academic Information
                </h2>
              </div>

              <div className="space-y-4 text-[17px]">

                <p><strong>College:</strong> Pimpri Chinchwad University</p>

                <p><strong>Department:</strong> CSE (AI & ML)</p>

                <p><strong>Year:</strong> Third Year</p>

                <p><strong>Division:</strong> A</p>

                <p><strong>Roll No:</strong> AIML001</p>

                <p><strong>PRN:</strong> 1234567890</p>

                <p><strong>CGPA:</strong> 9.43</p>

              </div>

            </Card>

          </div>

        </main>
      </div>
    </div>
  );
}

export default Profile;