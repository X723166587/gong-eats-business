import React from "react";
import NavIsland from "@/app/components/nav-island";

export default function ManagerLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="min-h-screen">
            <main>
                <NavIsland />
                {children}
            </main>
        </div>
    )
}