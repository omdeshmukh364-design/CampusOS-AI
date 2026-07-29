function Input({ icon: Icon, className = "", ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#6B7280]">
          <Icon size={18} />
        </div>
      )}

      <input
        className={`w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 ${Icon ? "pl-12" : ""} ${className}`}
        {...props}
      />
    </div>
  );
}

export default Input;