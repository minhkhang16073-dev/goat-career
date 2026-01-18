import { createRng, nextSeed } from "@/lib/sim/rng";
import type { BackgroundPreset, Position, PlayerRole, WeekPlanItem, WorldState } from "@/lib/state/types";

const defaultAttributes = {
  pace: 10,
  stamina: 10,
  strength: 10,
  passing: 10,
  dribbling: 10,
  finishing: 10,
  tackling: 10,
  vision: 10,
  composure: 10,
  workRate: 10,
  technique: 10,
  positioning: 10,
};

const backgroundCaps: Record<BackgroundPreset, { points: number; max: number }> = {
  "Academy Prospect": { points: 80, max: 15 },
  "Wonderkid Prodigy": { points: 100, max: 17 },
  "Late Bloomer": { points: 85, max: 16 },
  "Street Footballer": { points: 90, max: 16 },
  "Futsal Technician": { points: 90, max: 17 },
  "Athletic Freak": { points: 95, max: 18 },
};

export const buildWeekPlan = (): WeekPlanItem[] => [
  { day: "Mon", activity: "Train" },
  { day: "Tue", activity: "Train" },
  { day: "Wed", activity: "Recovery" },
  { day: "Thu", activity: "Train" },
  { day: "Fri", activity: "Media" },
  { day: "Sat", activity: "Train" },
  { day: "Sun", activity: "Rest" },
];

export const createWorldState = (options: {
  name: string;
  nationality: string;
  age: number;
  heightCm: number;
  weightKg: number;
  preferredFoot: "Left" | "Right" | "Both";
  personality: string;
  primary: Position;
  secondary: Position | null;
  role: PlayerRole;
  background: BackgroundPreset;
  traits: string[];
  hiddenAttrs: Record<string, number>;
  attributes: Record<string, number>;
  seed: number;
}): WorldState => {
  const rng = createRng(options.seed);
  const createdAt = new Date().toISOString();
  const currentDate = new Date().toISOString();
  const seasonYear = new Date().getFullYear();

  return {
    meta: {
      createdAt,
      currentDate,
      seasonYear,
      weekNumber: 1,
      rngSeed: options.seed,
    },
    player: {
      identity: {
        name: options.name,
        nationality: options.nationality,
        age: options.age,
        heightCm: options.heightCm,
        weightKg: options.weightKg,
        preferredFoot: options.preferredFoot,
        personality: options.personality,
      },
      positions: {
        primary: options.primary,
        secondary: options.secondary,
      },
      role: options.role,
      attributes: {
        ...defaultAttributes,
        ...options.attributes,
      },
      traits: options.traits,
      hiddenAttrs: options.hiddenAttrs,
      form: 6.4,
      fatigue: 22,
      sharpness: 58,
      injury: { status: "Fit", daysOut: 0 },
      confidence: 55,
      reputation: 45,
      marketValue: 1200000,
    },
    club: {
      name: "Northbridge FC",
      facilities: 63,
      coachTrust: 55,
      tacticStyle: "High Press 4-2-3-1",
    },
    squad: {
      teammates: [
        { name: "Luca Diaz", position: "ST", rating: 7.1 },
        { name: "Milan Kovac", position: "CM", rating: 6.8 },
        { name: "Ewan Shaw", position: "CB", rating: 7.0 },
        { name: "Tariq Mensah", position: "RW", rating: 6.7 },
        { name: "Noah Varga", position: "GK", rating: 6.9 },
      ],
    },
    league: {
      teams: [
        { name: "Northbridge FC", rating: 68 },
        { name: "Redport United", rating: 70 },
        { name: "Valemont City", rating: 66 },
        { name: "Kingsborough", rating: 64 },
        { name: "Sableford", rating: 63 },
      ],
      fixtures: Array.from({ length: 20 }).map((_, index) => ({
        week: index + 1,
        opponent: index % 2 === 0 ? "Redport United" : "Valemont City",
        home: index % 2 === 0,
      })),
      standings: [
        { name: "Northbridge FC", points: 0, played: 0 },
        { name: "Redport United", points: 0, played: 0 },
        { name: "Valemont City", points: 0, played: 0 },
        { name: "Kingsborough", points: 0, played: 0 },
        { name: "Sableford", points: 0, played: 0 },
      ],
      leaders: {
        goals: "Luca Diaz - 0",
        assists: "Milan Kovac - 0",
        ratings: "Noah Varga - 6.9",
      },
    },
    inbox: {
      messages: [
        {
          id: `msg-${rng.nextInt(1000, 9999)}`,
          from: "Coach",
          subject: "Welcome to senior training",
          body: "We want you sharp and hungry. Keep your focus in training this week.",
        },
      ],
    },
    transfers: {
      rumors: ["Scouts from Redport United watching training"],
      interest: ["Agent hints at a new boot sponsor"],
      bids: [],
    },
    logs: {
      weekly: [],
      matches: [],
    },
    calendar: {
      weekPlan: buildWeekPlan(),
    },
  };
};

export const getBackgroundCaps = (background: BackgroundPreset) => backgroundCaps[background];

export const randomizeHiddenAttrs = (seed: number, background: BackgroundPreset) => {
  const rng = createRng(seed);
  const base = backgroundCaps[background].max;
  return {
    consistency: rng.nextInt(6, base),
    injuryProne: rng.nextInt(4, base),
    bigMatches: rng.nextInt(6, base),
    professionalism: rng.nextInt(6, base),
    ambition: rng.nextInt(6, base),
    pressureHandling: rng.nextInt(6, base),
  };
};

export const createSeed = (seed?: number) => (seed ? nextSeed(seed) : Math.floor(Math.random() * 4294967296));
