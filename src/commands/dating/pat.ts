import {CommandInteraction, MessageEmbed} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run} from '../../structures/Distube'
import {SlashCommand} from '../../structures/SlashCommand'
import NekoClient from 'nekos.life'
const neko = new NekoClient()
export const command: SlashCommand = {
    name: 'pat',
    description: 'Pat someone',
    userPermissions: ['SEND_MESSAGES'],
    type: 'CHAT_INPUT',
    category: 'UTIL',
    disabled: false,
    owner: false,
    options: [
        {
            name: 'user',
            description: 'The user to type',
            type: 'USER',
            required: true
        }
    ]
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    const user = interaction.options.getMember('user')
    //@ts-ignore
    interaction.reply({
        embeds: [
            new MessageEmbed()
                .setAuthor(
                    //@ts-ignore
                    `${interaction.user.tag} has patted ${user.user.tag}`
                )
                .setImage((await neko.sfw.pat()).url)
                .setThumbnail(
                    interaction.user.displayAvatarURL({
                        dynamic: true,
                        size: 1024,
                        format: 'png'
                    })
                )
        ]
    })
}
