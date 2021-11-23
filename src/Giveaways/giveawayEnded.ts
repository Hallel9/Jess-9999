import { Giveaway } from 'discord-giveaways'
import { GuildMember, MessageReaction } from 'discord.js'
import ExtendedClient from '../structures/Client'
import { Event, Run } from '../structures/Giveaway'

export const event: Event = {
	name: 'giveawayEnded',
}

export const run: Run = (
	client: ExtendedClient,
	giveaway: Giveaway,
	winners: Array<GuildMember>,
) => {
	winners.forEach((winner) => {
		winner.send(
			'Congratulations ' +
				winner.user.username +
				', you won: ' +
				`\`${giveaway.prize}\``,
		)
	})
}
