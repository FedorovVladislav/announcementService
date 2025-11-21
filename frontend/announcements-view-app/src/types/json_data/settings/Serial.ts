export interface Serial {
    baud_rate: number,
    data_bits: number,			// uart_word_length_t
    stop_bits: number,			// uart_stop_bits_t
    parity: number,			// uart_parity_t
    addresses: [number]	// адреса устройств, если режим поддерживает (carel)
}