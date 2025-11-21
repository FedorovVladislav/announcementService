import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {ControllerRenderProps, FieldValues} from "react-hook-form";
import {ComboBoxData} from "@/types/internal/ComboBoxData.ts";
import {ComboboxField} from "@/components/ComboBoxField.tsx";

export function ComboBoxWrapper(props: {
    field: ControllerRenderProps<FieldValues, string>,
    label: string,
    description?: string,
    optionValues: ComboBoxData[],
}) {
    return (
        <FormItem className="flex flex-col w-full">
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
                <ComboboxField field={props.field} optionValues={props.optionValues} initialValue={props.field.value}/>
            </FormControl>
            {props.description && <FormDescription>{props.description}</FormDescription>}
            <FormMessage/>
        </FormItem>
    );
}