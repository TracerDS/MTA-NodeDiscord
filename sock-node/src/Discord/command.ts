import {
    ChatInputCommandInteraction as Interaction,
    Collection,
    SlashCommandBuilder
} from 'discord.js'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import { fetchLanguages } from './lang'
import * as config from '../config.json'
import Color from '../utils/colors'
import Logger from '../utils/logger'
import { format } from '../utils/utils'

interface ICommand {
    name: string,
    description: string,
    execute: (ctx: Interaction) => void
}

class Command implements ICommand {
    name: string
    description: string
    execute: (ctx: Interaction) => void
    
    constructor(name: string, description: string, execute: (ctx: Interaction) => void){
        this.name = name
        this.description = description
        this.execute = execute
    }
}

async function initCommands(){
    let commands: Collection<string, ICommand> = new Collection()

    const LANGS = await fetchLanguages()
	let lang: object|undefined = LANGS[config.defaultLanguage]
	if(!lang) lang = LANGS['en']

    const cmdCategoriesPath = path.join(__dirname, 'commands')
    const cmdCategories = await fs.readdir(cmdCategoriesPath)

    for(const dir of cmdCategories) {
        const cmdPath = path.join(cmdCategoriesPath, dir)
        if((await fs.lstat(cmdPath)).isFile()){
            const relPath = path.relative(cmdCategoriesPath, cmdPath)
            Logger.err(format(lang!['general'].commands.unknownFile, relPath))
            continue
        }

        for(const file of await fs.readdir(cmdPath)) {
            const filePath = path.join(cmdPath, file)
            const command = (await import(filePath)).default
            const relPath = `.${path.sep}${path.relative(cmdCategoriesPath, filePath)}`

            if(!('name' in command)){
                Logger.err(format(lang!['general'].commands.noName, relPath))
                continue
            }
            if(!('description' in command)){
                Logger.err(format(lang!['general'].commands.noDescription, relPath))
                continue
            }
            if(!('execute' in command)){
                Logger.err(format(lang!['general'].commands.noExecute, relPath))
                continue
            }
            commands.set(command.name, command)
            Logger.confirm(format(lang!['general'].commands.initialized, relPath))
        }
    }
    return commands
}

async function initCommandsArray() {
    let commands = await initCommands()

    let cmds: SlashCommandBuilder[] = []

    commands.forEach((value) => {
        cmds.push(new SlashCommandBuilder()
            .setName(value.name)
            .setDescription(value.description)
        )
    })

    return cmds
}

export type { ICommand }
export { Command, initCommands, initCommandsArray }