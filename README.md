# GOAT Career

A Football Manager–style player career simulator with a dense, inbox-driven UI. Build a player, plan your week, advance time, simulate matches, and track your progression in a single deterministic world state.

## Stack
- Next.js App Router + TypeScript
- Tailwind + shadcn/ui styling primitives + lucide-react icons
- Prisma + SQLite

## Run
```bash
npm install
npx prisma migrate dev
npm run dev
```

## Core Loop
1. **New Career** → Player Creator wizard (identity, position, background, attributes, traits)
2. **Calendar** → Plan the week
3. **Advance Week** → Training gains + inbox + transfer rumors
4. **Match Center** → Simulate match + rating breakdown
5. **Save/Load** → Persist and reload the full WorldState JSON

## World State
The entire simulation is stored in a single JSON document (`SaveSlot.worldStateJson`):
- `meta`: createdAt, currentDate, seasonYear, weekNumber, rngSeed
- `player`: identity, positions, role, attributes (0–20), traits, hidden attrs, form, fatigue, sharpness
- `club`: name, facilities, coachTrust, tacticStyle
- `squad`, `league`, `inbox`, `transfers`, `logs`, `calendar`

Deterministic RNG is seeded via `meta.rngSeed` and advanced after each sim step.

## Features Implemented
- FM-style dark shell (sidebar + topbar with form/fatigue/sharpness)
- Player Creator wizard with point-buy attributes and background caps
- Weekly planner + Advance Week simulation
- Match Center with timeline + rating breakdown
- Training dashboard with injury risk
- Inbox messages with choices and effects
- Transfers-lite (rumors, interest, sample offers)
- Stats Hub and Profile pages

## Data Model
Prisma SQLite `SaveSlot`:
- `id` (uuid)
- `name`
- `worldStateJson` (TEXT)
- `createdAt`, `updatedAt`
