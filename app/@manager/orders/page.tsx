'use client'

import React, {useCallback} from "react";
import {Card_Order} from "@/app/components/card";
import {useEffect, useState} from "react";
import getOrders from "@/app/api/orders/get-orders";
import {CustomerData, OrderData} from "@/app/api/definitions";

export default function OrdersPage() {
    //  Automatically update the view when the status of an order is changed
    const [orders, setOrders] = useState<Array<OrderData & CustomerData & {item_count: number}>>([])
    const [prevOrderCount, setPrevOrderCount] = useState<number>(0)

    const fetchOrders = useCallback(async () => {
        const updatedOrders = await getOrders()
        // TODO: Check if there's a new order and notify the user
        // if (updatedOrders.length > prevOrderCount) {
        //     console.log("New order received!")
        // }
        // setPrevOrderCount(updatedOrders.length)
        setOrders(updatedOrders)
    }, [])

    useEffect(() => {
        void fetchOrders()

        // Fetch orders every 5 seconds
        const intervalID = setInterval(fetchOrders, 5000)

        // Cleanup interval on unmount
        return () => clearInterval(intervalID)
    }, [fetchOrders])


    const preparingOrders = orders.filter(order => order.order_status === "confirmed" || order.order_status === "accepted")
    const deliveringOrders = orders.filter(order => order.order_status === "delivering")
    const pastOrders = orders.filter(order => order.order_status === "delivered" || order.order_status === "rejected")
    const sortedPastOrders = pastOrders.sort((a, b) =>  b.order_id! - a.order_id! )


    const SectionContainer = ({children, sectionTitle, orderCounts}: { children: React.ReactNode, sectionTitle: string, orderCounts: number }) => {
        return (
            <section className="col-span-1 grid-container">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="font-semibold text-2xl tracking-tight">{sectionTitle}</h2>
                    <div className="flex items-center border border-outline py-1 px-4 rounded-xl">
                        <h2 className="font-normal text-xl tracking-tight text-onSurfaceVariant -translate-y-0.5">{orderCounts}</h2>
                    </div>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                    {children}
                </div>
            </section>
        )

    }

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-6">
                <SectionContainer sectionTitle="Preparing" orderCounts={preparingOrders.length}>
                    {preparingOrders.map((order) => (
                        <Card_Order order_id={order.order_id}
                                    order_status={order.order_status}
                                    order_subtotal={order.order_subtotal}
                                    items_count={order.item_count}
                                    customer_name={order.customer_name}
                                    customer_address={order.customer_address}
                                    customer_phone={order.customer_phone}
                                    onStatusChange={fetchOrders}
                                    key={order.order_id}
                        />
                    ))}
                </SectionContainer>
                <SectionContainer sectionTitle="Delivering" orderCounts={deliveringOrders.length}>
                    {deliveringOrders.map((order) => (
                        <Card_Order order_id={order.order_id}
                                    order_status={order.order_status}
                                    order_subtotal={order.order_subtotal}
                                    items_count={order.item_count}
                                    customer_name={order.customer_name}
                                    customer_address={order.customer_address}
                                    customer_phone={order.customer_phone}
                                    onStatusChange={fetchOrders}
                                    key={order.order_id}
                        />
                    ))}
                </SectionContainer>
            </div>
            <div className="grid grid-cols-1">
                <SectionContainer sectionTitle={"Past Orders"} orderCounts={0}>
                    <div className="grid grid-cols-3 gap-8">
                        {sortedPastOrders.map((order) => (
                            <Card_Order order_id={order.order_id}
                                        order_status={order.order_status}
                                        order_subtotal={order.order_subtotal}
                                        items_count={order.item_count}
                                        customer_name={order.customer_name}
                                        customer_address={order.customer_address}
                                        customer_phone={order.customer_phone}
                                        onStatusChange={fetchOrders}
                                        key={order.order_id}
                            />
                        ))}
                    </div>
                </SectionContainer>
            </div>
        </div>

    );
}