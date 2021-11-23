import {SlashCommand} from '../../structures/SlashCommand'
import {Run} from '../../structures/SlashCommand'
import Discord, {CommandInteraction} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {ExtendedInteraction} from '../../interfaces/ExtendedInteraction'
import db from '../../Models/toggle'
export const command: SlashCommand = {
    name: 'toggle',
    description: 'Toggle systems',
    userPermissions: ['MANAGE_GUILD'],
    type: 'CHAT_INPUT',
    category: 'MISC',
    options: [
        {
            name: 'system',
            description: "Toggle the system's of the bot for the server",
            type: 'SUB_COMMAND'
        },
        {
            name: 'list',
            description: "List of all the system's you will toggle",
            type: 'SUB_COMMAND'
        }
    ]
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: Array<string>) => {
    if (interaction.options.getSubcommand() === 'list') {
        interaction.reply({
            content: [`> Welcome Message`, `> Goodbye Message`].join('\n'),
            ephemeral: true
        })
    }

    if (interaction.options.getSubcommand() === 'system') {
        const data = await db.findOne({guildID: interaction.guild.id})
        if (!data) {
            await db.create({
                guildID: interaction.guild.id,
                Toggle: true
            })
            return interaction.reply({content: `All Systems have been disabled!`, ephemeral: true})
        } else if (data.Toggle) {
            await db.findOneAndUpdate({guildID: interaction.guild.id}, {Toggle: false})
            return interaction.reply({
                embeds: [
                    {
                        description: `<:greytick:907281080346882058> Toggle is now **off**`,
                        color: '#2F3136'
                    }
                ],
                ephemeral: true
            })
        } else if (!data?.Toggle) {
            await db.findOneAndUpdate({guildID: interaction.guild.id}, {Toggle: true})
            return interaction.reply({
                embeds: [
                    {
                        description: `<:greytick:907281080346882058> Toggle is now **on**`,
                        color: '#2F3136'
                    }
                ],
                ephemeral: true
            })
        }
    }
}
