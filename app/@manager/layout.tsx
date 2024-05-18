'use client'

import NavIsland from "@/app/components/nav-island";

export default function CustomerLayout({children}: {children: React.ReactNode}) {

    return (
        <div className="min-h-screen">
            <main>
                <NavIsland />
                <div className="container mx-auto pt-32">
                    {children}
                </div>
                {/* TODO: A footer */}
                <footer className="p-8"></footer>
            </main>
        </div>
    )
}
