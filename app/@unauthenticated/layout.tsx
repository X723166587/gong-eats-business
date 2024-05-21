import React from "react";

export default function BusinessLayout({children, }: {children: React.ReactNode}) {
    return (
        <>
            <main>
                <h1>UNAUTHENTICATED</h1>
                {children}
            </main>
        </>
    )
}