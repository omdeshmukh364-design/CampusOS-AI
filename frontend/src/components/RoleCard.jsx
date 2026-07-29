import Card from "./common/Card";

function RoleCard({ icon, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left transition duration-200 hover:-translate-y-1"
    >
      <Card className="group h-full border-[#E5E7EB] p-8 shadow-[0_20px_60px_-12px_rgba(37,99,235,0.16)] hover:border-[#2563EB] hover:shadow-[0_30px_80px_-20px_rgba(37,99,235,0.28)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB]/10 text-3xl text-[#2563EB] transition group-hover:bg-[#2563EB] group-hover:text-white">
          {icon}
        </div>

        <h2 className="mt-6 text-2xl font-semibold text-[#111827]">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-[#6B7280]">{description}</p>
      </Card>
    </button>
  );
}

export default RoleCard;