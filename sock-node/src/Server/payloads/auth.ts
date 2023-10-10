import * as net from 'node:net'

import { PayloadData } from '../payload'
import { Server } from '../index'
import { InvalidAuthKeyError, AlreadyAuthError, AuthError } from '../errors'

export default async function run(this: Server, sock: net.Socket, data: PayloadData) {
    if(this.isAuthenticated) {
        if(!this._authServer)
            throw new AuthError(`Server authenticated but auth socket was lost!`, 'A-101')
        throw new AlreadyAuthError(`${this._authServer.remoteAddress}:${this._authServer.remotePort}`)
    }

    if(data.payload !== this.privateKey) {
        throw new InvalidAuthKeyError(
            `${sock.remoteAddress}:${sock.remotePort}`,
            data.payload
        )
    }
    this._authServer = sock
}