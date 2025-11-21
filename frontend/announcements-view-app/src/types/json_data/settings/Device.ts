export interface Device {
    id: string,
    service_id: string,		// для сервисного канала
    ports_mode: number,
    restart_period: number,
    service_connection: boolean
}