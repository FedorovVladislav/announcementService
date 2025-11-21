import {ControllerRenderProps, FieldValues} from "react-hook-form";
import {ComboBoxData} from "@/types/internal/ComboBoxData.ts";
import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

export function SelectWrapper(props: {
    field: ControllerRenderProps<FieldValues, string>,
    label: string,
    description?: string,
    optionValues: ComboBoxData[],
}) {
    return (
        <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <Select key={props.field.name} onValueChange={E => props.field.onChange(Number(E))}
                    defaultValue={String(props.field.value)}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display"/>
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {props.optionValues.map((framework) => (
                        <SelectItem key={String(framework.value)}
                                    value={String(framework.value)}>{framework.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {props.description && <FormDescription>{props.description}</FormDescription>}
            <FormMessage/>
        </FormItem>
    );
}