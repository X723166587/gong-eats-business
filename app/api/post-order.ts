'use server'

import {permanentRedirect} from 'next/navigation';
import { OrderItemData, SubmitOrderData } from "@/app/api/definitions";

export async function submitOrder(orderData: SubmitOrderData, orderItems: OrderItemData[]): Promise<void> {
    console.log("Submitting orders...");
    let orderId: number | undefined = undefined;

    try {
        const response = await fetch(process.env.SERVER_URL + '/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        const responseText = await response.text();
        console.log('Order response:', responseText);

        if (!response.ok) {
            console.error('Failed to submit orders:', responseText);
            return;
        }

        const order: OrderItemData = JSON.parse(responseText);
        console.log('Order submitted successfully');

        if (order.order_id != null) {
            orderId = order.order_id;
            orderItems.forEach(item => item.order_id = orderId);
            await submitItems(orderItems);
        }


    } catch (error) {
        console.error('Error to submit orders:', error);
    }

    // console.log(orderId)
    permanentRedirect(`/checkout/success/${orderId}`);
}

export async function submitItems(itemData: OrderItemData[]): Promise<void> {
    console.log("Submitting items...");

    try {
        const response = await fetch(process.env.SERVER_URL + '/api/orderitems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        });

        const responseText = await response.text();
        console.log('Items response:', responseText);

        if (!response.ok) {
            console.error('Failed to submit items:', responseText);
            return;
        }

        // const result = JSON.parse(responseText);
        console.log('Items submitted successfully');
        // console.log(result);

    } catch (error) {
        console.error('Error to submit items:', error);
    }
}
