'use server'

import {MenuItemData} from "@/app/api/definitions";

export async function updateMenu(formData: FormData) {
    const rawFormData: Omit<MenuItemData, "item_id"> = {
        item_name: formData.get("item_name") as string,
        restaurant_id: 1,
        item_category: formData.get("item_category") as string,
        item_description: formData.get("item_description") as string,
        item_price: Number(formData.get("item_price")),
        item_image: formData.get("item_image") as string
    }
}