import { Events, Client, Collection, Interaction } from 'discord.js'

import { ICommand, initCommands } from './command'
import Intents from './intents'
import Logger from '../utils/logger'
import { fetchLanguagesSync } from './lang'
import { format } from '../utils/utils'
import * as config from '../config.json'

class Bot extends Client {
    commands: Collection<string, ICommand>
	protected _defaultLanguage: string = config.defaultLanguage
	private __languages: object

	public get language(): string { return this._defaultLanguage }
	public set language(lang: string) { this._defaultLanguage = lang }

	public get translations(): object {
		const translation = this.__languages[this._defaultLanguage]
		return translation ? translation : this.__languages['en']!
	}

    constructor() {
        super({ intents: Intents })
		
		this.__languages = fetchLanguagesSync()
        initCommands().then(value => this.commands = value)
    }
}

const bot = new Bot()

bot.on('ready', () => {
	Logger.info(format(bot.translations['bot'].loggedIn, bot.user!.tag))
})

bot.on(Events.InteractionCreate, async (ctx: Interaction) => {
    if(!ctx.isChatInputCommand()) return

    const command = bot.commands.get(ctx.commandName)

	if (!command) {
        return Logger.err(format(bot.translations['general'].commands.doesntExist, ctx.commandName))
	}

	try {
		await command.execute(ctx)
	} catch (error: any) {
		Logger.err(`[${error.name}] - ${error.message}`)

		await (ctx.replied || ctx.deferred ? ctx.followUp : ctx.reply)({
			content: bot.translations['general'].commands.executeError,
			ephemeral: true
		})
	}
})

export default bot