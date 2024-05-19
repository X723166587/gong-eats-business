'use server'

import {OrderData} from "@/app/api/definitions";

export async function updateOrderStatus(orderId: OrderData["order_id"],status: OrderData["order_status"]) {
    console.log("Updating order status...");
    console.log('Order ID:', orderId)
    console.log('Status:', status)

    try {
        const response = await fetch(process.env.SERVER_URL + `/orders/updateStatus?order_id=${orderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(status)
        });

        const responseText = await response.text();
        console.log('Order status response:', responseText);

        if (!response.ok) {
            console.error('Failed to update order status:', responseText);
            return;
        }

        console.log('Order status updated successfully');

    } catch (error) {
        console.error('Error to update order status:', error);
    }
}