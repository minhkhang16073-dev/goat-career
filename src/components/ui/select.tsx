import * as React from "react";
import { cn } from "@/lib/utils";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-9 w-full rounded-md border border-neutral-700 bg-neutral-900 px-2 text-sm text-neutral-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500",
        className
      )}
      {...props}
    />
  )
);
Select.displayName = "Select";
