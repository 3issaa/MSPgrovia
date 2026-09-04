import Card from "../ui/Card";
import { allocations } from "../../data/dashboardData";

function ringPath(radius, percent) {
  const circumference = 2 * Math.PI * radius;
  return {
    dash: (percent / 100) * circumference,
    gap: circumference,
  };
}

function AssetAllocation() {
  const rings = [
    { radius: 54, ...allocations[0] },
    { radius: 42, ...allocations[1] },
    { radius: 31, ...allocations[2] },
    { radius: 21, ...allocations[3] },
    { radius: 12, ...allocations[4] },
  ];

  return (
    <Card className="p-6 sm:p-7">
      <h3 className="text-[16px] font-bold text-[#12384a]">
        Asset Allocation Breakdown
      </h3>

      <div className="mt-6 grid grid-cols-[minmax(170px,200px)_1fr] items-center gap-6">
        <svg viewBox="0 0 140 140" className="h-[190px] w-full max-w-[200px] shrink-0">
          {rings.map((ring) => {
            const { dash, gap } = ringPath(ring.radius, ring.value);
            return (
              <g key={ring.label}>
                <circle
                  cx="70"
                  cy="70"
                  r={ring.radius}
                  fill="none"
                  stroke="#eef3f4"
                  strokeWidth="8"
                />
                <circle
                  cx="70"
                  cy="70"
                  r={ring.radius}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${gap}`}
                  transform="rotate(-90 70 70)"
                />
              </g>
            );
          })}
        </svg>

        <div className="min-w-0 space-y-4">
          {allocations.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4"
            >
              <span className="flex min-w-0 items-center gap-2.5 text-[14px] font-medium text-slate-600">
                <i
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </span>
              <b className="shrink-0 text-[14px] text-[#12384a]">{item.value}%</b>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default AssetAllocation;
