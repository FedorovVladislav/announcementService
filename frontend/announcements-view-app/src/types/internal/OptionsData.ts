import {ComboBoxData} from "@/types/internal/ComboBoxData.ts";
import {ComboBoxStringData} from "@/types/internal/ComboBoxStringData.ts";

export const descreetInputModeNameMap = new Map([
    [0, "Чтение"],
    [1, "Счётчик по фронту"],
    [2, "Отправка СМС"]
]);
export const descreetOutputModeNameMap = new Map([
    [0, "Дискретный выход"],
    [1, "ШИМ"]
]);

export const gsmOperators: ComboBoxStringData[] = [
    {value: " ", label: "Default"},
    {value: "mts", label: "MTS"},
    {value: "megafon", label: "Megafon"},
    {value: "tele2", label: "TELE2"}
];

export const descreetInputModeName: ComboBoxData[] = [
    {value: 0, label: "Чтение"},
    {value: 1, label: "Счётчик по фронту"},
    {value: 2, label: "Отправка СМС"}
];

export const descreetOutputModeName: ComboBoxData[] = [
    {value: 0, label: "Дискретный выход"},
    {value: 1, label: "ШИМ"}
];

export const analogInputModeName: ComboBoxData[] = [
    {value: 0, label: "0 - 20мА"},
    {value: 1, label: "4 - 20мА"}
];

export const analogOutputModeName: ComboBoxData[] = [
    {value: 0, label: "0 - 20мА"},
    {value: 1, label: "4 - 20мА"}
];

export const portsMode: ComboBoxData[] = [
    {value: 0, label: "Выключено"},
    {value: 1, label: "Шлюз в RS-485 №1"},
    {value: 2, label: "Шлюз в RS-485 №2"},
    {value: 3, label: "Шлюз в RS-232"},
    {value: 4, label: "Carel"},
    {value: 5, label: "ModbusTCP"}
];

export const wifiMode: ComboBoxData[] = [
    {value: -1, label: "Не задано"},
    {value: 0, label: "АР"},
    {value: 1, label: "АР+STA"}
];

export const internetMode: ComboBoxData[] = [
    {value: 0, label: "WIFI сеть"},
    {value: 1, label: "Ethernet"},
    {value: 2, label: "GSM модуль"}
];

export const baudrate: ComboBoxData[] = [
    {value: 0, label: "Не задано"},
    {value: 1, label: "300 бит/с"},
    {value: 2, label: "600 бит/с"},
    {value: 3, label: "1200 бит/с"},
    {value: 4, label: "2400 бит/с"},
    {value: 5, label: "4800 бит/с"},
    {value: 6, label: "9600 бит/с"},
    {value: 7, label: "19200 бит/с"},
    {value: 8, label: "38400 бит/с"},
    {value: 9, label: "57600 бит/с"},
    {value: 10, label: "115200 бит/с"},
]

export const parity: ComboBoxData[] = [
    {value: 1, label: "Отсутствует"},
    {value: 2, label: "Четность"},
    {value: 3, label: "Нечетность"}
]

export const dataBits: ComboBoxData[] = [
    {value: 0, label: "5 bit"},
    {value: 1, label: "6 bit"},
    {value: 2, label: "7 bit"},
    {value: 3, label: "8 bit"}
]

export const stopBits: ComboBoxData[] = [
    {value: 0, label: "Не задано"},
    {value: 1, label: "1 bit"},
    {value: 2, label: "1.5 bit"},
    {value: 3, label: "2 bit"}
]