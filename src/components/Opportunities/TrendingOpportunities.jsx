import LineChart from "./LineChart";

export default function TrendingOpportunities({ opportunities }) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-[#0fa4b5]">Trending opportunities</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {opportunities.map((opportunity) => (
          <article key={opportunity.name} className="rounded-[18px] border border-[#dfe6ea] bg-[#f7f8f8] p-4 shadow-[0_6px_22px_rgba(12,28,39,0.02)]">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#dff8fb] text-[0.6rem] font-bold text-[#1b7182]">{opportunity.name.charAt(0)}</span>
              <p className="text-[0.9rem] font-medium text-[#1d3d4d]">{opportunity.name}</p>
            </div>
            <div className="mt-3"><LineChart points={opportunity.points} color={opportunity.accent} /></div>
            <div className="mt-3 flex items-end justify-between gap-2"><div className="text-[1rem] font-bold tracking-[-0.04em] text-[#1a3d50]">{opportunity.change}</div></div>
          </article>
        ))}
      </div>
      {opportunities.length === 0 && (
        <p className="rounded-[18px] border border-dashed border-[#dfe6ea] p-4 text-sm text-[#647680]">
          No trending opportunities are available in this category yet.
        </p>
      )}
    </section>
  );
}
