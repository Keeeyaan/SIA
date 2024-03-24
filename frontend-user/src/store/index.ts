import { create } from "zustand";

interface GlobalStore {
  sidebarIsClosed: boolean;
  setSidebarIsClosed: () => void;
  conversationPending: boolean;
  setConversationPending: (isPending: boolean) => void;
  inquiry: string;
  setInquiry: (value: string) => void;
}

export const useStore = create<GlobalStore>((set) => ({
  sidebarIsClosed: false,
  setSidebarIsClosed: () =>
    set((state) => ({ sidebarIsClosed: !state.sidebarIsClosed })),
  conversationPending: false,
  setConversationPending: (isPending: boolean) => set({ conversationPending: isPending }),
  inquiry: "",
  setInquiry: (value: string) => set({ inquiry: value })
}));