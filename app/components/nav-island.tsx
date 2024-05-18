'use client'

import Link from "next/link";
import {Button} from "@/app/components/button";
import Search from "@/app/components/search";
import React, {useState} from "react";
import {useItemStore} from "@/app/providers/item-store-provider";
import Image from "next/image";
import Stepper from "@/app/components/stepper";
import {motion, AnimatePresence, MotionProps} from "framer-motion";
import getItems from "@/app/api/get-bag-items";
import {emphasizedEasing_Long} from "@/app/api/motion-config";

export default function NavIsland() {

    const Initial: React.FC<MotionProps> = ({...rest}) => {
        return (
            <motion.nav className="flex flex-row rounded-full gap-4 w-fit" {...rest}>
                <Link href={"/"}>
                    <Button icon={{iconName: "home"}} btnStyle={{
                        color: "bg-surfaceContainer",
                        stateColor: "bg-stateSurfaceVariantContainer",
                        textColor: "bg-onSurfaceContainer"
                    }}/>
                </Link>
                <div className="inline px-2 pb-1 content-center items-center text-2xl font-bold tracking-widest">
                    <div className="inline-flex gap-2 items-baseline select-none">
                        <div>GONG EATS</div>
                        <div>|</div>
                        <div className="font-normal tracking-tight text-2xl">Business</div>
                    </div>
                </div>
                <Link href={"/orders"}>
                    <Button icon={{iconName: "receipt_long"}} label={"Orders"} btnStyle={{
                        color: "bg-surfaceContainer",
                        stateColor: "bg-stateSurfaceVariantContainer",
                        textColor: "bg-onSurfaceContainer"
                    }}/>
                </Link>
                <Link href={"/menu"}>
                    <Button icon={{iconName: "restaurant_menu"}} label={"Menu"} btnStyle={{
                        color: "bg-surfaceContainer",
                        stateColor: "bg-stateSurfaceVariantContainer",
                        textColor: "bg-onSurfaceContainer"
                    }}/>
                </Link>
            </motion.nav>
        )
    }


    return (
        <AnimatePresence>
            <motion.div
                className="flex fixed px-4 py-3 top-6 left-1/2 -translate-x-1/2 z-50 justify-center min-w-96 bg-surfaceVariant text-onSurfaceVariant rounded-4xl"
                initial={{width: 800, opacity: 0}}
                animate={{width: "fit-content", minWidth: "fit-content", opacity: 1}}
                transition={emphasizedEasing_Long}
                exit={{width: 640, opacity: 1}}
            >
                <Initial/>
            </motion.div>
        </AnimatePresence>
    )
}