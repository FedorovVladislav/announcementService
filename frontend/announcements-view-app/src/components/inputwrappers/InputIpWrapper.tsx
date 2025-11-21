import {ControllerRenderProps} from "react-hook-form";
import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {InputIPAddress} from "@/components/InputIPAddress.tsx";

export function InputIpWrapper(props: {
    field: ControllerRenderProps,
    label: string,
    description?: string,
    placeholder: string
}) {
    return (
        <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
                <InputIPAddress field={props.field} placeholder={props.placeholder}/>
            </FormControl>
            {props.description && <FormDescription>{props.description}</FormDescription>}
            <FormMessage/>
        </FormItem>
    );
}