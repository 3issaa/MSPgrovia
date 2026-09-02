import Card from "../ui/Card";
import { transactions } from "../../data/dashboardData";

function RecentTransactions() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-bold text-[#12384a]">
          Recent Transactions
        </h3>
        <button type="button" className="text-[13px] font-medium text-[#12a5ad]">
          View all
        </button>
      </div>

      <div className="mt-3 divide-y divide-slate-100">
        {transactions.map((tx) => (
          <div key={tx.title} className="flex items-center gap-3 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef8f8] text-[#12a5ad]">
              <i className={`fa-solid ${tx.icon} text-[13px]`} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-[#34505d]">
                {tx.title}
              </p>
              <p className="text-[11px] text-slate-400">{tx.date}</p>
            </div>

            <span
              className={`text-[13px] font-bold ${
                tx.type === "income" ? "text-[#12a5ad]" : "text-slate-500"
              }`}
            >
              {tx.amount}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default RecentTransactions;
