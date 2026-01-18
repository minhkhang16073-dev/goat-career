"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorldState } from "@/lib/state/WorldStateProvider";

export default function SettingsPage() {
  const { worldState, activeSaveId } = useWorldState();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Settings</h2>
        <p className="text-sm text-neutral-400">Save metadata and app preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Save</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Save ID</span>
            <span>{activeSaveId ?? "None"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Season Year</span>
            <span>{worldState?.meta.seasonYear ?? "-"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Seed</span>
            <span>{worldState?.meta.rngSeed ?? "-"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
