import {ButtonInteraction, CommandInteraction} from 'discord.js'
import {clickBtn} from 'simply-djs'
import ExtendedClient from '../../structures/Client'
import {Event, Run} from '../../structures/Event'
export const event: Event = {
    name: 'interactionCreate'
}

export const run: Run = (client: ExtendedClient, interaction: ButtonInteraction) => {
    clickBtn(interaction, {
        credit: false,
        timeout: false,
        pingRole: '912045455658082365',
        role: '912045455658082365',
        categoryID: '911518489871806515',
        ticketname: 'ticket-{tag}'
    })
}
