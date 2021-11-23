import {CommandInteraction, GuildMember, MessageEmbed, TextChannel} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {SlashCommand} from '../../structures/SlashCommand'
import {Run} from '../../structures/Event'
import {Queue} from 'distube'
export const command: SlashCommand = {
    name: 'music',
    description: 'Music Options',
    type: 'CHAT_INPUT',
    userPermissions: ['SEND_MESSAGES'],
    options: [
        {
            name: 'play',
            description: 'Play a song',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'query',
                    description: 'Provide a name or url for the song',
                    type: 'STRING',
                    required: true
                }
            ]
        },
        {
            name: 'volume',
            description: 'Alter the volume',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'percent',
                    description: '10 - 10%',
                    type: 'NUMBER',
                    required: false
                }
            ]
        },
        {
            name: 'settings',
            description: 'Select an option',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'options',
                    description: 'Select an option.',
                    type: 'STRING',
                    required: true,
                    choices: [
                        {name: '🔢 View Queue', value: 'queue'},
                        {name: '⏭ Skip Song', value: 'skip'},
                        {name: '⏸Pause Song', value: 'pause'},
                        {name: '▶ Resume Song', value: 'resume'},
                        {name: '⏹ Stop Song', value: 'stop'},
                        {name: '🔀 Shuffle Queue', value: 'shuffle'},
                        {name: '🔁 Toggle Autoplay Modes', value: 'AutoPlay'},
                        {name: '🔃 Add a Related Song', value: 'RelatedSong'},
                        {name: '🔂 Toggle Repeat Mode', value: 'RepeatMode'}
                    ]
                }
            ]
        }
    ],
    category: 'MUSIC'
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: Array<string>) => {
    const {options, member, guild, channel} = interaction
    //@ts-ignore
    const vc = member.voice.channel
    if (!vc)
        return interaction.reply({
            content: 'You must be in a voice channel to use the music system',
            ephemeral: true
        })

    if (guild.me.voice.channelId && vc.id !== guild.me.voice.channelId)
        return interaction.reply({
            //@ts-ignore
            content: `I am already playing music in <#${guild.me.channelId}>`,
            ephemeral: true
        })

    try {
        switch (options.getSubcommand()) {
            case 'play': {
                client.distube.playVoiceChannel(
                    vc,
                    options.getString('query'),
                    //@ts-ignore
                    {textChannel: channel, member: member}
                )
                return interaction.reply({
                    content: '🎼 Request Recieved.'
                })
            }
            case 'volume': {
                const volume = options.getNumber('percent')
                const queue = client.distube.getQueue(interaction.guild.id)
                if (!queue)
                    return interaction.reply({
                        content: 'There is no queue',
                        ephemeral: true
                    })
                if (!volume)
                    return interaction.reply({
                        content: `The current volume is \`${queue.volume}\`%`
                    })
                if (volume > 100 || volume < 1)
                    return interaction.reply({
                        content: 'You must specify a number between 1 and 100',
                        ephemeral: true
                    })
                if (isNaN(volume))
                    return interaction.reply({
                        content: 'The volume must be a number',
                        ephemeral: true
                    })

                client.distube.setVolume(vc, volume)
                return interaction.reply({
                    content: `🎵 Volume has been set to \`${volume}\`%`
                })
            }

            case 'settings': {
                const queue = client.distube.getQueue(vc)
                if (!queue)
                    return interaction.reply({
                        content: `🎶 There is no queue.`,
                        ephemeral: true
                    })

                switch (options.getString('options')) {
                    case 'skip':
                        await queue.skip()
                        return interaction.reply({
                            content: '🎶 Song has been skipped.',
                            ephemeral: true
                        })
                    case 'stop':
                        await queue.stop()
                        return interaction.reply({
                            content: '⏯️ Song has been stopped.',
                            ephemeral: true
                        })
                    case 'pause':
                        queue.pause()
                        return interaction.reply({
                            content: '⏸️ Song has been paused.',
                            ephemeral: true
                        })
                    case 'resume':
                        queue.resume()
                        return interaction.reply({
                            content: '▶️ Song has been resumed.',
                            ephemeral: true
                        })
                    case 'shuffle':
                        await queue.shuffle()
                        return interaction.reply({content: '🔀 The queue has been shuffled.'})
                    case 'AutoPlay':
                        let mode = queue.toggleAutoplay()
                        return interaction.reply({content: `🔁 AutoPlay Mode is set to \`${mode ? 'On' : 'Off'}\``})
                    case 'RelatedSong':
                        queue.addRelatedSong()
                        return interaction.reply({content: `🔃 Related song has been added to the queue`})
                    case 'RepeatMode':
                        let Mode2 = client.distube.setRepeatMode(queue)
                        //@ts-ignore
                        return interaction.reply({content: `🔂 Repeat Mode is set to \`${(Mode2 = Mode2 ? (Mode2 == 2 ? 'Queue' : 'Song') : 'Off')}\``})

                    case 'queue':
                        return interaction.reply({
                            embeds: [new MessageEmbed().setColor('PURPLE').setDescription(`${queue.songs.map((song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 4096)}`)]
                        })
                }
                return
            }
        }
    } catch (er) {
        const errEmbed = new MessageEmbed({
            color: 'RED',
            description: `⛔ Alert: ${er}`
        })
        return interaction.reply({embeds: [errEmbed]})
    }
}
