import Card from "../ui/Card";
import { performance } from "../../data/dashboardData";

function PerformanceChart() {
  const points = performance
    .map((item, index) => {
      const x = (index / (performance.length - 1)) * 100;

      const y = 100 - item.value;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Card className="p-5">
      <p className="text-[8px] font-semibold text-[#13a5ac]">Analytics</p>

      <h3 className="mt-1 text-[11px] font-bold text-[#12384a]">
        12-Month Performance
      </h3>

      <p className="text-[7px] text-slate-400">
        Historical development of unified asset holdings value
      </p>

      <div className="mt-5">
        <svg
          viewBox="0 0 100 42"
          preserveAspectRatio="none"
          className="h-36 w-full"
        >
          {/* Grid */}
          <defs>
            <pattern
              id="grid"
              width="20"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 10"
                fill="none"
                stroke="#edf2f3"
                strokeWidth="0.35"
              />
            </pattern>
          </defs>

          <rect width="100" height="42" fill="url(#grid)" />

          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke="#12a5ad"
            strokeWidth="0.55"
            vectorEffect="non-scaling-stroke"
          />

          {/* Points */}
          {performance.map((item, index) => (
            <circle
              key={item.month}
              cx={(index / (performance.length - 1)) * 100}
              cy={100 - item.value}
              r="0.8"
              fill="#12a5ad"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Months */}
        <div className="mt-1 grid grid-cols-12 text-[6px] text-slate-400">
          {performance.map((item) => (
            <span key={item.month} className="text-center">
              {item.month}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default PerformanceChart;
