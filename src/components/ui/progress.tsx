import * as React from "react";
import { cn } from "@/lib/utils";

export const Progress = ({ value, className }: { value: number; className?: string }) => (
  <div className={cn("h-2 w-full rounded-full bg-neutral-800", className)}>
    <div
      className="h-full rounded-full bg-emerald-400"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);
