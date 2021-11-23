import { Playlist, Queue } from 'distube'
import ExtendedClient from '../structures/Client'
import { Event, Run } from '../structures/Distube'
const status = (queue: Queue) =>
	`Volume: \`${queue.volume}%\` | Filter: \`${
		queue.filters.join(', ') || 'Off'
	}\` | Loop: \`${
		queue.repeatMode
			? queue.repeatMode === 2
				? 'All Queue'
				: 'This Song'
			: 'Off'
	}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
export const event: Event = {
	name: 'addList',
}

export const run: Run = (
	client: ExtendedClient,
	queue: Queue,
	playlist: Playlist,
) => {
	queue.textChannel.send({
		embeds: [
			{
				color: 'GREEN',
				description: `Added \`${playlist.name}\  playlist (${
					playlist.songs.length
				} songs) to the queue\n${status(queue)}`,
			},
		],
	})
}
