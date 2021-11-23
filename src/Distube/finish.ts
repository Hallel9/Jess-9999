import { Queue } from 'distube'
import ExtendedClient from '../structures/Client'
import { Event } from '../structures/Distube'

export const event: Event = {
	name: 'finish',
}

export const run = (client: ExtendedClient, queue: Queue) => {
	queue.textChannel.send('Finished!')
}
