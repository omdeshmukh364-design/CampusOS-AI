import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Card from "../components/common/Card";

const initialAssignments = [
  {
    id: 1,
    title: "DBMS Case Study",
    subject: "DBMS",
    assigned: "20 July 2026",
    due: "27 July 2026",
    status: "Pending",
  },
  {
    id: 2,
    title: "AI Lab Report",
    subject: "Artificial Intelligence",
    assigned: "18 July 2026",
    due: "25 July 2026",
    status: "Pending",
  },
  {
    id: 3,
    title: "Java Practical 5",
    subject: "Java",
    assigned: "15 July 2026",
    due: "22 July 2026",
    status: "Completed",
  },
];

function Assignments({
  onDashboard,
  onOpenProfile,
  onAttendance,
  onAssignments,
  onStudyPlanner,
  onPlacements,
  onOpenAI,
}) {
  const [assignments, setAssignments] = useState(initialAssignments);
  const markAsComplete = (id) => {
  setAssignments(
    assignments.map((assignment) =>
      assignment.id === id
        ? {
            ...assignment,
            status: "Waiting",
          }
        : assignment
    )
  );
};
  const pending = assignments.filter(
    (a) => a.status === "Pending"
  );

const completed = assignments.filter(
  (a) => a.status === "Completed"
);

const waiting = assignments.filter(
  (a) => a.status === "Waiting"
);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#EAF2FF_0%,_#F7F9FF_60%,_#EDF7FF_100%)] p-4 lg:p-6">
      <div className="flex min-h-screen gap-6">

        <Sidebar
          activePage="Assignments"
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
              Assignments
            </h1>

            <p className="mt-2 text-gray-500">
              Manage all your assignments.
            </p>
          </Card>

          {/* Summary Cards */}

<div className="mt-6 grid gap-6 md:grid-cols-3">

  <Card className="p-6 text-center">
    <h3 className="text-lg font-semibold text-gray-600">
      Total Assignments
    </h3>

    <h1 className="mt-3 text-5xl font-bold text-blue-600">
      {assignments.length}
    </h1>
  </Card>

  <Card className="p-6 text-center">
    <h3 className="text-lg font-semibold text-gray-600">
      Pending
    </h3>

    <h1 className="mt-3 text-5xl font-bold text-red-500">
      {pending.length}
    </h1>
  </Card>

  <Card className="p-6 text-center">
    <h3 className="text-lg font-semibold text-gray-600">
      Completed
    </h3>

    <h1 className="mt-3 text-5xl font-bold text-green-600">
      {completed.length}
    </h1>
  </Card>

</div>

{/* Given Assignments */}

<Card className="mt-6 p-6">

<h2 className="mb-6 text-2xl font-bold">
Given Assignments
</h2>

<div className="space-y-5">

{assignments.map((assignment) => (

<div
key={assignment.id}
className="rounded-xl border border-gray-200 p-5 shadow-sm"
>

<div className="flex items-center justify-between">

<div>

<h3 className="text-xl font-semibold">
{assignment.title}
</h3>

<p className="text-gray-600">
Subject : {assignment.subject}
</p>

<p className="text-gray-500">
Assigned : {assignment.assigned}
</p>

<p className="text-gray-500">
Due Date : {assignment.due}
</p>

</div>

<div>

{assignment.status === "Pending" && (
  <button
    onClick={() => markAsComplete(assignment.id)}
    className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
  >
    Mark as Complete
  </button>
)}

{assignment.status === "Waiting" && (
  <button className="rounded-xl bg-yellow-500 px-5 py-3 text-white">
    Waiting for Faculty Approval
  </button>
)}

{assignment.status === "Completed" && (
  <button className="rounded-xl bg-green-600 px-5 py-3 text-white">
    Approved
  </button>
)}

</div>

</div>

</div>

))}

</div>

</Card>

<div className="mt-6 grid gap-6 lg:grid-cols-2">

<Card className="p-6">

<h2 className="mb-5 text-2xl font-bold text-red-500">

Pending Assignments

</h2>

<div className="space-y-4">

{pending.map((a)=>(

<div
key={a.id}
className="rounded-lg bg-red-50 p-4"
>

{a.title}

</div>

))}

</div>

</Card>

<Card className="p-6">

<h2 className="mb-5 text-2xl font-bold text-green-600">

Completed Assignments

</h2>

<div className="space-y-4">

{completed.map((a)=>(

<div
key={a.id}
className="rounded-lg bg-green-50 p-4"
>

✓ {a.title}

</div>

))}

</div>

</Card>

</div>

        </main>
      </div>
    </div>
  );
}

export default Assignments;