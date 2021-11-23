import {CommandInteraction} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Event, Run} from '../../structures/Event'
import {BaseCommand} from '../../structures/SlashCommand'

export const event: Event = {
    name: 'interactionCreate'
}

const Developers = [
    '241632903258177536', // Hallel
    '746721583804055634' // Unusual
]

export const run: Run = (client: ExtendedClient, interaction: CommandInteraction) => {
    if (interaction.isCommand()) {
        const command = client.slashCommands.get(interaction.commandName) as BaseCommand
        if (!command) return
        const args = []
        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name)
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value)
                })
            } else if (option.value) args.push(option.value)
        }

        interaction.member = interaction.guild.members.cache.get(interaction.user.id)
        if (command?.disabled)
            return interaction.reply({
                embeds: [
                    {
                        description: `<:greycross:907281080275599401> \`${command.name}\` has been disabled`,
                        color: 'RED'
                    }
                ],
                ephemeral: true
            })

        if (command.owner && !Developers.includes(interaction.user.id))
            return interaction.reply({
                embeds: [
                    {
                        description: `<:greycross:907281080275599401> Only the bot developers can run this command.`,
                        color: 'RED'
                    }
                ],
                ephemeral: true
            })
        if (command?.userPermissions?.length) {
            if (!interaction.member.permissions.has(command.userPermissions)) {
                for (const owner of Developers) {
                    if (!owner.includes(interaction.user.id)) {
                        command.run(client, interaction, args)
                        break
                    } else {
                        return interaction.reply({
                            ephemeral: true,
                            content: `Missing Permission(s)  \`${command.userPermissions?.join(', ')}\``
                        })
                        break
                    }
                }
            } else command.run(client, interaction, args)
        }
    }
}
