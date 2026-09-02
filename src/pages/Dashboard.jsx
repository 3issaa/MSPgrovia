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
    <div className="bg-[#f6f7f8]  text-slate-700">
      <div className="mx-auto max-w-[1180px] px-4 pb-8 sm:px-6">
        <main className="space-y-4">
          <div className="grid items-stretch gap-4 p-5   lg:grid-cols-[1.7fr_1fr]">
            <PortfolioHero />
            <FinancialHealth />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <AssetAllocation />
            <RecentTransactions />
          </div>

          <FinancialJourney />

          <div className="grid gap-4 lg:grid-cols-2">
            <GoalsProgress />
            <AllocationStrategy />
          </div>

          <PerformanceChart />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
