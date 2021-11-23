import {CommandInteraction, MessageEmbed} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run} from '../../structures/Event'
import {SlashCommand} from '../../structures/SlashCommand'
import Neko from 'nekos.life'
const neko = new Neko()
export const command: SlashCommand = {
    name: 'poke',
    description: 'Poke a user',
    type: 'CHAT_INPUT',
    userPermissions: ['SEND_MESSAGES'],
    options: [
        {
            name: 'user',
            description: 'The user to poke',
            type: 'USER',
            required: true
        }
    ]
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    const member = interaction.options.getMember('user')
    const {url} = await neko.sfw.poke()
    //@ts-ignore
    return interaction.reply({
        embeds: [
            new MessageEmbed()
                //@ts-ignore
                .setAuthor(`${interaction.user.tag} poked ${member.user.tag}`)
                .setImage(url)
        ]
    })
}
