import { CommandInteraction, EmbedBuilder, GuildMember, TextChannel } from 'discord.js'

import { Command } from '../../command'

export default new Command (
    'serverinfo',
    'Gets server info',
    async(ctx: CommandInteraction) => {
        let guild = ctx.guild
        if(!guild){
            return ctx.reply({
                content: 'Not a valid server to get info from!',
                ephemeral: true,
            })
        }

        let owner = await guild.fetchOwner()

        let embed = new EmbedBuilder()
            .setTitle(guild.name)
            .setAuthor({
                name: owner.user.username,
                iconURL: owner.user.avatarURL() || '',
                //url: '' || '',
            })
            .setThumbnail(guild.iconURL())
            .setFields([
                {
                    name: ``,
                    value: `${guild.channels.cache.size}`,
                    inline: false
                }
            ])

        await ctx.reply({
            embeds: [ embed ]
        })
    }
)