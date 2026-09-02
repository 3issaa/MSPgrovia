function ProgressBar({ value }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#eef3f4]">
      <div
        className="h-full rounded-full bg-[#12a5ad]"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default ProgressBar;
