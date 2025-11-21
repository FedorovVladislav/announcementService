import {useAppDispatch, useAppSelector} from "@/hook/AppDispatch.ts";
import {RootState} from "@/store";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import {RefreshCwIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Settings} from "@/types/json_data/settings/Settings.ts";
import {setPinsParams} from "@/api/ApiManager.ts";

export default function SetAValue() {
    const status = useAppSelector((state: RootState) => state?.setting.status)
    const dispatch = useAppDispatch();
    const [newValue, setNewValue] = useState(0);
    return <div className="flex flex-row items-center gap-3">
        <Input value={status?.pins.a_output.state} disabled={true}></Input>
        <HoverCard>
            <HoverCardTrigger><RefreshCwIcon/></HoverCardTrigger>
            <HoverCardContent className="w-fit">
                <div className="flex flex-col space-y-5  justify-center items-center">
                    <p>Смена значения</p>
                    <p>Текущее значение</p>
                    <Input value={status?.pins.a_output.state} disabled={true}></Input>
                    <p>Новое значение</p>
                    <Input value={newValue} onChange={e => setNewValue(Number(e.currentTarget.value))}
                           disabled={false}></Input>
                    <Button onClick={(() => {
                        const newSettins: Settings = {pins: {a_output: {state: newValue}}};
                        setPinsParams(newSettins, dispatch);
                        setNewValue(0)
                    })}> Применить </Button>
                </div>
            </HoverCardContent>
        </HoverCard>
    </div>;
}