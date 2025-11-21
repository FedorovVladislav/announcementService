export interface Wifi {
    ap_ssid: string, // до 32 символов
    ap_pass : string, // до 64 символов (WPA2)
    ap_chan : number,
    use_sta : boolean,  // по умолчанию: 0. 1 если устанавливать подклчение к точке доступа
    sta_ssid : string,
    sta_pass : string
    sta_chan : number
}