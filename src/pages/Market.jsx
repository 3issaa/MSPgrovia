import { useState } from "react";
import { useParams } from "react-router-dom";
import MarketHeader from "../components/Market/MarketHeader";
import MarketMetrics from "../components/Market/MarketMetrics";
import MarketTrendChart from "../components/Market/MarketTrendChart";
import { chartPeriods, chartTypes, marketDetails } from "../data/marketData";

export default function Market() {
  const { marketId } = useParams();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const market = marketDetails[marketId || "dow"] || marketDetails.dow;
  const summary = { name: market.name, value: market.value, change: `${market.delta} (${market.change})`, status: market.status };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#f5f6f7] py-14">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <MarketHeader summary={summary} isWatchlisted={isWatchlisted} onWatchlistToggle={() => setIsWatchlisted((value) => !value)} />
        <div className="mt-10"><MarketTrendChart trendByPeriod={market.trendByPeriod} chartTypes={chartTypes} periods={chartPeriods} /></div>
        <div className="mt-8"><MarketMetrics metrics={market.metrics} /></div>
      </div>
    </main>
  );
}
