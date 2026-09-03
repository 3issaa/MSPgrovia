/**
 * Donut chart (pure CSS conic-gradient, no charting library required)
 * plus a legend listing each category's share and dollar amount.
 *
 * Props:
 *  - categories: { id, name, value, amount, color }[]
 *  - totalValue: number — shown in the center of the donut
 */
export default function ExpenseOverview({ categories = [], totalValue = 0 }) {
  const total = categories.reduce((sum, c) => sum + c.value, 0) || 1;

  let cumulative = 0;
  const gradientStops = categories
    .map((category) => {
      const start = (cumulative / total) * 360;
      cumulative += category.value;
      const end = (cumulative / total) * 360;
      return `${category.color} ${start}deg ${end}deg`;
    })
    .join(", ");

  const formatCurrency = (value) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-base font-semibold text-slate-900">
        Expense Overview
      </h3>

      <div className="mt-6 flex justify-center">
        <div
          className="relative flex h-44 w-44 items-center justify-center rounded-full"
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
      </div>

      <ul className="mt-6 space-y-3">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2 text-slate-600">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {category.name}
            </span>
            <span className="flex items-center gap-4">
              <span className="text-slate-400">{category.value}%</span>
              <span className="w-20 text-right font-medium text-slate-900">
                {formatCurrency(category.amount)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
