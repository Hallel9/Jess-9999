import {CommandInteraction, MessageEmbed} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run, SlashCommand} from '../../structures/SlashCommand'
import Neko from 'nekos.life'
const neko = new Neko()

export const command: SlashCommand = {
    name: 'hug',
    description: 'Hug someone',
    type: 'CHAT_INPUT',
    userPermissions: ['SEND_MESSAGES'],
    category: 'UTIL',
    disabled: false,
    owner: false,
    options: [
        {
            name: 'user',
            description: 'The user to hug',
            type: 'USER',
            required: true
        }
    ]
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    const user = interaction.options.getUser('user')
    const {url} = await neko.sfw.hug()

    interaction.reply({
        embeds: [
            new MessageEmbed()
                .setAuthor(`${interaction.user.tag} has hugged ${user.tag}`)
                .setImage(url)
                .setThumbnail(
                    interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: 'png',
                        size: 1024
                    })
                )
                .setColor(user.accentColor || 'BLUE')
        ]
    })
}
