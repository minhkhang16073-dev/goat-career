"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { simulateMatch } from "@/lib/sim/match";
import { useWorldState } from "@/lib/state/WorldStateProvider";

export default function MatchPage() {
  const { worldState, setWorldState } = useWorldState();

  if (!worldState) {
    return <div className="text-sm text-neutral-400">Load a save to access Match Center.</div>;
  }

  const fixture = worldState.league.fixtures.find((item) => item.week === worldState.meta.weekNumber);
  const latestReport = worldState.logs.matches[0];

  const handleSimulate = () => {
    const { state } = simulateMatch(worldState);
    setWorldState(state);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Match Center</h2>
          <p className="text-sm text-neutral-400">Pre-match prep, live simulation, and post-game report.</p>
        </div>
        <Button size="sm" onClick={handleSimulate}>
          Simulate Match
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fixture</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between text-sm">
          <div>
            <p className="text-neutral-400">Opponent</p>
            <p className="text-lg font-semibold">{fixture?.opponent ?? "TBD"}</p>
          </div>
          <div>
            <p className="text-neutral-400">Venue</p>
            <p>{fixture?.home ? "Home" : "Away"}</p>
          </div>
          <div>
            <p className="text-neutral-400">Status</p>
            <Badge variant="muted">Matchweek {worldState.meta.weekNumber}</Badge>
          </div>
        </CardContent>
      </Card>

      {latestReport && (
        <Card>
          <CardHeader>
            <CardTitle>Latest Report vs {latestReport.opponent}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <p className="text-neutral-400">Result</p>
                <p className="text-lg font-semibold">{latestReport.result}</p>
              </div>
              <div>
                <p className="text-neutral-400">Rating</p>
                <p className="text-lg font-semibold">{latestReport.rating.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-neutral-400">Shots</p>
                <p>{latestReport.stats.shots}</p>
              </div>
              <div>
                <p className="text-neutral-400">Assists</p>
                <p>{latestReport.stats.assists}</p>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rating Factor</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestReport.breakdown.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell>{row.label}</TableCell>
                    <TableCell>{row.value.toFixed(1)}</TableCell>
                    <TableCell className="text-neutral-400">{row.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {latestReport?.timeline.map((event) => (
            <div key={`${event.minute}-${event.description}`} className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span>{event.description}</span>
              <span className="text-neutral-500">{event.minute}'</span>
            </div>
          )) ?? <p className="text-neutral-500">No events yet. Simulate to generate.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
