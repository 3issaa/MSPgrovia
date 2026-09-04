/**
 * Same donut-chart technique as ExpenseOverview on the Wallet page
 * (pure CSS conic-gradient, no charting library), with a two-column
 * legend to match the wider Portfolio card.
 *
 * Props:
 *  - categories: { id, name, value, amount, color }[]
 *  - totalValue: number — shown in the center of the donut
 */
export default function PortfolioAllocation({
  categories = [],
  totalValue = 0,
}) {
  const total = categories.reduce((sum, c) => sum + c.value, 0) || 1;

  const gradientStops = categories
    .map((category, index) => {
      const previousTotal = categories
        .slice(0, index)
        .reduce((sum, item) => sum + item.value, 0);
      const start = (previousTotal / total) * 360;
      const end = ((previousTotal + category.value) / total) * 360;
      return `${category.color} ${start}deg ${end}deg`;
    })
    .join(", ");

  const formatCurrency = (value) =>
    `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-base font-semibold text-slate-900">
        Portfolio Allocation
      </h3>

      <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:items-center">
        <div
          className="relative flex h-44 w-44 shrink-0 items-center justify-center rounded-full"
          style={{ background: `conic-gradient(${gradientStops})` }}
        >
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white text-center">
            <span className="text-[11px] font-medium text-slate-400">
              Total Value
            </span>
            <span className="text-base font-semibold text-slate-900">
              {formatCurrency(totalValue)}
            </span>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {categories.map((category) => (
            <div key={category.id}>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
              </div>
              <p className="mt-1 pl-[18px] text-sm text-slate-500">
                <span style={{ color: category.color }} className="font-medium">
                  {category.value}%
                </span>{" "}
                {formatCurrency(category.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
