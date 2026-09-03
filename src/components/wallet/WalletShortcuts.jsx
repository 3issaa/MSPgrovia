import { Zap, Banknote, TrendingUp } from "lucide-react";

const ICONS = { Zap, Banknote, TrendingUp };

/**
 * Row of shortcut cards below the main wallet grid.
 *
 * Props:
 *  - shortcuts: { id, title, subtitle, icon }[]
 *  - onShortcutClick?: (id: string) => void
 */
export default function WalletShortcuts({ shortcuts = [], onShortcutClick }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {shortcuts.map((shortcut) => {
        const Icon = ICONS[shortcut.icon];
        return (
          <button
            key={shortcut.id}
            type="button"
            onClick={() => onShortcutClick?.(shortcut.id)}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-left transition-colors hover:border-teal-200 hover:bg-teal-50/40"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              {Icon && <Icon className="h-5 w-5" />}
            </span>
            <span>
              <span className="block text-sm font-semibold text-slate-900">
                {shortcut.title}
              </span>
              <span className="block text-xs text-slate-500">
                {shortcut.subtitle}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
