import { createRng, nextSeed } from "@/lib/sim/rng";
import type { InboxMessage, WorldState } from "@/lib/state/types";

export const generateWeeklyMessages = (state: WorldState): WorldState => {
  const rng = createRng(state.meta.rngSeed);
  const message: InboxMessage = {
    id: `msg-${rng.nextInt(1000, 9999)}`,
    from: "Coach",
    subject: "Weekly expectations",
    body: "We want sharper positioning and quicker passing. Hit the analysis room.",
    choices: [
      { id: "focus", label: "Focus on tactical training", effect: "coachTrust+" },
      { id: "ask", label: "Ask for extra recovery", effect: "fatigue-" },
    ],
  };

  return {
    ...state,
    meta: {
      ...state.meta,
      rngSeed: nextSeed(state.meta.rngSeed),
    },
    inbox: {
      messages: [message, ...state.inbox.messages],
    },
  };
};

export const applyInboxChoice = (state: WorldState, messageId: string, choiceId: string): WorldState => {
  const message = state.inbox.messages.find((msg) => msg.id === messageId);
  if (!message) return state;
  let updated = { ...state };

  if (choiceId === "focus") {
    updated = {
      ...updated,
      club: { ...updated.club, coachTrust: Math.min(100, updated.club.coachTrust + 3) },
    };
  }
  if (choiceId === "ask") {
    updated = {
      ...updated,
      player: { ...updated.player, fatigue: Math.max(0, updated.player.fatigue - 8) },
    };
  }

  return {
    ...updated,
    inbox: {
      messages: updated.inbox.messages.map((msg) =>
        msg.id === messageId ? { ...msg, resolved: true } : msg
      ),
    },
  };
};
