import Card from "../ui/Card";

function StatCard({ label, value, meta, positive }) {
  return (
    <Card className="p-4">
      <p className="text-[8px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-extrabold text-[#12384a]">{value}</p>

      <p
        className={`mt-1 text-[7px] ${
          positive ? "text-[#10a3aa]" : "text-slate-400"
        }`}
      >
        {meta}
      </p>
    </Card>
  );
}

export default StatCard;
