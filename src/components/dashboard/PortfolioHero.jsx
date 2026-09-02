import Card from "../ui/Card";

function PortfolioHero() {
  return (
    <Card className="relative overflow-hidden bg-[#06364a] p-5 text-white md:p-6">
      {/* Content */}
      <div className="relative z-10 max-w-[65%]">
        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#48c2c6]">
          Net Portfolio Value
        </p>

        <div className="mt-1 flex items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            $247,830.56
          </h1>

          <span className="rounded bg-[#0b5865] px-1.5 py-0.5 text-[7px] text-[#52d3d1]">
            +1.8%
          </span>
        </div>

        <p className="mt-1 max-w-xs text-[8px] leading-3.5 text-slate-300">
          Your capital is performing optimally. +$5,420 added to your net worth
          this month alone.
        </p>
      </div>

      {/* Mini Chart */}
      <div className="absolute right-4 top-4 w-[34%]">
        <p className="text-right text-[7px] text-slate-400">
          6-Month Growth Trend
        </p>

        <svg viewBox="0 0 160 55" className="mt-2 h-14 w-full">
          <polyline
            points="5,40 30,37 52,39 80,29 108,27 135,18 155,14"
            fill="none"
            stroke="#35c3c8"
            strokeWidth="1.5"
          />

          <g fill="#35c3c8">
            <circle cx="5" cy="40" r="2" />
            <circle cx="30" cy="37" r="2" />
            <circle cx="52" cy="39" r="2" />
            <circle cx="80" cy="29" r="2" />
            <circle cx="108" cy="27" r="2" />
            <circle cx="135" cy="18" r="2" />
            <circle cx="155" cy="14" r="2" />
          </g>
        </svg>
      </div>
    </Card>
  );
}

export default PortfolioHero;
