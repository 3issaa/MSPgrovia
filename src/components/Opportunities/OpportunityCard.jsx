import LineChart from "./LineChart";

export default function OpportunityCard({ opportunity }) {
  return (
    <article className="rounded-[18px] border border-[#dfe6ea] bg-[#f7f8f8] p-4 shadow-[0_6px_22px_rgba(12,28,39,0.02)]">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#dff8fb] text-[0.6rem] font-bold text-[#1b7182]">{opportunity.name.charAt(0)}</span>
          <p className="text-[0.76rem] font-medium uppercase tracking-[0.08em] text-[#667d88]">{opportunity.risk}</p>
        </div>
        {opportunity.badge && <span className="rounded-full border border-[#d4eef2] bg-[#eaf9fb] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#0d93a7]">{opportunity.badge}</span>}
      </div>
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-[1.05rem] font-bold leading-snug tracking-[-0.04em] text-[#163447]">{opportunity.name}</h3>
        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#15a7b9]">{opportunity.tag}</div>
      </div>
      <div className="mt-2"><LineChart points={opportunity.points} color={opportunity.accent} /></div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div className="text-[1.02rem] font-bold tracking-[-0.04em] text-[#1a3d50]">{opportunity.change}</div>
        <button type="button" className="rounded-[10px] bg-[#12384a] px-3 py-2 text-[0.78rem] font-semibold text-white shadow-[0_8px_18px_rgba(17,56,74,0.15)] transition hover:bg-[#163f54]">Invest Now</button>
      </div>
    </article>
  );
}
