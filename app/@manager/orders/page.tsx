import React from "react";
import cron from "node-cron";
import {Card_Order} from "@/app/components/card";
import getServerData from "@/app/api/get-server-data";
import {CustomerData, OrderData, OrderItemData} from "@/app/api/definitions";

export default async function OrdersPage() {
    const restaurantId = 1
    let ordersData: OrderData[] = []

    // TODO: Update the view when a new order is received using useEffect()

    const fetchOrders = async () => {
        const newOrderData: OrderData[] = await getServerData(`/orders/restaurant/${restaurantId}`)
        if (newOrderData.length > ordersData.length) {
            // Push a notification
            console.log("New order received")
        }
        ordersData = newOrderData
    }

    await fetchOrders()
    cron.schedule('*/10 * * * * *', fetchOrders)

    console.log(ordersData)

    let orders: Array<OrderData & CustomerData & {item_count: number}> = []

    for (const order of ordersData) {
        const customerData: CustomerData = await getServerData(`/customer?customer_id=${order.customer_id}`)
        const orderItemsData: OrderItemData[] = await getServerData(`/api/orderitems/${order.order_id}`)

        const orderItemCounts = orderItemsData.reduce((acc, item) => acc + item.quantity, 0)

        orders.push({
            ...order,
            ...customerData,
            item_count: orderItemCounts
        })
    }

    // TODO: Automatically update the view when the status of an order is changed

    const preparingOrders = orders.filter(order => order.order_status === "confirmed" || order.order_status === "accepted")
    const deliveringOrders = orders.filter(order => order.order_status === "delivering")


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
                                key={order.order_id}
                    />
                ))}
            </SectionContainer>
        </div>
    );
}