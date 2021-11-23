import {MessageEmbed, SelectMenuInteraction} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Event, Run} from '../../structures/Event'

export const event: Event = {
    name: 'interactionCreate'
}

export const run: Run = async (client: ExtendedClient, interaction: SelectMenuInteraction) => {
    if (interaction.isSelectMenu()) {
        if (interaction.customId === 'selection') {
            if (interaction.message.author.id !== client.user.id) return

            const modEmbed = new MessageEmbed().setColor('#f88c45').setTimestamp().setAuthor(`${client.user.username}'s Moderation Commands`, client.user.displayAvatarURL())

            const utilEmbed = new MessageEmbed().setColor('#717bf1').setTimestamp().setAuthor(`${client.user.username}'s Utilities Commands`, client.user.displayAvatarURL())

            const miscEmbed = new MessageEmbed().setColor('#8572dd').setTimestamp().setAuthor(`${client.user.username}'s Misc Commands`, client.user.displayAvatarURL())

            const infoEmbed = new MessageEmbed().setColor('#50C3EA').setTimestamp().setAuthor(`${client.user.username}'s Information Commands`, client.user.displayAvatarURL())
            const musicEmbed = new MessageEmbed().setColor('#50C3EA').setTimestamp().setAuthor(`${client.user.username}'s Music Commands`, client.user.displayAvatarURL())
            const ecoEmbed = new MessageEmbed().setColor('#50C3EA').setTimestamp().setAuthor(`${client.user.username}'s Economy Commands`, client.user.displayAvatarURL())
            const levEmbed = new MessageEmbed().setColor('#50C3EA').setTimestamp().setAuthor(`${client.user.username}'s Level Commands`, client.user.displayAvatarURL())

            const modArray = []
            const utilArray = []
            const miscArray = []
            const infoArray = []
            const musicArray = []
            const ecoArray = []
            const levArray = []

            client.slashCommands.forEach((cmd) => {
                switch (cmd.category) {
                    case 'MODERATION':
                        modArray.push(cmd || 'No commands')
                        break
                    case 'UTIL':
                        utilArray.push(cmd || 'No commands')
                        break
                    case 'MISC':
                        miscArray.push(cmd || 'No commands')
                        break
                    case 'INFO':
                        infoArray.push(cmd || 'No commands')
                        break
                    case 'MUSIC':
                        musicArray.push(cmd || 'No commands')
                        break
                    case 'ECONOMY':
                        ecoArray.push(cmd || 'No commands')
                        break
                    case 'LEVEL':
                        levArray.push(cmd)
                }
            })

            modArray.forEach((cmd) => modEmbed.addField(`/${cmd.name}`, `${cmd.description || 'No description specified'}`))
            utilArray.forEach((cmd) => utilEmbed.addField(`/${cmd.name}`, `${cmd.description || 'No description specified'}`))
            miscArray.forEach((cmd) => miscEmbed.addField(`/${cmd.name}`, ` ${cmd.description || 'No description specified'}`))
            infoArray.forEach((cmd) => infoEmbed.addField(`/${cmd.name}`, ` ${cmd.description || 'No description specified'}`))
            musicArray.forEach((cmd) => musicEmbed.addField(`/${cmd.name}`, `${cmd.description || 'No description specified'}`))
            ecoArray.forEach((cmd) => ecoEmbed.addField(`/${cmd.name}`, `${cmd.description || 'No description specified'}`))
            levArray.forEach((cmd) => levEmbed.addField(`/${cmd.name}`, `${cmd.description || 'No description specified'}`))

            function select(menu: SelectMenuInteraction) {
                switch (menu.values[0]) {
                    case 'moderation':
                        menu.reply({embeds: [modEmbed], ephemeral: true})
                        break
                    case 'util':
                        menu.reply({embeds: [utilEmbed], ephemeral: true})
                        break
                    case 'misc':
                        menu.reply({embeds: [miscEmbed], ephemeral: true})
                        break
                    case 'info':
                        menu.reply({embeds: [infoEmbed], ephemeral: true})
                        break
                    case 'music':
                        menu.reply({embeds: [musicEmbed], ephemeral: true})
                        break
                    case 'economy':
                        menu.reply({embeds: [ecoEmbed], ephemeral: true})
                        break
                    case 'level':
                        menu.reply({embeds: [levEmbed], ephemeral: true})
                }
            }

            select(interaction)
        }
    }
}
