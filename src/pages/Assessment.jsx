import { useMemo, useState } from "react";

const goalOptions = ["Wealth growth", "Buy a house", "Education", "Retirement", "Start a business", "Other"];
const toleranceQuestions = [
  ["In general, how would your best friend describe you as a risk taker?", ["A real gambler", "Willing to take risks after completing adequate research", "Cautious", "A real risk avoider"]],
  ["You are on a TV game show and can choose one of the following. Which would you take?", ["$1,000 in cash", "A 50% chance at winning $5,000", "A 25% chance at winning $10,000", "A 5% chance at winning $100,000"]],
  ["You have just finished saving for a “once-in-a-lifetime” vacation. Three weeks before you plan to leave, you lose your job. You would:", ["Cancel the vacation", "Take a much more modest vacation", "Go as scheduled, reasoning that you need the time to prepare for a job search", "Extend your vacation because this might be your last chance to go first-class"]],
  ["If you unexpectedly received $20,000 to invest, what would you do?", ["Deposit it in a bank account, money market account, or an insured CD", "Invest it in safe high-quality bonds or bond mutual funds", "Invest it in stocks or stock mutual funds"]],
  ["In terms of experience, how comfortable are you investing in stocks or stock mutual funds?", ["Not at all comfortable", "Somewhat comfortable", "Very comfortable"]],
  ["When you think of the word “risk” which of the following words comes to mind first?", ["Loss", "Uncertainty", "Opportunity", "Thrill"]],
  ["Some experts are predicting prices of assets such as gold, jewels, collectibles, and real estate (hard assets) to increase in value; bond prices may fall, however, experts tend to agree that government bonds are relatively safe. Most of your investment assets are now in high interest government bonds. What would you do?", ["Hold the bonds", "Sell the bonds, put half the proceeds into money market accounts, and the other half into hard assets", "Sell the bonds and put the total proceeds into hard assets", "Sell the bonds, put all the money into hard assets, and borrow additional money to buy more"]],
  ["Given the best and worst case returns of the four investment choices below, which would you prefer?", ["$200 gain best case; $0 gain/loss worst case", "$800 gain best case; $200 loss worst case", "$2,600 gain best case; $800 loss worst case", "$4,800 gain best case; $2,400 loss worst case"]],
  ["In addition to whatever you own, you have been given $1,000. You are now asked to choose between:", ["A sure gain of $500", "A 50% chance to gain $1,000 and a 50% chance to gain nothing"]],
  ["In addition to whatever you own, you have been given $2,000. You are now asked to choose between:", ["A sure loss of $500", "A 50% chance to lose $1,000 and a 50% chance to lose nothing"]],
  ["Suppose a relative left you an inheritance of $100,000, stipulating in the will that you invest ALL the money in ONE of the following choices. Which one would you select?", ["A savings account or money market mutual fund", "A mutual fund that owns stocks and bonds", "A portfolio of 15 common stocks", "Commodities like gold, silver, and oil"]],
  ["If you had to invest $20,000, which of the following investment choices would you find most appealing?", ["60% in low-risk investments 30% in medium-risk investments 10% in high-risk investments", "30% in low-risk investments 40% in medium-risk investments 30% in high-risk investments", "10% in low-risk investments 40% in medium-risk investments 50% in high risk investments"]],
  ["Your trusted friend and neighbor, an experienced geologist, is putting together a group of investors to fund an exploratory gold mining venture. The venture could pay back 50 to 100 times the investment if successful. If the mine is a bust, the entire investment is worthless. Your friend estimates the chance of success is only 20%. If you had the money, how much would you invest?", ["Nothing", "One month's salary", "Three month's salary", "Six month's salary"]],
];

const behavioralQuestions = [
  ["preference", "When choosing between investments with different levels of potential return and changes in value, which would you generally prefer?", ["Maximize safety, even if potential return is lower", "Mostly prioritize safety", "Balance safety and potential return", "Mostly prioritize potential return", "Maximize potential return, accepting greater changes in value"]],
  ["fluctuation", "If an investment has the possibility of a higher return but also greater fluctuations in its value, which would you generally prefer?", ["I would avoid it and prefer the more stable option", "I would mostly prefer the more stable option", "I would consider a balance between stability and potential return", "I would mostly prefer the higher-return option", "I would prefer the higher-return option despite the greater fluctuations"]],
  ["perception", "How risky do you believe investing in the stock market is?", ["Very risky", "Somewhat risky", "Neutral", "Somewhat safe", "Very safe"]],
  ["knowledgeValue", "If you invest in an asset whose value can change over time, which statement is generally correct?", ["Its value cannot decrease if you hold it long enough", "Its value can increase or decrease", "It will always provide a fixed return", "It cannot lose value if you diversify"]],
  ["knowledgeReturn", "In general, an investment offering a higher potential return is associated with:", ["No additional uncertainty", "Greater potential risk", "Guaranteed profit", "Guaranteed protection from losses"]],
  ["knowledgeDiversification", "What is the main purpose of diversification?", ["To guarantee a positive return", "To eliminate all investment risk", "To spread exposure across different investments", "To guarantee the highest possible return"]],
  ["experienceYears", "How long have you personally been involved in making investment decisions?", ["No experience", "Less than 1 year", "1-3 years", "3-5 years", "More than 5 years"]],
];

const initialForm = {
  investorType: "", goal: "", targetAmount: "", timeHorizon: "", currentInvested: "", contributionFrequency: "", contributionAmount: "",
  totalAssets: "", investableAssets: "", liabilities: "", monthlyIncome: "", hasOutsideIncome: "", outsideIncome: 0, savings: "", expenses: "", monthlyDebt: "",
  portfolioValue: "", annualWithdrawal: "", needsMoneyBeforeGoal: "", moneyAccessTime: "", moneyNeededAmount: 0, failureConsequence: "", lossExperience: "", lossAction: "", experienceTypes: [],
};

const number = (value) => Number(value) || 0;
const contributionMultiplier = { monthly: 12, quarterly: 4, yearly: 1 };

function requiredReturn({ target, years, initial, annualContribution, withdrawal }) {
  if (!target || !years) return null;
  const futureValue = (rate) => initial * (1 + rate) ** years + annualContribution * (((1 + rate) ** years - 1) / rate) - withdrawal;
  if (futureValue(0.000001) >= target) return 0;
  if (futureValue(0.12) < target) return null;
  let low = 0.000001; let high = 0.12;
  for (let index = 0; index < 40; index += 1) { const mid = (low + high) / 2; if (futureValue(mid) < target) low = mid; else high = mid; }
  return high;
}

function RadioQuestion({ name, label, options, value, onChange, required = true }) {
  return <fieldset className="rounded-2xl border border-slate-200 bg-white p-5"><legend className="px-1 text-sm font-semibold text-slate-800">{label}</legend><div className="mt-3 grid gap-2">{options.map((option, index) => <label key={option} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 text-sm text-slate-600 hover:bg-slate-50"><input required={required && index === 0} type="radio" name={name} value={index + 1} checked={value === String(index + 1)} onChange={(event) => onChange(name, event.target.value)} />{option}</label>)}</div></fieldset>;
}

function Field({ label, name, value, onChange, required = true, min = 0 }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}<input required={required} min={min} type="number" name={name} value={value} onChange={onChange} className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-3 font-normal outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100" /></label>;
}

export default function Assessment() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(1);

  const update = (name, value) => {
    setResult(null);
    setForm((previous) => {
      const next = { ...previous, [name]: value };
      if (name === "investorType" && value === "first-time") { next.currentInvested = 0; next.lossExperience = ""; next.lossAction = ""; }
      if (name === "hasOutsideIncome" && value === "no") next.outsideIncome = 0;
      if (name === "needsMoneyBeforeGoal" && value === "no") { next.moneyAccessTime = ""; next.moneyNeededAmount = 0; }
      return next;
    });
  };
  const handleInput = (event) => update(event.target.name, event.target.value);
  const calculation = useMemo(() => {
    const years = number(form.timeHorizon);
    const annualContribution = number(form.contributionAmount) * (contributionMultiplier[form.contributionFrequency] || 0);
    const withdrawal = form.investorType === "first-time" ? number(form.moneyNeededAmount) : number(form.annualWithdrawal) * years;
    return requiredReturn({ target: number(form.targetAmount), years, initial: form.investorType === "first-time" ? 0 : number(form.currentInvested), annualContribution, withdrawal });
  }, [form]);
  const submit = (event) => {
    event.preventDefault();
    if (calculation === null) { setResult({ supported: false }); return; }
    const preference = (number(form.preference) + number(form.fluctuation)) / 2;
    const profile = preference <= 2 ? "Conservative" : preference <= 3.5 ? "Balanced" : "Growth";
    const knowledge = [form.knowledgeValue === "2", form.knowledgeReturn === "2", form.knowledgeDiversification === "3"].filter(Boolean).length;
    const readiness = knowledge === 3 && (form.hasOutsideIncome === "yes" || number(form.savings) >= number(form.expenses) * 3) ? "High" : knowledge >= 2 ? "Moderate" : "Needs guidance";
    setResult({ supported: true, profile, readiness });
  };
  const nextStep = (event) => {
    event.preventDefault();
    if (event.currentTarget.form?.checkValidity()) setStep((current) => Math.min(current + 1, 4));
    else event.currentTarget.form?.reportValidity();
  };
  const hasFutureSpending = form.investorType === "first-time" ? form.needsMoneyBeforeGoal === "yes" : number(form.annualWithdrawal) > 0;

  return <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8"><form onSubmit={submit} className="mx-auto max-w-5xl space-y-8">
    <header><p className="text-sm font-bold uppercase tracking-widest text-cyan-600">Investment assessment</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Build your investment profile</h1><p className="mt-2 text-slate-500">Your answers shape the feasibility check and investment-profile recommendation.</p><div className="mt-6 flex items-center gap-2">{[1, 2, 3, 4].map((item) => <div key={item} className={`h-2 flex-1 rounded-full ${item <= step ? "bg-cyan-500" : "bg-slate-200"}`} />)}</div><p className="mt-2 text-sm font-semibold text-slate-500">Step {step} of 4</p></header>
    {step === 1 && <section className="space-y-5 rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">1. Investor type and goal</h2><RadioQuestion name="investorType" label="Do you currently have an investment portfolio?" options={["Yes, I already have investments", "No, I am investing for the first time"]} value={form.investorType === "current" ? "1" : form.investorType === "first-time" ? "2" : ""} onChange={(_, value) => update("investorType", value === "1" ? "current" : "first-time")} /><div className="grid gap-5 md:grid-cols-2"><RadioQuestion name="goal" label="Select your investment goal" options={goalOptions} value={form.goal ? String(goalOptions.indexOf(form.goal) + 1) : ""} onChange={(_, value) => update("goal", goalOptions[number(value) - 1])} /><div className="space-y-5"><Field label="Target amount" name="targetAmount" value={form.targetAmount} onChange={handleInput} /><Field label="Years until you need the money" name="timeHorizon" value={form.timeHorizon} onChange={handleInput} min={1} />{form.investorType === "current" && <Field label="Money already allocated to this goal" name="currentInvested" value={form.currentInvested} onChange={handleInput} />}</div></div><div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-semibold text-slate-700">Contribution frequency<select required name="contributionFrequency" value={form.contributionFrequency} onChange={handleInput} className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-3 font-normal"><option value="">Select frequency</option><option value="monthly">Monthly</option><option value="quarterly">Quarterly</option><option value="yearly">Yearly</option></select></label><Field label="Contribution amount each time" name="contributionAmount" value={form.contributionAmount} onChange={handleInput} /></div></section>}
    {step === 2 && <><section className="space-y-5 rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">2. Financial situation</h2><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{[["Total value of assets", "totalAssets"], ["Assets available for investment", "investableAssets"], ["Total debts and liabilities", "liabilities"], ["Monthly primary income", "monthlyIncome"], ["Accessible savings", "savings"], ["Monthly essential expenses", "expenses"], ["Monthly debt payments", "monthlyDebt"]].map(([label, name]) => <Field key={name} label={label} name={name} value={form[name]} onChange={handleInput} />)}</div><RadioQuestion name="outsideIncome" label="Do you receive any other reliable income independent of this investment?" options={["Yes", "No"]} value={form.hasOutsideIncome === "yes" ? "1" : form.hasOutsideIncome === "no" ? "2" : ""} onChange={(_, value) => update("hasOutsideIncome", value === "1" ? "yes" : "no")} />{form.hasOutsideIncome === "yes" && <Field label="Monthly amount of outside income" name="outsideIncome" value={form.outsideIncome} onChange={handleInput} />}</section><section className="space-y-5 rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Liquidity need</h2>{form.investorType === "current" ? <div className="grid gap-5 md:grid-cols-2"><Field label="Current investment portfolio value" name="portfolioValue" value={form.portfolioValue} onChange={handleInput} /><Field label="Expected annual withdrawals from your portfolio" name="annualWithdrawal" value={form.annualWithdrawal} onChange={handleInput} /></div> : <><RadioQuestion name="needsMoney" label="Will you need to withdraw invested money before your goal date?" options={["Yes", "No"]} value={form.needsMoneyBeforeGoal === "yes" ? "1" : form.needsMoneyBeforeGoal === "no" ? "2" : ""} onChange={(_, value) => update("needsMoneyBeforeGoal", value === "1" ? "yes" : "no")} />{form.needsMoneyBeforeGoal === "yes" && <div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-semibold text-slate-700">When will you first need the money?<select required name="moneyAccessTime" value={form.moneyAccessTime} onChange={handleInput} className="mt-2 h-11 w-full rounded-xl border border-slate-300 px-3 font-normal"><option value="">Select when</option><option value="1">Within 1 year</option><option value="3">1–3 years</option><option value="4">More than 3 years</option></select></label><Field label="Amount you need to access" name="moneyNeededAmount" value={form.moneyNeededAmount} onChange={handleInput} /></div>}</>}</section></>}
    {step === 3 && <section className="space-y-5 rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">3. Risk need and risk tolerance</h2><div className="border-b border-slate-200 pb-3"><h3 className="text-base font-bold text-[#062D40]">Risk Need</h3><p className="mt-1 text-sm text-slate-500">The importance of reaching your stated financial goal.</p></div><RadioQuestion name="failureConsequence" label="How would you describe the financial impact if you do not reach this goal?" options={["Acceptable", "I'm not sure", "Unacceptable"]} value={form.failureConsequence} onChange={update} /><div className="border-b border-slate-200 pb-3 pt-3"><h3 className="text-base font-bold text-[#062D40]">Risk Tolerance</h3><p className="mt-1 text-sm text-slate-500">Your comfort with investment risk and uncertainty.</p></div>{toleranceQuestions.map(([question, options], index) => <RadioQuestion key={question} name={`tolerance${index}`} label={question} options={options} value={form[`tolerance${index}`] || ""} onChange={update} />)}</section>}
    {step === 4 && <section className="space-y-5 rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">4. Behavioral response</h2>{behavioralQuestions.map(([name, question, options]) => <RadioQuestion key={name} name={name} label={question} options={options} value={form[name] || ""} onChange={update} />)}{form.investorType === "current" && <><RadioQuestion name="lossExperience" label="Have you previously experienced an investment loss?" options={["Yes", "No"]} value={form.lossExperience === "yes" ? "1" : form.lossExperience === "no" ? "2" : ""} onChange={(_, value) => update("lossExperience", value === "1" ? "yes" : "no")} />{form.lossExperience === "yes" && <RadioQuestion name="lossAction" label="When you experienced an investment loss, what action did you take?" options={["Sold the investment", "Did nothing", "Purchased more"]} value={form.lossAction} onChange={update} />}</>}<fieldset className="rounded-2xl border border-slate-200 p-5"><legend className="px-1 text-sm font-semibold">Which investments have you personally used?</legend>{["None", "Stocks", "Bonds/fixed income", "Mutual funds/ETFs", "Certificates/deposits", "Real estate", "Other products"].map((item) => <label key={item} className="mr-5 mt-3 inline-flex gap-2 text-sm"><input type="checkbox" checked={form.experienceTypes.includes(item)} onChange={() => update("experienceTypes", form.experienceTypes.includes(item) ? form.experienceTypes.filter((value) => value !== item) : [...form.experienceTypes, item])} />{item}</label>)}</fieldset></section>}
    <div className="flex gap-3"><button type="button" disabled={step === 1} onClick={() => setStep((current) => Math.max(current - 1, 1))} className="flex-1 rounded-xl border border-slate-300 bg-white py-4 font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>{step < 4 ? <button type="button" onClick={nextStep} className="flex-1 rounded-xl bg-[#062D40] py-4 font-bold text-white transition hover:bg-[#0b4d67]">Next</button> : <button type="submit" className="flex-1 rounded-xl bg-[#062D40] py-4 font-bold text-white transition hover:bg-[#0b4d67]">Check my investment profile</button>}</div>
    {result && !result.supported && <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6"><h2 className="text-xl font-bold text-amber-900">Your goal is not currently market-supported</h2><p className="mt-2 text-sm text-amber-900">We will not create a portfolio recommendation until you change the inputs. The current plan would require a return above the 12% planning limit.</p><h3 className="mt-5 font-bold text-amber-900">Possible revisions</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-900"><li>Increase savings or recurring contributions</li><li>Increase the time horizon</li><li>Reduce the target amount</li>{hasFutureSpending && <li>Reduce future spending or planned withdrawals</li>}<li>Change the goal</li></ul></section>}
    {result?.supported && <section className="rounded-3xl border border-cyan-200 bg-cyan-50 p-6"><h2 className="text-xl font-bold text-[#062D40]">Assessment complete</h2><p className="mt-2 text-slate-700">Estimated required annual return: <strong>{(calculation * 100).toFixed(1)}%</strong>. This is within the current planning limit.</p><div className="mt-4 grid gap-4 sm:grid-cols-2"><div className="rounded-xl bg-white p-4"><p className="text-xs font-bold uppercase text-slate-500">Initial profile</p><p className="mt-1 text-lg font-bold text-[#062D40]">{result.profile}</p></div><div className="rounded-xl bg-white p-4"><p className="text-xs font-bold uppercase text-slate-500">Behavioral readiness</p><p className="mt-1 text-lg font-bold text-[#062D40]">{result.readiness}</p><p className="mt-1 text-xs text-slate-500">This qualifies confidence in the future recommendation.</p></div></div><p className="mt-4 text-sm text-slate-600">Portfolio allocation should be generated by the approved recommendation engine after backend validation.</p></section>}
  </form></main>;
}
