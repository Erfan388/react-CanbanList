import {create} from "zustand/react";

type SideBarStore = {
    isCollapsed: boolean;
    fold: () => void;
}

export const useSideBarStore = create<SideBarStore>()((set) => ({
    isCollapsed: false,
    fold: () => set((state) => ({isCollapsed: !state.isCollapsed})),
}));