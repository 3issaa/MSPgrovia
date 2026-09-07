import { useEffect, useState } from "react";
import { Send, X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import groviImage from "./grovi.png";
import arabicFaq from "../../data/investment_faq.json";
import englishFaq from "../../data/investment_faq_en.json";

const suggestedFaq = [
  { id: "wallet", en: "How do I add money to my Wallet?", ar: "إزاي أضيف فلوس للـ Wallet بتاعتي؟" },
  { id: "profile", en: "Can I change my registered email or phone number?", ar: "هل أقدر أغير بريدي الإلكتروني أو رقم موبايلي المسجل؟" },
  { id: "markets", en: "What is the Discover page?", ar: "إيه هي صفحة Discover؟" },
  { id: "assessment", en: "What exactly is your Assessment?", ar: "إيه هو الـ Assessment بتاعكم بالظبط؟" },
];

const normalize = (value) => value.toLocaleLowerCase().replace(/\s+/g, " ").trim();
const isArabicText = (value) => /[\u0600-\u06ff]/.test(value);

function findAnswer(question) {
  const arabicQuestion = isArabicText(question);
  const source = arabicQuestion ? arabicFaq : englishFaq;
  const normalizedQuestion = normalize(question);
  const exact = source.find((item) => normalize(item.question) === normalizedQuestion);
  if (exact) return { answer: exact.answer, arabic: arabicQuestion };

  const words = normalizedQuestion.split(/[^\p{L}\p{N}]+/u).filter((word) => word.length > 2);
  const match = source
    .map((item) => ({ item, score: words.filter((word) => normalize(item.question).includes(word)).length }))
    .sort((first, second) => second.score - first.score)[0];
  return match?.score > 0 ? { answer: match.item.answer, arabic: arabicQuestion } : null;
}

function GroviMark() {
  return <img src={groviImage} alt="Grovi" className="h-full w-full rounded-2xl object-cover" />;
}

export default function GroviChatbot() {
  const { isArabic } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!showHint) return undefined;
    const timer = window.setTimeout(() => setShowHint(false), 7000);
    return () => window.clearTimeout(timer);
  }, [showHint]);

  const sendMessage = (question) => {
    const text = question.trim();
    if (!text) return;
    const matched = findAnswer(text);
    const responseLanguageIsArabic = matched?.arabic ?? isArabic;
    setMessages((current) => [...current, { type: "user", text }, { type: "bot", text: matched?.answer || (responseLanguageIsArabic ? "لم أجد إجابة مطابقة، لكن يمكنك سؤالي عن الاستثمار أو المحفظة أو الأسواق أو التقييم." : "I couldn't find an exact answer, but you can ask me about investing, your wallet, markets, or the assessment.") }]);
    setInput("");
  };

  return <div className="fixed bottom-5 right-5 z-[60] sm:bottom-7 sm:right-7" dir={isArabic ? "rtl" : "ltr"}>
    {showHint && !isOpen && <div className={`absolute bottom-[calc(100%+12px)] ${isArabic ? "left-0" : "right-0"} w-56 rounded-2xl border border-[#d7e9f0] bg-white px-4 py-3 text-sm font-semibold text-[#173e5d] shadow-[0_12px_32px_rgba(17,54,82,0.16)]`}><button type="button" onClick={() => setShowHint(false)} className="absolute right-2 top-2 text-slate-400" aria-label={isArabic ? "إغلاق" : "Close"}><X className="h-3.5 w-3.5" /></button>{isArabic ? "مرحباً، أنا Grovi. هل تحتاج إلى مساعدة؟" : "Hi, I’m Grovi. Need a little help?"}<span className={`absolute -bottom-2 ${isArabic ? "left-8" : "right-8"} h-4 w-4 rotate-45 border-b border-r border-[#d7e9f0] bg-white`} /></div>}
+
    {isOpen && <section className="absolute bottom-[calc(100%+14px)] right-0 flex h-[min(590px,calc(100vh-120px))] w-[min(370px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-[#d9e8ef] bg-white shadow-[0_20px_55px_rgba(17,54,82,0.2)]" aria-label={isArabic ? "محادثة Grovi" : "Grovi chat"}>
      <header className="flex items-center justify-between bg-[#123b5d] px-5 py-4 text-white"><div className="flex items-center gap-3"><span className="h-10 w-10 shrink-0"><GroviMark /></span><div><p className="font-bold">Grovi</p><p className="text-xs text-[#bde9f2]">{isArabic ? "مساعدك المالي" : "Your financial assistant"}</p></div></div><button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 text-white/70 hover:bg-white/10 hover:text-white" aria-label={isArabic ? "إغلاق المحادثة" : "Close chat"}><X className="h-5 w-5" /></button></header>
      <div className="flex-1 space-y-3 overflow-y-auto bg-[#f7fbfc] p-4"><div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-6 text-[#34505d] shadow-sm">{isArabic ? "أهلاً! اسألني عن Grovia وسأساعدك." : "Hi! Ask me anything about Grovia and I’ll help."}</div>{messages.map((message, index) => <div key={`${message.type}-${index}`} className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.type === "user" ? "ml-auto rounded-br-sm bg-[#1bb7c5] text-white" : "rounded-tl-sm bg-white text-[#34505d] shadow-sm"}`}>{message.text}</div>)}</div>
      <div className="border-t border-slate-100 bg-white p-3"><div className="mb-3 flex gap-2 overflow-x-auto pb-1">{suggestedFaq.map((item) => <button key={item.id} type="button" onClick={() => sendMessage(isArabic ? item.ar : item.en)} className="shrink-0 rounded-full border border-[#cde9ed] bg-[#f2fbfc] px-3 py-2 text-xs font-semibold text-[#087b88] hover:bg-[#e1f7f8]">{isArabic ? item.ar : item.en}</button>)}</div><form onSubmit={(event) => { event.preventDefault(); sendMessage(input); }} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3"><input value={input} onChange={(event) => setInput(event.target.value)} placeholder={isArabic ? "اكتب سؤالك..." : "Type your question..."} className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm outline-none" /><button type="submit" className="rounded-lg bg-[#123b5d] p-2 text-white hover:bg-[#0b2d47]" aria-label={isArabic ? "إرسال" : "Send"}><Send className="h-4 w-4" /></button></form></div>
    </section>}

    <button type="button" onClick={() => { setIsOpen((value) => !value); setShowHint(false); }} className="group flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#2868c7] p-1 shadow-[0_10px_24px_rgba(27,91,174,0.3)] transition hover:scale-105" aria-label={isArabic ? "فتح Grovi" : "Open Grovi"}>{isOpen ? <X className="h-6 w-6 text-white" /> : <GroviMark />}</button>
  </div>;
}
