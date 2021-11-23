import { Event, Run } from '../structures/Distube'
import Client from '../structures/Client'
import { Queue, Song } from 'distube'
export const event: Event = {
	name: 'addSong',
}

export const run: Run = (client: Client, queue: Queue, song: Song) => {
	queue.textChannel.send({
		embeds: [
			{
				color: 'GREEN',
				description: ` Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
			},
		],
	})
}
