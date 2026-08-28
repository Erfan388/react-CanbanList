import {create} from "zustand/react";
import {persist} from "zustand/middleware";

type SideBarStore = {
    isCollapsed: boolean;
    fold: () => void;
}

export const useSideBarStore = create<SideBarStore>()(
    persist(
        (set) => ({
            isCollapsed: false,
            fold: () => set((state) => ({isCollapsed: !state.isCollapsed})),
        }),
        {name : 'sidebar'}
    )
);