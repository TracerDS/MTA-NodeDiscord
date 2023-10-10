import * as net from 'node:net'

import { PayloadData } from '../payload'
import bot from '../../Discord/index'

async function server_start(data: PayloadData) {
    for(let channel of bot.channels.cache.values()) {
        if(channel.isTextBased()) {
            let serverName: string = data.payload['name'].toString()
            let serverPort: string = data.payload['port'].toString()
            let serverPassword: string = data.payload['password'] || ''
            let serverHttpPort: string = data.payload['httpPort'].toString()
            let serverMaxPlayers: string = data.payload['maxPlayers'].toString()
            let serverFpsLimit: string = data.payload['fpsLimit'].toString()
            let modules: string = data.payload['modules'].join(', ').toString()

            const embed = [
                {
                    name: 'Server name',
                    value: serverName
                },
                {
                    name: 'Server port',
                    value: serverPort
                },
                {
                    name: 'Server password',
                    value: serverPassword
                },
                {
                    name: 'HTTP port',
                    value: serverHttpPort
                },
                {
                    name: 'Max players',
                    value: serverMaxPlayers
                },
                {
                    name: 'FPS Limit',
                    value: serverFpsLimit
                },
                {
                    name: 'Server modules',
                    value: modules
                }
            ]

            return channel.send({ embeds: [ { fields: embed } ] })
        }
    }
}

export default async (sock: net.Socket, data: PayloadData) => {
    let cmd = data.type.substring(data.type.indexOf('.') + 1)
    if(cmd.startsWith('start')) {
        server_start(data)
    }
}