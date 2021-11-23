import {CommandInteraction} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run, SlashCommand} from '../../structures/SlashCommand'

export const command: SlashCommand = {
    name: 'deleteuser',
    description: 'Deletes an existing user.',
    userPermissions: ['MANAGE_GUILD'],
    type: 'CHAT_INPUT',
    category: 'LEVEL',
    disabled: false,
    options: [
        {
            name: 'user',
            type: 'USER',
            required: true,
            description: 'The user to delete.'
        }
    ],
    owner: false
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    const member = interaction.options.getMember('user')
    //@ts-ignore
    const hasAcc = await client.Levels.fetch(id.id, interaction.guildId)
    //@ts-ignore
    if (!hasAcc) return interaction.reply({content: `${member.nickname ? member.nickname : member.user.username} not have an account.`, ephemeral: true})
    await client.Levels.deleteUser(interaction.user.id, interaction.guildId)
    return interaction.reply({content: `Successfully deleted an account for ${member.toString()}`, ephemeral: true})
}
