import {Wifi} from "@/types/json_data/settings/Wifi.ts";
import {Ethernet} from "@/types/json_data/settings/Ethernet.ts";
import {GPRS} from "@/types/json_data/settings/GPRS.ts";

export interface Internet {
    main_connection: number,
    wifi_config: Wifi,
    ethernet_config:Ethernet,
    gsm_config: GPRS
}