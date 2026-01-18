"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select } from "@/components/ui/select";
import { advanceWeek } from "@/lib/state/advance";
import { useWorldState } from "@/lib/state/WorldStateProvider";

const activities = ["Train", "Recovery", "Rest", "Media"] as const;

export default function CalendarPage() {
  const { worldState, setWorldState } = useWorldState();
  const [busy, setBusy] = useState(false);

  if (!worldState) {
    return <div className="text-sm text-neutral-400">Load a save to plan your week.</div>;
  }

  const updateActivity = (index: number, value: string) => {
    const weekPlan = worldState.calendar.weekPlan.map((plan, idx) =>
      idx === index ? { ...plan, activity: value as (typeof activities)[number] } : plan
    );
    setWorldState({ ...worldState, calendar: { weekPlan } });
  };

  const handleAdvance = () => {
    setBusy(true);
    const updated = advanceWeek(worldState);
    setWorldState(updated);
    setBusy(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Weekly Planner</h2>
          <p className="text-sm text-neutral-400">Build your training week before advancing.</p>
        </div>
        <Button size="sm" onClick={handleAdvance} disabled={busy}>
          Advance Week
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Week {worldState.meta.weekNumber} Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {worldState.calendar.weekPlan.map((plan, index) => (
                <TableRow key={plan.day}>
                  <TableCell>{plan.day}</TableCell>
                  <TableCell>
                    <Select value={plan.activity} onChange={(event) => updateActivity(index, event.target.value)}>
                      {activities.map((activity) => (
                        <option key={activity} value={activity}>
                          {activity}
                        </option>
                      ))}
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
