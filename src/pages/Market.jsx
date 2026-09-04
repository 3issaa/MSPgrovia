import { useState } from "react";
import MarketHeader from "../components/Market/MarketHeader";
import MarketMetrics from "../components/Market/MarketMetrics";
import MarketTrendChart from "../components/Market/MarketTrendChart";
import { chartPeriods, chartTypes, marketMetrics, marketSummary, marketTrendByPeriod } from "../data/marketData";

export default function Market() {
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#f5f6f7] py-14">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <MarketHeader summary={marketSummary} isWatchlisted={isWatchlisted} onWatchlistToggle={() => setIsWatchlisted((value) => !value)} />
        <div className="mt-10"><MarketTrendChart trendByPeriod={marketTrendByPeriod} chartTypes={chartTypes} periods={chartPeriods} /></div>
        <div className="mt-8"><MarketMetrics metrics={marketMetrics} /></div>
      </div>
    </main>
  );
}
