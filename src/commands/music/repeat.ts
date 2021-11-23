import {CommandInteraction} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run, SlashCommand} from '../../structures/SlashCommand'

export const command: SlashCommand = {
    name: 'repeat',
    description: 'Repeat the song',
    type: 'CHAT_INPUT',
    category: 'MUSIC',
    userPermissions: ['SEND_MESSAGES'],
    disabled: false,
    owner: false,
    options: [
        {
            name: 'options',
            type: 'STRING',
            description: 'Option to repeat',
            required: true
        }
    ]
}

export const run: Run = (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    const queue = client.distube.getQueue(interaction.guildId)
    if (!queue)
        return interaction.reply({
            content: 'There is nothing playing currently',
            ephemeral: true
        })
    let a = null
    let options = interaction.options.getString('options')
    if (!['off', 'song', 'queue'].includes(options))
        return interaction.reply({
            content: 'You must choose either off, song, or queue.',
            ephemeral: true
        })

    switch (options) {
        case 'off':
            a = 0
            break
        case 'song':
            a = 1
            break
        case 'queue':
            a = 2
            break
    }
    a = queue.setRepeatMode(a)
    a = a ? (a === 2 ? 'Repeat queue' : 'Repeat song') : 'Off'
    interaction.reply({content: `Set repeat mode to \`${a}\``})
}
