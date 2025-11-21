export interface Ethernet {
    use_dhcp: boolean,
    ip: string,		// в формате строки
    mask: string,
    gateway: string,
    dns_main : string,
    dns_second : string,
    hostname: string	// до 64 символов
}