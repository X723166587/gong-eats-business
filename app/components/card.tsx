'use client'

import Image from "next/image";
import React from "react";
import {motion, MotionProps} from "framer-motion";
import {MaterialIcon} from "@/app/components/material-icon";
import {emphasizedEasing_Medium} from "@/app/api/motion-config";
import {Button} from "@/app/components/button";
import {CustomerData, OrderData} from "@/app/api/definitions";
import {updateOrderStatus} from "@/app/api/orders/update-order";

interface CardContainerProps extends MotionProps {
    children: React.ReactNode
}

const CardContainer: React.FC<CardContainerProps> = ({children, ...rest}) => {
    return (
        <motion.div
            className="CardContainer bg-surface border border-outlineVariant rounded-2xl overflow-hidden"
            {...rest}
        >
            <div className="StateLayer w-full h-full hover:bg-surfaceVariant transition-all">
                {children}
            </div>
        </motion.div>
    )
}

interface CardOrderProps {
    order_id: OrderData["order_id"]
    order_status: OrderData["order_status"]
    order_subtotal: OrderData["order_subtotal"]
    items_count: number
    customer_name: CustomerData["customer_name"]
    customer_address: CustomerData["customer_address"]
    customer_phone: CustomerData["customer_phone"]
    onStatusChange: () => void
}

export const Card_Order = (props: CardOrderProps) => {
    const handleStatusChange = async (newStatus: OrderData["order_status"]) => {
        await updateOrderStatus(props.order_id, newStatus)
        props.onStatusChange()
    }


    const Actions = () => {
        switch (props.order_status) {
            case "confirmed": {
                return (
                    <div className="flex flex-row gap-4">
                        <Button onClick={() => handleStatusChange("accepted")} icon={{iconName: "check"}} btnStyle={{
                            color: "bg-primary",
                            textColor: "text-onPrimary",
                            stateColor: "hover:bg-stateOnPrimaryContainer"
                        }} label="Accept"/>
                        <Button onClick={() => handleStatusChange("rejected")} icon={{iconName: "close"}} btnStyle={{
                            color: "bg-error",
                            textColor: "text-onError",
                            stateColor: "hover:bg-stateOnError"
                        }}/>
                    </div>
                )
            }
            case "accepted": {
                return (
                    <Button onClick={() => handleStatusChange("delivering")} icon={{iconName: "arrow_forward"}} label="Ready"/>
                )
            }
            case "delivering": {
                // TODO: Add a button to distribute the order to a delivery person

                return (
                    <Button
                        onClick={() => handleStatusChange("delivered")}
                        icon={{iconName: "check"}} btnStyle={{
                        color: "bg-primary",
                        textColor: "text-onPrimary",
                        stateColor: "hover:bg-stateOnPrimaryContainer"
                    }} label="Delivered"/>
                )

            }
        }
    }

    if (props.order_status != "delivered" && props.order_status != "rejected") {
        return (
            <CardContainer>
                <div className="px-4 py-4 text-onSurface">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <p className="text-xl font-semibold">{props.customer_name}</p>
                            <p className="text-lg text-onSurfaceVariant">#{props.order_id}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="inline-flex gap-1">
                                <div className="flex-grow-0 inline-flex items-center">
                                    <MaterialIcon iconName={"location_on"} fontSize={20} opticalSize={20} fill={0}/>
                                </div>
                                <p className="text-base font-normal">{props.customer_address}</p>
                            </div>
                            <div className="inline-flex gap-1">
                                <div className="flex-grow-0 inline-flex items-center">
                                    <MaterialIcon iconName={"phone"} fontSize={20} opticalSize={20} fill={0}/>
                                </div>
                                <p className="text-base font-normal">{props.customer_phone}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-outlineVariant my-4"/>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 items-center">
                                <p className="text-base">{props.items_count} {props.items_count === 1 ? 'item' : 'items'}</p>
                                <p>|</p>
                                <p className="text-base">${Number(props.order_subtotal).toFixed(2)}</p>
                            </div>
                        </div>
                        <Actions />
                    </div>
                </div>
            </CardContainer>
        )
    } else {
        return (
            <CardContainer>
                <div className="px-4 py-4 text-onSurface">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <p className="text-xl font-semibold">{props.customer_name}</p>
                            <p className="text-lg text-onSurfaceVariant">#{props.order_id}</p>
                        </div>
                    </div>

                    <div className="border-b border-outlineVariant my-4"/>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2 items-center">
                                <p className="text-base">{props.items_count} {props.items_count === 1 ? 'item' : 'items'}</p>
                                <p>|</p>
                                <p className="text-base">${Number(props.order_subtotal).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="text-tertiary font-semibold uppercase">{props.order_status}</div>
                    </div>
                </div>
            </CardContainer>
        )
    }
}