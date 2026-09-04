import { ArrowDown, ArrowUp, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { marketCards } from "../data/marketData";

function MiniTrend({ points, positive }) {
  const width = 132;
  const height = 42;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const line = points.map((point, index) => {
    const x = (index / (points.length - 1)) * width;
    const y = height - ((point - min) / (max - min || 1)) * (height - 8) - 4;
    return `${index === 0 ? "M" : "L"}${x} ${y}`;
  }).join(" ");

  return <svg viewBox={`0 0 ${width} ${height}`} className="h-12 w-full" role="img" aria-label="Recent performance trend"><path d={line} fill="none" stroke={positive ? "#16aeb8" : "#fb6267"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function MarketCard({ market, onOpen }) {
  const positive = market.direction === "up";
  return <button type="button" onClick={() => onOpen(market.id)} className="group rounded-[18px] border border-[#e2e8ea] bg-white p-5 text-left shadow-[0_8px_20px_rgba(12,30,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(12,30,42,0.1)] focus:outline-none focus:ring-2 focus:ring-[#1cb9c4]">
    <div className="flex items-start justify-between gap-3">
      <h2 className="truncate text-[14px] font-bold text-[#18394b]">{market.name}</h2>
      <span className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold ${positive ? "bg-[#e6f8f8] text-[#10a9b5]" : "bg-[#fff0f0] text-[#f45f64]"}`}>
        {positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}{market.change}
      </span>
    </div>
    <div className="mt-4 flex items-baseline gap-2"><span className="text-[28px] font-extrabold tracking-[-0.04em] text-[#0b3045]">{market.value}</span><span className={`text-[12px] font-semibold ${positive ? "text-[#16aeb8]" : "text-[#f45f64]"}`}>{market.delta}</span></div>
    <div className="mt-4 border-t border-[#edf1f2] pt-3"><p className="text-[11px] font-medium text-[#9aa9b0]">Recent Performance</p><MiniTrend points={market.points} positive={positive} /></div>
  </button>;
}

export default function MarketOverview() {
  const navigate = useNavigate();
  return <main className="min-h-[calc(100vh-72px)] bg-[#f6f7f8] py-14"><div className="mx-auto max-w-[1030px] px-4 sm:px-6 lg:px-8">
    <header className="mb-10 flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#12a5ad]">Markets</p><h1 className="mt-2 text-[30px] font-extrabold tracking-[-0.04em] text-[#0b3045] sm:text-[36px]">Market Overview</h1><p className="mt-1 text-[14px] text-[#8999a2]">Track global indices and market performance</p></div><span className="hidden items-center gap-2 rounded-full bg-[#e5f7f8] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#11a8b2] sm:flex"><BarChart3 className="h-3.5 w-3.5" /> Vetted indices</span></header>
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{marketCards.map((market) => <MarketCard key={market.id} market={market} onOpen={(id) => navigate(`/Market/${id}`)} />)}</div>
  </div></main>;
}
