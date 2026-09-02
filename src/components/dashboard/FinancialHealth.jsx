import Card from "../ui/Card";

function FinancialHealth() {
  const score = 82;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card className="flex h-full min-h-[168px] items-center gap-5 p-5 sm:p-6">
      <div className="relative h-[92px] w-[92px] shrink-0">
        <svg viewBox="0 0 92 92" className="h-full w-full -rotate-90">
          <circle
            cx="46"
            cy="46"
            r={radius}
            fill="none"
            stroke="#e8eef0"
            strokeWidth="8"
          />
          <circle
            cx="46"
            cy="46"
            r={radius}
            fill="none"
            stroke="#12a5ad"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <b className="text-[22px] leading-none text-[#12384a]">{score}</b>
          <span className="mt-0.5 text-[9px] font-semibold tracking-wide text-slate-400">
            SCORE
          </span>
        </div>
      </div>

      <div>
        <h2 className="text-[16px] font-bold text-[#12384a]">
          Financial Health Score
        </h2>
        <p className="mt-2 text-[13px] leading-5 text-slate-500">
          Your finances are in great shape. Consider increasing emergency fund
          contributions to secure 8 months of expenses.
        </p>
      </div>
    </Card>
  );
}

export default FinancialHealth;
