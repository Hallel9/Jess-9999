import {CommandInteraction} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run, SlashCommand} from '../../structures/SlashCommand'

export const command: SlashCommand = {
    name: 'removerole',
    description: 'Removes a role from a user',
    userPermissions: ['MANAGE_ROLES'],
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'user',
            description: 'The user to give the role to',
            required: true,
            type: 'USER'
        },
        {
            name: 'role',
            description: 'The role to remove',
            required: true,
            type: 'ROLE'
        }
    ],
    category: 'MODERATION',
    disabled: false,
    owner: false
}

export const run: Run = async (client: ExtendedClient, interaction: CommandInteraction, args: string[]) => {
    const user = interaction.options.getMember('user')
    const role = interaction.options.getRole('role')
    // @ts-ignore
    if (user.roles.highest.position >= interaction.member.roles.highest.position)
        return interaction.reply({
            embeds: [
                {
                    description: 'You cannot remove a role from a user with a higher or equal role than you',
                    color: 'RED'
                }
            ],
            ephemeral: true
        })

    if (!interaction.guild.roles.cache.has(role.id)) return interaction.reply({content: "Mention a role that's in the server.", ephemeral: true})
    //@ts-ignore
    if (!user.roles.cache.has(role.id)) return interaction.reply({content: 'That user does not have that role.', ephemeral: true})
    //@ts-ignore
    user.roles.remove(role.id)
    //@ts-ignore
    interaction.reply({content: `Successfully removed the role ${role.name} from ${user.user.tag}`, ephemeral: true})
}
