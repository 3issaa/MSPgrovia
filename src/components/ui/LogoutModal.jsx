import { useEffect } from "react";
import { LogOut } from "lucide-react";

/**
 * Confirmation modal shown before logging the user out.
 * Real sites never log out on a single click — this adds the "are you
 * sure" step so a stray click on the menu item can't sign someone out.
 *
 * Props:
 *  - isOpen: boolean
 *  - onCancel: () => void
 *  - onConfirm: () => void
 */
export default function LogoutModal({ isOpen, onCancel, onConfirm }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500">
            <LogOut className="h-5 w-5" />
          </span>

          <h2
            id="logout-modal-title"
            className="mt-4 text-lg font-bold text-slate-900"
          >
            Log out of Grovia?
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            You'll need to sign in again to access your wallet and portfolio.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-rose-500 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-600"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
