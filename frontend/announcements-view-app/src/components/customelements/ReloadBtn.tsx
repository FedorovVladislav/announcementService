
import {RotateCcwIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export default function ReloadBtn(props: { onClick: () => void, text?: string}) {
    return <Button type="button" variant="destructive"
                   onClick={props.onClick}>
        <div className="flex flex-row space-x-2 items-center">
            <RotateCcwIcon size={"16"}/>
            <p>{props.text != null ? props.text : "Обновить"}</p>
        </div>
    </Button>;
}