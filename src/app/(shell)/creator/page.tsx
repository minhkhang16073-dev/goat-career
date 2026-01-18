"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { createSeed, createWorldState, getBackgroundCaps, randomizeHiddenAttrs } from "@/lib/state/create";
import type { BackgroundPreset, PlayerRole, Position } from "@/lib/state/types";
import { useWorldState } from "@/lib/state/WorldStateProvider";

const roles: PlayerRole[] = [
  "Sweeper Keeper",
  "Wing Back",
  "Ball Playing Defender",
  "Anchor",
  "Box-to-Box",
  "Advanced Playmaker",
  "Inside Forward",
  "Winger",
  "Pressing Forward",
  "Complete Forward",
];

const positions: Position[] = ["GK", "RB", "CB", "LB", "DM", "CM", "AM", "RW", "LW", "ST"];

const backgrounds: BackgroundPreset[] = [
  "Academy Prospect",
  "Wonderkid Prodigy",
  "Late Bloomer",
  "Street Footballer",
  "Futsal Technician",
  "Athletic Freak",
];

const baseAttributes = [
  "pace",
  "stamina",
  "strength",
  "passing",
  "dribbling",
  "finishing",
  "tackling",
  "vision",
  "composure",
  "workRate",
  "technique",
  "positioning",
];

export default function CreatorPage() {
  const router = useRouter();
  const { createNewSave } = useWorldState();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("Alex Mercer");
  const [nationality, setNationality] = useState("England");
  const [age, setAge] = useState(19);
  const [heightCm, setHeightCm] = useState(182);
  const [weightKg, setWeightKg] = useState(74);
  const [preferredFoot, setPreferredFoot] = useState<"Left" | "Right" | "Both">("Right");
  const [personality, setPersonality] = useState("Driven");
  const [primary, setPrimary] = useState<Position>("ST");
  const [secondary, setSecondary] = useState<Position | "None">("None");
  const [role, setRole] = useState<PlayerRole>("Pressing Forward");
  const [background, setBackground] = useState<BackgroundPreset>("Academy Prospect");
  const [traits, setTraits] = useState<string[]>(["Plays One-Twos", "Likes To Beat Offside Trap"]);
  const [hiddenAttrs, setHiddenAttrs] = useState<Record<string, number>>({
    consistency: 10,
    injuryProne: 8,
    bigMatches: 10,
    professionalism: 10,
    ambition: 11,
    pressureHandling: 9,
  });

  const caps = getBackgroundCaps(background);
  const [attributes, setAttributes] = useState<Record<string, number>>(
    baseAttributes.reduce((acc, key) => ({ ...acc, [key]: 8 }), {})
  );

  const pointsUsed = useMemo(
    () => Object.values(attributes).reduce((sum, value) => sum + value, 0),
    [attributes]
  );

  const pointsRemaining = caps.points - pointsUsed;

  const updateAttribute = (key: string, delta: number) => {
    setAttributes((prev) => {
      const next = Math.min(caps.max, Math.max(5, prev[key] + delta));
      if (pointsRemaining - delta < 0 && delta > 0) return prev;
      return { ...prev, [key]: next };
    });
  };

  const toggleTrait = (trait: string) => {
    setTraits((prev) =>
      prev.includes(trait) ? prev.filter((item) => item !== trait) : [...prev, trait].slice(0, 4)
    );
  };

  const randomizeHidden = () => {
    const seed = createSeed();
    setHiddenAttrs(randomizeHiddenAttrs(seed, background));
  };

  const startCareer = async () => {
    const seed = createSeed();
    const worldState = createWorldState({
      name,
      nationality,
      age,
      heightCm,
      weightKg,
      preferredFoot,
      personality,
      primary,
      secondary: secondary === "None" ? null : secondary,
      role,
      background,
      traits,
      hiddenAttrs,
      attributes,
      seed,
    });
    await createNewSave(`${name} - ${worldState.club.name}`, worldState);
    router.push("/home");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Player Creator</h2>
          <p className="text-sm text-neutral-400">Step {step} of 6</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setStep(Math.max(1, step - 1))}>
            Back
          </Button>
          {step < 6 ? (
            <Button size="sm" onClick={() => setStep(step + 1)}>
              Next
            </Button>
          ) : (
            <Button size="sm" onClick={startCareer}>
              Start Career
            </Button>
          )}
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Identity</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" />
            <Input value={nationality} onChange={(event) => setNationality(event.target.value)} placeholder="Nationality" />
            <Input type="number" value={age} onChange={(event) => setAge(Number(event.target.value))} min={15} max={35} />
            <div className="flex gap-2">
              <Input type="number" value={heightCm} onChange={(event) => setHeightCm(Number(event.target.value))} />
              <Input type="number" value={weightKg} onChange={(event) => setWeightKg(Number(event.target.value))} />
            </div>
            <Select value={preferredFoot} onChange={(event) => setPreferredFoot(event.target.value as "Left" | "Right" | "Both")}>
              <option>Right</option>
              <option>Left</option>
              <option>Both</option>
            </Select>
            <Input value={personality} onChange={(event) => setPersonality(event.target.value)} placeholder="Personality" />
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Position & Role</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <Select value={primary} onChange={(event) => setPrimary(event.target.value as Position)}>
              {positions.map((position) => (
                <option key={position}>{position}</option>
              ))}
            </Select>
            <Select value={secondary} onChange={(event) => setSecondary(event.target.value as Position | "None")}>
              <option>None</option>
              {positions.map((position) => (
                <option key={position}>{position}</option>
              ))}
            </Select>
            <Select value={role} onChange={(event) => setRole(event.target.value as PlayerRole)}>
              {roles.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Background Preset</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 md:grid-cols-2">
            {backgrounds.map((item) => (
              <button
                key={item}
                className={`rounded-md border px-3 py-2 text-left text-sm ${
                  background === item ? "border-emerald-400 bg-emerald-400/10 text-emerald-200" : "border-neutral-700 bg-neutral-900"
                }`}
                onClick={() => setBackground(item)}
              >
                <div className="font-semibold">{item}</div>
                <div className="text-xs text-neutral-400">Points {getBackgroundCaps(item).points} / Cap {getBackgroundCaps(item).max}</div>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Attribute Point Buy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-center gap-3 text-sm">
              <Badge>Points remaining: {pointsRemaining}</Badge>
              <Badge variant="muted">Cap: {caps.max}</Badge>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {baseAttributes.map((attr) => (
                <div key={attr} className="flex items-center justify-between rounded-md border border-neutral-800 px-3 py-2 text-sm">
                  <span className="capitalize">{attr}</span>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => updateAttribute(attr, -1)}>
                      -
                    </Button>
                    <span className="w-6 text-center">{attributes[attr]}</span>
                    <Button size="sm" variant="outline" onClick={() => updateAttribute(attr, 1)}>
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Traits & Hidden Attributes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {["Plays One-Twos", "Cuts Inside", "Likes To Beat Offside Trap", "Gets Forward", "Dictates Tempo", "Knocks Ball Past Opponent"].map((trait) => (
                <button
                  key={trait}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    traits.includes(trait) ? "border-emerald-400 bg-emerald-400/10 text-emerald-200" : "border-neutral-700 text-neutral-300"
                  }`}
                  onClick={() => toggleTrait(trait)}
                >
                  {trait}
                </button>
              ))}
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              {Object.entries(hiddenAttrs).map(([key, value]) => (
                <div key={key} className="rounded-md border border-neutral-800 px-3 py-2 text-sm">
                  <p className="capitalize text-neutral-400">{key}</p>
                  <p className="text-lg font-semibold text-neutral-100">{value}</p>
                </div>
              ))}
            </div>
            <Button size="sm" variant="secondary" onClick={randomizeHidden}>
              Randomize within background
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 6 && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Start</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2 text-sm">
            <div>
              <p className="text-neutral-400">Name</p>
              <p>{name}</p>
            </div>
            <div>
              <p className="text-neutral-400">Nationality</p>
              <p>{nationality}</p>
            </div>
            <div>
              <p className="text-neutral-400">Role</p>
              <p>{role}</p>
            </div>
            <div>
              <p className="text-neutral-400">Background</p>
              <p>{background}</p>
            </div>
            <div>
              <p className="text-neutral-400">Traits</p>
              <p>{traits.join(", ")}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
