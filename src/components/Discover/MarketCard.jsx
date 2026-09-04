import { ArrowRight, Globe2 } from "lucide-react";

export default function MarketCard({ markets, onExplore }) {
  return (
    <section className="rounded-[26px] border border-[#dfe7eb] bg-[#f8f9fa] p-6 shadow-[0_12px_30px_rgba(12,26,38,0.04)] sm:p-7">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#bfeef3] bg-[#dff7f9] text-[#0f8ca9]">
          <Globe2 className="h-5 w-5" />
        </div>
        <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#00ADB5]">
          Global Indices
        </span>
      </div>

      <h2 className="text-[2rem] font-bold tracking-[-0.05em] text-[#163447] sm:text-[2.3rem]">
        Macro Investment Markets
      </h2>

      <p className="mt-4 max-w-[520px] text-[1.08rem] leading-relaxed text-[#5d7380]">
        Gain direct exposure to curated indexes, structured commodity bonds,
        and diverse sustainable assets without legacy high-capital barriers.
      </p>

      {markets.map((item) => (
        <div key={item.label} className="mt-7 rounded-[18px] border border-transparent bg-transparent">
          <div className="mb-2 flex items-center justify-between gap-4">
            <div className="text-[1.02rem] font-semibold text-[#163447]">{item.label}</div>
            <div className="text-[0.98rem] font-bold text-[#17b8c9]">{item.value}</div>
          </div>

          <div className="mt-2 flex items-center justify-between text-[0.82rem] font-medium uppercase tracking-[0.12em] text-[#7c8e98]">
            <span>Min. allocation</span>
            <span>{item.amount}</span>
          </div>

          <div className="mt-2 flex items-center justify-between text-[0.82rem] font-medium uppercase tracking-[0.12em] text-[#7c8e98]">
            <span>Risk index</span>
            <span>{item.risk}</span>
          </div>

          <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-[#dfe5e9]">
            <div className="h-full rounded-full" style={{ width: `${item.progress}%`, background: item.color }} />
          </div>
        </div>
      ))}

      <button type="button" onClick={onExplore} className="mt-8 flex w-full items-center justify-center gap-2 rounded-[16px] bg-[#1ec6d8] px-6 py-4 text-lg font-semibold text-white shadow-[0_14px_24px_rgba(20,183,200,0.2)] transition hover:bg-[#17b3c7]">
        Explore Market
        <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}
