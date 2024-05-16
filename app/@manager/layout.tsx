'use client'

import {useThemeStore} from "@/app/providers/theme-store-provider";
import {useEffect} from "react";

export default function CustomerLayout({children}: {children: React.ReactNode}) {
    // const { setBackground } = useThemeStore((state => state))
    //
    // useEffect(() => {
    //     setBackground("bg-surfaceContainer")
    // })

    return (
        <div className="min-h-screen">
            <main>
                {children}
                {/* TODO: A footer */}
                <footer className="p-8"></footer>
            </main>
        </div>
    )
}
