export default function Dashboard() {
  const stats = [
    {
      title: "Net Portfolio Value",
      value: "$124,582.40",
      description: "+4.2% this week",
    },
    {
      title: "Available Cash",
      value: "$12,490.15",
      description: "Fully Liquid Reserves",
    },
    {
      title: "Active Opportunities",
      value: "8 Assets",
      description: "Diversified allocation",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-6 py-8 text-[#0b2b3c]">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-bold">Welcome back, Sara</h1>

            <p className="mt-1 text-[13px] text-[#78909c]">
              Your investment algorithm is performing optimally. 4 assets
              require review.
            </p>
          </div>

          <button className="rounded-md bg-[#08aebb] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0799a5]">
            Add Funds
          </button>
        </div>

        {/* Stats Cards */}
        <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border border-[#e1e5e7] bg-white px-4 py-4"
            >
              <p className="text-[12px] font-medium text-[#466174]">
                {stat.title}
              </p>

              <h2 className="mt-1 text-[36px] font-bold leading-tight tracking-tight">
                {stat.value}
              </h2>

              <p className="mt-2 text-[12px] font-semibold text-[#08aebb]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1.05fr]">
          {/* Chart */}
          <div className="rounded-xl border border-[#e1e5e7] bg-white px-5 pt-5 pb-4 ">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[12px] font-bold text-[#23465a]">
                Portfolio Performance
              </h3>

              <span className="text-[12px] text-[#78909c]">7 Month Trend</span>
            </div>

            {/* Chart */}
            <div className="relative h-[155px] w-full">
              <svg
                viewBox="0 0 700 155"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {/* Line */}
                <polyline
                  points="
                    0,128
                    115,108
                    225,80
                    335,92
                    445,57
                    560,31
                    700,0
                  "
                  fill="none"
                  stroke="#08aebb"
                  strokeWidth="2"
                />
              </svg>

              {/* Months */}
              <div className="absolute bottom-[-2px] left-0 right-0 flex justify-between text-[11px] text-[#78909c]">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </div>
          </div>

          {/* AI Assistant */}
          <div className="rounded-xl bg-[#21465a] px-6 py-5 text-white">
            <p className="text-[12px] font-semibold">Grovia AI Assistant</p>

            <h2 className="mt-4 text-[38px] font-bold leading-[1.02]">
              Market
              <br />
              Realignment
              <br />
              Detected
            </h2>

            <p className="mt-5 max-w-[250px] text-[12px] p-2 leading-[1.65] text-[#d8e3e8]">
              Your Balanced Profile model recommends increasing allocation to
              Renewable Energy by 4.2% to optimize yield. High technology
              sentiment is slightly retracing.
            </p>

            <button className="mt-6 w-full rounded-md bg-[#08aebb] py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#0799a5]">
              View Full Explanation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
