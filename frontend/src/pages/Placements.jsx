import Sidebar from "../components/dashboard/Sidebar";
import Card from "../components/common/Card";

function Placements({
  onDashboard,
  onOpenProfile,
  onAttendance,
  onAssignments,
  onStudyPlanner,
  onPlacements,
  onOpenAI,
}) {
  const companies = [
    {
      company: "TCS",
      role: "Software Engineer",
      package: "7 LPA",
      date: "20 Jul",
      status: "Register",
    },
    {
      company: "Infosys",
      role: "Specialist Programmer",
      package: "9.5 LPA",
      date: "22 Jul",
      status: "Register",
    },
    {
      company: "Accenture",
      role: "ASE",
      package: "6.5 LPA",
      date: "25 Jul",
      status: "Registered",
    },
    {
      company: "Capgemini",
      role: "Analyst",
      package: "5.5 LPA",
      date: "28 Jul",
      status: "Register",
    },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#EAF2FF_0%,_#F7F9FF_60%,_#EDF7FF_100%)] p-4 lg:p-6">
      <div className="flex min-h-screen gap-6">

        <Sidebar
          activePage="Placements"
          onDashboard={onDashboard}
          onOpenProfile={onOpenProfile}
          onAttendance={onAttendance}
          onAssignments={onAssignments}
          onStudyPlanner={onStudyPlanner}
          onPlacements={onPlacements}
          onOpenAI={onOpenAI}
        />

        <main className="flex-1">

          <Card className="p-8">
            <h1 className="text-4xl font-bold">
              💼 Placement Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Track placements, applications and interview preparation.
            </p>
          </Card>

          {/* Stats */}

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <Card className="p-6 text-center">
              <p className="text-gray-500">Eligible Companies</p>
              <h1 className="mt-3 text-5xl font-bold text-blue-600">
                12
              </h1>
            </Card>

            <Card className="p-6 text-center">
              <p className="text-gray-500">Applications</p>
              <h1 className="mt-3 text-5xl font-bold text-orange-500">
                5
              </h1>
            </Card>

            <Card className="p-6 text-center">
              <p className="text-gray-500">Interviews</p>
              <h1 className="mt-3 text-5xl font-bold text-purple-600">
                2
              </h1>
            </Card>

            <Card className="p-6 text-center">
              <p className="text-gray-500">Offers</p>
              <h1 className="mt-3 text-5xl font-bold text-green-600">
                1
              </h1>
            </Card>

          </div>

          {/* Upcoming Drives */}

          <Card className="mt-6 p-6">

            <h2 className="mb-5 text-2xl font-bold">
              Upcoming Placement Drives
            </h2>

            <div className="space-y-4">

              {companies.map((company, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border p-4"
                >

                  <div>
                    <h3 className="font-bold text-lg">
                      {company.company}
                    </h3>

                    <p className="text-gray-500">
                      {company.role}
                    </p>

                    <p className="text-gray-500">
                      Package : {company.package}
                    </p>

                    <p className="text-gray-500">
                      Drive Date : {company.date}
                    </p>
                  </div>

                  <button
                    className={`rounded-xl px-5 py-3 text-white ${
                      company.status === "Registered"
                        ? "bg-green-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {company.status}
                  </button>

                </div>

              ))}

            </div>

          </Card>

          {/* Bottom Section */}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            <Card className="p-6">

              <h2 className="mb-5 text-2xl font-bold">
                Placement Journey
              </h2>

              <div className="space-y-4">

                <p>✅ Resume Uploaded</p>
                <p>✅ Aptitude Round</p>
                <p>🟡 Technical Interview</p>
                <p>⚪ HR Interview</p>
                <p>⚪ Offer Letter</p>

              </div>

            </Card>

            <Card className="p-6">

              <h2 className="mb-5 text-2xl font-bold">
                Resume Status
              </h2>

              <p className="text-lg">
                ATS Score
              </p>

              <h1 className="mt-2 text-5xl font-bold text-green-600">
                87%
              </h1>

              <button className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-white">
                Improve Resume
              </button>

            </Card>

          </div>

          {/* Skills */}

          <Card className="mt-6 p-6">

            <h2 className="mb-5 text-2xl font-bold">
              Skills Required
            </h2>

            <div className="flex flex-wrap gap-3">

              {[
                "C++",
                "DSA",
                "DBMS",
                "OS",
                "SQL",
                "OOP",
                "Java",
                "Communication",
                "Aptitude",
              ].map((skill) => (

                <span
                  key={skill}
                  className="rounded-full bg-blue-100 px-4 py-2 font-medium text-blue-700"
                >
                  {skill}
                </span>

              ))}

            </div>

          </Card>

          {/* AI Suggestions */}

          <Card className="mt-6 p-6">

            <h2 className="mb-5 text-2xl font-bold">
              🤖 AI Recommendations
            </h2>

            <ul className="space-y-3">

              <li>• Improve DSA before upcoming interviews.</li>
              <li>• Update your Resume this week.</li>
              <li>• Practice Aptitude daily.</li>
              <li>• Revise DBMS Interview Questions.</li>

            </ul>

          </Card>

        </main>

      </div>
    </div>
  );
}

export default Placements;