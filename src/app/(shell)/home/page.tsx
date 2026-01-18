"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWorldState } from "@/lib/state/WorldStateProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const { worldState, saves, loadSaveSlot, persistSave, refreshSaves, activeSaveId } = useWorldState();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    refreshSaves().catch(() => null);
  }, [refreshSaves]);

  const handleLoad = async (id: string) => {
    setBusy(true);
    await loadSaveSlot(id);
    setBusy(false);
  };

  const handleSave = async () => {
    setBusy(true);
    await persistSave();
    setBusy(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Career Home</h2>
          <p className="text-sm text-neutral-400">Manage saves, view quick career snapshot.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/creator">
            <Button size="sm">New Career</Button>
          </Link>
          <Button variant="secondary" size="sm" onClick={handleSave} disabled={!worldState || busy}>
            Save
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Save Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {saves.map((save) => (
                  <TableRow key={save.id}>
                    <TableCell>{save.name}</TableCell>
                    <TableCell>{new Date(save.updatedAt).toLocaleString()}</TableCell>
                    <TableCell>
                      {save.id === activeSaveId ? (
                        <Badge>Active</Badge>
                      ) : (
                        <Badge variant="muted">Idle</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => handleLoad(save.id)} disabled={busy}>
                        Load
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {worldState ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Player</span>
                  <span>{worldState.player.identity.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Club</span>
                  <span>{worldState.club.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Week</span>
                  <span>{worldState.meta.weekNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Form</span>
                  <span>{worldState.player.form.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <p className="text-neutral-500">No active save loaded.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
