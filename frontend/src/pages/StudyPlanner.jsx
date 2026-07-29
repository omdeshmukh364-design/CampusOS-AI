import Card from "../components/common/Card";
import Sidebar from "../components/dashboard/Sidebar";

function StudyPlanner({
  onDashboard,
  onOpenProfile,
  onAttendance,
  onAssignments,
  onStudyPlanner,
  onPlacements,
  onOpenAI,
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#EAF2FF_0%,_#F7F9FF_60%,_#EDF7FF_100%)] p-4 lg:p-6">
      <div className="flex min-h-screen gap-6">

        <Sidebar
          activePage="Study Planner"
          onDashboard={onDashboard}
          onOpenProfile={onOpenProfile}
          onAttendance={onAttendance}
          onAssignments={onAssignments}
          onStudyPlanner={onStudyPlanner}
          onPlacements={onPlacements}
          onOpenAI={onOpenAI}
        />

        <main className="flex-1">

          {/* Heading */}

          <Card className="p-8">
            <h1 className="text-4xl font-bold">
              📚 AI Study Planner
            </h1>

            <p className="mt-2 text-gray-500">
              Your personalized AI-powered study assistant.
            </p>
          </Card>

         {/* Dashboard Stats */}

<div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  <Card className="p-6">
    <p className="text-gray-500 text-sm">Today's Tasks</p>

    <h1 className="mt-3 text-5xl font-bold text-blue-600">
      5
    </h1>

    <p className="mt-2 text-green-600 text-sm">
      +2 from yesterday
    </p>
  </Card>

  <Card className="p-6">
    <p className="text-gray-500 text-sm">Study Hours</p>

    <h1 className="mt-3 text-5xl font-bold text-green-600">
      6h
    </h1>

    <p className="mt-2 text-gray-500">
      Goal : 8 Hours
    </p>
  </Card>

  <Card className="p-6">
    <p className="text-gray-500 text-sm">Study Streak</p>

    <h1 className="mt-3 text-5xl font-bold text-orange-500">
      🔥12
    </h1>

    <p className="mt-2 text-gray-500">
      Keep it going!
    </p>
  </Card>

  <Card className="p-6">
    <p className="text-gray-500 text-sm">Focus Score</p>

    <h1 className="mt-3 text-5xl font-bold text-purple-600">
      89%
    </h1>

    <p className="mt-2 text-green-600">
      Excellent
    </p>
  </Card>

</div>

         <Card className="mt-6 p-6">

  <div className="flex items-center justify-between">

    <div>
      <h2 className="text-2xl font-bold">
        📅 Today's AI Study Schedule
      </h2>

      <p className="text-gray-500">
        Generated specially for you.
      </p>
    </div>

    <div className="rounded-xl bg-blue-100 px-4 py-2 text-blue-700 font-semibold">
      1 / 5 Completed
    </div>

  </div>

  <div className="mt-6 space-y-4">

    <div className="flex items-center justify-between rounded-2xl border p-4">

      <div>
        <p className="font-semibold">09:00 - 10:00</p>
        <p className="text-gray-500">DBMS Unit 4 Revision</p>
      </div>

      <button className="rounded-xl bg-green-600 px-5 py-2 text-white">
        ✓ Completed
      </button>

    </div>

    <div className="flex items-center justify-between rounded-2xl border p-4">

      <div>
        <p className="font-semibold">10:15 - 11:15</p>
        <p className="text-gray-500">Solve 2 DSA Questions</p>
      </div>

      <button className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
        Start
      </button>

    </div>

    <div className="flex items-center justify-between rounded-2xl border p-4">

      <div>
        <p className="font-semibold">11:30 - 12:30</p>
        <p className="text-gray-500">Java Practical</p>
      </div>

      <button className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
        Start
      </button>

    </div>

    <div className="flex items-center justify-between rounded-2xl border p-4">

      <div>
        <p className="font-semibold">02:00 - 03:00</p>
        <p className="text-gray-500">AI Lab Preparation</p>
      </div>

      <button className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
        Start
      </button>

    </div>

    <div className="flex items-center justify-between rounded-2xl border p-4">

      <div>
        <p className="font-semibold">05:00 - 06:00</p>
        <p className="text-gray-500">Operating System Revision</p>
      </div>

      <button className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
        Start
      </button>

    </div>

  </div>

          </Card>

          <div className="mt-6">

<h2 className="mb-5 text-2xl font-bold">
🚀 AI Productivity Tools
</h2>

<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

<Card className="p-6 hover:shadow-xl cursor-pointer">
<h2 className="text-4xl">📄</h2>
<h3 className="mt-3 font-bold">Resume Builder</h3>
<p className="mt-2 text-gray-500">
Generate ATS Resume
</p>
</Card>

<Card className="p-6 hover:shadow-xl cursor-pointer">
<h2 className="text-4xl">💻</h2>
<h3 className="mt-3 font-bold">DSA Practice</h3>
<p className="mt-2 text-gray-500">
Daily Coding Challenge
</p>
</Card>

<Card className="p-6 hover:shadow-xl cursor-pointer">
<h2 className="text-4xl">🎤</h2>
<h3 className="mt-3 font-bold">Mock Interview</h3>
<p className="mt-2 text-gray-500">
HR + Technical
</p>
</Card>

<Card className="p-6 hover:shadow-xl cursor-pointer">
<h2 className="text-4xl">🛣️</h2>
<h3 className="mt-3 font-bold">Career Roadmap</h3>
<p className="mt-2 text-gray-500">
AI Generated Roadmap
</p>
</Card>

<Card className="p-6 hover:shadow-xl cursor-pointer">
<h2 className="text-4xl">📝</h2>
<h3 className="mt-3 font-bold">Notes Generator</h3>
<p className="mt-2 text-gray-500">
PDF → Notes
</p>
</Card>

<Card className="p-6 hover:shadow-xl cursor-pointer">
<h2 className="text-4xl">❓</h2>
<h3 className="mt-3 font-bold">AI Quiz</h3>
<p className="mt-2 text-gray-500">
Generate Quiz
</p>
</Card>

<Card className="p-6 hover:shadow-xl cursor-pointer">
<h2 className="text-4xl">📅</h2>
<h3 className="mt-3 font-bold">Time Table</h3>
<p className="mt-2 text-gray-500">
Generate Daily Plan
</p>
</Card>

<Card className="p-6 hover:shadow-xl cursor-pointer">
<h2 className="text-4xl">🤖</h2>
<h3 className="mt-3 font-bold">AI Mentor</h3>
<p className="mt-2 text-gray-500">
Ask Career Questions
</p>
</Card>

</div>

</div>

          {/* AI Suggestions */}

          <Card className="mt-6 p-6">

            <h2 className="mb-4 text-2xl font-bold">
              🤖 AI Recommendations
            </h2>

            <ul className="space-y-3 text-gray-700">
              <li>• Revise DBMS today.</li>
              <li>• Solve one Medium DSA problem.</li>
              <li>• Update your Resume this week.</li>
              <li>• Keep your attendance above 90%.</li>
            </ul>

          </Card>

        </main>

      </div>
    </div>
  );
}

export default StudyPlanner;