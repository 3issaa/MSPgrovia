function Card({ children, className = "" }) {
  return (
    <section
      className={`
        rounded-2xl
        border border-slate-100
        bg-white
        shadow-[0_4px_20px_rgba(15,53,69,0.04)]
        ${className}
      `}
    >
      {children}
    </section>
  );
}

export default Card;
