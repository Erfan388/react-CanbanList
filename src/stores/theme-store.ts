import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import type {Theme} from "@/types/theme.ts";

type ThemeStore = {
    theme:  Theme;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: "light",
            toggleTheme: () => set((state) => ({theme: state.theme === "dark" ? "light" : "dark"})),
        }),
        {name : 'theme'}
    )
);