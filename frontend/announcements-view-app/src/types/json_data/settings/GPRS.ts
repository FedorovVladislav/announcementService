export interface GPRS {
    apn: string,		// до 64 символов
    user: string,	// до 64 символов
    pass: string,
    pin_req: boolean,
    pin: string,			// если не используется то значение "N"
    roaming: boolean,
    phone_number: string,   // Адресс для оправки смс
    sms_txt : string
}