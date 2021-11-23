import {CommandInteraction, MessageEmbed} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run, SlashCommand} from '../../structures/SlashCommand'

export const command: SlashCommand = {
    name: 'userinfo',
    description: 'Get information about a user',
    type: 'CHAT_INPUT',
    userPermissions: ['SEND_MESSAGES'],
    category: 'INFO',
    disabled: false,
    options: [
        {
            name: 'user',
            description: 'The user to get information about',
            type: 'USER',
            required: false
        }
    ],
    owner: false
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    const user = interaction.options.getMember('user') || interaction.member

    const userEmbed = new MessageEmbed()
        .setAuthor(
            //@ts-ignore
            user.user.tag,
            // @ts-ignore
            user.displayAvatarURL({dynamic: true, format: 'png', size: 1024})
        )
        .addFields([
            {
                name: 'ID',
                //@ts-ignore
                value: `${user.id}`,
                inline: true
            },
            {
                name: 'bot',
                //@ts-ignore
                value: `${user.user.bot ? 'Bot' : 'User'}`,
                inline: true
            },
            {
                name: 'Created',
                //@ts-ignore
                value: `<t:${parseInt(
                    //@ts-ignore
                    user.user.createdTimestamp / 1000
                    //@ts-ignore
                )}:F> - <t:${parseInt(user.user.createdTimestamp / 1000)}:R>`
            },
            {
                name: 'User Flags',
                //@ts-ignore
                value: `${
                    //@ts-ignore
                    user.user.flags.toArray().join(', ') || 'No user flags'
                }`,
                inline: true
            }
        ])
    interaction.reply({embeds: [userEmbed], ephemeral: true})
}
