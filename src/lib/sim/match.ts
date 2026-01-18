import { createRng, nextSeed } from "@/lib/sim/rng";
import type { MatchEvent, MatchReport, WorldState } from "@/lib/state/types";

const ratingLabel = (value: number) => {
  if (value >= 8.5) return "Star performance";
  if (value >= 7.5) return "Key contributor";
  if (value >= 6.5) return "Solid";
  if (value >= 5.5) return "Below par";
  return "Struggled";
};

export const simulateMatch = (state: WorldState): { state: WorldState; report: MatchReport } => {
  const rng = createRng(state.meta.rngSeed);
  const opponent = state.league.fixtures.find((fixture) => fixture.week === state.meta.weekNumber)?.opponent ?? "Unknown";
  const timeline: MatchEvent[] = [];
  let goalsFor = 0;
  let goalsAgainst = 0;
  let rating = 6.2 + rng.next() * 2.5 + (state.player.form - 6) * 0.2 - state.player.fatigue * 0.01;

  for (let minute = 5; minute <= 90; minute += 5) {
    const roll = rng.next();
    if (roll > 0.92) {
      goalsFor += 1;
      timeline.push({ minute, description: "Goal! You combine with midfield for the finish.", type: "goal" });
      rating += 0.4;
    } else if (roll < 0.08) {
      goalsAgainst += 1;
      timeline.push({ minute, description: "Opponent scores after a quick transition.", type: "goal" });
      rating -= 0.3;
    } else if (roll > 0.75) {
      timeline.push({ minute, description: "Key chance created from the right channel.", type: "chance" });
      rating += 0.1;
    } else if (roll < 0.25) {
      timeline.push({ minute, description: "Misplaced pass under pressure.", type: "note" });
      rating -= 0.05;
    }
  }

  const breakdown = [
    { label: "Work Rate", value: Math.max(5, Math.min(10, 6 + rng.next() * 3)), note: "Covering wide zones" },
    { label: "Decisions", value: Math.max(5, Math.min(10, 6 + rng.next() * 2)), note: "Shot selection" },
    { label: "Passing", value: Math.max(5, Math.min(10, 6 + rng.next() * 3)), note: "Vertical progression" },
    { label: "Duels", value: Math.max(5, Math.min(10, 6 + rng.next() * 2)), note: "Physical contests" },
  ];

  rating = Math.max(4.5, Math.min(9.8, rating));

  const report: MatchReport = {
    id: `match-${rng.nextInt(1000, 9999)}`,
    opponent,
    date: state.meta.currentDate,
    result: `${goalsFor}-${goalsAgainst}`,
    rating: Number(rating.toFixed(2)),
    breakdown,
    stats: {
      shots: rng.nextInt(1, 5),
      assists: rng.nextInt(0, 2),
      keyPasses: rng.nextInt(1, 4),
      tackles: rng.nextInt(1, 5),
    },
    timeline,
  };

  const updatedState: WorldState = {
    ...state,
    meta: {
      ...state.meta,
      rngSeed: nextSeed(state.meta.rngSeed),
    },
    player: {
      ...state.player,
      form: Number(Math.min(10, state.player.form + (rating - 6.5) * 0.2).toFixed(2)),
      fatigue: Math.min(100, state.player.fatigue + 12),
      sharpness: Math.min(100, state.player.sharpness + 6),
    },
    logs: {
      ...state.logs,
      matches: [report, ...state.logs.matches],
    },
    inbox: {
      messages: [
        {
          id: `msg-${rng.nextInt(1000, 9999)}`,
          from: "Media",
          subject: `Match report vs ${opponent}`,
          body: `Rating ${report.rating}. ${ratingLabel(report.rating)}.`,
        },
        ...state.inbox.messages,
      ],
    },
  };

  return { state: updatedState, report };
};
