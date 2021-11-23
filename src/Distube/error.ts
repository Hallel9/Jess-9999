import {TextChannel} from 'discord.js'
import ExtendedClient from '../structures/Client'
import {Event, Run} from '../structures/Distube'

export const event: Event = {
    name: 'error'
}

export const run: Run = (client: ExtendedClient, channel: TextChannel, err: Error) => {
    channel.send(`An error has occured: ${err}`)
    console.log(err)
}
