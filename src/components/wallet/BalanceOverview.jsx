import { ArrowUp, ArrowDown } from "lucide-react";

/**
 * Dark hero card showing total balance, month-over-month change,
 * available-to-spend figure and a small ascending trend chart.
 *
 * Props:
 *  - totalBalance: number
 *  - changeVsLastMonth: number (percentage, can be negative)
 *  - availableToSpend: number
 *  - trend: number[] (values between 0 and 1, rendered as bar heights)
 */
export default function BalanceOverview({
  totalBalance,
  changeVsLastMonth,
  availableToSpend,
  trend = [],
}) {
  const isPositive = changeVsLastMonth >= 0;

  const formatCurrency = (value) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl bg-[#0B2540] p-8 text-white">
      <div>
        <p className="text-xs font-medium tracking-wide text-slate-400">
          Total Balance
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h2 className="text-4xl font-bold sm:text-5xl">
            {formatCurrency(totalBalance)}
          </h2>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
              isPositive
                ? "bg-white/10 text-teal-300"
                : "bg-white/10 text-rose-300"
            }`}
          >
            {isPositive ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            {Math.abs(changeVsLastMonth)}%
          </span>
          <span className="text-sm text-slate-400">vs last month</span>
        </div>
      </div>

      <div className="mt-8 flex items-end justify-between gap-6 border-t border-white/10 pt-6">
        <div>
          <p className="text-xs font-medium tracking-wide text-slate-400">
            Available to Spend
          </p>
          <p className="mt-2 text-2xl font-semibold">
            {formatCurrency(availableToSpend)}
          </p>
        </div>

        {trend.length > 0 && (
          <div className="flex h-14 items-end gap-1.5">
            {trend.map((height, index) => {
              const isLast = index === trend.length - 1;
              return (
                <div
                  key={index}
                  className={`w-2.5 rounded-sm ${
                    isLast ? "bg-teal-400" : "bg-white/20"
                  }`}
                  style={{ height: `${Math.max(height, 0.08) * 100}%` }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
