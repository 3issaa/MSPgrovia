import { useLanguage } from "../../../context/LanguageContext";

export default function Footer() {
  const { isArabic } = useLanguage();
  return (
    <footer className="bg-[#062D40] text-white">
      <div className="mx-auto max-w-[1100px] px-6">
        {/* CTA */}
        <div className="flex min-h-[278px] items-center justify-between gap-10 border-b border-white/[0.06]">
          <div className="max-w-[560px]">
            <h2 className="text-[36px] font-bold leading-[1.18] tracking-[-0.8px] text-white">
              {isArabic ? "جاهز لاكتشاف" : "Ready to discover your"}
              <br />
              {isArabic ? "مسارك الاستثماري؟" : "investment path?"}
            </h2>

            <p className="mt-3 max-w-[500px] text-[19px] leading-[1.2] text-[#8CA0AA]">
              {isArabic ? "حدّد ملفك في خمس دقائق واحصل على فرص" : "Map your profile in five minutes and get customized"}
              <br />
              {isArabic ? "مخصصة فوراً." : "opportunities instantly."}
            </p>
          </div>

          <button
            className="
              shrink-0
              rounded-[6px]
              bg-[#08AFC0]
              px-[25px]
              py-[13px]
              text-[13px]
              font-semibold
              text-white
              transition
              hover:bg-[#079EAD]
            "
          >
            {isArabic ? "ابدأ الآن" : "Get Started Now"}
          </button>
        </div>

        {/* Bottom footer */}
        <div className="flex min-h-[198px] items-center justify-between gap-10">
          {/* Brand */}
          <div className="max-w-[250px]">
            <div
              className="
                font-serif
                text-[32px]
                leading-none
                tracking-[-1.5px]
                text-white
              "
            >
              GROVIA
            </div>

            <p className="mt-5 text-[13px] leading-[1.15] text-[#8298A3]">
              {isArabic ? "توزيع آلي للمحفظة" : "Automated portfolio allocation"}
              <br />
              {isArabic ? "مدعوم بنماذج" : "powered by advanced machine"}
              <br />
              {isArabic ? "التعلم الآلي المتقدمة." : "learning models."}
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-[60px] pr-2">
            <div>
              <h3 className="mb-4 text-[13px] font-semibold text-white">
                {isArabic ? "المنصة" : "Platform"}
              </h3>

              <nav className="flex flex-col gap-[11px]">
                <a
                  href="#"
                  className="text-[13px] text-[#8298A3] transition hover:text-white"
                >
                  {isArabic ? "الأسواق" : "Markets"}
                </a>

                <a
                  href="#"
                  className="text-[13px] text-[#8298A3] transition hover:text-white"
                >
                  {isArabic ? "الأسعار" : "Pricing"}
                </a>

                <a
                  href="#"
                  className="text-[13px] text-[#8298A3] transition hover:text-white"
                >
                  FAQ
                </a>
              </nav>
            </div>

            <div>
              <h3 className="mb-4 text-[13px] font-semibold text-white">
                {isArabic ? "قانوني" : "Legal"}
              </h3>

              <nav className="flex flex-col gap-[11px]">
                <a
                  href="#"
                  className="text-[13px] text-[#8298A3] transition hover:text-white"
                >
                  {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
                </a>

                <a
                  href="#"
                  className="text-[13px] text-[#8298A3] transition hover:text-white"
                >
                  {isArabic ? "شروط الاستخدام" : "Terms of Use"}
                </a>

                <a
                  href="#"
                  className="text-[13px] text-[#8298A3] transition hover:text-white"
                >
                  {isArabic ? "إخلاء المسؤولية" : "Disclaimer"}
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
