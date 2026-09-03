import { Plus, ArrowDownToLine, ArrowLeftRight, Landmark } from "lucide-react";

const ICONS = {
  Plus,
  ArrowDownToLine,
  ArrowLeftRight,
  Landmark,
};

/**
 * 2x2 grid of quick-action buttons.
 *
 * Props:
 *  - actions: { id, label, icon }[]  — icon is a key into ICONS above
 *  - onActionClick?: (id: string) => void
 */
export default function QuickActions({ actions = [], onActionClick }) {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-base font-semibold text-slate-900">Quick Actions</h3>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = ICONS[action.icon];
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onActionClick?.(action.id)}
              className="flex flex-col items-center gap-2 rounded-xl border border-transparent bg-slate-50 px-3 py-4 text-center transition-colors hover:border-slate-200 hover:bg-slate-100"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-700">
                {Icon && <Icon className="h-4 w-4" />}
              </span>
              <span className="text-xs font-medium text-slate-700">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
