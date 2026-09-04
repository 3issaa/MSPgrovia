export default function OpportunityFilters({ filters, selectedFilter, onSelect }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 rounded-[18px] border border-[#dfe7eb] bg-[#f6f7f8] p-2 shadow-[0_6px_18px_rgba(20,43,57,0.02)]">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onSelect(filter)}
          aria-pressed={selectedFilter === filter}
          className={`rounded-[10px] px-5 py-1.5 text-sm font-medium ${selectedFilter === filter ? "bg-[#00ADB5] text-[#12384a] shadow-sm ring-1 ring-[#dfe7eb]" : "text-[#647680] hover:bg-white/80"}`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
