import {Message, MessageEmbed} from 'discord.js'
import {SearchResult} from 'distube'
import ExtendedClient from '../structures/Client'
import {Event, Run} from '../structures/Distube'

export const event: Event = {
    name: 'searchResult'
}

export const run: Run = (client: ExtendedClient, message: Message, result: Array<SearchResult>) => {
    let i = 0
    message.channel.send({
        embeds: [new MessageEmbed().setColor('YELLOW').setDescription(`**Choose an option from below**\n${result.map((song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join('\n')}\n*Enter anything else or wait 60 seconds to cancel*`)]
    })
}
