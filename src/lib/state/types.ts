export type Position = "GK" | "RB" | "CB" | "LB" | "DM" | "CM" | "AM" | "RW" | "LW" | "ST";

export type PlayerRole =
  | "Sweeper Keeper"
  | "Wing Back"
  | "Ball Playing Defender"
  | "Anchor"
  | "Box-to-Box"
  | "Advanced Playmaker"
  | "Inside Forward"
  | "Winger"
  | "Pressing Forward"
  | "Complete Forward";

export type BackgroundPreset =
  | "Academy Prospect"
  | "Wonderkid Prodigy"
  | "Late Bloomer"
  | "Street Footballer"
  | "Futsal Technician"
  | "Athletic Freak";

export type WeekPlanItem = {
  day: string;
  activity: "Train" | "Recovery" | "Rest" | "Media";
};

export type InboxMessage = {
  id: string;
  from: "Coach" | "Medical" | "Agent" | "Media" | "Club";
  subject: string;
  body: string;
  choices?: { id: string; label: string; effect: string }[];
  resolved?: boolean;
};

export type MatchEvent = {
  minute: number;
  description: string;
  type: "goal" | "chance" | "card" | "note";
};

export type MatchReport = {
  id: string;
  opponent: string;
  date: string;
  result: string;
  rating: number;
  breakdown: { label: string; value: number; note: string }[];
  stats: { shots: number; assists: number; keyPasses: number; tackles: number };
  timeline: MatchEvent[];
};

export type WorldState = {
  meta: {
    createdAt: string;
    currentDate: string;
    seasonYear: number;
    weekNumber: number;
    rngSeed: number;
  };
  player: {
    identity: {
      name: string;
      nationality: string;
      age: number;
      heightCm: number;
      weightKg: number;
      preferredFoot: "Left" | "Right" | "Both";
      personality: string;
    };
    positions: {
      primary: Position;
      secondary: Position | null;
    };
    role: PlayerRole;
    attributes: Record<string, number>;
    traits: string[];
    hiddenAttrs: Record<string, number>;
    form: number;
    fatigue: number;
    sharpness: number;
    injury: { status: "Fit" | "Doubtful" | "Injured"; daysOut: number };
    confidence: number;
    reputation: number;
    marketValue: number;
  };
  club: {
    name: string;
    facilities: number;
    coachTrust: number;
    tacticStyle: string;
  };
  squad: {
    teammates: { name: string; position: Position; rating: number }[];
  };
  league: {
    teams: { name: string; rating: number }[];
    fixtures: { week: number; opponent: string; home: boolean }[];
    standings: { name: string; points: number; played: number }[];
    leaders: { goals: string; assists: string; ratings: string };
  };
  inbox: {
    messages: InboxMessage[];
  };
  transfers: {
    rumors: string[];
    interest: string[];
    bids: string[];
  };
  logs: {
    weekly: string[];
    matches: MatchReport[];
  };
  calendar: {
    weekPlan: WeekPlanItem[];
  };
};
