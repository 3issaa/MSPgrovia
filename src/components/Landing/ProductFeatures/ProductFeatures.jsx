import { useLanguage } from "../../../context/LanguageContext";

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
  const { isArabic } = useLanguage();
  return (
    <section id="services" className="min-h-screen bg-white px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-[30px] font-bold leading-tight text-cyan-500">
            {isArabic ? "مميزات المنتج" : "Product Features"}
          </h2>

          <p className="mt-3 text-[18px] font-semibold text-slate-900">
            {isArabic ? "مجموعة متقدمة مصممة للنمو" : "Advanced suite designed for scaling"}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.service} feature={feature} isArabic={isArabic} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, isArabic }) {
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
        {isArabic ? `الخدمة ${feature.service.slice(-2)}` : feature.service}
      </div>

      {/* Title */}
      <h3 className="mt-3 text-[13px] font-semibold leading-5 text-slate-900">
        {isArabic ? ["تقييم المخاطر", "أسواق الاستثمار", "فرص الاستثمار", "محفظة الاستثمار", "محرك الشرح بالذكاء الاصطناعي"][Number(feature.service.slice(-2)) - 1] : feature.title}
      </h3>

      {/* Description */}
      <p className="mt-2 max-w-[290px] text-[13px] font-normal leading-[1.2] text-slate-500">
        {isArabic ? ["نمذجة معرفية عميقة لحدود المخاطر والعوائد والجداول الزمنية لرأس المال.", "وصول عالمي إلى الأسهم والعقارات الثانوية وائتمانات الكربون عالية العائد.", "صفقات استثمار مشترك مدققة خوارزمياً بشروط متفاوض عليها مسبقاً.", "نظام حفظ موحد يوجّه الاحتياطات النقدية والرقمية فوراً بين المنصات.", "شرح مستمر لتحولات المحفظة وتعديلات الأداء بلغة واضحة."][Number(feature.service.slice(-2)) - 1] : feature.description}
      </p>
    </article>
  );
}
