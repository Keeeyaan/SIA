import { create } from "zustand";

interface GlobalStore {
  sidebarIsClosed: boolean;
  setSidebarIsClosed: () => void;
}

export const useStore = create<GlobalStore>((set) => ({
  sidebarIsClosed: false,
  setSidebarIsClosed: () =>
    set((state) => ({ sidebarIsClosed: !state.sidebarIsClosed })),
}));