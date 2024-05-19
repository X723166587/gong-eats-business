'use server'

import {OrderData, CustomerData, OrderItemData} from '@/app/api/definitions'
import getServerData from "@/app/api/get-server-data";

export default async function getOrders() {
    const restaurantId = 1
    const ordersData = await getServerData(`/orders/restaurant/${restaurantId}`)

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

    return orders
}