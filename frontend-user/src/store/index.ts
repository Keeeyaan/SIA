import { create } from "zustand";

interface GlobalStore {
  sidebarIsClosed: boolean;
  setSidebarIsClosed: () => void;
  inquiry: string;
  setInquiry: (value: string) => void;
}

export const useStore = create<GlobalStore>((set) => ({
  sidebarIsClosed: false,
  setSidebarIsClosed: () =>
    set((state) => ({ sidebarIsClosed: !state.sidebarIsClosed })),
  inquiry: "",
  setInquiry: (value: string) =>
    set({ inquiry: value })
}));