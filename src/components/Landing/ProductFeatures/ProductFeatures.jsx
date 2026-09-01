const features = [
  {
    service: "SERVICE 01",
    title: "Risk Assessment",
    description:
      "Deep cognitive modeling of your risk-return threshold and capital timelines.",
    accent: "cyan",
  },
  {
    service: "SERVICE 02",
    title: "Investment Markets",
    description:
      "Global access to equities, secondary real estate, and high-yield carbon credits.",
    accent: "blue",
  },
  {
    service: "SERVICE 03",
    title: "Investment Opportunities",
    description:
      "Algorithmically vetted co-investment deals with pre-negotiated terms.",
    accent: "cyan",
  },
  {
    service: "SERVICE 04",
    title: "Investment Wallet",
    description:
      "Unified custody system routing fiat and digital reserves instantly across exchanges.",
    accent: "blue",
  },
  {
    service: "SERVICE 05",
    title: "AI Explanation Engine",
    description:
      "Continuous breakdown of portfolio shifts and performance adjustments in plain English.",
    accent: "cyan",
  },
];

export default function ProductFeatures() {
  return (
    <section className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-[30px] font-bold leading-tight text-cyan-500">
            Product Features
          </h2>

          <p className="mt-3 text-[18px] font-semibold text-slate-900">
            Advanced suite designed for scaling
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.service} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }) {
  const isCyan = feature.accent === "cyan";

  return (
    <article
      className="
        min-h-[138px]
        rounded-[12px]
        border border-slate-200
        bg-white
        px-6 py-6
        shadow-[0_1px_2px_rgba(15,23,42,0.02)]
      "
    >
      {/* Service label */}
      <div
        className={`
          inline-flex
          rounded-[4px]
          px-[7px] py-[3px]
          text-[12px]
          font-medium
          leading-[1]
          ${isCyan ? "bg-cyan-50 text-cyan-500" : "bg-slate-100 text-slate-700"}
        `}
      >
        {feature.service}
      </div>

      {/* Title */}
      <h3 className="mt-3 text-[13px] font-semibold leading-5 text-slate-900">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="mt-2 max-w-[290px] text-[13px] font-normal leading-[1.2] text-slate-500">
        {feature.description}
      </p>
    </article>
  );
}
