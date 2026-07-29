function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-[1.75rem] border border-[#E5E7EB] bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;