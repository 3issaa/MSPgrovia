import { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";

export default function Seamless() {
  const [activeStep, setActiveStep] = useState(1);
  const { isArabic } = useLanguage();

  const steps = [
    {
      id: 1,
      number: "01",
      title: "Complete Risk Profiler",
      description:
        "Take a 5-minute psychometric assessment mapping your liquidity timeline and financial goals.",
    },
    {
      id: 2,
      number: "02",
      title: "Review Personalized Markets",
      description:
        "Browse curated investment opportunities dynamically filtered by our machine learning models.",
    },
    {
      id: 3,
      number: "03",
      title: "Fund & Automate Allocation",
      description:
        "Execute multi-market trades in a single click, with automatic rebalancing aligned to market shifts.",
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-white px-6 py-16">
      {/* Heading */}
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold text-[#00ADB5] md:text-4xl">
          {isArabic ? "رحلة سلسة" : "Seamless Journey"}
        </h2>

        <h3 className="mt-3 text-xl font-bold text-slate-800 md:text-2xl">
          {isArabic ? "ثلاث خطوات لتحسين رأس مالك" : "Three steps to optimize your capital"}
        </h3>
      </div>

      {/* Pink Line */}

      {/* Steps */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 mt-10 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`
              min-h-[215px]
              cursor-pointer
              rounded-b-xl
              bg-slate-50
              px-7 py-6
              transition-all duration-300
              ${
                activeStep === step.id
                  ? "shadow-lg -translate-y-1"
                  : "hover:-translate-y-1 hover:shadow-md"
              }
            `}
          >
            {/* Number */}
            <div className="text-5xl font-bold text-slate-200">
              {step.number}
            </div>

            {/* Content */}
            <h4 className="mt-5 text-sm font-bold text-slate-800">
              {isArabic ? ["أكمل تقييم المخاطر", "راجع الأسواق المخصصة", "موّل وأتمت التوزيع"][step.id - 1] : step.title}
            </h4>

            <p className="mt-3 max-w-sm text-sm leading-[1.2] text-slate-400">
              {isArabic ? ["أجب عن تقييم مدته خمس دقائق يحدد احتياجات السيولة وأهدافك المالية.", "تصفح فرصاً استثمارية مختارة ومفلترة وفقاً لنماذج التعلم الآلي لدينا.", "نفّذ صفقات متعددة الأسواق بنقرة واحدة مع إعادة موازنة تلقائية."][step.id - 1] : step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
