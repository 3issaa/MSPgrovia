import { Plus } from "lucide-react";

export default function MarketHeader({ summary, isWatchlisted, onWatchlistToggle }) {
  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-[-0.05em] text-[#0b3045] sm:text-4xl">{summary.name}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-5">
          <span className="text-4xl font-bold tracking-[-0.05em] text-[#0b3045] sm:text-5xl">{summary.value}</span>
          <span className="rounded-full bg-[#e1f7f8] px-3 py-1.5 text-sm font-bold text-[#00aeb8]">{summary.change}</span>
          <span className="text-sm font-medium text-[#8a9ba5] sm:text-base">{summary.status}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onWatchlistToggle}
        className={`inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${isWatchlisted ? "bg-[#e1f7f8] text-[#008f9d]" : "bg-[#062f44] text-white hover:bg-[#0b3d56]"}`}
      >
        <Plus className="h-4 w-4" />
        {isWatchlisted ? "Added to Watchlist" : "Add to Watchlist"}
      </button>
    </header>
  );
}
