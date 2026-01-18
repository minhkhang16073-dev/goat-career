"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWorldState } from "@/lib/state/WorldStateProvider";

export default function ProfilePage() {
  const { worldState } = useWorldState();

  if (!worldState) {
    return <div className="text-sm text-neutral-400">Load a save to view profile.</div>;
  }

  const { identity } = worldState.player;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Player Profile</h2>
        <p className="text-sm text-neutral-400">Identity, roles, and personal overview.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{identity.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 text-sm">
          <div>
            <p className="text-neutral-400">Nationality</p>
            <p>{identity.nationality}</p>
          </div>
          <div>
            <p className="text-neutral-400">Age</p>
            <p>{identity.age}</p>
          </div>
          <div>
            <p className="text-neutral-400">Preferred Foot</p>
            <p>{identity.preferredFoot}</p>
          </div>
          <div>
            <p className="text-neutral-400">Personality</p>
            <p>{identity.personality}</p>
          </div>
          <div>
            <p className="text-neutral-400">Positions</p>
            <p>{worldState.player.positions.primary} / {worldState.player.positions.secondary ?? "-"}</p>
          </div>
          <div>
            <p className="text-neutral-400">Role</p>
            <p>{worldState.player.role}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Traits</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {worldState.player.traits.map((trait) => (
            <Badge key={trait} variant="muted">
              {trait}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hidden Attributes</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-3 text-sm">
          {Object.entries(worldState.player.hiddenAttrs).map(([key, value]) => (
            <div key={key} className="rounded-md border border-neutral-800 px-3 py-2">
              <p className="capitalize text-neutral-400">{key}</p>
              <p className="text-lg font-semibold">{value}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
