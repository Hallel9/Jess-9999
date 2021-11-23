import {CommandInteraction} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run, SlashCommand} from '../../structures/SlashCommand'

export const command: SlashCommand = {
    name: 'seek',
    description: 'Seek to a certain position in the song',
    userPermissions: ['SEND_MESSAGES'],
    type: 'CHAT_INPUT',
    category: 'MUSIC',
    disabled: false,
    owner: false,
    options: [
        {
            name: 'time',
            description: 'The time to seek to',
            type: 'NUMBER',
            required: true
        }
    ]
}

export const run: Run = (client: ExtendedClient, interaction: CommandInteraction, args: String[]) => {
    const queue = client.distube.getQueue(interaction.guildId)
    if (!queue)
        return interaction.reply({
            content: `There is nothing in the queue currently`,
            ephemeral: true
        })
    const time = interaction.options.getNumber('time')
    queue.seek(time)
    interaction.reply({content: `Seeked to ${time}`})
}
