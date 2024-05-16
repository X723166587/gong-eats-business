import {createStore} from "zustand/vanilla";
import {MenuItemData} from "@/app/api/definitions";
import {produce} from "immer";

export interface ItemState {
    items: MenuItemData[] | never
    totalCount: number
}

export interface ItemActions {
    addItem: (item: MenuItemData) => void
    removeItem: (itemId: MenuItemData) => void
}

export type ItemStore = ItemState & ItemActions

export const initItemStore = (): ItemState => {
    return {...defaultInitState}
}

export const defaultInitState: ItemState = {
    items: [],
    totalCount: 0
}

export const createItemStore = (
    initState: ItemState = defaultInitState,
) => {
    return createStore<ItemStore>((set) => ({
        ...initState,
        addItem: (thisItem: MenuItemData) => set(produce((state: ItemState) => {
            state.items.push(thisItem)
            ++state.totalCount
        })),
        removeItem: (thisItem: MenuItemData) => set(produce((state: ItemState) => {
            const itemIndex = state.items
                .filter((e) => e.restaurant_id === thisItem.restaurant_id)      // find the restaurant which has thisItem
                .findIndex((item) => item.item_id === thisItem.item_id)
            itemIndex !== -1 && state.items.splice(itemIndex, 1)
            --state.totalCount
        })),
    }))
}