"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useWorldState } from "@/lib/state/WorldStateProvider";
import { getStatusLabel } from "@/lib/sim/coach";

const getLastFive = (results: string[]) => {
  return results.slice(0, 5).map((result) => {
    const [forGoals, againstGoals] = result.split("-").map(Number);
    if (forGoals > againstGoals) return "W";
    if (forGoals < againstGoals) return "L";
    return "D";
  });
};

export const Topbar = () => {
  const { worldState } = useWorldState();

  if (!worldState) {
    return (
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-6 py-3 text-sm text-neutral-400">
        Load a save to begin.
      </div>
    );
  }

  const status = getStatusLabel(worldState);
  const statusVariant = status === "Starter" ? "default" : status === "Injured" ? "danger" : "muted";
  const lastFive = getLastFive(worldState.logs.matches.map((match) => match.result));

  return (
    <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-6 py-3 text-sm text-neutral-300">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-xs uppercase text-neutral-500">Matchweek</p>
          <p className="text-sm font-semibold text-neutral-100">Week {worldState.meta.weekNumber}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-neutral-500">Date</p>
          <p className="text-sm font-semibold text-neutral-100">
            {new Date(worldState.meta.currentDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase text-neutral-500">Club</p>
          <p className="text-sm font-semibold text-neutral-100">{worldState.club.name}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end gap-1">
          <Badge variant={statusVariant}>Status: {status}</Badge>
          <p className="text-xs text-neutral-500">Form {worldState.player.form.toFixed(2)}</p>
        </div>
        <div className="flex flex-col items-end gap-1 text-xs text-neutral-400">
          <span>Last 5</span>
          <div className="flex gap-1">
            {lastFive.length ? (
              lastFive.map((result, index) => (
                <span
                  key={`${result}-${index}`}
                  className={`rounded-sm px-1 text-[10px] ${
                    result === "W" ? "bg-emerald-500/20 text-emerald-300" : result === "L" ? "bg-rose-500/20 text-rose-300" : "bg-amber-500/20 text-amber-200"
                  }`}
                >
                  {result}
                </span>
              ))
            ) : (
              <span className="text-neutral-500">--</span>
            )}
          </div>
        </div>
        <div className="w-32">
          <p className="text-xs uppercase text-neutral-500">Fatigue</p>
          <Progress value={worldState.player.fatigue} />
        </div>
        <div className="w-32">
          <p className="text-xs uppercase text-neutral-500">Sharpness</p>
          <Progress value={worldState.player.sharpness} />
        </div>
      </div>
    </div>
  );
};
