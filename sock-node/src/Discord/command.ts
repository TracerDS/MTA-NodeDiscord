import {
    ChatInputCommandInteraction as Interaction,
    Collection,
    SlashCommandBuilder
} from 'discord.js'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import Color from '../utils/colors'

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

    const cmdCategoriesPath = path.join(__dirname, 'commands')
    const cmdCategories = await fs.readdir(cmdCategoriesPath)

    for(const dir of cmdCategories) {
        const cmdPath = path.join(cmdCategoriesPath, dir)
        if((await fs.lstat(cmdPath)).isFile()){
            let relpath = path.relative(cmdCategoriesPath, cmdPath)
            console.error(Color.red(
                `Detected unknown file in commands directory: "${relpath}"`
            ))
            continue
        }

        for(const file of await fs.readdir(cmdPath)) {
            const filePath = path.join(cmdPath, file)
            const command = (await import(filePath)).default
            const relPath = `.${path.sep}${path.relative(cmdCategoriesPath, filePath)}`

            if(!('name' in command)){
                console.error(Color.red(
                    `Command "${relPath}" doesn't have a name!`
                ))
                continue
            }
            if(!('description' in command)){
                console.error(Color.red(
                    `Command "${relPath}" doesn't have a description!`
                ))
                continue
            }
            if(!('execute' in command)){
                console.error(Color.red(
                    `Command "${relPath}" doesn't have an "execute" function!`
                ))
                continue
            }
            commands.set(command.name, command)
            console.log(Color.rgb(`Command "${relPath}" successfully initialized!`, 70,255,70))
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

export type { ICommand as ICommand }
export { Command, initCommands, initCommandsArray }