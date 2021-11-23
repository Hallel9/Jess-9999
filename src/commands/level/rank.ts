import {CommandInteraction} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run, SlashCommand} from '../../structures/SlashCommand'

export const command: SlashCommand = {
    name: 'rank',
    description: 'Get your current rank',
    userPermissions: ['SEND_MESSAGES'],
    type: 'CHAT_INPUT',
    category: 'LEVEL',
    options: [
        {
            name: 'user',
            description: 'The user to get the rank of',
            type: 'USER',
            required: false
        }
    ],
    disabled: false,
    owner: true
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    const target = interaction.options.getMember('user') || interaction.member
    //@ts-ignore
    const user = await client.Levels.fetch(target.id, interaction.guildId)
    //@ts-ignore
    if (!user) return interaction.reply({content: `${target.nickname ? target.nickname : target.user.username} has not yet started earning xp yet.`, ephemeral: true})
    //@ts-ignore
    interaction.reply({content: `**${target.user.tag}** is currently level \`${user.level}\` with \`${user.xp}\` xp.`})
}
