import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
        warning: "border-amber-400/40 bg-amber-400/10 text-amber-200",
        danger: "border-rose-400/40 bg-rose-400/10 text-rose-200",
        muted: "border-neutral-700 bg-neutral-800 text-neutral-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <div className={cn(badgeVariants({ variant }), className)} {...props} />
);
