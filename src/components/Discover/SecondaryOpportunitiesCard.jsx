import { ArrowUpRight, TrendingUp } from "lucide-react";

export default function SecondaryOpportunitiesCard({ opportunities, onExplore }) {
  return (
    <section className="rounded-[26px] border border-[#dfe7eb] bg-[#f8f9fa] p-6 shadow-[0_12px_30px_rgba(12,26,38,0.04)] sm:p-7">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#dfe8ec] bg-[#eef3f5] text-[#153a4a]">
          <TrendingUp className="h-5 w-5" />
        </div>
        <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#123B5D]">
          Pre-negotiated Deals
        </span>
      </div>

      <h2 className="text-[2rem] font-bold tracking-[-0.05em] text-[#163447] sm:text-[2.3rem]">
        Secondary Opportunities
      </h2>

      <p className="mt-4 max-w-[560px] text-[1.08rem] leading-relaxed text-[#5d7380]">
        Participate in high-yield secondary venture offerings and equity
        restructurings algorithmically aligned to your profile.
      </p>

      {opportunities.map((item) => (
        <div key={item.label} className="mt-7 rounded-[18px] border border-transparent bg-transparent">
          <div className="grid gap-2 sm:flex sm:items-center sm:justify-between">
            <div className="text-[1.02rem] font-semibold text-[#163447]">{item.label}</div>
            <div className="text-[0.96rem] font-semibold text-[#213d4f]">Liquidity lock: 12mo</div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[0.82rem] font-medium uppercase tracking-[0.12em] text-[#7c8e98]">
            <span>Estimated IRR</span>
            <span>Co-investing</span>
          </div>

          <div className="mt-2 flex items-end justify-between gap-4">
            <div className="text-[1.05rem] font-bold text-[#163447]">{item.value}</div>
            <div className="text-right text-[0.82rem] font-medium text-[#1d3d4d]">
              {item.poolLabel}{" "}
              <span className="font-bold">({item.fundedAmount})</span>
            </div>
          </div>

          <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-[#dfe5e9]">
            <div className="h-full rounded-full" style={{ width: `${item.progress}%`, background: item.color }} />
          </div>
        </div>
      ))}

      <button type="button" onClick={onExplore} className="mt-8 flex w-full items-center justify-center gap-2 rounded-[16px] bg-[#0d2435] px-6 py-4 text-lg font-semibold text-white transition hover:bg-[#102c43]">
        Explore Opportunities
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </section>
  );
}
