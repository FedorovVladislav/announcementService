import {Device} from "./Device";
import {Serial} from "./Serial.ts";
import {TCPClient} from "./TCPClient";
import {TCPServer} from "./TCPServer";
import {Internet} from "@/types/json_data/settings/Internet.ts";
import {Pins} from "@/types/json_data/settings/Pins.ts";

export interface Settings {
    settings: string,
    internet: Internet,
    rs232_port: Serial,
    rs485_ports: [Serial],
    device: Device,
    main_tcp_conection: TCPClient,
    service_tcp_conection: TCPServer,
    pins: Pins

}