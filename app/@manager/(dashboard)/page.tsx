import React from "react";
import {Button} from "@/app/components/button";
import {MenuItemData, OrderData, RestaurantData} from "@/app/api/definitions";
import getServerData from "@/app/api/get-server-data";
import {AnalyticsLineChart} from "@/app/@manager/(dashboard)/components/analytics-line-chart";
import getOrders from "@/app/api/orders/get-orders";
import groupItemsByKey from "@/app/api/group-items";

export default async function DashboardPage() {
    const restaurantId = 1
    const restaurantData: RestaurantData = await getServerData(`/restaurant/${restaurantId}`)
    const ordersData: OrderData[] = await getServerData(`/orders/restaurant/${restaurantId}`)

    const ordersDateStrings = ordersData.map(order => new Date(order.create_time!).toDateString())

    const salesByDate = ordersData.reduce((acc: {date: string, sales: number}[], order, index) => {
        const date = ordersDateStrings[index]; // get the date string from the converted array
        const existingOrder = acc.find(item => item.date === date);

        if (existingOrder) {
            existingOrder.sales += order.order_subtotal; // add the subtotal to the existing date
        } else {
            acc.push({ date, sales: order.order_subtotal }); // push a new object if the date does not exist
        }

        return acc;
    }, []);

    const totalOrderSubtotal = ordersData.reduce((acc, order) => acc + order.order_subtotal, 0)

    return (
        <div className="grid grid-cols-3 gap-6">
            <section className="col-span-1 grid-container h-fit">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="font-semibold text-2xl tracking-tight">{restaurantData.restaurant_name}</h1>
                    <Button icon={{iconName: "edit"}}/>
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
                    <h1 className="font-semibold text-2xl tracking-tight">Sales Total</h1>
                </div>
                <p className="text-3xl">A${totalOrderSubtotal}</p>
                <div className="h-72">
                    <AnalyticsLineChart dataset={salesByDate}/>
                </div>
            </section>
        </div>
    );
}