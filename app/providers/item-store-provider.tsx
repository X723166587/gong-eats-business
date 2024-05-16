// Tutorial: https://docs.pmnd.rs/zustand/guides/nextjs#providing-the-store

'use client'

import {type ReactNode, createContext, useRef, useContext} from "react";
import {type StoreApi, useStore} from "zustand";

import {type ItemStore, createItemStore, initItemStore} from "@/app/store/item-store";

export const ItemStoreContext = createContext<StoreApi<ItemStore> | null>(null);

export interface ItemStoreProviderProps {
    children: ReactNode
}

export const ItemStoreProvider = ({children}: ItemStoreProviderProps) => {
    const storeRef = useRef<StoreApi<ItemStore>>()
    if (!storeRef.current) {
        storeRef.current = createItemStore(initItemStore())
    }

    return (
        <ItemStoreContext.Provider value={storeRef.current}>
            {children}
        </ItemStoreContext.Provider>
    )
}

export const useItemStore = <T,>(selector: (store: ItemStore) => T): T => {
    const itemStoreContext = useContext(ItemStoreContext)

    if (!itemStoreContext) {
        throw new Error("useItemStore must be used within a ItemStoreProvider")
    }

    return useStore(itemStoreContext, selector)
}

