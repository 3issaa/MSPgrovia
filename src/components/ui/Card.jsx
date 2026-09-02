function Card({ children, className = "" }) {
  const hasCustomBg = /\bbg-/.test(className);

  return (
    <section
      className={`rounded-[18px] shadow-[0_8px_28px_rgba(15,53,69,0.05)] ${
        hasCustomBg ? "" : "border border-[#e8eef0] bg-white"
      } ${className}`}
    >
      {children}
    </section>
  );
}

export default Card;
