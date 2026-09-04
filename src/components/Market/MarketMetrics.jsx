export default function MarketMetrics({ metrics }) {
  return (
    <section className="rounded-[26px] border border-[#dfe7eb] bg-white p-5 shadow-[0_8px_22px_rgba(12,30,42,0.05)] sm:p-8">
      <h2 className="text-xl font-bold tracking-[-0.04em] text-[#0b3045]">Key Metrics & Ranges</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center justify-between rounded-xl bg-[#f6f7f8] px-5 py-4">
            <span className="text-base font-medium text-[#8a9ba5]">{metric.label}</span>
            <span className="text-lg font-bold text-[#12384a]">{metric.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
