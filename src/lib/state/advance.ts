import { applyWeekTraining, estimateInjuryRisk } from "@/lib/sim/training";
import { evaluateCoachTrust } from "@/lib/sim/coach";
import { generateWeeklyMessages } from "@/lib/sim/inbox";
import { updateTransferRumors } from "@/lib/sim/transfers";
import { nextSeed } from "@/lib/sim/rng";
import type { WorldState } from "@/lib/state/types";

const advanceDate = (date: string) => {
  const next = new Date(date);
  next.setDate(next.getDate() + 7);
  return next.toISOString();
};

export const advanceWeek = (state: WorldState): WorldState => {
  let updated = applyWeekTraining(state);
  updated = evaluateCoachTrust(updated);
  updated = generateWeeklyMessages(updated);
  updated = updateTransferRumors(updated);

  const injuryRisk = estimateInjuryRisk(updated);
  const injured = injuryRisk > 0.6;

  return {
    ...updated,
    meta: {
      ...updated.meta,
      weekNumber: updated.meta.weekNumber + 1,
      currentDate: advanceDate(updated.meta.currentDate),
      rngSeed: nextSeed(updated.meta.rngSeed),
    },
    player: {
      ...updated.player,
      injury: injured
        ? { status: "Injured", daysOut: 7 }
        : { status: "Fit", daysOut: 0 },
    },
    logs: {
      ...updated.logs,
      weekly: [
        `Week ${updated.meta.weekNumber}: training complete, injury risk ${Math.round(injuryRisk * 100)}%`,
        ...updated.logs.weekly,
      ],
    },
  };
};
