import {CommandInteraction, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run} from '../../structures/Event'
import {SlashCommand} from '../../structures/SlashCommand'

export const command: SlashCommand = {
    name: 'help',
    description: 'Get the commands for the bot',
    userPermissions: ['SEND_MESSAGES'],
    type: 'CHAT_INPUT',
    category: 'INFO'
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: Array<string>) => {
    const options = new MessageActionRow().addComponents(
        new MessageSelectMenu()
            .setPlaceholder('Select the command category here')
            .setCustomId('selection')
            .setMaxValues(1)
            .addOptions([
                {
                    label: 'Moderation',
                    description: 'Moderation commands of the bot',
                    value: 'moderation',
                    emoji: '<:rmod:907437764579037234>'
                },
                {
                    label: 'Utilities',
                    description: 'Utilities commands of the bot',
                    value: 'util',
                    emoji: '<:rstaff:907437764876832768>'
                },
                {
                    label: 'Misc',
                    description: 'Misc commands of the bot',
                    value: 'misc',
                    emoji: '<:rmic:907437764683894836> '
                },
                {
                    label: 'Info',
                    description: 'Info commands of the bot',
                    value: 'info',
                    emoji: '<:rbrush:907437764893618178> '
                },
                {
                    label: 'Music',
                    description: 'Music Commands of the bot',
                    value: 'music',
                    emoji: '🎶'
                },
                {
                    label: 'Economy',
                    description: 'Economy Commands of the bot',
                    value: 'economy',
                    emoji: '💰'
                },
                {
                    label: 'Level',
                    description: 'Level Commands of the bot',
                    value: 'level',
                    emoji: '🎖'
                }
            ])
    )

    interaction.reply({
        embeds: [
            {
                author: {name: `${client.user.username}'s Help Panel`, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`},
                title: 'Pick the command category you would like to view',
                description: '<:greyslash:907439436642533386> Total Commands: **' + client.slashCommands.size + '**' + ' | New Commands Coming Soon!',
                color: '#2F3136',
                fields: [
                    {
                        name: 'Links',
                        value: [`<:greydeveloper:907453794311368744> Developers: [Hallel](https://github.com/Hallel9)`, `<:greywand:907265601741938708> Icons`, `**Icon's are the the creative designers who makes the cool emojis we use!**`, `**[Join Icons](https://discord.gg/mK5y72GSbY)**`].join('\n')
                    }
                ]
            }
        ],
        components: [options],
        ephemeral: true
    })
}
