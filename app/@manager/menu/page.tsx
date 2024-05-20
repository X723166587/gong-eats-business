'use client'

import React, {useCallback, useEffect} from "react";
import {motion} from "framer-motion";
import {MenuItemData} from "@/app/api/definitions";
import groupItemsByKey from "@/app/api/group-items";
import {Button} from "@/app/components/button";
import Image from "next/image";
import {getMenuItems} from "@/app/api/get-menu-items";
import {emphasizedEasing_Medium} from "@/app/api/motion-config";
import UpdateMenuForm from "@/app/@manager/menu/update-menu-form";

export default function MenuPage() {
    const restaurantId = 1
    const [menuItemData, setMenuItemData] = React.useState<MenuItemData[]>([])
    const [selectedItem, setSelectedItem] = React.useState<MenuItemData | null>(null)

    const fetchMenuItems = useCallback(async () => {
        const menuItems = await getMenuItems(restaurantId)
        setMenuItemData(menuItems)
    }, [])

    useEffect(() => {
        void fetchMenuItems()
    }, [fetchMenuItems])

    const handleSelectItem = (item: MenuItemData) => {
        if (selectedItem === item) {
            setSelectedItem(null)
        } else {
            setSelectedItem(item)
        }
    }

    const groupedMenuItems: Record<string, MenuItemData[]> = groupItemsByKey(menuItemData, "item_category")

    return (
        <div className="flex flex-row gap-6">
            <div className={`${selectedItem ? "w-2/3" : "w-full"} grid-container transition-all`}>
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-lg font-normal">{menuItemData.length} items</h2>
                    <Button icon={{iconName: "add"}} label={"Add Item"}/>
                </div>
                <div className="border-b border-outlineVariant my-4"/>
                <div className="flex flex-col gap-4">
                    {Object.entries(groupedMenuItems).map(([category, items]) => (
                        <section key={category} className="my-4">
                            <h3 className="font-semibold text-2xl tracking-tight">{category}</h3>
                            <div className="flex flex-col gap-4 mt-4">
                                {items.map((item) => (
                                    <motion.div
                                        className={`p-4 rounded-3xl border border-outlineVariant transition-all hover:bg-primaryContainer ${item === selectedItem ? "bg-primaryContainer" : "bg-surface"} cursor-pointer`}
                                        onClick={() => handleSelectItem(item)}
                                        whileTap={{scale: 0.95, transition: emphasizedEasing_Medium}}
                                        key={item.item_id}
                                    >
                                        <div key={item.item_id}
                                             className="flex flex-row justify-between items-center gap-4">
                                            <Image src={item.item_image} alt={item.item_name} width={48} height={48}
                                                   objectFit={"cover"}
                                                   className="border border-outlineVariant rounded-lg aspect-square object-cover"/>
                                            <div className="flex flex-row w-full justify-between items-center">
                                                <div className="flex flex-col">
                                                    <h3 className="font-semibold text-lg tracking-tight text-onSurface">{item.item_name}</h3>
                                                    <p className="font-normal text-base tracking-tight text-onSurfaceVariant">{item.item_description}</p>
                                                </div>
                                                {/*<p className="font-normal text-base tracking-tight">${item.item_price.toFixed(2)}</p>*/}
                                            </div>
                                            <div className="border-b border-outlineVariant my-4"/>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
            <div className={`sticky top-28 block w-1/3 grid-container h-fit ${selectedItem ? "opacity-100 block" : "opacity-0 hidden"} transition-all`}>
                <div className="flex flex-row justify-between items-center">
                    <h2 className="font-semibold text-2xl tracking-tight">Edit item</h2>
                    <div className="flex flex-row gap-4">
                        <Button icon={{iconName: "save"}} btnStyle={{color: "bg-primary", textColor: "text-onPrimary"}}
                                label={"Save"}/>
                        <Button icon={{iconName: "more_vert"}}/>
                    </div>
                </div>
                <div className="border-b border-outlineVariant my-4"/>
                <UpdateMenuForm selectedItem={selectedItem} groupedMenuItems={groupedMenuItems} />
            </div>
        </div>

    );
}