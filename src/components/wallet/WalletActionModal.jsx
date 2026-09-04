import { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowLeftRight, Landmark, Plus, X } from "lucide-react";

const actionContent = {
  "add-money": {
    title: "Add money",
    description: "Top up your wallet from a linked account.",
    icon: Plus,
    button: "Add money",
    amountLabel: "Amount",
    placeholder: "0.00",
  },
  withdraw: {
    title: "Withdraw",
    description: "Move available funds to your linked bank account.",
    icon: ArrowDownToLine,
    button: "Withdraw funds",
    amountLabel: "Amount",
    placeholder: "0.00",
  },
  transfer: {
    title: "Transfer funds",
    description: "Send money to another account securely.",
    icon: ArrowLeftRight,
    button: "Continue transfer",
    amountLabel: "Amount",
    placeholder: "0.00",
  },
  "manage-banks": {
    title: "Manage banks",
    description: "Review and manage your linked accounts.",
    icon: Landmark,
    button: "Add bank account",
  },
};

export default function WalletActionModal({ actionId, accounts = [], onClose, onComplete }) {
  const [amount, setAmount] = useState("");
  const content = actionContent[actionId];
  const Icon = content?.icon;

  useEffect(() => {
    if (!actionId) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [actionId, onClose]);

  if (!content) return null;

  const isManageBanks = actionId === "manage-banks";
  const submit = (event) => {
    event.preventDefault();
    onComplete?.(content.title);
    onClose();
  };

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 backdrop-blur-sm" onClick={onClose}>
    <div role="dialog" aria-modal="true" aria-labelledby="wallet-action-title" onClick={(event) => event.stopPropagation()} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-600"><Icon className="h-5 w-5" /></span><div><h2 id="wallet-action-title" className="text-lg font-bold text-slate-900">{content.title}</h2><p className="mt-1 text-sm text-slate-500">{content.description}</p></div></div>
        <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Close"><X className="h-5 w-5" /></button>
      </div>

      {isManageBanks ? <div className="mt-6 space-y-3">{accounts.map((account) => <div key={account.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"><div><p className="text-sm font-semibold text-slate-800">{account.name}</p><p className="mt-0.5 text-xs text-slate-500">•••• {account.last4}</p></div><span className="text-xs font-semibold text-emerald-600">Linked</span></div>)}<button type="button" onClick={() => onComplete?.("Add bank account")} className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-teal-300 px-4 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"><Plus className="h-4 w-4" /> Add bank account</button></div> : <form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm font-semibold text-slate-700">{content.amountLabel}<div className="mt-2 flex items-center rounded-xl border border-slate-200 px-4 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100"><span className="text-slate-400">$</span><input required min="1" step="0.01" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder={content.placeholder} className="w-full border-0 bg-transparent px-2 py-3 text-sm text-slate-900 outline-none" /></div></label><label className="block text-sm font-semibold text-slate-700">{actionId === "transfer" ? "Recipient account" : "Linked account"}<select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal text-slate-700 outline-none focus:border-teal-500" defaultValue=""><option value="" disabled>Select an account</option>{accounts.map((account) => <option key={account.id} value={account.id}>{account.name} •••• {account.last4}</option>)}</select></label><button type="submit" className="w-full rounded-xl bg-teal-500 py-3 text-sm font-semibold text-white transition hover:bg-teal-600">{content.button}</button></form>}
    </div>
  </div>;
}
