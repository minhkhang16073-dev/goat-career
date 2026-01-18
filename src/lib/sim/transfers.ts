import { createRng, nextSeed } from "@/lib/sim/rng";
import type { WorldState } from "@/lib/state/types";

export const updateTransferRumors = (state: WorldState): WorldState => {
  const rng = createRng(state.meta.rngSeed);
  const rumors = [
    "Scouts spotted at training ground",
    "Agent meeting lined up after matchday",
    "Rumor: clause could be activated in January",
  ];

  return {
    ...state,
    meta: { ...state.meta, rngSeed: nextSeed(state.meta.rngSeed) },
    transfers: {
      ...state.transfers,
      rumors: [rumors[rng.nextInt(0, rumors.length - 1)], ...state.transfers.rumors].slice(0, 5),
      interest: [
        `Club interest: ${rng.nextInt(2, 6)} teams monitoring`,
        ...state.transfers.interest,
      ].slice(0, 5),
      bids: state.transfers.bids,
    },
  };
};

export const addSampleBid = (state: WorldState): WorldState => ({
  ...state,
  transfers: {
    ...state.transfers,
    bids: ["Offer: $3.2m with 15% sell-on", ...state.transfers.bids].slice(0, 3),
  },
});
