import {Navigate, Outlet} from "react-router-dom"

import {RootState} from "@/store";
import {useAppSelector} from "@/hook/AppDispatch.ts";
import {CSSProperties} from "react";

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";


export default function PrivateRoutes() {
    const loading = true;
    const color = "#ffffff";
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    const state = useAppSelector(state => state);


    const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLogIn);
    return (
        isLoggedIn ? <div>
                <Outlet/>
                <Dialog open={state.setting.isReloadingAfterSave}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Ожидание устройства</DialogTitle>
                            <DialogDescription>
                                <div className="flex flex-col items-center space-y-2">
                                    <PuffLoader
                                        color={color}
                                        loading={loading}
                                        cssOverride={override}
                                        size={100}/>
                                    <p>Время перезагрузки устройства может достигать 20-ти секунд</p>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            : <Navigate to="/signIn"/>

    )
}
