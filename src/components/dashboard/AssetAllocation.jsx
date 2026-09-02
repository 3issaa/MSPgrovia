import Card from "../ui/Card";
import { allocations } from "../../data/dashboardData";

function AssetAllocation() {
  return (
    <Card className="p-5">

      <h3 className="text-[10px] font-bold text-[#12384a]">
        Asset Allocation Breakdown
      </h3>

      <div className="mt-3 flex items-center gap-4">

        {/* Donut */}
        <div className="relative h-24 w-24 shrink-0">

          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "conic-gradient(" +
                "#0d9fa7 0 45%, " +
                "#55c3c7 45% 70%, " +
                "#89d6d8 70% 85%, " +
                "#b6e6e7 85% 95%, " +
                "#d9f0f1 95% 100%)",
            }}
          />

          <div className="absolute inset-[13px] rounded-full bg-white" />

        </div>

        {/* Legend */}
        <div className="flex-1 space-y-1.5">

          {allocations.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-2 text-[7px]"
            >

              <span className="flex items-center gap-1.5 text-slate-500">

                <i
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                {item.label}

              </span>

              <b className="text-[#12384a]">
                {item.value}%
              </b>

            </div>
          ))}

        </div>

      </div>

    </Card>
  );
}

export default AssetAllocation;
