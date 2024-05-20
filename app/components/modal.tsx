'use client'

import {useRouter} from 'next/navigation'
import {motion} from "framer-motion";
import {Button} from "@/app/components/button";
import FrozenRouter from "@/app/components/frozen-router";
import React, {MouseEventHandler, useCallback, useRef} from "react";
import {emphasizedEasing_Long} from "@/app/api/motion-config";

export default function Modal({children}: { children: React.ReactNode }) {
    const overlay = useRef(null)
    const wrapper = useRef(null)
    const router = useRouter()

    const onDismiss = useCallback(() => {
        router.back()
    }, [router])

    const onClick: MouseEventHandler = useCallback((e) => {
        if (e.target === overlay.current || e.target === wrapper.current) {
            if (onDismiss) onDismiss()
        }
    }, [onDismiss, overlay, wrapper])

    const modal = {
        closed: {
            opacity: 0,
            "--tw-translate-y": "200px",
        },
        open: {
            opacity: 1,
            "--tw-translate-y": "0px",
        },
    }

    return (
        <motion.div ref={overlay} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                    className="absolute top-0 left-0 w-full z-40 flex justify-center items-center bg-scrim"
                    onClick={onClick}>
            <motion.div ref={wrapper}
                        variants={modal}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={emphasizedEasing_Long}
                        className="subtract-nav mt-12 transform relative rounded-4xl w-full bg-surfaceDim">
                    <Button icon={{iconName: "arrow_back"}} className="sticky my-6 ml-8 top-8" onClick={() => {router.back()}}/>
                <FrozenRouter>{children}</FrozenRouter>
            </motion.div>
        </motion.div>
    )
}