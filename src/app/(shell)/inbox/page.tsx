"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { applyInboxChoice } from "@/lib/sim/inbox";
import { useWorldState } from "@/lib/state/WorldStateProvider";

export default function InboxPage() {
  const { worldState, setWorldState } = useWorldState();

  if (!worldState) {
    return <div className="text-sm text-neutral-400">Load a save to view your inbox.</div>;
  }

  const handleChoice = (messageId: string, choiceId: string) => {
    const updated = applyInboxChoice(worldState, messageId, choiceId);
    setWorldState(updated);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Inbox</h2>
        <p className="text-sm text-neutral-400">Weekly directives, press requests, and agent updates.</p>
      </div>

      <div className="space-y-3">
        {worldState.inbox.messages.map((message) => (
          <Card key={message.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{message.subject}</CardTitle>
              <Badge variant={message.resolved ? "muted" : "default"}>{message.from}</Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-neutral-300">{message.body}</p>
              {message.choices && !message.resolved && (
                <div className="flex flex-wrap gap-2">
                  {message.choices.map((choice) => (
                    <Button key={choice.id} size="sm" variant="outline" onClick={() => handleChoice(message.id, choice.id)}>
                      {choice.label}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
