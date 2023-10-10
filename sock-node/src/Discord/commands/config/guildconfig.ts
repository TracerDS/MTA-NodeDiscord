import { CommandInteraction, EmbedBuilder, GuildMember, TextChannel } from 'discord.js'

import { Command } from '../../command'

export default new Command(
    'serverinfo',
    'Gets server info',
    async(ctx: CommandInteraction) => {
        let guild = ctx.guild
        if(!guild){
            return ctx.reply({
                content: 'Not in a server!',
                ephemeral: true,
            })
        }

    }
)