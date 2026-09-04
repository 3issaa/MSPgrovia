import OpportunityCard from "./OpportunityCard";

export default function RecommendedOpportunities({ opportunities }) {
  return (
    <section>
      <h2 className="mb-4 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-[#0fa4b5]">Recommended for you</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {opportunities.slice(0, 3).map((opportunity) => <OpportunityCard key={opportunity.name} opportunity={opportunity} />)}
      </div>
      {opportunities.length > 3 && (
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-2">
          {opportunities.slice(3).map((opportunity) => <OpportunityCard key={opportunity.name} opportunity={opportunity} />)}
        </div>
      )}
    </section>
  );
}
