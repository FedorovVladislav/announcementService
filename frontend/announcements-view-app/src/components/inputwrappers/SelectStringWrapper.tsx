import {ControllerRenderProps, FieldValues} from "react-hook-form";
import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {ComboBoxStringData} from "@/types/internal/ComboBoxStringData.ts";

export function SelectStringWrapper(props: {
    field: ControllerRenderProps<FieldValues, string>,
    label: string,
    description?: string,
    optionValues: ComboBoxStringData[], placeholder? :string
}) {
    return (<FormItem>
        <FormLabel>{props.label}</FormLabel>
        <Select onValueChange={E=>props.field.onChange(E)} defaultValue={props.field.value}>
            <FormControl>
                <SelectTrigger>
                    <SelectValue placeholder={props.placeholder ? props.placeholder : ""}  />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                {props.optionValues.map((framework) => (
                    <SelectItem value={framework.value}>{framework.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
        {props.description && <FormDescription>{props.description}</FormDescription>}
        <FormMessage/>
    </FormItem>);
}