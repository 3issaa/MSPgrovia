import { ArrowUp, ArrowDown } from "lucide-react";

/**
 * Line chart built with raw SVG (no charting library) plotting monthly
 * performance values, plus a YTD badge and total gain/loss summary.
 *
 * Props:
 *  - history: { month: string, value: number }[]
 *  - ytdChange: number (percentage)
 *  - totalGainLoss: number
 *  - sinceInception: string
 */
export default function PortfolioPerformance({
  history = [],
  ytdChange = 0,
  totalGainLoss = 0,
  sinceInception,
}) {
  const width = 640;
  const height = 180;
  const padding = 16;

  const values = history.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = history.map((point, index) => {
    const x =
      padding +
      (index / Math.max(history.length - 1, 1)) * (width - padding * 2);
    const y =
      height - padding - ((point.value - min) / range) * (height - padding * 2);
    return { x, y, month: point.month };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? 0} ${
    height - padding
  } L ${points[0]?.x ?? 0} ${height - padding} Z`;

  const isPositive = totalGainLoss >= 0;

  const formatCurrency = (value) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">
          Portfolio Performance
        </h3>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-600">
          +{ytdChange}% YTD
        </span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[420px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="performanceGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#performanceGradient)" stroke="none" />
          <path
            d={linePath}
            fill="none"
            stroke="#14B8A6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={index === points.length - 1 ? 4.5 : 3}
              fill={index === points.length - 1 ? "#14B8A6" : "#ffffff"}
              stroke="#14B8A6"
              strokeWidth="2"
            />
          ))}
        </svg>

        <div
          className="mt-2 grid min-w-[420px] text-xs text-slate-400"
          style={{ gridTemplateColumns: `repeat(${history.length}, 1fr)` }}
        >
          {history.map((point) => (
            <span key={point.month} className="text-center">
              {point.month}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-6">
        <div>
          <p className="text-xs font-medium tracking-wide text-slate-400">
            Total Gain/Loss
          </p>
          <p
            className={`mt-1 flex items-center gap-1 text-2xl font-bold ${
              isPositive ? "text-teal-600" : "text-rose-500"
            }`}
          >
            {isPositive ? "+" : "-"}
            {formatCurrency(Math.abs(totalGainLoss))}
            {isPositive ? (
              <ArrowUp className="h-5 w-5" />
            ) : (
              <ArrowDown className="h-5 w-5" />
            )}
          </p>
        </div>
        {sinceInception && (
          <p className="text-sm text-slate-500">
            Since inception: {sinceInception}
          </p>
        )}
      </div>
    </div>
  );
}
