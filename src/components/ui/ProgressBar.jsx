function ProgressBar({ value }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-[#13a5ac]"
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  );
}

export default ProgressBar;
