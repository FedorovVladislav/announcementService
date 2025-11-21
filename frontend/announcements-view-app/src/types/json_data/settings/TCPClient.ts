export interface TCPClient {
    url: string,
    port: string,
    rec_buf: number,			// SO_RECVBUF, SO_SNDBUF
    snd_buf: number,
    keepalive: number,		// SO_KEEPALIVE
    rec_timeout: number,		// SO_RCVTIMEO, SO_SNDTIMEO
    snd_timeout: number,
    mode: number
}