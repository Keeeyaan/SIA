import { create } from "zustand";

interface AuthStore {
  sidebarIsClosed: boolean;
  setSidebarIsClosed: () => void;
}

export const useStore = create<AuthStore>((set) => ({
  sidebarIsClosed: false,
  setSidebarIsClosed: () =>
    set((state) => ({ sidebarIsClosed: !state.sidebarIsClosed })),
}));
