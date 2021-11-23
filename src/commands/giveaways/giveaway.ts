import {CommandInteraction, MessageEmbed} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run, SlashCommand} from '../../structures/SlashCommand'
import ms from 'ms'

export const command: SlashCommand = {
    name: 'giveaway',
    description: 'Create a giveaway',
    userPermissions: ['MANAGE_GUILD'],
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'start',
            description: 'Start a giveaway',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'duration',
                    description: 'Provide a duration of the giveaway (1m, 1h, 1d)',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'winners',
                    description: 'Provide winners for this giveaway',
                    type: 'INTEGER',
                    required: true
                },
                {
                    name: 'prize',
                    description: 'Provide a prize',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'channel',
                    description: 'The channel to send the giveaway to',
                    type: 'CHANNEL',
                    channelTypes: ['GUILD_TEXT'],
                    required: false
                }
            ]
        },
        {
            name: 'actions',
            description: 'Options for giveaways',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'options',
                    description: 'Select an option',
                    type: 'STRING',
                    required: true,
                    choices: [
                        {
                            name: 'end',
                            value: 'end'
                        },
                        {
                            name: 'pause',
                            value: 'pause'
                        },
                        {
                            name: 'unpause',
                            value: 'unpause'
                        },
                        {
                            name: 'reroll',
                            value: 'reroll'
                        },
                        {
                            name: 'delete',
                            value: 'delete'
                        }
                    ]
                },
                {
                    name: 'messageid',
                    description: 'Provide the messageID from the giveaway',
                    type: 'STRING',
                    required: true
                }
            ]
        }
    ],
    disabled: true
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    const Sub = interaction.options.getSubcommand()
    const errorEmbed = new MessageEmbed({color: 'RED'})

    const successEmbed = new MessageEmbed({color: 'GREEN'})

    switch (Sub) {
        case 'start':
            {
                const gchannel = interaction.options.getChannel('channel') || interaction.channel
                const duration = interaction.options.getString('duration')
                const winnerCount = interaction.options.getInteger('winners')
                const prize = interaction.options.getString('prize')

                client.giveawaysManager
                    //@ts-ignore
                    .start(gchannel, {
                        duration: ms(duration),
                        winnerCount,
                        prize,
                        messages: {
                            giveaway: '🎉🎉**GIVEAWAY STARTED**🎉🎉',
                            giveawayEnded: '🎉🎉**GIVEAWAY ENDED**🎉🎉',
                            winMessage: 'Congratulations, {winners}! You won **{this.prize}**!'
                        }
                    })
                    .then(async () => {
                        successEmbed.setDescription('Giveaway was successfully started.')
                        return interaction.reply({
                            embeds: [successEmbed],
                            ephemeral: true
                        })
                    })
                    .catch((err) => {
                        errorEmbed.setDescription(`${err}`)
                        return interaction.reply({
                            embeds: [errorEmbed],
                            ephemeral: true
                        })
                    })
            }
            break
        case 'actions':
            {
                const choice = interaction.options.getString('options')
                const messageId = interaction.options.getString('messageid')

                const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId)

                // If no giveaway was found
                if (!giveaway) {
                    errorEmbed.setDescription(`Unable to find this giveaway with this message id : ${messageId} in this guild.`)
                    return interaction.reply({
                        embeds: [errorEmbed],
                        ephemeral: true
                    })
                }

                switch (choice) {
                    case 'end':
                        {
                            client.giveawaysManager
                                .end(messageId)
                                .then(() => {
                                    successEmbed.setDescription('Giveaway has been ended.')
                                    return interaction.reply({
                                        embeds: [successEmbed],
                                        ephemeral: true
                                    })
                                })
                                .catch((err) => {
                                    errorEmbed.setDescription(`${err}`)
                                    return interaction.reply({
                                        embeds: [errorEmbed],
                                        ephemeral: true
                                    })
                                })
                        }
                        break
                    case 'pause':
                        {
                            client.giveawaysManager
                                //@ts-ignore
                                .pause(messageId)
                                .then(() => {
                                    successEmbed.setDescription('Giveaway has been paused.')
                                    return interaction.reply({
                                        embeds: [successEmbed],
                                        ephemeral: true
                                    })
                                })
                                .catch((err) => {
                                    errorEmbed.setDescription(`${err}`)
                                    return interaction.reply({
                                        embeds: [errorEmbed],
                                        ephemeral: true
                                    })
                                })
                        }
                        break
                    case 'unpause':
                        {
                            client.giveawaysManager
                                .unpause(messageId)
                                .then(() => {
                                    successEmbed.setDescription('Giveaway has been unpaused.')
                                    return interaction.reply({
                                        embeds: [successEmbed],
                                        ephemeral: true
                                    })
                                })
                                .catch((err) => {
                                    errorEmbed.setDescription(`${err}`)
                                    return interaction.reply({
                                        embeds: [errorEmbed],
                                        ephemeral: true
                                    })
                                })
                        }
                        break
                    case 'reroll':
                        {
                            client.giveawaysManager
                                .reroll(messageId)
                                .then(() => {
                                    successEmbed.setDescription('Giveaway has been rerolled.')
                                    return interaction.reply({
                                        embeds: [successEmbed],
                                        ephemeral: true
                                    })
                                })
                                .catch((err) => {
                                    errorEmbed.setDescription(`${err}`)
                                    return interaction.reply({
                                        embeds: [errorEmbed],
                                        ephemeral: true
                                    })
                                })
                        }
                        break
                    case 'delete':
                        {
                            client.giveawaysManager
                                .delete(messageId)
                                .then(() => {
                                    successEmbed.setDescription('Giveaway has been deleted.')
                                    return interaction.reply({
                                        embeds: [successEmbed],
                                        ephemeral: true
                                    })
                                })
                                .catch((err) => {
                                    errorEmbed.setDescription(`${err}`)
                                    return interaction.reply({
                                        embeds: [errorEmbed],
                                        ephemeral: true
                                    })
                                })
                        }
                        break
                }
            }
            break

        default: {
            console.log('Error in giveaway command.')
        }
    }
}
