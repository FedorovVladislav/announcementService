import {PinsState} from "@/types/json_data/state/Status.ts/PinsState.ts";

export interface Status {
    state_code: number, //"error" если есть ошибки,
    sta_ip: string,
    ethernet_ip: string,
    gsm_status: number,
    pins: PinsState,
    device_log: string
    sock_log: string
}