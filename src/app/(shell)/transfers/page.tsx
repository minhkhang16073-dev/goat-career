"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { addSampleBid } from "@/lib/sim/transfers";
import { useWorldState } from "@/lib/state/WorldStateProvider";

export default function TransfersPage() {
  const { worldState, setWorldState } = useWorldState();

  if (!worldState) {
    return <div className="text-sm text-neutral-400">Load a save to review transfer activity.</div>;
  }

  const handleSampleBid = () => {
    setWorldState(addSampleBid(worldState));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Transfers Lite</h2>
          <p className="text-sm text-neutral-400">Track rumors and sample offers.</p>
        </div>
        <Button size="sm" variant="outline" onClick={handleSampleBid}>
          Add Sample Bid
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Rumors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {worldState.transfers.rumors.map((rumor) => (
              <div key={rumor} className="rounded-md border border-neutral-800 px-3 py-2">
                {rumor}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Interest</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {worldState.transfers.interest.map((item) => (
              <div key={item} className="rounded-md border border-neutral-800 px-3 py-2">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bids</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Offer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {worldState.transfers.bids.map((bid) => (
                  <TableRow key={bid}>
                    <TableCell>{bid}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
