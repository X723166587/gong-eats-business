import {Button} from "@/app/components/button";

export default function Home() {
    return (
        <main className="w-full text-onSurface">
            <h1>You have not login</h1>
            <Button icon={{iconName: "arrow_forward"}} label="Login" className="w-fit"/>
        </main>
    )
}