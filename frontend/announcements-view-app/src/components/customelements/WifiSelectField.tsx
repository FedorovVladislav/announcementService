import {ControllerRenderProps, FieldValues} from "react-hook-form";
import {HTMLInputTypeAttribute} from "react";
import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {WifiSelectDialog} from "@/components/WifiSelectDialog.tsx";

export function WifiSelectField(props: {
    field: ControllerRenderProps<FieldValues, string>,
    label: string,
    description?: string,
    typeData?: HTMLInputTypeAttribute | undefined;
    disabled?: boolean | undefined;
}) {
    return (
        <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
                <div className="relative w-full">
                    <Input {...props.field} disabled={true}/>
                    <WifiSelectDialog value={props.field}/>
                </div>
            </FormControl>
            {props.description && <FormDescription>{props.description}</FormDescription>}
            <FormMessage/>
        </FormItem>
    );
}