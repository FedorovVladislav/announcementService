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



export const resetDevice = (dispatch: Dispatch): void => {

}
export const searchWifi = (dispatch: Dispatch): void => {

}