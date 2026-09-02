import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";
import { goals } from "../../data/dashboardData";

function GoalsProgress() {
  return (
    <Card className="p-6">
      <h3 className="text-[16px] font-bold text-[#12384a]">
        Goals Progress Tracker
      </h3>

      <div className="mt-5 space-y-5">
        {goals.map((goal) => (
          <div key={goal.name}>
            <div className="mb-2 flex items-center justify-between gap-3 text-[13px]">
              <span className="font-semibold text-[#34505d]">{goal.name}</span>
              <span className="text-slate-400">
                {goal.current} of {goal.target} ({goal.progress}%)
              </span>
            </div>
            <ProgressBar value={goal.progress} />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default GoalsProgress;
