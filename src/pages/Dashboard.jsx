

import PortfolioHero from "../components/dashboard/PortfolioHero";
import FinancialHealth from "../components/dashboard/FinancialHealth";
import StatCard from "../components/dashboard/StatCard";
import AssetAllocation from "../components/dashboard/AssetAllocation";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import FinancialJourney from "../components/dashboard/FinancialJourney";
import GoalsProgress from "../components/dashboard/GoalsProgress";
import AllocationStrategy from "../components/dashboard/AllocationStrategy";
import PerformanceChart from "../components/dashboard/PerformanceChart";

import { stats } from "../data/dashboardData";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f6f7f7] text-slate-700">
      <div className="mx-auto max-w-[1160px] px-3 py-3 sm:px-5 sm:py-5">
        {/* Header */}
        

        <main className="mt-5 space-y-4">
          {/* Hero */}
          <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
            <PortfolioHero />

            <FinancialHealth />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          {/* Allocation + Transactions */}
          <div className="grid gap-4 lg:grid-cols-2">
            <AssetAllocation />

            <RecentTransactions />
          </div>

          {/* Journey */}
          <FinancialJourney />

          {/* Goals + Strategy */}
          <div className="grid gap-4 lg:grid-cols-2">
            <GoalsProgress />

            <AllocationStrategy />
          </div>

          {/* Performance */}
          <PerformanceChart />
        </main>

   
      </div>
    </div>
  );
}

export default Dashboard;
