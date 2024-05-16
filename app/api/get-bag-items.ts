import {MenuItemData, RestaurantData} from "@/app/api/definitions";

export default function getBagItems(data: MenuItemData[]) {
    let totalPrice = 0
    data.forEach((item) => totalPrice += item.item_price)

    let uniqueItemsWithCount: { [key: string]: {itemData: MenuItemData, count: number}} = {}


    data.forEach((item) => {
        if (uniqueItemsWithCount[item.item_id]) {
            uniqueItemsWithCount[item.item_id].count += 1
        } else {
            uniqueItemsWithCount[item.item_id] = {itemData: item, count: 1}
        }
    })

    const groupedItems = Object.values(uniqueItemsWithCount)

    return {totalPrice, groupedItems}
}