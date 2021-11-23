import ExtendedClient from '../structures/Client'
import {Event, Run} from '../structures/Distube'
import {Queue} from 'distube'
export const event: Event = {
    name: 'empty'
}

export const run: Run = (client: ExtendedClient, queue: Queue) => {
    queue.textChannel.send('Voice channel is empty! Leaving the channel...')
}
