import {Message} from 'discord.js'
import ExtendedClient from '../structures/Client'
import {Event, Run} from '../structures/Distube'

export const event: Event = {
    name: 'searchCancel'
}

export const run: Run = (client: ExtendedClient, message: Message) => {
    message.channel.send('Search cancelled.')
}
