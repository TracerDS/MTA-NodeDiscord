import { Channel, Client, GatewayIntentBits, TextChannel } from 'discord.js'

const bot = new Client({ intents: [GatewayIntentBits.Guilds] })
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user!.tag}!`)
})

export default bot