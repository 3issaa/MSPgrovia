import { useState } from "react";

export default function MarketTrendChart({ trendByPeriod, chartTypes, periods }) {
  const [selectedChartType, setSelectedChartType] = useState("Area");
  const [selectedPeriod, setSelectedPeriod] = useState("1Y");
  const trend = trendByPeriod[selectedPeriod];
  const width = 1120;
  const height = 300;
  const padding = { top: 20, right: 20, bottom: 42, left: 20 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const min = Math.min(...trend.values);
  const max = Math.max(...trend.values);
  const points = trend.values.map((value, index) => {
    const x = padding.left + (index / (trend.values.length - 1)) * plotWidth;
    const y = padding.top + (1 - (value - min) / (max - min || 1)) * plotHeight;
    return { x, y };
  });
  const linePath = points.map(({ x, y }, index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  const backgroundHeight = plotHeight * 0.72;

  return (
    <section className="rounded-[26px] border border-[#dfe7eb] bg-white p-5 shadow-[0_8px_22px_rgba(12,30,42,0.05)] sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold tracking-[-0.04em] text-[#0b3045]">12-Month Trend Performance</h2>
        <div className="flex items-center gap-2 text-sm font-medium text-[#8a9ba5]"><span className="h-3 w-3 rounded-sm bg-[#00aeb8]" /> Holdings Trend</div>
      </div>

      <div className="mt-5 h-[260px] sm:h-[330px]">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-full w-full" role="img" aria-label={`${selectedPeriod} holdings trend`}>
          <defs>
            <linearGradient id="market-top-fade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#cceff1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#cceff1" stopOpacity="0" />
            </linearGradient>
          </defs>
          {selectedChartType === "Area" && <rect x={padding.left} y={padding.top} width={plotWidth} height={backgroundHeight} fill="url(#market-top-fade)" />}
          {[0, 1, 2, 3].map((line) => <line key={line} x1={padding.left} x2={width - padding.right} y1={padding.top + line * (plotHeight / 3)} y2={padding.top + line * (plotHeight / 3)} stroke="#d8e5e8" strokeDasharray="4 4" />)}
          <path d={linePath} fill="none" stroke="#00adb8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {points.map(({ x, y }, index) => <circle key={trend.labels[index]} cx={x} cy={y} r="3.2" fill="white" stroke="#00adb8" strokeWidth="2" />)}
          {trend.labels.map((label, index) => <text key={label} x={points[index].x} y={height - 10} textAnchor="middle" fill="#8496a1" fontSize="14">{label}</text>)}
        </svg>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {chartTypes.map((type) => <button key={type} type="button" onClick={() => setSelectedChartType(type)} className={`rounded-lg border px-4 py-2 text-sm font-bold transition ${selectedChartType === type ? "border-[#c5ecef] bg-[#e6f8f9] text-[#00aab5]" : "border-[#dfe7eb] bg-white text-[#12384a] hover:bg-[#f6f8f9]"}`}>{type}</button>)}
        </div>
        <div className="flex flex-wrap rounded-xl bg-[#f4f6f7] p-1">
          {periods.map((period) => <button key={period} type="button" onClick={() => setSelectedPeriod(period)} className={`rounded-lg px-3 py-2 text-sm font-bold transition ${selectedPeriod === period ? "bg-white text-[#00aeb8] shadow-sm" : "text-[#82949e] hover:text-[#0b3045]"}`}>{period}</button>)}
        </div>
      </div>
    </section>
  );
}
