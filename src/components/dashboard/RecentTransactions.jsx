import Card from "../ui/Card";
import { transactions } from "../../data/dashboardData";

function RecentTransactions() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-bold text-[#12384a]">
          Recent Transactions
        </h3>

        <button className="text-[7px] text-[#0fa4ab]">View all</button>
      </div>

      <div className="mt-2 divide-y divide-slate-100">
        {transactions.map((tx, index) => (
          <div key={index} className="flex items-center gap-2 py-2">
            {/* Icon */}
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eef8f8] text-[8px] text-[#0da3aa]">
              {tx.type === "income" ? "↗" : "↘"}
            </div>

            {/* Information */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[8px] font-semibold text-[#34505d]">
                {tx.title}
              </p>

              <p className="text-[6px] text-slate-400">{tx.date}</p>
            </div>

            {/* Amount */}
            <span
              className={`text-[7px] font-bold ${
                tx.type === "income" ? "text-[#0ca4aa]" : "text-slate-500"
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
