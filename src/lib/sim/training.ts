import { createRng, nextSeed } from "@/lib/sim/rng";
import type { WorldState } from "@/lib/state/types";

export const applyWeekTraining = (state: WorldState): WorldState => {
  const rng = createRng(state.meta.rngSeed);
  let fatigue = state.player.fatigue;
  let sharpness = state.player.sharpness;
  let form = state.player.form;
  const attributes = { ...state.player.attributes };

  state.calendar.weekPlan.forEach((plan) => {
    if (plan.activity === "Train") {
      const pick = Object.keys(attributes)[rng.nextInt(0, Object.keys(attributes).length - 1)];
      attributes[pick] = Math.min(20, attributes[pick] + 1);
      fatigue = Math.min(100, fatigue + rng.nextInt(6, 12));
      sharpness = Math.min(100, sharpness + rng.nextInt(4, 8));
      form = Math.min(10, form + rng.next() * 0.2);
    }
    if (plan.activity === "Recovery") {
      fatigue = Math.max(0, fatigue - rng.nextInt(10, 16));
      sharpness = Math.max(0, sharpness - rng.nextInt(2, 4));
    }
    if (plan.activity === "Rest") {
      fatigue = Math.max(0, fatigue - rng.nextInt(12, 18));
      form = Math.max(0, form - rng.next() * 0.1);
    }
    if (plan.activity === "Media") {
      fatigue = Math.max(0, fatigue - rng.nextInt(2, 4));
      form = Math.min(10, form + rng.next() * 0.1);
    }
  });

  return {
    ...state,
    meta: {
      ...state.meta,
      rngSeed: nextSeed(state.meta.rngSeed),
    },
    player: {
      ...state.player,
      attributes,
      fatigue: Math.round(fatigue),
      sharpness: Math.round(sharpness),
      form: Number(form.toFixed(2)),
    },
  };
};

export const estimateInjuryRisk = (state: WorldState) => {
  const fatigueFactor = state.player.fatigue / 100;
  const hidden = state.player.hiddenAttrs.injuryProne ?? 10;
  return Math.min(0.95, 0.1 + fatigueFactor * 0.6 + hidden / 40);
};
