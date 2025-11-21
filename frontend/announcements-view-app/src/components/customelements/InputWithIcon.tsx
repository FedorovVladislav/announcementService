import {Input} from "@/components/ui/input.tsx";
import React from "react";

interface InputWithIconProps {
    id?: string,
    name?: string,
    type?: string,
    value?: string | undefined,
    disabled?: string,
    icon: React.ReactNode
}

export function InputWithIcon(props: InputWithIconProps) {
    return (
        <div className="relative w-full">
            <Input {...props} disabled={true}/>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6">
                {props.icon}
            </div>
        </div>
    )
}