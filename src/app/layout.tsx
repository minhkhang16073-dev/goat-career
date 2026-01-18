import type { Metadata } from "next";
import "./globals.css";
import { WorldStateProvider } from "@/lib/state/WorldStateProvider";

export const metadata: Metadata = {
  title: "GOAT Career",
  description: "Football Manager style player career simulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        <WorldStateProvider>{children}</WorldStateProvider>
      </body>
    </html>
  );
}
