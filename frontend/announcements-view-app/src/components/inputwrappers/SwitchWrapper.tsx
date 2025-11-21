import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {ControllerRenderProps, FieldValues} from "react-hook-form";

export function SwitchWrapper(props: {
    field: ControllerRenderProps<FieldValues, string>,
    label: string,
    description?: string
}) {
    return <FormItem>
        <FormLabel>{props.label}</FormLabel>
        <FormControl>
            <Switch checked={props.field.value}
                    onCheckedChange={props.field.onChange}/>
        </FormControl>
        {props.description && <FormDescription>{props.description}</FormDescription>}
        <FormMessage/>
    </FormItem>;
}