import { Giveaway } from 'discord-giveaways'
import ExtendedClient from '../structures/Client'
import { Event, Run } from '../structures/Giveaway'

export const event: Event = {
	name: 'giveawayDeleted',
}

export const run: Run = (client: ExtendedClient, giveaway: Giveaway) => {
	giveaway.message.channel.send(
		'Giveaway with message ID - ' +
			giveaway.messageId +
			' has been deleted',
	)
}
