import { create } from "zustand";

interface GlobalStore {
  sidebarIsClosed: boolean;
  setSidebarIsClosed: () => void;
  inquiry: string;
  setInquiry: (value: string) => void;
  FAQ: string;
  setFAQ: (value: string) => void;
  version: string;
  setVersion: (version: string) => void;
}

export const useStore = create<GlobalStore>((set) => ({
  sidebarIsClosed: false,
  setSidebarIsClosed: () =>
    set((state) => ({ sidebarIsClosed: !state.sidebarIsClosed })),
  inquiry: "",
  setInquiry: (value: string) => set({ inquiry: value }),
  FAQ: "",
  setFAQ: (value: string) => set({ FAQ: value }),
  version: "",
  setVersion: (version: string) => set({ version: version }),
}));
