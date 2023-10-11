import * as net from 'node:net'
import * as crypto from 'node:crypto'

import dataHandler from './socket'
import * as config from '../config.json'
import Logger from '../utils/logger'

class Server extends net.Server {
    private __host: string = '127.0.0.1'
    private __port: number = config.serverport + 222
    protected _authServer: net.Socket|undefined
    private __privateKey: string
    protected __clients: { [hostID: string]: net.Socket } = {}

    public get host(): string { return this.__host }
    public get port(): number { return this.__port }
    public get isAuthenticated(): boolean { return !!this._authServer }
    protected get privateKey(): string { return this.__privateKey }

    protected _buffer: Buffer = Buffer.alloc(0)

    constructor(host?: string, port?: number) {
        super()
        if(host) this.__host = host
        if(port) this.__port = port

        this.__privateKey = crypto.createHash('sha512')
            .update(config.privatePassword).digest('hex')
    }

    /**
     * This function generates unique ID for a socket
     * @param host 
     * @param port 
     * @param family 
     * @returns Unique ID for a connection
     */
    private generateID(host: string, port: number, family: string): string {
        const UUID = crypto.randomUUID()
        const hash = crypto.createHash('sha256').update(host).update(port.toString()).update(family)
        return hash.update(UUID).digest('hex')
    }

    autoInit() {
        this.on('listening', () => {
            Logger.info(`Server is listening on ${this.host}:${this.port}`)
        })
        this.on('connection', (sock: net.Socket) => {
            let id = this.generateID(sock.remoteAddress!, sock.remotePort!, sock.remoteFamily!)
            this.__clients[id] = sock

            Logger.confirm(`Client connected: ${sock.remoteAddress}:${sock.remotePort}`)
            sock.on('data', async (data: Buffer) => dataHandler.call(this, sock, data))
            sock.on('close', () => {
                console.info(`Client disconnected: ${sock.remoteAddress}:${sock.remotePort}`)
                delete this.__clients[id]
            })
        })
        this.listen(this.__port, this.__host)
    }
}

export { Server }