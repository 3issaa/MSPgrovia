import { useNavigate } from "react-router-dom";
import DiscoverHeader from "../components/Discover/DiscoverHeader";
import MarketCard from "../components/Discover/MarketCard";
import SecondaryOpportunitiesCard from "../components/Discover/SecondaryOpportunitiesCard";
import { marketRows, secondaryRows } from "../data/discoverData";

export default function Discover() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#f3f4f5] py-8 sm:py-10">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <DiscoverHeader />
        <div className="grid gap-8 lg:grid-cols-2">
          <MarketCard
            markets={marketRows}
            onExplore={() => navigate("/Market")}
          />
          <SecondaryOpportunitiesCard
            opportunities={secondaryRows}
            onExplore={() => navigate("/Opportunities")}
          />
        </div>
      </div>
    </main>
  );
}
