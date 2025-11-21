import {Button} from "@/components/ui/button.tsx";
import {SaveIcon} from "lucide-react";

export function SaveBtn() {
    return <Button size="formSubmint" type="submit">
        <div className="flex flex-row space-x-2 items-center">
            <SaveIcon size={"16"}/>
            <p>Сохранить</p>
        </div>
    </Button>;
}