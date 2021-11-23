import {Message} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Event, Run} from '../../structures/Event'
import db from '../../Models/toggle'

export const event: Event = {
    name: 'messageCreate'
}

export const run: Run = async (client: ExtendedClient, message: Message) => {
    if (!message.guild) return
    if (message.author.bot) return
    const data = await db.findOne({guildID: message.guild.id})

    if (data && data.Toggle) {
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1 // Max 1 Min 30
        const hasLeveledUp = await client.Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp)
        if (hasLeveledUp) {
            const user = await client.Levels.fetch(message.author.id, message.guild.id)
            message.reply({content: `${message.author.toString()}, Congratulations! You have leveled up to **${user.level}**. :tada:`})
        }
    }
}
