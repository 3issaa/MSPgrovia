import Card from "../ui/Card";

function FinancialHealth() {
  return (
    <Card className="flex items-center gap-4 p-4 sm:p-5">

      {/* Score */}
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[5px] border-[#10a5ac] border-l-slate-100">

        <div className="text-center">
          <b className="block text-base text-[#12384a]">
            82
          </b>

          <span className="text-[6px] text-slate-400">
            SCORE
          </span>
        </div>

      </div>

      {/* Text */}
      <div>
        <h2 className="text-[10px] font-bold text-[#12384a]">
          Financial Health Score
        </h2>

        <p className="mt-1 text-[8px] leading-3 text-slate-400">
          Your finances are in great shape. Consider
          increasing emergency fund contributions to
          secure 8 months of expenses.
        </p>
      </div>

    </Card>
  );
}

export default FinancialHealth;
