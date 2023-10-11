import { CommandInteraction, EmbedBuilder } from 'discord.js'

import { Command } from '../../command'
import { fetchLanguagesSync } from '../../lang'
import * as config from '../../../config.json'

const LANGS = fetchLanguagesSync()
let lang: object|undefined = LANGS[config.defaultLanguage]
if(!lang) lang = LANGS['en']

const CMD_SECTION = lang!['commands'].info.serverinfo

export default new Command (
    'serverinfo',
    CMD_SECTION.description,
    async(ctx: CommandInteraction) => {
        let guild = ctx.guild
        if(!guild){
            return ctx.reply({
                content: lang!['general'].commands.global.notInServer,
                ephemeral: true,
            })
        }

        let owner = await guild.fetchOwner()

        const members = await guild.members.fetch()
        const channels = await guild.channels.fetch()
        const roles = await guild.roles.fetch()
        const bans = await guild.bans.fetch()

        const embed = new EmbedBuilder()
            .setTitle(guild.name)
            .setAuthor({
                name: owner.user.username,
                iconURL: owner.user.avatarURL() || '',
            })
            .setThumbnail(guild.iconURL())
            .setFields([
                {
                    name: CMD_SECTION.owner,
                    value: `<@${owner.user.id}>`,
                    inline: true
                },
                {
                    name: CMD_SECTION.guildCreatedAt,
                    value: `<t:${Math.floor(guild.createdAt.getTime() / 1000)}:R>`,
                    inline: true
                },
                { name: '\u200b', value: '\u200b' },
                {
                    name: CMD_SECTION.guildMembers,
                    value: `${guild.memberCount}`,
                    inline: true
                },
                {
                    name: CMD_SECTION.guildUsers,
                    value: `${members.filter(user => !user.user.bot).size}`,
                    inline: true
                },
                {
                    name: CMD_SECTION.guildBots,
                    value: `${members.filter(user => user.user.bot).size}`,
                    inline: true
                },
                {
                    name: CMD_SECTION.guildChannels,
                    value: `${channels.size}`,
                    inline: true
                },
                {
                    name: CMD_SECTION.guildRoles,
                    value: `${roles.size}`,
                    inline: true
                },
                {
                    name: CMD_SECTION.guildBans,
                    value: `${bans.size}`,
                    inline: true
                },
                {
                    name: CMD_SECTION.guildBoosts,
                    value: `${guild.premiumSubscriptionCount}`,
                    inline: true
                },
                {
                    name: CMD_SECTION.guildTier,
                    value: `${guild.premiumTier}`,
                    inline: true
                },
                {
                    name: CMD_SECTION.guildVerification,
                    value: `${guild.verificationLevel}`,
                    inline: true
                },
            ])
            
        await ctx.reply({
            embeds: [ embed ]
        })
    }
)