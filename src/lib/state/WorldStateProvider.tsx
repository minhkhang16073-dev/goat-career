"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { WorldState } from "@/lib/state/types";
import { createSave, listSaves, loadSave, updateSave } from "@/lib/state/storage";

const STORAGE_KEY = "goat-career-active-slot";

type WorldStateContextValue = {
  worldState: WorldState | null;
  activeSaveId: string | null;
  saves: { id: string; name: string; updatedAt: string }[];
  setWorldState: (state: WorldState) => void;
  createNewSave: (name: string, state: WorldState) => Promise<void>;
  loadSaveSlot: (id: string) => Promise<void>;
  refreshSaves: () => Promise<void>;
  persistSave: () => Promise<void>;
};

const WorldStateContext = createContext<WorldStateContextValue | undefined>(undefined);

export const WorldStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [worldState, setWorldState] = useState<WorldState | null>(null);
  const [activeSaveId, setActiveSaveId] = useState<string | null>(null);
  const [saves, setSaves] = useState<WorldStateContextValue["saves"]>([]);

  const refreshSaves = useCallback(async () => {
    const data = await listSaves();
    setSaves(data.map((save) => ({ id: save.id, name: save.name, updatedAt: save.updatedAt })));
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setActiveSaveId(stored);
      loadSave(stored)
        .then((save) => setWorldState(save.worldState))
        .catch(() => setWorldState(null));
    }
    refreshSaves().catch(() => null);
  }, [refreshSaves]);

  const createNewSave = useCallback(async (name: string, state: WorldState) => {
    const save = await createSave(name, state);
    setActiveSaveId(save.id);
    setWorldState(save.worldState);
    window.localStorage.setItem(STORAGE_KEY, save.id);
    await refreshSaves();
  }, [refreshSaves]);

  const loadSaveSlot = useCallback(async (id: string) => {
    const save = await loadSave(id);
    setActiveSaveId(save.id);
    setWorldState(save.worldState);
    window.localStorage.setItem(STORAGE_KEY, save.id);
  }, []);

  const persistSave = useCallback(async () => {
    if (!worldState || !activeSaveId) return;
    await updateSave(activeSaveId, worldState);
    await refreshSaves();
  }, [activeSaveId, refreshSaves, worldState]);

  const value = useMemo(
    () => ({
      worldState,
      activeSaveId,
      saves,
      setWorldState,
      createNewSave,
      loadSaveSlot,
      refreshSaves,
      persistSave,
    }),
    [worldState, activeSaveId, saves, createNewSave, loadSaveSlot, refreshSaves, persistSave]
  );

  return <WorldStateContext.Provider value={value}>{children}</WorldStateContext.Provider>;
};

export const useWorldState = () => {
  const context = useContext(WorldStateContext);
  if (!context) throw new Error("WorldStateProvider missing");
  return context;
};
