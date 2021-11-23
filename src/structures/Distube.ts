import {ClientEvents} from 'discord.js'
import {DisTubeEvents} from 'distube'
import ExtendedClient from './Client'
import Client from './Client'

export interface Event {
    name: keyof DisTubeEvents
}

export interface Run {
    (client: Client, ...args: any[])
}
