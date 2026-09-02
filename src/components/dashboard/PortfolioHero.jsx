import Card from "../ui/Card";

function PortfolioHero() {
  return (
    <Card className="relative flex min-h-[188px] items-center overflow-hidden border-0 bg-[#06283D] p-6 text-white md:p-8">
      <div className="relative z-10 max-w-[58%]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#48c2c6]">
          Net Portfolio Value
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-[32px] font-extrabold leading-none tracking-tight sm:text-[38px]">
            $247,830.56
          </h1>

          <span className="rounded-md bg-[#0b5865] px-2 py-1 text-[11px] font-semibold text-[#5ee0dc]">
            +1.2%
          </span>
        </div>

        <p className="mt-3 max-w-sm text-[13px] leading-5 text-slate-300">
          Your capital is performing optimally. +$5,420 added to your net worth
          this month alone.
        </p>
      </div>

      <div className="absolute right-5 top-6 w-[38%] sm:right-7">
        <p className="text-right text-[11px] text-slate-400">
          6-Month Growth Trend
        </p>

        <svg viewBox="0 0 180 70" className="mt-2 h-[72px] w-full">
          <polyline
            points="4,52 32,48 58,50 90,36 120,32 150,20 176,14"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <g fill="#ffffff">
            <circle cx="4" cy="52" r="2.4" />
            <circle cx="32" cy="48" r="2.4" />
            <circle cx="58" cy="50" r="2.4" />
            <circle cx="90" cy="36" r="2.4" />
            <circle cx="120" cy="32" r="2.4" />
            <circle cx="150" cy="20" r="2.4" />
            <circle cx="176" cy="14" r="2.4" />
          </g>
        </svg>
      </div>
    </Card>
  );
}

export default PortfolioHero;
