import {Queue} from 'distube'
import ExtendedClient from '../structures/Client'
import {Event, Run} from '../structures/Distube'

export const event: Event = {
    name: 'disconnect'
}

export const run: Run = async (client: ExtendedClient, queue: Queue) => {
    queue.delete()
    queue.textChannel.send({content: `I have been disconnected from the voice channel, deleting the queue.`})
}
