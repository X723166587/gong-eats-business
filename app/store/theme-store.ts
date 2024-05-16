import {createStore} from "zustand/vanilla";
import {produce} from "immer";

export interface ThemeState {
    background: `bg-${string}`
    themeMode: "light" | "dark"
}

export interface ThemeAction {
    setBackground: (background: ThemeState["background"]) => void
}

export type ThemeStore = ThemeState & ThemeAction

export const initThemeStore = (): ThemeState => {
    return {...defaultInitState}
}

export const defaultInitState: ThemeState = {
    background: "bg-surface",
    themeMode: "light"
}

export const createThemeStore = (
    initState: ThemeState = defaultInitState,
) => {
    return createStore<ThemeStore>((set) => ({
        ...initState,
        setBackground: (background) => set(produce((state: ThemeState) => {
            state.background = background
        })),
    }))
}