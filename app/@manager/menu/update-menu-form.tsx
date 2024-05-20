import React from "react";
import {MenuItemData} from "@/app/api/definitions";
import {updateMenu} from "@/app/api/update-menu";

export default function UpdateMenuForm({selectedItem, groupedMenuItems}: {
    selectedItem: MenuItemData | null,
    groupedMenuItems: Record<string, MenuItemData[]>
}) {
    return (
        <form action={updateMenu} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="item-name" className="font-medium text-base">Name</label>
                <input type="text" id="item-name"
                       className="px-4 py-2 rounded-2xl font-normal bg-surfaceContainer hover:bg-surfaceDim transform-all"
                       value={selectedItem?.item_name ?? ""}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="item-category" className="font-medium text-base">Item Category</label>
                <select id="item-category"
                        className="px-4 py-2 rounded-2xl font-normal bg-surfaceContainer hover:bg-surfaceDim transform-all"
                        value={selectedItem?.item_category ?? ""}
                >
                    <option value="" disabled selected></option>
                    {Object.keys(groupedMenuItems).map((category, key) => (
                        <option value={category} key={key}>{category}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="item-description" className="font-medium text-base">Item Description</label>
                <textarea id="item-description"
                          className="px-4 py-3 rounded-2xl font-normal bg-surfaceContainer hover:bg-surfaceDim transform-all"
                          value={selectedItem?.item_description ?? ""}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="item-price" className="font-medium text-base">Item Price</label>
                <div className="flex items-center">
                    <span className="font-semibold text-base mr-2">$</span>
                    <input type="number" id="item-price" step="0.01"
                           className="px-4 py-2 rounded-2xl font-normal bg-surfaceContainer hover:bg-surfaceDim transform-all w-full"
                           value={selectedItem?.item_price ?? ""}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="item-image" className="font-medium text-base">Item Image</label>
                <input type="text" id="item-image"
                       className="px-4 py-2 rounded-2xl font-normal bg-surfaceContainer hover:bg-surfaceDim transform-all"
                       value={selectedItem?.item_image ?? ""}/>
            </div>
        </form>
    )
}