import { createRng, nextSeed } from "@/lib/sim/rng";
import type { WorldState } from "@/lib/state/types";

export const evaluateCoachTrust = (state: WorldState): WorldState => {
  const rng = createRng(state.meta.rngSeed);
  const delta = state.player.form >= 7 ? rng.nextInt(1, 3) : rng.nextInt(-2, 1);
  const coachTrust = Math.max(0, Math.min(100, state.club.coachTrust + delta));

  return {
    ...state,
    meta: {
      ...state.meta,
      rngSeed: nextSeed(state.meta.rngSeed),
    },
    club: {
      ...state.club,
      coachTrust,
    },
  };
};

export const getStatusLabel = (state: WorldState) => {
  if (state.player.injury.status === "Injured") return "Injured";
  if (state.club.coachTrust > 70) return "Starter";
  if (state.club.coachTrust > 50) return "Rotation";
  return "Bench";
};
