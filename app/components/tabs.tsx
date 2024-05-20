"use client";

import * as React from "react";
import * as Ariakit from "@ariakit/react";
import clsx from "clsx";
import Link from "next/link.js";

export const TabList = React.forwardRef<HTMLDivElement, Ariakit.TabListProps>(
    function TabList(props, ref) {
        return (
            <Ariakit.TabList
                ref={ref}
                {...props}
                className={clsx("tab-list", props.className)}
            />
        );
    },
);

export const Tab = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<typeof Link>
>(function Tab(props, ref) {
    const id = props.href.toString();
    return (
        <Ariakit.Tab
            id={id}
            className="tab"
            render={<Link ref={ref} {...props}></Link>}
        />
    );
});

