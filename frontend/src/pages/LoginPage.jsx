import RoleCard from "../components/RoleCard";

function LoginPage({ onSelectRole }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#EAF2FF_0%,_#F7F9FF_60%,_#EDF7FF_100%)] px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center">
        <div className="max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2563EB]">
            Choose your role
          </p>
          <h1 className="mt-4 text-4xl font-bold text-[#111827] sm:text-5xl">
            Pick the experience that fits you.
          </h1>
          <p className="mt-4 text-lg text-[#6B7280]">
            Select the role to enter the CampusOS.AI workspace and begin your
            smart campus journey.
          </p>
        </div>

        <div className="mt-12 grid w-full gap-6 md:grid-cols-3">
          <RoleCard
            icon="🎓"
            title="Student"
            description="Access academic updates, study plans, and AI support."
            onClick={() => onSelectRole("student")}
          />

          <RoleCard
            icon="👨‍🏫"
            title="Faculty"
            description="Coordinate classes, attendance, and campus insights."
            onClick={() => onSelectRole("faculty")}
          />

          <RoleCard
            icon="🏢"
            title="Admin"
            description="Monitor operations and manage the campus ecosystem."
            onClick={() => onSelectRole("admin")}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;