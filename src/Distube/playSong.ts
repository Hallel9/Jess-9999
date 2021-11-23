import {MessageEmbed} from 'discord.js'
import {Queue, Song} from 'distube'
import ExtendedClient from '../structures/Client'
import {Event, Run} from '../structures/Distube'

export const event: Event = {
    name: 'playSong'
}

const status = (queue: Queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

export const run: Run = (client: ExtendedClient, queue: Queue, song: Song) => {
    queue.textChannel.send({
        embeds: [new MessageEmbed().setColor('GREEN').setDescription(` Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)]
    })
}
