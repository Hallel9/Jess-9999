import {SlashCommand, Run} from '../../structures/SlashCommand'
import {CommandInteraction} from 'discord.js'
import ExtendedClient from '../../structures/Client'

export const command: SlashCommand = {
    name: 'ping',
    description: 'A simple ping command',
    userPermissions: ['ADMINISTRATOR'],
    type: 'CHAT_INPUT'
}
export const run: Run = (client: ExtendedClient, interaction: CommandInteraction, args: Array<string>) => {
    interaction.reply({
        content: 'Pong! ' + `\`${client.ws.ping}\` ms`,
        ephemeral: true
    })
}
