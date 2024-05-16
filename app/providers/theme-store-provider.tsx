'use client'

import {type ReactNode, createContext, useRef, useContext} from "react";
import {type StoreApi, useStore} from "zustand";

import {type ThemeStore, createThemeStore, initThemeStore} from "@/app/store/theme-store";

export const ThemeStoreContext = createContext<StoreApi<ThemeStore> | null>(null);

export interface ThemeStoreProviderProps {
    children: ReactNode
}

export const ThemeStoreProvider = ({children}: ThemeStoreProviderProps) => {
    const storeRef = useRef<StoreApi<ThemeStore>>()
    if (!storeRef.current) {
        storeRef.current = createThemeStore(initThemeStore())
    }

    return (
        <ThemeStoreContext.Provider value={storeRef.current}>
            {children}
        </ThemeStoreContext.Provider>
    )
}

export const useThemeStore = <T,>(selector: (store: ThemeStore) => T): T => {
    const themeStoreContext: StoreApi<ThemeStore> | null = useContext(ThemeStoreContext)

    if (!themeStoreContext) {
        throw new Error("useThemeStore must be used within a ThemeStoreProvider")
    }

    return useStore(themeStoreContext, selector)
}