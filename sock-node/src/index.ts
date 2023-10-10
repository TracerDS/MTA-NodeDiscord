import { Server } from './Server'
import bot from './Discord'

require('dotenv').config()

const server = new Server()
server.autoInit()
bot.login(process.env.TOKEN)

export {}