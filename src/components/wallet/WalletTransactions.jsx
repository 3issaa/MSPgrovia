import {
  ShoppingBag,
  Briefcase,
  ArrowLeftRight,
  UtensilsCrossed,
  Stethoscope,
} from "lucide-react";

const CATEGORY_ICONS = {
  Shopping: ShoppingBag,
  Salary: Briefcase,
  Transfer: ArrowLeftRight,
  Food: UtensilsCrossed,
  Groceries: UtensilsCrossed,
  Medical: Stethoscope,
  Interest: ArrowLeftRight,
};

/**
 * Transactions table for the Wallet page.
 *
 * Props:
 *  - transactions: { id, name, category, date, amount }[]
 *  - onViewAll?: () => void
 */
export default function WalletTransactions({ transactions = [], onViewAll }) {
  const formatAmount = (amount) => {
    const formatted = Math.abs(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return amount < 0 ? `-${formatted}` : `+${formatted}`;
  };

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">
          Recent Transactions
        </h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-medium text-teal-600 hover:text-teal-700"
        >
          View All
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left">
          <thead>
            <tr className="text-xs font-medium text-slate-400">
              <th className="pb-3 font-medium">Transaction</th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((transaction) => {
              const Icon = CATEGORY_ICONS[transaction.category] ?? ShoppingBag;
              const isPositive = transaction.amount > 0;

              return (
                <tr key={transaction.id}>
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-slate-900">
                        {transaction.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 text-sm text-slate-500">
                    {transaction.category}
                  </td>
                  <td className="py-3.5 text-sm text-slate-500">
                    {transaction.date}
                  </td>
                  <td
                    className={`py-3.5 text-right text-sm font-semibold ${
                      isPositive ? "text-teal-600" : "text-slate-900"
                    }`}
                  >
                    {formatAmount(transaction.amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
