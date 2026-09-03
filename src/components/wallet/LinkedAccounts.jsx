import { Plus, MoreVertical } from "lucide-react";

const BANK_STYLES = {
  CHASE: "bg-slate-800 text-white",
  WF: "bg-rose-100 text-rose-600",
};

/**
 * List of linked bank accounts with an "Add New Account" call to action.
 *
 * Props:
 *  - accounts: { id, bankCode, name, last4 }[]
 *  - onAddAccount?: () => void
 */
export default function LinkedAccounts({ accounts = [], onAddAccount }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-base font-semibold text-slate-900">
        Linked Accounts
      </h3>

      <div className="mt-4 space-y-3">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-9 w-14 items-center justify-center rounded-md text-[10px] font-bold ${
                  BANK_STYLES[account.bankCode] ?? "bg-slate-200 text-slate-700"
                }`}
              >
                {account.bankCode}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {account.name}
                </p>
                <p className="text-xs text-slate-400">•••• {account.last4}</p>
              </div>
            </div>
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600"
              aria-label={`Options for ${account.name}`}
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAddAccount}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
      >
        <Plus className="h-4 w-4" />
        Add New Account
      </button>
    </div>
  );
}

