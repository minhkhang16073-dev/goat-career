import type { WorldState } from "@/lib/state/types";

export type SaveSlot = {
  id: string;
  name: string;
  worldState: WorldState;
  createdAt: string;
  updatedAt: string;
};

export const listSaves = async () => {
  const response = await fetch("/api/saves", { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to load saves");
  return (await response.json()) as SaveSlot[];
};

export const createSave = async (name: string, worldState: WorldState) => {
  const response = await fetch("/api/saves", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, worldState }),
  });
  if (!response.ok) throw new Error("Failed to create save");
  return (await response.json()) as SaveSlot;
};

export const loadSave = async (id: string) => {
  const response = await fetch(`/api/saves/${id}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to load save");
  return (await response.json()) as SaveSlot;
};

export const updateSave = async (id: string, worldState: WorldState) => {
  const response = await fetch(`/api/saves/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ worldState }),
    }
  );
  if (!response.ok) throw new Error("Failed to update save");
  return (await response.json()) as SaveSlot;
};
