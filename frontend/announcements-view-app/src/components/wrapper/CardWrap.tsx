import type {ReactNode} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {cn} from "@/lib/utils.ts";

export default function CardWrap(props: {
    title: string,
    description?: string,
    children: ReactNode, className?: string
}) {
    return (
        <div className="flex justify-center flex-col items-center space-y-6">
            <Card className={cn("w-full max-w-screen-md", props.className)}>
                <CardHeader>
                    <CardTitle>{props.title}</CardTitle>
                    {props.description && <CardDescription>{props.description}</CardDescription>}
                </CardHeader>
                <CardContent className="space-y-6">
                    {props.children}
                </CardContent>
            </Card>
        </div>);
}