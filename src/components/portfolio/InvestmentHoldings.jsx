/**
 * Investment holdings table with a colored dot per asset, a type badge,
 * current value, gain/loss and a mini progress bar for allocation share.
 *
 * Props:
 *  - holdings: { id, name, type, currentValue, gainLoss, allocationShare, color }[]
 */
export default function InvestmentHoldings({ holdings = [] }) {
  const formatCurrency = (value) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatGainLoss = (value) => {
    const formatted = formatCurrency(Math.abs(value));
    return value >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-base font-semibold text-slate-900">
        Investment Holdings
      </h3>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="text-xs font-medium tracking-wide text-slate-400">
              <th className="pb-3 font-medium">Asset Name</th>
              <th className="pb-3 font-medium">Asset Type</th>
              <th className="pb-3 font-medium">Current Value</th>
              <th className="pb-3 font-medium">Gain / Loss</th>
              <th className="pb-3 font-medium">Allocation Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {holdings.map((holding) => {
              const isPositive = holding.gainLoss >= 0;
              return (
                <tr key={holding.id}>
                  <td className="py-4">
                    <span className="flex items-center gap-2.5 text-sm font-medium text-slate-900">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: holding.color }}
                      />
                      {holding.name}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {holding.type}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-slate-900">
                    {formatCurrency(holding.currentValue)}
                  </td>
                  <td
                    className={`py-4 text-sm font-semibold ${
                      isPositive ? "text-teal-600" : "text-rose-500"
                    }`}
                  >
                    {formatGainLoss(holding.gainLoss)}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-9 text-sm text-slate-600">
                        {holding.allocationShare}%
                      </span>
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${holding.allocationShare}%`,
                            backgroundColor: holding.color,
                          }}
                        />
                      </div>
                    </div>
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
