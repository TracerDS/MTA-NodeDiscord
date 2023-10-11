import { CommandInteraction, EmbedBuilder, GuildMember, TextChannel } from 'discord.js'

import { Command } from '../../command'
import { fetchLanguagesSync } from '../../lang'
import * as config from '../../../config.json'

const LANGS = fetchLanguagesSync()
let lang: object|undefined = LANGS[config.defaultLanguage]
if(!lang) lang = LANGS['en']

const CMD_SECTION = lang!['commands'].info.guildconfig

export default new Command (
    'guildconfig',
    CMD_SECTION.description,
    async(ctx: CommandInteraction) => {
        let guild = ctx.guild
        if(!guild){
            return ctx.reply({
                content: lang!['general'].commands.global.notInServer,
                ephemeral: true,
            })
        }

    }
)