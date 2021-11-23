import {CommandInteraction, MessageEmbed} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run, SlashCommand} from '../../structures/SlashCommand'
import Neko from 'nekos.life'
const neko = new Neko()

export const command: SlashCommand = {
    name: 'cuddle',
    description: 'Cuddle a user',
    userPermissions: ['SEND_MESSAGES'],
    type: 'CHAT_INPUT',
    disabled: false,
    owner: false,
    category: 'UTIL',
    options: [
        {
            name: 'user',
            description: 'The user to pat',
            type: 'USER',
            required: true
        }
    ]
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    const user = interaction.options.getMember('user')
    const {url} = await neko.sfw.cuddle()
    //@ts-ignore
    if (user.id === interaction.user.id)
        return interaction.reply({
            content: 'You cannot cuddle with yourself',
            ephemeral: true
        })

    interaction.reply({
        embeds: [
            new MessageEmbed()
                .setAuthor(
                    //@ts-ignore
                    `${interaction.user.tag} has cuddled with ${user.user.tag}`
                )
                .setImage(url)
                //@ts-ignore
                .setThumbnail(
                    interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: 'png',
                        size: 1024
                    })
                )
        ]
    })
}
