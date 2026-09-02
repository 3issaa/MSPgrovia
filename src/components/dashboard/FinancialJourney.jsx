import Card from "../ui/Card";
import { journey } from "../../data/dashboardData";

function FinancialJourney() {
  return (
    <Card className="p-6">
      <p className="text-[12px] font-semibold text-[#13a5ac]">Milestones</p>
      <h3 className="mt-1 text-[18px] font-bold text-[#12384a]">
        Your Financial Journey
      </h3>
      <p className="mt-1 text-[13px] text-slate-400">
        Track your progress toward lifetime wealth independence
      </p>

      <div className="relative mt-8 grid grid-cols-5 gap-2">
        <div className="absolute left-[8%] right-[8%] top-[15px] h-[2px] bg-[#d7e4e6]" />
        <div className="absolute left-[8%] top-[15px] h-[2px] w-[50%] bg-[#12a5ad]" />

        {journey.map((item, index) => (
          <div key={item.title} className="relative text-center">
            {item.state === "done" ? (
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#12a5ad] text-white shadow-sm">
                <i className="fa-solid fa-check text-[11px]" />
              </div>
            ) : (
              <div
                className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold ${
                  item.state === "current"
                    ? "bg-[#0b3244] text-white"
                    : "bg-[#e6ecee] text-slate-500"
                }`}
              >
                {index + 1}
              </div>
            )}

            <p className="mt-3 text-[12px] font-bold text-[#12384a] sm:text-[13px]">
              {item.title}
            </p>
            <p
              className={`mt-1 text-[11px] ${
                item.state === "pending" ? "text-slate-400" : "text-[#12a5ad]"
              }`}
            >
              {item.status}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default FinancialJourney;
