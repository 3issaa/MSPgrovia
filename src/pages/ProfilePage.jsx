import { useEffect, useState } from "react";
import { BadgeCheck, BriefcaseBusiness, Check, Edit3, Mail, MapPin, Phone, ShieldCheck, UserRound, X } from "lucide-react";
import profileImage from "../assets/profile.png";
import Card from "../components/ui/Card";
import { getCurrentUser, login } from "../utils/auth";
import { apiRequest } from "../utils/api";

const storageKey = "grovia_profile";
const defaults = { fullName: "Sara Mahmoud", email: "sara.mahmoud@grovia.com", phone: "+20 10 1234 5678", location: "Cairo, Egypt", occupation: "Product Manager", investorSince: "January 2024" };

function profileData() {
  const saved = localStorage.getItem(storageKey);
  const user = getCurrentUser();
  return { ...defaults, ...(saved ? JSON.parse(saved) : {}), ...(user?.name || user?.fullName ? { fullName: user.name || user.fullName } : {}), ...(user?.email ? { email: user.email } : {}) };
}

function Field({ icon: Icon, label, name, value, edit, onChange, placeholder, type = "text" }) {
  return <div className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4"><Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#13a5ac]" /><div className="min-w-0 flex-1"><p className="text-xs font-semibold text-slate-400">{label}</p>{edit ? <input name={name} type={type} value={value ?? ""} placeholder={placeholder} onChange={onChange} className="mt-1 w-full border-b border-[#13a5ac] bg-transparent pb-1 text-sm font-semibold text-[#12384a] outline-none placeholder:font-normal placeholder:text-slate-400" /> : <p className="mt-1 truncate text-sm font-semibold text-[#12384a]">{value || "Not added yet"}</p>}</div></div>;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(profileData);
  const [draft, setDraft] = useState(profile);
  const [edit, setEdit] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    apiRequest("/profile/me").then(({ user }) => {
      const next = { ...defaults, ...user, investorSince: new Date(user.investorSince).toLocaleDateString("en-US", { month: "long", year: "numeric" }) };
      setProfile(next); setDraft(next);
    }).catch(() => {});
  }, []);
  const change = ({ target }) => { setDraft((old) => ({ ...old, [target.name]: target.value })); setSaved(false); };
  const save = async () => {
    try {
      setError("");
      const { user } = await apiRequest("/profile/me", { method: "PATCH", body: JSON.stringify(draft) });
      const next = { ...draft, ...user };
      localStorage.setItem(storageKey, JSON.stringify(next));
      const currentUser = getCurrentUser(); const token = localStorage.getItem("grovia_token") || sessionStorage.getItem("grovia_token");
      if (currentUser && token) login(token, { ...currentUser, name: next.fullName, email: next.email }, Boolean(localStorage.getItem("grovia_token")));
      setProfile(next); setDraft(next); setEdit(false); setSaved(true);
    } catch (requestError) { setError(requestError.message); }
  };
  const field = (label, name, Icon, placeholder, type) => <Field key={name} label={label} name={name} icon={Icon} value={edit ? draft[name] : profile[name]} edit={edit} onChange={change} placeholder={placeholder} type={type} />;
  return <main className="min-h-screen bg-[#f5f6fa] px-4 py-8 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-[#13a5ac]">Account center</p><h1 className="mt-1 text-3xl font-extrabold text-[#12384a]">My Profile</h1><p className="mt-1 text-sm text-slate-500">Manage your personal details and investment preferences.</p></div>{edit ? <div className="flex gap-2"><button onClick={() => { setDraft(profile); setEdit(false); }} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600"><X className="h-4 w-4" /> Cancel</button><button onClick={save} className="flex items-center gap-2 rounded-xl bg-[#0d9fa7] px-4 py-2.5 text-sm font-bold text-white"><Check className="h-4 w-4" /> Save changes</button></div> : <button onClick={() => setEdit(true)} className="flex items-center gap-2 rounded-xl border border-[#13a5ac] bg-white px-4 py-2.5 text-sm font-bold text-[#0b7278]"><Edit3 className="h-4 w-4" /> Edit profile</button>}</div>
    {saved && <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"><Check className="h-4 w-4" /> Profile updated successfully.</div>}
    {error && <div className="mt-5 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</div>}
    <Card className="mt-8 overflow-hidden"><div className="h-28 bg-gradient-to-r from-[#06283d] via-[#0b5264] to-[#13a5ac]" /><div className="relative flex flex-col gap-5 px-6 pb-6 sm:flex-row sm:items-end sm:px-8"><img src={profileImage} alt={profile.fullName} className="-mt-12 h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-lg" /><div><div className="flex items-center gap-2"><h2 className="text-2xl font-extrabold text-[#12384a]">{profile.fullName}</h2><BadgeCheck className="h-5 w-5 text-[#13a5ac]" /></div><p className="mt-1 text-sm text-slate-500">Balanced investor · Member since {profile.investorSince}</p></div><span className="sm:ml-auto inline-flex rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-[#08777d]">Risk profile: Balanced</span></div></Card>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_1fr]"><Card className="p-6 sm:p-7"><div className="flex items-center gap-3"><span className="rounded-xl bg-teal-50 p-2.5 text-[#0d9fa7]"><UserRound className="h-5 w-5" /></span><div><h2 className="font-extrabold text-[#12384a]">Personal information</h2><p className="text-xs text-slate-500">Your account contact details</p></div></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{field("Full name", "fullName", UserRound, "Enter your full name")}{field("Email address", "email", Mail, "Enter your email", "email")}{field("Phone number", "phone", Phone, "Add your phone number", "tel")}{field("Location", "location", MapPin, "Add your city or location")}{field("Occupation", "occupation", BriefcaseBusiness, "Add your occupation")}{field("Investor since", "investorSince", ShieldCheck, "Member since")}</div></Card>
    <div className="space-y-6"><Card className="p-6"><h2 className="font-extrabold text-[#12384a]">Investment profile</h2><p className="mt-1 text-xs text-slate-500">Last reviewed today</p><div className="mt-5 space-y-4"><div className="flex justify-between text-sm"><span className="text-slate-500">Risk tolerance</span><strong className="text-[#12384a]">Balanced</strong></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-1/2 rounded-full bg-[#13a5ac]" /></div><div className="flex justify-between text-sm"><span className="text-slate-500">Investment horizon</span><strong className="text-[#12384a]">5–10 years</strong></div><div className="flex justify-between text-sm"><span className="text-slate-500">Primary goal</span><strong className="text-[#12384a]">Long-term growth</strong></div></div></Card><Card className="border border-teal-100 bg-[#f2fbfb] p-6"><div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0d9fa7]" /><div><h2 className="font-extrabold text-[#12384a]">Your account is secure</h2><p className="mt-1 text-sm leading-5 text-slate-600">Your identity has been verified and two-factor authentication is active.</p></div></div></Card></div></div>
  </div></main>;
}
