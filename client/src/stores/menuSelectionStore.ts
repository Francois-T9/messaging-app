import { create } from "zustand";
import type { SidebarMenuState } from "@/types/types";

export const useMenuSelectionStore = create<SidebarMenuState>()((set) => ({
  dashboardChild: "Messages",
  setDashboardChild: (selection: string) => set({ dashboardChild: selection }),
}));
