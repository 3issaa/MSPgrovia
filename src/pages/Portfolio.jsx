import { ChevronDown } from "lucide-react";
import PortfolioAllocation from "../components/portfolio/PortfolioAllocation";
import PortfolioPerformance from "../components/portfolio/PortfolioPerformance";
import InvestmentHoldings from "../components/portfolio/InvestmentHoldings";
import {
  portfolioSummary,
  allocationCategories,
  performanceHistory,
  investmentHoldings,
} from "../data/portfolioData";

// Renders inside the existing <Layout /> (Navbar + Footer via <Outlet />),
// the same way Home/Wallet pages do. Register it as a child route — see
// integration notes below.
export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#F5F6FA] px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Page header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Investment Portfolio
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage and monitor your diversified investment holdings
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            All Accounts
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* Allocation + Performance */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PortfolioAllocation
            categories={allocationCategories}
            totalValue={portfolioSummary.totalValue}
          />
          <PortfolioPerformance
            history={performanceHistory}
            ytdChange={portfolioSummary.ytdChange}
            totalGainLoss={portfolioSummary.totalGainLoss}
            sinceInception={portfolioSummary.sinceInception}
          />
        </div>

        {/* Holdings table */}
        <div className="mt-6">
          <InvestmentHoldings holdings={investmentHoldings} />
        </div>
      </div>
    </div>
  );
}
