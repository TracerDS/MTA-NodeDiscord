import { REST, Routes, Client, Guild } from 'discord.js'

import { initCommandsArray } from './command'
import Intents from './intents'

import Color from '../utils/colors'

require('dotenv').config()

;(async () => {
	const bot = new Client({ intents: Intents })
	bot.login(process.env.TOKEN)
	bot.on('ready', async (client: Client) => {
		const rest = new REST().setToken(process.env.TOKEN!)
		let commands = await initCommandsArray()

		try {
			console.log(Color.lightMagenta(`Started refreshing guild commands...`))
			bot.guilds.cache.forEach(async (guild: Guild) => {
				console.log(Color.cyan(`\t- Refreshing ${guild.name} [${guild.id}] commands...`))
				await rest.put(Routes.applicationGuildCommands(client.user!.id, guild.id))
			})
			console.log(Color.lightGreen(`Successfully reloaded guild commands!`))
			console.log()
			console.log(Color.lightMagenta(`Started refreshing global commands...`))
			
			await rest.put(
				Routes.applicationCommands(client.user!.id),
				{ body: commands },
			)

			console.log(Color.lightGreen(`Successfully reloaded global commands!`))
			bot.destroy()
		} catch (error) {
			console.error(Color.red(`An error occured: ${error}`))
		}
	})
})()