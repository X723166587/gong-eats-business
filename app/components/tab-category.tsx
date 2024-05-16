import {Tab, TabList} from "@/app/components/tabs";
import {Button} from "@/app/components/button";
import Image from "next/image";
import getEmoji from "@/app/api/get-emoji";
import React from "react";
import {CategoryData} from "@/app/api/definitions";

export default function TabCategory(props: { categories: CategoryData[], currentPath: string }) {
    return (
        <TabList className="h-full flex flex-row gap-12 flex-nowrap items-center overflow-x-scroll scroll mt-24 ">
            {props.currentPath != "/" && (
                <Tab href="/">
                    <Button icon={{iconName: "arrow_back"}} label="all" className="uppercase"></Button>
                </Tab>
            )}
            {props.categories.map((item) => (
                <Tab key={item.category_id} href={`${item.category_slug}`}
                     className="CategoryContainer flex flex-col items-center py-2 gap-2 w-16 flex-shrink-0">
                    <div className="relative">
                        <Image
                            src={getEmoji(item.category_icon, "color")}
                            alt={item.category_name}
                            width={64}
                            height={64}
                        />
                    </div>
                    <span
                        className="text-sm font-semibold uppercase tracking-wider text-nowrap">{item.category_name}</span>
                </Tab>
            ))}
        </TabList>
    )
}