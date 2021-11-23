import ExtendedClient from '../structures/Client'
import { Event, Run } from '../structures/Event'

export const event: Event = {
	name: 'ready',
}

export const run: Run = (client: ExtendedClient) => {
	console.log(`Logged in as ${client.user.tag}`)
}
