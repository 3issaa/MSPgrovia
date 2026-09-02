import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";
import { goals } from "../../data/dashboardData";

function GoalsProgress() {
  return (
    <Card className="p-5">
      <h3 className="text-[10px] font-bold text-[#12384a]">
        Goals Progress Tracker
      </h3>

      <div className="mt-3 space-y-2.5">
        {goals.map((goal) => (
          <div key={goal.name}>
            <div className="mb-1 flex justify-between text-[7px]">
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
