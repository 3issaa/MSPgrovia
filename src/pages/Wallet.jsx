import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import BalanceOverview from "../components/wallet/BalanceOverview";
import QuickActions from "../components/wallet/QuickActions";
import ExpenseOverview from "../components/wallet/ExpenseOverview";
import WalletTransactions from "../components/wallet/WalletTransactions";
import LinkedAccounts from "../components/wallet/LinkedAccounts";
import WalletShortcuts from "../components/wallet/WalletShortcuts";
import WalletActionModal from "../components/wallet/WalletActionModal";
import {
  walletSummary,
  quickActions,
  expenseCategories,
  recentTransactions,
  linkedAccounts,
  walletShortcuts,
} from "../data/walletData";

// This page assumes it renders inside the project's existing <Layout />
// (Navbar + Footer via <Outlet />), the same way Home/Portfolio pages do.
// Register it in your router as a child route — see integration notes below.
export default function Wallet() {
  const [activeAction, setActiveAction] = useState(null);
  const [actionNotice, setActionNotice] = useState("");

  const openAction = (actionId) => {
    setActionNotice("");
    setActiveAction(actionId);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA] px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Page header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Wallet</h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your funds and linked accounts
            </p>
          </div>
          <button
            type="button"
            onClick={() => openAction("transfer")}
            className="flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            <ArrowLeftRight className="h-4 w-4" />
            Transfer Funds
          </button>
        </div>

        {/* Balance + Quick Actions */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BalanceOverview
              totalBalance={walletSummary.totalBalance}
              changeVsLastMonth={walletSummary.changeVsLastMonth}
              availableToSpend={walletSummary.availableToSpend}
              trend={walletSummary.trend}
            />
          </div>
          <QuickActions actions={quickActions} onActionClick={openAction} />
        </div>

        {actionNotice && <div className="mt-4 rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm font-semibold text-teal-700" role="status">{actionNotice}</div>}

        {/* Expense Overview / Linked Accounts + Transactions */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-1">
            <ExpenseOverview
              categories={expenseCategories}
              totalValue={walletSummary.totalBalance}
            />
            <LinkedAccounts accounts={linkedAccounts} />
          </div>
          <div className="lg:col-span-2">
            <WalletTransactions transactions={recentTransactions} />
          </div>
        </div>

        {/* Shortcuts */}
        <div className="mt-6">
          <WalletShortcuts shortcuts={walletShortcuts} />
        </div>
      </div>
      <WalletActionModal key={activeAction} actionId={activeAction} accounts={linkedAccounts} onClose={() => setActiveAction(null)} onComplete={(action) => setActionNotice(`${action} request is ready to review.`)} />
    </div>
  );
}
