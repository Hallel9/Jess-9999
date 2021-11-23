import ExtendedClient from '../../structures/Client'
import {Run, SlashCommand} from '../../structures/SlashCommand'
import {CommandInteraction, MessageEmbed} from 'discord.js'
import Neko from 'nekos.life'
const neko = new Neko()
export const command: SlashCommand = {
    name: 'kiss',
    description: 'Kiss a user',
    userPermissions: ['SEND_MESSAGES'],
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'The user to kiss',
            required: true
        }
    ]
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    const {url} = await neko.sfw.kiss()
    const user = interaction.options.getMember('user')
    //@ts-ignore
    if (user.id === interaction.user.id)
        return interaction.reply({
            embeds: [new MessageEmbed().setDescription('You cannot kiss yourself').setColor('RED')],
            ephemeral: true
        })
    //@ts-ignore
    if (user.id === interaction.guild.me.id)
        return interaction.reply({
            embeds: [new MessageEmbed().setDescription('Why you kiss me?').setColor('RED')],
            ephemeral: true
        })
    //@ts-ignore
    return interaction.reply({
        embeds: [
            new MessageEmbed()
                .setDescription(
                    //@ts-ignore
                    `${interaction.user.tag} has kissed ${user.user.tag}`
                )
                .setImage(url)
        ]
    })
}
