import {Button} from "@/app/components/button";
import React from "react";

export default function Stepper(props: { itemCount: number, removeAction: () => void, addAction: () => void }) {
    return <div
        className="Stepper flex flex-row gap-8 items-center w-full flex-shrink-0">
        {props.itemCount > 0 &&
            <>
                <Button className="RemoveItem" icon={{iconName: "remove"}} onClick={props.removeAction}>-</Button>
                <span className="ItemQuantity font-semibold">{props.itemCount}</span>
            </>
        }
        <Button className="AddItem" icon={{iconName: "add"}} onClick={props.addAction}>+</Button>
    </div>;
}