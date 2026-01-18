"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { estimateInjuryRisk } from "@/lib/sim/training";
import { useWorldState } from "@/lib/state/WorldStateProvider";

export default function TrainingPage() {
  const { worldState } = useWorldState();

  if (!worldState) {
    return <div className="text-sm text-neutral-400">Load a save to view training.</div>;
  }

  const risk = estimateInjuryRisk(worldState);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Training</h2>
        <p className="text-sm text-neutral-400">Monitor workload, fatigue, and injury risk.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Workload</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3 text-sm">
          <div>
            <p className="text-neutral-400">Fatigue</p>
            <p className="text-lg font-semibold">{worldState.player.fatigue}</p>
          </div>
          <div>
            <p className="text-neutral-400">Sharpness</p>
            <p className="text-lg font-semibold">{worldState.player.sharpness}</p>
          </div>
          <div>
            <p className="text-neutral-400">Injury Risk</p>
            <Badge variant={risk > 0.6 ? "danger" : risk > 0.4 ? "warning" : "default"}>
              {Math.round(risk * 100)}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Focus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {worldState.calendar.weekPlan.map((plan) => (
                <TableRow key={plan.day}>
                  <TableCell>{plan.day}</TableCell>
                  <TableCell>{plan.activity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
