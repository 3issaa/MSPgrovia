import OpportunitiesHeader from "../components/Opportunities/OpportunitiesHeader";
import OpportunityFilters from "../components/Opportunities/OpportunityFilters";
import RecommendedOpportunities from "../components/Opportunities/RecommendedOpportunities";
import TrendingOpportunities from "../components/Opportunities/TrendingOpportunities";
import { opportunityFilters, recommendedOpportunities, trendingOpportunities } from "../data/opportunitiesData";

export default function Opportunities() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const matchesSelectedFilter = (opportunity) =>
    selectedFilter === "All" || opportunity.category === selectedFilter;
  const filteredRecommended = recommendedOpportunities.filter(matchesSelectedFilter);
  const filteredTrending = trendingOpportunities.filter(matchesSelectedFilter);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#f4f5f6] py-8 sm:py-10">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <OpportunitiesHeader />
        <OpportunityFilters
          filters={opportunityFilters}
          selectedFilter={selectedFilter}
          onSelect={setSelectedFilter}
        />
        <RecommendedOpportunities opportunities={filteredRecommended} />
        <TrendingOpportunities opportunities={filteredTrending} />
      </div>
    </main>
  );
}
import { useState } from "react";
