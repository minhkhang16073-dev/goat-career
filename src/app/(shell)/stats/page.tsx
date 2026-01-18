"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useWorldState } from "@/lib/state/WorldStateProvider";

export default function StatsPage() {
  const { worldState } = useWorldState();

  if (!worldState) {
    return <div className="text-sm text-neutral-400">Load a save to view stats.</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Stats Hub</h2>
        <p className="text-sm text-neutral-400">Attribute profile and performance summary.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attributes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attribute</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(worldState.player.attributes).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell className="capitalize">{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
