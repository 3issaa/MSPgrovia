import Card from "../ui/Card";
import { journey } from "../../data/dashboardData";

function FinancialJourney() {
  return (
    <Card className="p-5">
      <p className="text-[8px] font-semibold text-[#13a5ac]">Milestones</p>

      <h3 className="mt-1 text-[11px] font-bold text-[#12384a]">
        Your Financial Journey
      </h3>

      <p className="text-[7px] text-slate-400">
        Track your progress toward lifetime wealth independence
      </p>

      <div className="relative mt-7 grid grid-cols-5 gap-2">
        {/* Line */}
        <div className="absolute left-[8%] right-[8%] top-1.5 h-px bg-[#56c6ca]" />

        {journey.map((item, index) => (
          <div key={item.title} className="relative text-center">
            {/* Circle */}
            <div
              className={`mx-auto h-3 w-3 rounded-full border-2 border-white shadow ${
                index < 3 ? "bg-[#10a4ab]" : "bg-slate-200"
              }`}
            />

            <p className="mt-2 text-[6px] font-bold text-[#12384a] sm:text-[7px]">
              {item.title}
            </p>

            <p
              className={`mt-0.5 text-[5px] sm:text-[6px] ${
                index < 3 ? "text-[#0fa4aa]" : "text-slate-400"
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
