import Card from "../ui/Card";

function StatCard({ label, value, meta, positive }) {
  return (
    <Card className="p-5">
      <p className="text-[12px] font-medium tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-[22px] font-extrabold text-[#12384a]">{value}</p>
      <p
        className={`mt-1.5 text-[12px] ${
          positive ? "font-semibold text-[#12a5ad]" : "text-slate-400"
        }`}
      >
        {meta}
      </p>
    </Card>
  );
}

export default StatCard;
