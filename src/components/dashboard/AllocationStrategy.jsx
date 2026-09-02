import Card from "../ui/Card";
import { strategy } from "../../data/dashboardData";

function AllocationStrategy() {
  const maxValue = 50;

  return (
    <Card className="p-6">
      <h3 className="text-[16px] font-bold text-[#12384a]">
        Allocation vs. Target Strategy
      </h3>

      <div className="mt-6 flex h-[170px] items-end justify-between gap-4 px-1">
        {strategy.map((item) => (
          <div
            key={item.label}
            className="flex h-full flex-1 items-end justify-center gap-1.5"
          >
            <div
              className="w-3.5 rounded-t-sm sm:w-4"
              style={{
                height: `${(item.current / maxValue) * 100}%`,
                background: item.color,
              }}
            />
            <div
              className="w-3.5 rounded-t-sm bg-[#dce4e7] sm:w-4"
              style={{
                height: `${(item.target / maxValue) * 100}%`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-5 text-center text-[12px] text-slate-500">
        {strategy.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-6 text-[12px] text-slate-500">
        <span className="flex items-center gap-2">
          <i className="h-2.5 w-2.5 rounded-sm bg-[#12a5ad]" />
          Current Share
        </span>
        <span className="flex items-center gap-2">
          <i className="h-2.5 w-2.5 rounded-sm bg-[#dce4e7]" />
          Target Allocation
        </span>
      </div>
    </Card>
  );
}

export default AllocationStrategy;
