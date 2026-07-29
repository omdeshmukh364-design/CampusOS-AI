function Button({ children, className = "", variant = "primary", ...props }) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200";

  const variants = {
    primary:
      "bg-[#2563EB] text-white shadow-lg shadow-blue-600/20 hover:bg-[#1d4ed8]",
    secondary:
      "border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F4F7FF]",
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;