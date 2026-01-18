import Link from "next/link";
import { Calendar, Home, Inbox, User, ClipboardList, Dumbbell, ArrowLeftRight, BarChart2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/creator", label: "Player Creator", icon: User },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/match", label: "Match Center", icon: ClipboardList },
  { href: "/training", label: "Training", icon: Dumbbell },
  { href: "/transfers", label: "Transfers", icon: ArrowLeftRight },
  { href: "/stats", label: "Stats Hub", icon: BarChart2 },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const Sidebar = () => (
  <aside className="flex h-screen w-56 flex-col border-r border-neutral-800 bg-neutral-950 px-3 py-4">
    <div className="px-2 pb-4">
      <p className="text-xs uppercase text-neutral-500">GOAT Career</p>
      <h1 className="text-lg font-semibold text-neutral-100">Career Hub</h1>
    </div>
    <nav className="flex-1 space-y-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-2 text-sm text-neutral-300 hover:bg-neutral-900 hover:text-neutral-100"
          )}
        >
          <link.icon className="h-4 w-4 text-emerald-400" />
          {link.label}
        </Link>
      ))}
    </nav>
    <div className="mt-4 rounded-md border border-neutral-800 bg-neutral-900/40 px-2 py-3 text-xs text-neutral-400">
      Inbox-driven. Compact. FM-style.
    </div>
  </aside>
);
