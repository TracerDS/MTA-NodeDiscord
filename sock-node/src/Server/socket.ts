import * as net from 'node:net'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import { PayloadData } from './payload'
import { Server } from '.'
import {
    SockError,
    InvalidPayloadError,
    NotAuthError
} from './errors'
import Logger from '../utils/logger'

let payloads: {
    [key: string]: (this: Server, sock: net.Socket, data: PayloadData) => Promise<void>
} = {}

;(async () => {
    const files = await fs.readdir(path.join(__dirname, 'payloads'))

    files.filter(value => value.endsWith('.ts')).forEach(async file => {
        payloads[path.parse(file).name] = (await import(`./payloads/${file}`)).default
    })
})()

async function dataHandler(this: Server, socket: net.Socket, data: Buffer): Promise<void> {
    try {
        this._buffer = Buffer.concat([this._buffer, data])

        while(this._buffer.length >= 4){
            const messageLength = this._buffer.readInt32BE(0)
      
            if (this._buffer.length < 4 + messageLength) 
                break
            
            const message = this._buffer.subarray(4, 4 + messageLength)
            this._buffer = this._buffer.subarray(4 + messageLength)
    
            let jsonData = JSON.parse(message.toString('utf8')) as PayloadData
            if(!('type' in jsonData)){
                throw new InvalidPayloadError(jsonData)
            }
            if(jsonData.type !== 'auth' && !this.isAuthenticated) {
                throw new NotAuthError(jsonData.payload)
            }
            for(let [key, value] of Object.entries(payloads)) {
                if(jsonData.type.startsWith(key)) {
                    await value.call(this, socket, jsonData)
                }
            }
        }
    }catch(exc: any) {
        if(exc instanceof SockError)
            Logger.err(exc.toString())
        else {
            Logger.err(`[${exc.name}] ${exc.message}`)
        }
    }
}

export default dataHandler