'use client'

import {useThemeStore} from "@/app/providers/theme-store-provider";

export default function ClientLayout({children}: { children: React.ReactNode }) {
    const background = useThemeStore((state) => state.background)

    return (
        <html lang="en">
            <body className={`font-Sofia antialiased ${background}`}>
            {children}
            </body>
        </html>
    )
}