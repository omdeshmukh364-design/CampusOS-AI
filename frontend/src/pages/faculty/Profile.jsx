import { useState } from "react";

function Profile({ onBack }) {
  const [profile] = useState({
    name: "Professor John Doe",
    email: "faculty@campusos.ai",
    department: "Artificial Intelligence & Machine Learning",
    employeeId: "FAC001",
    phone: "+91 9876543210",
    designation: "Assistant Professor",
    qualification: "M.Tech (Computer Engineering)",
    experience: "8 Years",
    officeRoom: "Room 402",
    officeHours: "10:00 AM - 4:00 PM",
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={onBack}
        className="mb-6 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        ← Back
      </button>

      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-col gap-8 md:flex-row">

          {/* Left Side */}

          <div className="flex flex-col items-center md:w-1/3">

            <img
              src="https://ui-avatars.com/api/?name=Professor&background=2563eb&color=fff&size=200"
              alt="Faculty"
              className="h-40 w-40 rounded-full border-4 border-blue-600 shadow-lg"
            />

            <h2 className="mt-5 text-2xl font-bold">
              {profile.name}
            </h2>

            <p className="font-medium text-blue-600">
              {profile.designation}
            </p>

            <button className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
              Edit Profile
            </button>
          </div>

          {/* Right Side */}

          <div className="flex-1">

            <h2 className="mb-6 text-2xl font-bold">
              Personal Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <p className="text-gray-500">Email</p>
                <h3 className="font-semibold">
                  {profile.email}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Phone</p>
                <h3 className="font-semibold">
                  {profile.phone}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Employee ID</p>
                <h3 className="font-semibold">
                  {profile.employeeId}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Department</p>
                <h3 className="font-semibold">
                  {profile.department}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Qualification</p>
                <h3 className="font-semibold">
                  {profile.qualification}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Experience</p>
                <h3 className="font-semibold">
                  {profile.experience}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Office Room</p>
                <h3 className="font-semibold">
                  {profile.officeRoom}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">Office Hours</p>
                <h3 className="font-semibold">
                  {profile.officeHours}
                </h3>
              </div>

            </div>

            {/* Subjects */}

            <div className="mt-8">

              <h3 className="mb-3 text-xl font-bold">
                Subjects Teaching
              </h3>

              <div className="flex flex-wrap gap-3">

                <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700">
                  Java Programming
                </span>

                <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                  DBMS
                </span>

                <span className="rounded-full bg-purple-100 px-4 py-2 text-purple-700">
                  Artificial Intelligence
                </span>

              </div>

            </div>

            {/* Classes */}

            <div className="mt-8">

              <h3 className="mb-3 text-xl font-bold">
                Assigned Classes
              </h3>

              <div className="flex flex-wrap gap-3">

                <span className="rounded-full bg-orange-100 px-4 py-2 text-orange-700">
                  SY AIML A
                </span>

                <span className="rounded-full bg-red-100 px-4 py-2 text-red-700">
                  SY AIML B
                </span>

              </div>

            </div>

            <button className="mt-8 rounded-xl bg-gray-800 px-6 py-3 text-white hover:bg-black">
              Change Password
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;