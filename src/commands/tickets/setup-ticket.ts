import { CommandInteraction } from 'discord.js'
import { ticketSystem } from 'simply-djs'
import ExtendedClient from '../../structures/Client'
import { Run, SlashCommand } from '../../structures/SlashCommand'

export const command: SlashCommand = {
	name: 'setup-ticket',
	description: 'Setup the ticket panel',
	userPermissions: ['MANAGE_GUILD', 'MANAGE_CHANNELS', 'MANAGE_ROLES'],
	type: 'CHAT_INPUT',
	category: 'UTIL',
	disabled: false,
	options: [],
	owner: false,
}

export const run: Run = (
	client: ExtendedClient,
	interaction: CommandInteraction,
	args: string[],
) => {
	//@ts-ignore
	ticketSystem(interaction, interaction.channel, {
		credit: false,
		slash: true,
		emoji: '🎫',
	})
}
