import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SidebarState {
  isCollapsed: boolean;
  toggle: () => void;
  setCollapsed: (view: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      setCollapsed: (val) => set({ isCollapsed: val }),
    }),
    {
      name: "sidebar-storage", // Saves state in localStorage so it persists on refresh
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
