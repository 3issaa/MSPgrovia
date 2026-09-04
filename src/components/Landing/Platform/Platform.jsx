import { useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";

export default function Plarform() {
  const [selectedCard, setSelectedCard] = useState(null);
  const { isArabic } = useLanguage();

  const cards = [
    {
      id: 1,
      icon: "🔒",
      title: "High Barriers to Entry",
      description:
        "Premium alternative assets and high-yield vehicles have traditionally been locked behind massive capital requirements.",
    },
    {
      id: 2,
      icon: "%",
      title: "Hidden Fees & Middlemen",
      description:
        "Legacy brokers siphon off meaningful returns through opaque management structures and performance fees.",
    },
    {
      id: 3,
      icon: "ⓘ",
      title: "Information Overload",
      description:
        "With thousands of products on the market, filtering and sizing your allocation is a complex, full-time job.",
    },
  ];

  return (
    <section id="who-we-are" className="w-full bg-white px-6 py-16">
      {/* Header */}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#00ADB5]">
          {isArabic ? "لماذا وُجدت منصتنا" : "Why Our Platform Exists"}
        </h2>

        <h3 className="mt-3 text-xl md:text-2xl font-bold text-slate-800">
          {isArabic ? "تحديات الاستثمار الحديثة" : "The Modern Investment Bottleneck"}
        </h3>

        <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base leading-6 text-slate-400">
          {isArabic
            ? "لم تتغير نماذج الاستثمار منذ ثلاثين عاماً. لا تزال الأسواق الثانوية عالية العائد يدوية وغامضة وصعبة الوصول، وجروفيا تغيّر هذه المعادلة."
            : "Investing models haven't changed in thirty years. High-yield secondary markets remain highly manual, opaque, and hard to access. Grovia changes this dynamic."}
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedCard(card.id)}
            className={`
              cursor-pointer rounded-xl border p-6
              transition-all duration-300
              ${
                selectedCard === card.id
                  ? "border-cyan-400 shadow-lg shadow-cyan-100 -translate-y-1"
                  : "border-slate-200 hover:border-cyan-300 hover:-translate-y-1"
              }
            `}
          >
            {/* Icon */}
            <div className="mb-5 flex h-8 w-8 items-center justify-center text-xl text-cyan-500">
              {card.icon}
            </div>

            {/* Title */}
            <h4 className="text-sm font-semibold text-slate-800">
              {isArabic ? ["عوائق دخول مرتفعة", "رسوم ووسطاء خفيون", "فيض من المعلومات"][card.id - 1] : card.title}
            </h4>

            {/* Description */}
            <p className="mt-3 text-sm leading-5 text-slate-400">
              {isArabic ? ["كانت الأصول البديلة المميزة وأدوات العائد المرتفع محصورة تقليدياً خلف متطلبات رأسمالية ضخمة.", "تستنزف شركات الوساطة التقليدية جزءاً مؤثراً من العوائد عبر هياكل ورسوم غير واضحة.", "مع آلاف المنتجات في السوق، يصبح اختيار التوزيع المناسب مهمة معقدة بدوام كامل."][card.id - 1] : card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
