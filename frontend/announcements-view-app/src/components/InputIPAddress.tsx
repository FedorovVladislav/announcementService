import {Input} from "@/components/ui/input.tsx";
import {ControllerRenderProps, FieldValues} from "react-hook-form";

export function InputIPAddress(props: {
    field: ControllerRenderProps<FieldValues, string>,
    placeholder: string
}) {
    return (
        <Input {...props.field} placeholder={props.placeholder} onInput={(event) => {
            const newValue = event.currentTarget.value;
            const split = newValue.split(".");
            const lastElement = split[split.length - 1];
            if (newValue == ".") {
                event.currentTarget.value = "";

            } else if ((newValue.slice(-2) == "..")
                || (split.length > 4)
                || (split.length > 3 && split[3].length > 3)) {
                event.currentTarget.value = newValue.slice(0, newValue.length - 1);

            } else if (lastElement.length > 2 && split.length < 4) {
                event.currentTarget.value = newValue + ".";

            } else {
                event.currentTarget.value = newValue;
            }
        }}/>
    )
}
