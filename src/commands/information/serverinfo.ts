import {ButtonInteraction, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run, SlashCommand} from '../../structures/SlashCommand'

export const command: SlashCommand = {
    name: 'serverinfo',
    description: 'Get information about the server',
    type: 'CHAT_INPUT',
    userPermissions: ['SEND_MESSAGES'],
    disabled: false,
    owner: false,
    category: 'INFO'
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    if (!interaction.guild.available) return
    const owner = await interaction.guild.fetchOwner()

    let embed = new MessageEmbed()
        .setTitle('Server Information')
        .setAuthor(
            interaction.guild.name,
            interaction.guild.iconURL({
                dynamic: true,
                format: 'png',
                size: 1024
            })
        )
        //@ts-ignore
        .addFields([
            {
                name: 'Members',
                value: `${interaction.guild.memberCount}`,
                inline: true
            },
            {
                name: 'Users',
                value: `${interaction.guild.members.cache.filter((m) => !m.user.bot).size}`,
                inline: true
            },
            {
                name: 'Bots',
                value: `${interaction.guild.members.cache.filter((m) => m.user.bot).size}`,
                inline: true
            },
            {
                name: 'Role Count',
                value: `${interaction.guild.roles.cache.size}`,
                inline: true
            },
            {
                name: 'Boosts',
                value: `${interaction.guild.premiumSubscriptionCount}`,
                inline: true
            },
            {
                name: 'Level',
                value: `${interaction.guild.premiumTier}`,
                inline: true
            },
            {
                name: 'Partner',
                value: `${interaction.guild.partnered ? 'Yes' : 'No'}`
            },
            {
                name: 'Owner',
                value: `${owner.user.tag}`,
                inline: true
            },
            {
                name: 'Created',
                //@ts-ignore
                value: `<t:${parseInt(
                    //@ts-ignore
                    interaction.guild.createdTimestamp / 1000
                    //@ts-ignore
                )}:F> - <t:${parseInt(
                    //@ts-ignore
                    interaction.guild.createdTimestamp / 1000
                )}:R>`
            },
            {
                name: 'User joined',
                value: `<t:${parseInt(
                    //@ts-ignore
                    interaction.guild.joinedTimestamp / 1000
                )}:F> - <t:${parseInt(
                    //@ts-ignore
                    interaction.guild.joinedTimestamp / 1000
                )}:R>`
            }
        ])
    interaction.reply({
        embeds: [embed],
        ephemeral: true
    })
}
