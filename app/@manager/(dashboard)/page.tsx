import React from "react";
import {Button} from "@/app/components/button";
import {RestaurantData} from "@/app/api/definitions";
import getServerData from "@/app/api/get-server-data";

export default async function DashboardPage() {
    const restaurantId = 1
    const restaurantData: RestaurantData = await getServerData(`/restaurant/${restaurantId}`)

    return (
        <div className="grid grid-cols-3 gap-6">
            <section className="col-span-1 grid-container">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="font-semibold text-2xl tracking-tight">{restaurantData.restaurant_name}</h1>
                    <Button icon={{iconName: "edit"}} />
                </div>
                <div className="border-b border-outlineVariant my-4"/>
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="font-semibold text-lg">Phone</h3>
                        <p className="font-normal text-base">{restaurantData.restaurant_phone}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Address</h3>
                        <p className="font-normal text-base">{restaurantData.restaurant_address}</p>
                    </div>
                </div>
            </section>
            <section className="col-span-2 grid-container">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="font-semibold text-2xl tracking-tight">Analytics</h1>
                </div>
                <div>
                {/* TODO: A line chart reporting the revenue according time */}
                </div>
            </section>
        </div>
    );
}