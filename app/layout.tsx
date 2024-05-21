// Root layout for the app
import React from "react";
import type {Metadata} from "next";
import "material-symbols/rounded.css"
import "./globals.css";
import {ItemStoreProvider} from "@/app/providers/item-store-provider";
import {ThemeStoreProvider} from "@/app/providers/theme-store-provider";
import ClientLayout from "@/app/client-layout";

export const metadata: Metadata = {
    title: "Gong Eats Business",
    description: "Manager your restaurant, orders, and menu items with Gong Eats Business.",
};

export default function RootLayout(props: { manager: React.ReactNode, unauthenticated: React.ReactNode }) {

    const userType: "manager" | "unauthenticated" = "manager"

    return (
        <ThemeStoreProvider>
            <ItemStoreProvider>
                <ClientLayout>
                    {userType === "manager" ? props.manager : props.unauthenticated}
                </ClientLayout>
            </ItemStoreProvider>
        </ThemeStoreProvider>
    );
}
