import {ControllerRenderProps} from "react-hook-form";
import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {HTMLInputTypeAttribute} from "react";
import {PhoneInput} from "@/components/customelements/PhoneInput.tsx";

export function PhoneInputWrapper(props: {
    field: ControllerRenderProps,
    label: string,
    description?: string,
    typeData?: HTMLInputTypeAttribute | undefined;
    disabled?: boolean | undefined;
}) {
    return (
        <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
                <PhoneInput {...props.field}></PhoneInput>
                {/*                <Input {...props.field} multiple
                       type={props.typeData ? props.typeData : "text"}
                       disabled={props.disabled ? props.disabled : false} />*/}
            </FormControl>
            {props.description && <FormDescription>{props.description}</FormDescription>}
            <FormMessage/>
        </FormItem>
    );
}