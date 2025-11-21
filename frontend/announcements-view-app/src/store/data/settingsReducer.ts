import {Settings} from "@/types/json_data/settings/Settings.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/store";
import {Status} from "@/types/json_data/state/Status.ts/Status.ts";
import {ChartData} from "@/types/internal/ChartData";
import {getUrl, setNewInstance} from "@/api/AxiosSingleton.ts";
import {WifiData} from "@/types/json_data/wifi_search/WifiData.ts";

export interface SettingsState {
    status: Status;
    settings: Settings;
    isLoaded: boolean;
    isReloadingAfterSave: boolean;
    isConnect: boolean;
    isRequest: boolean;
    error: string;
    gsmSignal: [ChartData];
    currentIpAddress: string;
    wifiData: WifiData;
}

const initialState: SettingsState = {
    status: {
        pins: {
            d_output: [{mode: 0, state: 0}, {mode: 0, state: 0}, {mode: 0, state: 0},],
            d_input: [{mode: 0, state: 0}, {mode: 0, state: 0}, {mode: 0, state: 0}],
            a_input: {mode: 0, state: 0},
            a_output: {mode: 0, state: 0},
        }
    },
    settings: {
        device: {
            service_connection: false, ports_mode: 0, restart_period: -1
        }, main_tcp_conection: {
            mode: 0, keepalive: 0, rec_buf: 0, rec_timeout: 0, snd_buf: 0, snd_timeout: 0
        },
        service_tcp_conection: {
            mode: 0, keepalive: 0, rec_buf: 0, rec_timeout: 0, snd_buf: 0, snd_timeout: 0
        },
        internet: {
            gsm_config: {
                pin_req: false,
                roaming: false
            },
            wifi_config: {
                use_sta: false,
                ap_chan: 0,
                sta_chan: 0,
            }, ethernet_config: {
                use_dhcp: false,
            },
            main_connection: 0,
        },
        rs485_ports: [],
        pins: {
            d_output: [{}, {}, {}],
            a_input: {},
            a_output: {},
            d_input: [{mode: 0, state: 0}, {mode: 0, state: 0}, {mode: 0, state: 0}],
            cl_input: {}
        }
    },
    isLoaded: false,
    isConnect: false,
    isReloadingAfterSave: false,
    error: '',
    gsmSignal: [
        {time: 10, value: 1},
        {time: 20, value: 2},
        {time: 30, value: 3},
        {time: 40, value: 4},
        {time: 50, value: 5},
        {time: 60, value: 6}
    ],
    currentIpAddress: splitUtl(),
    wifiData: {
        scan_list: []
    }
}

function splitUtl(): string {
    var url = getUrl().replace("http://", '').replace("https://", "").split(":");
    console.log(url[0])
    return url[0];
}

export const settingsReducer = createSlice({
    name: 'settings',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setRequestStart: (state,) => {
            state.isRequest = true;
        },
        setRequestEnd: (state, action: PayloadAction<boolean>) => {
            state.isRequest = false;
            state.isConnect = action.payload;
            if (action.payload) {
                state.isReloadingAfterSave = false;
            }
        },
        setSettings: (state, action: PayloadAction<Settings>) => {
            state.settings = action.payload;
            state.isReloadingAfterSave = false;
            state.isLoaded = true;
        },
        setStatus: (state, action: PayloadAction<Status>) => {
            state.status = action.payload
            state.isReloadingAfterSave = false;
        },
        startReload: (state) => {
            state.isReloadingAfterSave = true;
            state.isLoaded = false;
            state.isConnect = false;

        },
        setTestData: (state) => {
            state.wifiData = {
                scan_list: [
                    {
                        SSID: "728ed52f",
                        RSSI: 1,
                        AUTH: "A",
                    },
                    {
                        SSID: "3333",
                        RSSI: 2,
                        AUTH: "2",
                    }
                ]
            },
                state.isLoaded = true;
            state.isConnect = true;
            state.status = {
                state_code: 0,
                sta_ip: "192.168.1.1",
                ethernet_ip: "192.168.1.1",
                gsm_status: -1,
                pins:
                    {
                        d_output:
                            [
                                {
                                    mode: 1,
                                    state: 1
                                },
                                {
                                    mode: 1,
                                    state: 0
                                },
                                {
                                    mode: 0,
                                    state: 0
                                }
                            ],
                        d_input:
                            [
                                {
                                    mode: 0,
                                    state: 0
                                },
                                {
                                    mode: 0,
                                    state: 1
                                },
                                {
                                    mode: 1,
                                    state: 0
                                }
                            ],
                        a_output:
                            {
                                mode: 0,
                                state: 0
                            },
                        a_input:
                            {
                                mode: 0,
                                state: 0
                            },
                        cl_input:
                            {
                                mode: 0,
                                state: 0
                            }
                    }, device_log: "333\t Нет ответа от устройства RS-485 на Port1\n потеряно Ethernet соединение\n ошибка обращения к серверу SCADA\n ",
                    sock_log : "RX: 06 05 32\n TX: 06 05 32\n"
            };
            state.settings = {
                device: {
                    id: "1A2B3C4D5E6F",
                    service_id: "SERVICE_1A2B",
                    ports_mode: -1,
                    restart_period: -1,
                    service_connection: false
                },
                internet: {
                    main_connection: 0,
                    wifi_config: {
                        ap_ssid: "ComPA_modem_AP",
                        ap_pass: "11223344",
                        ap_chan: 0,
                        use_sta: true,
                        sta_ssid: "-",
                        sta_pass: "-",
                        sta_chan: 0
                    },
                    ethernet_config: {
                        use_dhcp: false,
                        ip: "-",
                        mask: "-",
                        gateway: "-",
                        dns_main: "-",
                        dns_second: "-",
                        hostname: "-"
                    },
                    gsm_config: {
                        apn: "internet",
                        user: "gdata",
                        pass: "gdata",
                        pin_req: true,
                        pin: "8888",
                        roaming: true,
                        phone_number: "+79817211111",
                        sms_txt: "sms_txt"
                    }
                },
                main_tcp_conection: {
                    url: "s1.dispsky.ru",
                    port: 5020,
                    keepalive: -1,
                    rec_timeout: -1,
                    snd_timeout: -1,
                    rec_buf: -1,
                    snd_buf: -1,
                    mode: 0
                },
                service_tcp_conection: {
                    url: "s1.dispsky.ru",
                    port: "5020",
                    keepalive: -1,
                    rec_timeout: -1,
                    snd_timeout: -1,
                    rec_buf: -1,
                    snd_buf: -1,
                    mode: false
                },
                rs232_port: {
                    baud_rate: 19200,
                    data_bits: 3,
                    parity: 0,
                    stop_bits: 1,
                    addresses: [
                        -1,
                        -1,
                        -1,
                        -1,
                        -1
                    ]
                },
                rs485_ports: [
                    {
                        baud_rate: 19200,
                        data_bits: 3,
                        parity: 0,
                        stop_bits: 1,
                        addresses: [
                            -1,
                            -1,
                            -1,
                            -1,
                            -1
                        ]
                    },
                    {
                        baud_rate: 19200,
                        data_bits: 3,
                        parity: 0,
                        stop_bits: 1,
                        addresses: [
                            -1,
                            -1,
                            -1,
                            -1,
                            -1
                        ]
                    }
                ],
                pins: {
                    d_output: [
                        {
                            mode: 1,
                            state: 99
                        },
                        {
                            mode: 0,
                            state: 0
                        },
                        {
                            mode: 0,
                            state: 0
                        }
                    ],
                    d_input: [
                        {
                            mode: 0,
                            state: 0
                        },
                        {
                            mode: 0,
                            state: 0
                        },
                        {
                            mode: 0,
                            state: 0
                        }
                    ],
                    a_output: {
                        mode: 0,
                        state: 0
                    },
                    a_input: {
                        mode: 0,
                        state: 0
                    },
                    cl_input: {
                        mode: 0,
                        state: 0
                    }
                }
            };
        },
        setNewValueGpsSignal: (state) => {
            for (let i = 5; i >= 0; i--) {
                if (i > 0) {
                    state.gsmSignal[i].value = state.gsmSignal[i - 1].value;
                    state.gsmSignal[i].time = i * 10;
                } else {
                    if (state.status?.gsm_status == -1) {
                        state.gsmSignal[i].value = 0
                    } else {
                        state.gsmSignal[i].value = state.status?.gsm_status ?? 0
                    }
                }
            }
        },
        setCurrentIpAddress: (state, action: PayloadAction<string>) => {
            if (state.currentIpAddress != action.payload) {
                setNewInstance(action.payload);
                state.currentIpAddress = action.payload;
            }
        },
        setSearchWifi: (state, action: PayloadAction<WifiData>): void => {
            /*           const internalData = action.payload.scan_list.map(x => {
                           const employee: WifiElement = {
                               signal: "",
                               name: x
                           }
                           return employee;
                       });*/
            state.wifiData = action.payload;
        }
    },
})
export const {
    setRequestStart,
    setRequestEnd,
    setSettings,
    setStatus,
    startReload,
    setTestData,
    setNewValueGpsSignal,
    setCurrentIpAddress,
    setSearchWifi
} = settingsReducer.actions
export const selectCount = (state: RootState) => state.setting.settings
export default settingsReducer.reducer