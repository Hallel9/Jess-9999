import { GiveawaysManagerEvents } from 'discord-giveaways'
import ExtendedClient from './Client'

export interface Event {
	name: keyof GiveawaysManagerEvents
}

export interface Run {
	(client: ExtendedClient, ...args: any[])
}
