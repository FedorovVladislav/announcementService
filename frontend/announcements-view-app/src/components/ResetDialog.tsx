import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {resetDevice} from "@/api/ApiManager.ts";
import {useAppDispatch} from "@/hook/AppDispatch.ts";
import {CircleXIcon} from "lucide-react";

export function ResetDialog() {
    const dispatch = useAppDispatch();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const handleResetClick = () => {
        setIsEditDialogOpen(false);
        resetDevice(dispatch);
    };

    return (
        <AlertDialog open={isEditDialogOpen} onOpenChange={() => setIsEditDialogOpen(!isEditDialogOpen)}>
            <AlertDialogTrigger asChild>
                <Button size={"formSubmint"} variant="destructive">
                    <div className="flex flex-row space-x-2 items-center">
                        <CircleXIcon size={"16"}/>
                        <p>Сброс</p>
                    </div>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Подтверждение</AlertDialogTitle>
                    <AlertDialogDescription>
                        Сброс всех настроек
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={handleResetClick}>Продолжить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}