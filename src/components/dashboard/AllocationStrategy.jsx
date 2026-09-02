import Card from "../ui/Card";
import { strategy } from "../../data/dashboardData";

function AllocationStrategy() {
  return (
    <Card className="p-5">

      <h3 className="text-[10px] font-bold text-[#12384a]">
        Allocation vs. Target Strategy
      </h3>

      {/* Bars */}
      <div className="mt-4 flex h-24 items-end justify-between gap-3 px-2">

        {strategy.map((item) => (
          <div
            key={item.label}
            className="flex h-full flex-1 items-end justify-center gap-1"
          >

            {/* Target */}
            <div
              className="relative w-2 rounded-t bg-slate-200"
              style={{
                height: `${item.target * 1.65}px`,
              }}
            />

            {/* Current */}
            <div
              className="w-2 rounded-t"
              style={{
                height: `${item.current * 1.65}px`,
                background: item.color,
              }}
            />

          </div>
        ))}

      </div>

      {/* Labels */}
      <div className="mt-1 grid grid-cols-5 text-center text-[6px] text-slate-500">

        {strategy.map((item) => (
          <span key={item.label}>
            {item.label}
          </span>
        ))}

      </div>

      {/* Legend */}
      <div className="mt-3 flex justify-center gap-4 text-[6px] text-slate-400">
        <span>■ Current Share</span>
        <span className="text-slate-300">
          ■ Target Strategy
        </span>
      </div>

    </Card>
  );
}

export default AllocationStrategy;
