import { Mail, Calendar, ExternalLink } from "lucide-react";

export default function SlashyAssistant() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold">
        Slashy Productivity Assistant
      </h1>

      <p className="mt-2 text-gray-600">
        Powered by Slashy Automation
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <div className="bg-white rounded-xl shadow p-6">
          <Mail className="text-blue-600 mb-4" size={40} />

          <h2 className="text-xl font-bold">
            Email Assistant
          </h2>

          <p className="mt-2 text-gray-500">
            Draft placement emails, leave requests and internship emails.
          </p>

          <button
            className="mt-6 bg-blue-600 text-white px-5 py-3 rounded-lg"
            onClick={() =>
              window.open("https://slashy.com", "_blank")
            }
          >
            Open Slashy
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <Calendar
            className="text-green-600 mb-4"
            size={40}
          />

          <h2 className="text-xl font-bold">
            Calendar Automation
          </h2>

          <p className="mt-2 text-gray-500">
            Schedule exams, reminders and deadlines using Slashy.
          </p>

          <button
            className="mt-6 bg-green-600 text-white px-5 py-3 rounded-lg"
            onClick={() =>
              window.open("https://slashy.com", "_blank")
            }
          >
            Open Calendar
          </button>

        </div>

      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold">
          Why Slashy?
        </h2>

        <ul className="mt-4 space-y-3">

          <li>✅ Draft professional emails</li>

          <li>✅ Schedule meetings automatically</li>

          <li>✅ AI productivity workflows</li>

          <li>✅ Smart reminders</li>

        </ul>

      </div>

    </div>
  );
}