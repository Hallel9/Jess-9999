import ExtendedClient from './Client'
import {CommandInteraction, PermissionResolvable} from 'discord.js'

export interface Run {
    (client: ExtendedClient, interaction: CommandInteraction, args: Array<string>)
}

export interface SlashCommand {
    name: string
    description?: string
    userPermissions: PermissionResolvable[]
    category?: 'INFO' | 'MISC' | 'UTIL' | 'MODERATION' | 'OWNER' | 'MUSIC' | 'ECONOMY' | 'LEVEL'
    type: 'CHAT_INPUT' | 'MESSAGE' | 'USER'
    disabled?: boolean
    options?: Array<object>
    owner?: Boolean
}

export interface BaseCommand {
    name: string
    description: string
    userPermissions?: PermissionResolvable[]
    category?: 'INFO' | 'MISC' | 'UTIL' | 'MODERATION' | 'OWNER' | 'MUSIC' | 'ECONOMY' | 'LEVEL'
    type: 'CHAT_INPUT' | 'MESSAGE' | 'USER'
    disabled?: boolean
    options?: Array<object>
    owner?: Boolean
    run: Run
}
