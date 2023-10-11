import { REST, Routes, Client, Guild } from 'discord.js'

import { initCommandsArray } from './command'
import { fetchLanguages } from './lang'
import Intents from './intents'

import * as config from '../config.json'
import { format } from '../utils/utils'
import Logger from '../utils/logger'

require('dotenv').config()

;(async () => {
	const LANGS = await fetchLanguages()
	let lang: object|undefined = LANGS[config.defaultLanguage]
	if(!lang) lang = LANGS['en']

	const bot = new Client({ intents: Intents })
	bot.login(process.env.TOKEN)
	bot.on('ready', async (client: Client) => {
		const rest = new REST().setToken(process.env.TOKEN!)
		let commands = await initCommandsArray()

		try {
			Logger.lightMagenta(lang!['slash'].guildStarted)
			bot.guilds.cache.forEach(async (guild: Guild) => {
				Logger.cyan(format(lang!['slash'].guildRefreshingCmds, guild.name, guild.id))
				await rest.put(Routes.applicationGuildCommands(client.user!.id, guild.id))
			})
			Logger.lightGreen(lang!['slash'].guildRefreshSuccess)
			Logger.lightGreen(lang!['slash'].globalStarted)
			
			await rest.put(
				Routes.applicationCommands(client.user!.id),
				{ body: commands },
			)

			Logger.lightGreen(lang!['slash'].globalRefreshSuccess)
			bot.destroy()
		} catch (error) {
			Logger.err(format(lang!['slash'].error, error))
		}
	})
})()