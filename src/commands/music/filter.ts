import {CommandInteraction, MessageEmbed} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run} from '../../structures/Distube'
import {SlashCommand} from '../../structures/SlashCommand'

export const command: SlashCommand = {
    name: 'filter',
    description: 'Custom Filters',
    userPermissions: ['SEND_MESSAGES'],
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'filter',
            description: 'A custom filter',
            type: 'STRING',
            required: false
        }
    ],
    category: 'MUSIC'
}

export const run: Run = (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    const queue = client.distube.getQueue(interaction.guildId)
    const filter = interaction.options.getString('filter')

    const filters = ['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax']
    if (!queue)
        return interaction.reply({
            content: 'There is nothing in the queue.',
            ephemeral: true
        })
    if (!filter)
        return interaction.reply({
            content: `Current filters: ${queue.filters.join(', ') || 'Off'}`
        })
    if (filter === 'off' && queue.filters?.length) queue.setFilter(false)
    else if (Object.keys(client.distube.filters).includes(filter)) queue.setFilter(filter)
    else if (filter)
        return interaction.reply({
            embeds: [new MessageEmbed().setDescription(`That is not a valid filter. Here are the available filters:`).addField('Filters', `${filters.join(', ')}`)]
        })
    interaction.reply({
        content: `Current queue filter: \`${queue.filters.join(', ') || 'Off'}\``
    })
}
