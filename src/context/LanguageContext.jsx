/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

// These labels cover the authenticated pages, forms, cards and mock-data labels.
// Keeping them here also lets legacy components participate in localization while
// they are gradually moved to explicit translation keys.
const arabic = {
  "Dashboard": "لوحة التحكم", "Home": "الرئيسية", "Discover": "استكشاف", "Wallet": "المحفظة", "Portfolio": "الاستثمارات", "Assessment": "التقييم",
  "Markets": "الأسواق", "Market": "السوق", "Opportunities": "الفرص", "My Profile": "ملفي الشخصي", "Settings": "الإعدادات", "Log Out": "تسجيل الخروج",
  "Net Portfolio Value": "إجمالي قيمة المحفظة", "Your capital is performing optimally.": "رأس مالك يحقق أداءً مثالياً.", "6-Month Growth Trend": "اتجاه النمو لستة أشهر",
  "Financial Health": "الصحة المالية", "Excellent": "ممتاز", "Monthly Investment": "الاستثمار الشهري", "Return Rate": "معدل العائد", "Emergency Fund": "صندوق الطوارئ", "Goals Progress": "تقدم الأهداف", "Annualized Rate": "المعدل السنوي", "Goals on Track": "الأهداف تسير كما ينبغي", "of goal": "من الهدف", "last month": "الشهر الماضي",
  "Asset Allocation": "توزيع الأصول", "Investment Funds": "صناديق الاستثمار", "Real Estate": "العقارات", "Bonds": "السندات", "Cash Reserves": "الاحتياطي النقدي", "Crypto": "العملات الرقمية", "Equity": "الأسهم", "Secondary Assets": "الأصول الثانوية", "Government Debt": "الدين الحكومي", "High Yield": "عائد مرتفع", "Alt. Reserves": "احتياطي بديل",
  "Recent Transactions": "أحدث المعاملات", "View All": "عرض الكل", "Bi-Weekly Salary Deposit": "إيداع راتب نصف شهري", "Supermarket Purchase": "شراء من السوبرماركت", "Vanguard Dividend Yield": "توزيعات أرباح فانجارد", "SaaS Platform Subscription": "اشتراك منصة برمجية", "Linked Bank Transfer": "تحويل بنكي مرتبط",
  "Financial Journey": "الرحلة المالية", "Debt Free": "خالية من الديون", "Investing Regularly": "استثمار منتظم", "Retirement Goal": "هدف التقاعد", "Financial Freedom": "الحرية المالية", "Done": "مكتمل", "Completed": "اكتمل", "Active": "نشط", "On Track": "يسير كما ينبغي", "Pending": "قيد الانتظار",
  "Your Goals": "أهدافك", "Vacation Fund": "صندوق الإجازة", "New Car": "سيارة جديدة", "Home Down Payment": "دفعة أولى للمنزل", "Education Fund": "صندوق التعليم", "Allocation Strategy": "استراتيجية التوزيع", "Current": "الحالي", "Target": "المستهدف", "Performance": "الأداء", "Portfolio Performance": "أداء المحفظة",
  "Your Investment Wallet": "محفظتك الاستثمارية", "Total Balance": "إجمالي الرصيد", "Available to Spend": "المتاح للإنفاق", "vs. last month": "مقارنة بالشهر الماضي", "Quick Actions": "إجراءات سريعة", "Add Money": "إضافة أموال", "Withdraw": "سحب", "Transfer": "تحويل", "Manage Banks": "إدارة البنوك", "Expense Overview": "نظرة عامة على المصروفات", "Linked Accounts": "الحسابات المرتبطة", "Wallet Shortcuts": "اختصارات المحفظة", "Quick Add": "إضافة سريعة", "Instantly top up balance": "أضف إلى الرصيد فوراً", "Instant Withdraw": "سحب فوري", "Move funds to bank": "انقل الأموال إلى البنك", "Auto-Invest": "استثمار تلقائي", "Set up recurring rules": "إعداد قواعد متكررة", "Investments": "الاستثمارات", "Food": "الطعام", "Medical": "طبي", "Shopping": "التسوق", "Groceries": "البقالة", "Salary": "راتب", "Interest": "فائدة", "Today": "اليوم", "Yesterday": "أمس",
  "Discover Opportunities": "استكشف الفرص", "Personalized opportunities based on your risk profile.": "فرص مخصصة بناءً على ملف المخاطر الخاص بك.", "Investment Markets": "أسواق الاستثمار", "Secondary Opportunities": "الفرص الثانوية", "Explore Markets": "استكشف الأسواق", "Explore Opportunities": "استكشف الفرص", "Active Pool": "صندوق نشط", "funded": "مموّل", "Moderate / Balanced": "متوسط / متوازن",
  "Market Overview": "نظرة عامة على السوق", "Market closed.": "السوق مغلق.", "Open": "الافتتاح", "High": "الأعلى", "Low": "الأدنى", "Previous Close": "الإغلاق السابق", "52-Week High": "أعلى سعر خلال 52 أسبوعاً", "52-Week Low": "أدنى سعر خلال 52 أسبوعاً", "Area": "منطقة", "Compare": "مقارنة", "Indicators": "المؤشرات",
  "Recommended for You": "موصى بها لك", "Trending Now": "الأكثر رواجاً", "All": "الكل", "Stocks": "الأسهم", "ETFs": "صناديق المؤشرات", "Funds": "الصناديق", "High Risk": "مخاطر مرتفعة", "Moderate Risk": "مخاطر متوسطة", "Low Risk": "مخاطر منخفضة", "Technology": "التكنولوجيا", "Featured": "مميز", "Invest Now": "استثمر الآن", "Risk Level": "مستوى المخاطر", "YTD": "منذ بداية السنة",
  "Holdings": "المقتنيات", "Total Gain/Loss": "إجمالي الربح/الخسارة", "Since Inception": "منذ البداية", "Allocation": "التوزيع", "US Equities": "الأسهم الأمريكية", "International Equities": "الأسهم الدولية", "Fixed Income": "الدخل الثابت", "Cash & Equivalents": "النقد وما يعادله", "Investment Holdings": "مقتنيات الاستثمار",
  "Create Free Account": "أنشئ حساباً مجانياً", "Join thousands of experts and beginner investors scaling their portfolios.": "انضم إلى آلاف الخبراء والمستثمرين المبتدئين الذين ينمّون محافظهم.", "Full Name": "الاسم بالكامل", "Email Address": "البريد الإلكتروني", "Password": "كلمة المرور", "Confirm Password": "تأكيد كلمة المرور", "Enter your name": "أدخل اسمك", "Enter your email": "أدخل بريدك الإلكتروني", "Enter your password": "أدخل كلمة المرور", "I agree to the Terms of Service and Privacy Policy": "أوافق على شروط الخدمة وسياسة الخصوصية", "or": "أو", "Sign in with Google": "سجّل الدخول عبر Google", "Sign in with Apple": "سجّل الدخول عبر Apple", "Get Started": "ابدأ الآن", "Creating account...": "جارٍ إنشاء الحساب...", "Already have an account?": "لديك حساب بالفعل؟", "Sign In": "تسجيل الدخول",
  "Welcome Back": "مرحباً بعودتك", "Sign In to GROVIA": "سجّل الدخول إلى GROVIA", "Sign in to continue to your account.": "سجّل الدخول للمتابعة إلى حسابك.", "Enter your credential details to resume your personal roadmap.": "أدخل بيانات الدخول لاستئناف خطتك المالية الشخصية.", "Forgot password?": "هل نسيت كلمة المرور؟", "Forgot Password?": "هل نسيت كلمة المرور؟", "Remember me": "تذكرني", "Don't have an account?": "ليس لديك حساب؟", "Create Account": "إنشاء حساب", "Signing in...": "جارٍ تسجيل الدخول...", "Email address is required": "البريد الإلكتروني مطلوب", "Enter a valid email address": "أدخل بريداً إلكترونياً صحيحاً", "Password is required": "كلمة المرور مطلوبة", "Password must be at least 6 characters": "يجب ألا تقل كلمة المرور عن 6 أحرف", "Hide password": "إخفاء كلمة المرور", "Show password": "إظهار كلمة المرور",
  "Profile": "الملف الشخصي", "Personal Information": "المعلومات الشخصية", "Save Changes": "حفظ التغييرات", "Cancel": "إلغاء", "Notifications": "الإشعارات", "Security": "الأمان", "Risk Profile": "ملف المخاطر", "Balanced": "متوازن", "Privacy Policy": "سياسة الخصوصية", "Terms of Use": "شروط الاستخدام", "Disclaimer": "إخلاء المسؤولية", "Platform": "المنصة", "Pricing": "الأسعار", "Legal": "قانوني", "FAQ": "الأسئلة الشائعة",
  "Manage your personal information and account details": "أدر معلوماتك الشخصية وتفاصيل حسابك", "Profile page coming soon — send over the design and it'll be built here.": "صفحة الملف الشخصي ستتوفر قريباً.", "Manage your account preferences and security": "أدر تفضيلات حسابك وأمانه", "Settings page coming soon — send over the design and it'll be built here.": "صفحة الإعدادات ستتوفر قريباً.",
  "Investment assessment": "تقييم الاستثمار", "Build your investment profile": "أنشئ ملفك الاستثماري", "Your answers shape the feasibility check and investment-profile recommendation.": "إجاباتك تحدد فحص قابلية تحقيق الهدف وتوصية الملف الاستثماري.", "1. Investor type and goal": "1. نوع المستثمر والهدف", "2. Financial situation": "2. الوضع المالي", "3. Liquidity need": "3. احتياج السيولة", "4. Risk need and risk tolerance": "4. حاجة المخاطرة وتحمّلها", "5. Behavioral response": "5. الاستجابة السلوكية", "Do you currently have an investment portfolio?": "هل لديك محفظة استثمارية حالياً؟", "Yes, I already have investments": "نعم، لدي استثمارات بالفعل", "No, I am investing for the first time": "لا، أستثمر للمرة الأولى", "Select your investment goal": "اختر هدفك الاستثماري", "Wealth growth": "تنمية الثروة", "Buy a house": "شراء منزل", "Education": "التعليم", "Retirement": "التقاعد", "Start a business": "بدء مشروع", "Other": "أخرى", "Target amount": "المبلغ المستهدف", "Years until you need the money": "السنوات حتى تحتاج إلى المال", "Money already allocated to this goal": "المبلغ المخصص لهذا الهدف بالفعل", "Contribution frequency": "وتيرة المساهمة", "Select frequency": "اختر الوتيرة", "Monthly": "شهرياً", "Quarterly": "ربع سنوي", "Yearly": "سنوياً", "Contribution amount each time": "قيمة المساهمة في كل مرة", "Total value of assets": "إجمالي قيمة الأصول", "Assets available for investment": "الأصول المتاحة للاستثمار", "Total debts and liabilities": "إجمالي الديون والالتزامات", "Monthly primary income": "الدخل الشهري الأساسي", "Accessible savings": "المدخرات المتاحة", "Monthly essential expenses": "المصروفات الأساسية الشهرية", "Monthly debt payments": "دفعات الدين الشهرية", "Yes": "نعم", "No": "لا", "Risk Need": "حاجة المخاطرة", "Risk Tolerance": "تحمّل المخاطر", "Check my investment profile": "افحص ملفي الاستثماري", "Assessment complete": "اكتمل التقييم", "Initial profile": "الملف المبدئي", "Behavioral readiness": "الاستعداد السلوكي"
};

const english = Object.fromEntries(Object.entries(arabic).map(([key, value]) => [value, key]));

function localizeDocument(isArabic) {
  const translations = isArabic ? arabic : english;
  const translate = (value) => {
    const leading = value.match(/^\s*/)?.[0] ?? "";
    const trailing = value.match(/\s*$/)?.[0] ?? "";
    const core = value.trim();
    return translations[core] ? `${leading}${translations[core]}${trailing}` : value;
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (!node.parentElement?.closest("script, style, [data-language-toggle]")) node.nodeValue = translate(node.nodeValue);
  });
  document.querySelectorAll("input[placeholder], textarea[placeholder], [aria-label], [title]").forEach((element) => {
    ["placeholder", "aria-label", "title"].forEach((attribute) => {
      if (element.hasAttribute(attribute)) element.setAttribute(attribute, translate(element.getAttribute(attribute)));
    });
  });
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("grovia-language") || "en");
  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    localStorage.setItem("grovia-language", language);
    localizeDocument(isArabic);
    const observer = new MutationObserver(() => localizeDocument(isArabic));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language, isArabic]);

  const toggleLanguage = () => setLanguage((current) => (current === "en" ? "ar" : "en"));

  return <LanguageContext.Provider value={{ isArabic, toggleLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
