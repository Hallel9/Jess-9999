import {CommandInteraction, Message, MessageEmbed} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run} from '../../structures/Event'
import {SlashCommand} from '../../structures/SlashCommand'
import Neko from 'nekos.life'
const neko = new Neko()
export const command: SlashCommand = {
    name: 'tickle',
    userPermissions: ['SEND_MESSAGES'],
    description: 'Tickle someone',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'user',
            description: 'User to ticket',
            type: 'USER',
            required: true
        }
    ]
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    const member = interaction.options.getMember('user')
    const {url} = await neko.sfw.tickle()
    //@ts-ignore
    if (member.id === interaction.user.id)
        return interaction.reply({
            content: 'You cannot tickle yourself',
            ephemeral: true
        })
    //@ts-ignore
    if (member.id === interaction.guild.me.id)
        return interaction.reply({
            content: 'You cannot tickle me',
            ephemeral: true
        })
    //@ts-ignore
    return interaction.reply({
        embeds: [
            new MessageEmbed()
                //@ts-ignore
                .setAuthor(`${interaction.user.tag} tickled ${member.user.tag}`)
                .setImage(url)
        ]
    })
}
