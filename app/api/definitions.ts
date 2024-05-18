
export interface RestaurantData {
    restaurant_id: number
    restaurant_name: string
    restaurant_rating: number
    restaurant_revenue: number
    restaurant_address: string
    restaurant_phone: string
    restaurant_hero_image: string
    category_id: number
    restaurant_category: [string]
}

export interface CustomerData {
    customer_id: number
    customer_name: string
    customer_phone: string
    customer_address: string
    vip_status: "active" | "inactive"
    vip_expire: Date
}

export interface MenuItemData {
    restaurant_id: number;
    item_id: number
    item_name: string
    item_category: string
    item_description?: string
    item_price: number
    item_image: string
}

export interface CartItemData extends MenuItemData {
    item_subtotal: number
    item_counts: number
}

export interface OrderItemData {
    order_id: undefined | number
    item_id: number
    quantity: number
    item_name?: string
    item_price?: number
}

export interface OrderData {
    order_id: number | undefined
    restaurant_id: number
    customer_id: number
    delivery_person_id?: string
    order_status: "confirmed" | "accepted" | "rejected" | "delivering" | "delivered"
    comment: string
    order_subtotal: number
    order_service_fee: number
    order_rating?: number
    order_review?: string
    create_time?: string
}

export interface OrderCardData extends OrderData {
    restaurant_name: string | undefined
    restaurant_hero_image: string | undefined
}

export type SubmitOrderData = Omit<OrderData, "order_id" | "delivery_person_id" | "created_time" | "order_rating" | "order_review">

export interface CategoryData {
    category_id: number
    category_name: string
    category_icon: string
    category_slug: string
}