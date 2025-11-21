import {Settings} from "@/types/json_data/settings/Settings"
import {AxiosSingleton} from "@/api/AxiosSingleton";
import Endpoints from "./EndPoints";
import {Status} from "@/types/json_data/state/Status.ts/Status.ts";
import {
    setCurrentIpAddress,
    setRequestEnd,
    setRequestStart,
    setSearchWifi,
    setSettings,
    setStatus,
    startReload
} from "@/store/data/settingsReducer.ts";
import {Dispatch} from "@reduxjs/toolkit";
import {ILoginRequest} from "@/types/auth/ILoginRequest.ts";


export const login = (data: ILoginRequest, dispatch: Dispatch): void => {

    console.log("Send Settings: " + JSON.stringify(data, null, 2));
    dispatch(startReload())
    console.log("start save settings");
    AxiosSingleton.put(Endpoints.AUTH.LOGIN, data)
        .then(function () {
                console.log("success send settings: ")
            }
        ).catch(function (error) {
        console.log(error)
        console.log(error.response.status)
        if (error.response.status == 404) {
            console.log("Сервер не найдено!");
        }
    })

}
export const searchWifi = (dispatch: Dispatch): void => {

}