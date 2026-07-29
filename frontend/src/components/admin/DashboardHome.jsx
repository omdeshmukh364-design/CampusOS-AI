import {
  Users,
  UserCog,
  Building2,
  BookOpen,
  GraduationCap,
  Bell,
  CalendarDays,
  Briefcase,
  TrendingUp,
  Bot,
  Plus,
} from "lucide-react";

import Card from "../common/Card";

const stats = [
  {
    title: "Students",
    value: "1,260",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Faculty",
    value: "82",
    icon: UserCog,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Departments",
    value: "8",
    icon: Building2,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Subjects",
    value: "45",
    icon: BookOpen,
    color: "bg-purple-100 text-purple-600",
  },
];

function DashboardHome() {
  return (
    <div className="space-y-6">

      {/* Welcome */}

      <Card className="p-8">

        <div className="flex items-center justify-between">

          <div>

            <p className="uppercase tracking-widest text-sm text-blue-600 font-semibold">
              Campus Overview
            </p>

            <h2 className="mt-2 text-4xl font-bold text-gray-800">
              Welcome to CampusOS.AI
            </h2>

            <p className="mt-4 text-gray-500 max-w-3xl">
              Manage students, faculty, attendance,
              assignments, placements and campus
              operations from one centralized platform.
            </p>

          </div>

          <div className="rounded-3xl bg-blue-100 p-5">
            <TrendingUp
              className="text-blue-600"
              size={45}
            />
          </div>

        </div>

      </Card>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {

          const Icon = item.icon;

          return (

            <Card
              key={item.title}
              className="p-6"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-4xl font-bold">
                    {item.value}
                  </h2>

                </div>

                <div
                  className={`rounded-2xl p-4 ${item.color}`}
                >

                  <Icon size={28} />

                </div>

              </div>

            </Card>

          );

        })}

      </div>

      {/* Quick Actions */}

      <div className="grid gap-6 lg:grid-cols-2">

        <Card className="p-6">

          <h2 className="text-2xl font-bold">
            Quick Actions
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-4">

            <button className="rounded-2xl bg-blue-600 p-4 text-white hover:bg-blue-700">
              + Add Student
            </button>

            <button className="rounded-2xl bg-green-600 p-4 text-white hover:bg-green-700">
              + Add Faculty
            </button>

            <button className="rounded-2xl bg-purple-600 p-4 text-white hover:bg-purple-700">
              + Department
            </button>

            <button className="rounded-2xl bg-orange-500 p-4 text-white hover:bg-orange-600">
              + Subject
            </button>

            <button className="rounded-2xl bg-pink-600 p-4 text-white hover:bg-pink-700">
              Publish Notice
            </button>

            <button className="rounded-2xl bg-cyan-600 p-4 text-white hover:bg-cyan-700">
              Placement Drive
            </button>

          </div>

        </Card>

        {/* AI */}

        <Card className="p-6">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-100 p-4">

              <Bot
                className="text-blue-600"
                size={28}
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold">
                AI Admin Assistant
              </h2>

              <p className="text-gray-500">
                Campus Intelligence
              </p>

            </div>

          </div>

          <div className="mt-6 rounded-2xl bg-blue-50 p-5">

            <p className="text-gray-700 leading-7">

              AI can automatically generate

              attendance reports,

              semester analytics,

              placement insights,

              faculty workload,

              and student performance reports.

            </p>

          </div>

          <button className="mt-6 w-full rounded-2xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700">

            Open AI Analytics

          </button>

        </Card>

      </div>

      {/* Recent Activities */}

      <Card className="p-6">

        <h2 className="text-2xl font-bold">
          Recent Activities
        </h2>

        <div className="mt-6 space-y-5">

          <div className="flex items-center gap-4">

            <GraduationCap className="text-blue-600"/>

            <div>

              <h3 className="font-semibold">
                New Student Registered
              </h3>

              <p className="text-gray-500">
                AIML Department
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Bell className="text-orange-500"/>

            <div>

              <h3 className="font-semibold">
                Notice Published
              </h3>

              <p className="text-gray-500">
                Semester Examination Notice
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <CalendarDays className="text-green-600"/>

            <div>

              <h3 className="font-semibold">
                Timetable Updated
              </h3>

              <p className="text-gray-500">
                Semester V
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Briefcase className="text-purple-600"/>

            <div>

              <h3 className="font-semibold">
                Placement Drive Added
              </h3>

              <p className="text-gray-500">
                Infosys Recruitment
              </p>

            </div>

          </div>

        </div>

      </Card>

    </div>
  );
}

export default DashboardHome;