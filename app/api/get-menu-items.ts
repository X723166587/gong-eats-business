'use server'

import { MenuItemData, RestaurantData } from "@/app/api/definitions";
import getServerData from "@/app/api/get-server-data";

export async function getMenuItems(restaurantId: RestaurantData["restaurant_id"]) {
    const restaurantMenu: Promise<MenuItemData[]> = getServerData(`/menu?restaurant_id=${restaurantId}`)

    return restaurantMenu
}