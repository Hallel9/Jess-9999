import {Message} from 'discord.js'
import ExtendedClient from '../structures/Client'
import {Event, Run} from '../structures/Distube'

export const event: Event = {
    name: 'searchNoResult'
}

export const run: Run = (client: ExtendedClient, message: Message) => {
    message.channel.send('No results found!')
}
