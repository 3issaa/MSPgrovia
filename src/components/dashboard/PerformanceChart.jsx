import Card from "../ui/Card";
import { performance } from "../../data/dashboardData";

function PerformanceChart() {
  const width = 1000;
  const height = 280;
  const padX = 16;
  const padY = 18;
  const min = 140;
  const max = 260;

  const toX = (index) =>
    padX + (index / (performance.length - 1)) * (width - padX * 2);
  const toY = (value) =>
    padY + ((max - value) / (max - min)) * (height - padY * 2);

  const points = performance
    .map((item, index) => `${toX(index)},${toY(item.value)}`)
    .join(" ");

  const gridYs = [260, 230, 200, 170, 140];

  return (
    <Card className="p-6">
      <p className="text-[12px] font-semibold text-[#13a5ac]">Analytics</p>
      <h3 className="mt-1 text-[18px] font-bold text-[#12384a]">
        12-Month Performance
      </h3>
      <p className="mt-1 text-[13px] text-slate-400">
        Historical development of unified asset holdings value
      </p>

      <div className="mt-6">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-[220px] w-full">
          {gridYs.map((value) => (
            <line
              key={value}
              x1={padX}
              x2={width - padX}
              y1={toY(value)}
              y2={toY(value)}
              stroke="#e6eef0"
              strokeDasharray="6 8"
            />
          ))}

          <polyline
            points={points}
            fill="none"
            stroke="#12a5ad"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {performance.map((item, index) => (
            <circle
              key={item.month}
              cx={toX(index)}
              cy={toY(item.value)}
              r="5"
              fill="#12a5ad"
              stroke="#ffffff"
              strokeWidth="2"
            />
          ))}
        </svg>

        <div className="mt-2 grid grid-cols-12 text-[12px] text-slate-400">
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
