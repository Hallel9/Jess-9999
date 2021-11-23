import {CommandInteraction} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run, SlashCommand} from '../../structures/SlashCommand'

export const command: SlashCommand = {
    name: 'createuser',
    description: 'Create a new user',
    userPermissions: ['SEND_MESSAGES'],
    type: 'CHAT_INPUT',
    category: 'LEVEL',
    disabled: false,
    options: [],
    owner: false
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    const hasAcc = await client.Levels.fetch(interaction.user.id, interaction.guildId)
    if (hasAcc) return interaction.reply({content: 'You already have an account!', ephemeral: true})
    const user = await client.Levels.createUser(interaction.user.id, interaction.guildId)
    return interaction.reply({content: `Successfully created an account for ${interaction.user.tag}\n\n Data: \n${user.xp} xp\n${user.level} Level`, ephemeral: true})
}
