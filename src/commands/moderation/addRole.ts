import {CommandInteraction} from 'discord.js'
import ExtendedClient from '../../structures/Client'
import {Run, SlashCommand} from '../../structures/SlashCommand'

export const command: SlashCommand = {
    name: 'addrole',
    description: 'Add a role to a user',
    userPermissions: ['MANAGE_ROLES'],
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'user',
            description: 'The user to give a role to',
            required: true,
            type: 'USER'
        },
        {
            name: 'role',
            description: 'The role to give the user',
            required: true,
            type: 'ROLE'
        }
    ],
    owner: false,
    category: 'MODERATION',
    disabled: false
}

export const run: Run = (client: ExtendedClient, interaction: CommandInteraction, args: Array<string>) => {
    const user = interaction.options.getMember('user')
    const role = interaction.options.getRole('role')
    // @ts-ignore
    if (role.position > interaction.member.roles.highest.position) return interaction.reply({content: 'You cannot add a role that is higher than your highest role', ephemeral: true})
    if (role.position > interaction.guild.me.roles.highest.position) return interaction.reply({content: `That role is higher than my highest role`, ephemeral: true})
    if (!interaction.guild.roles.cache.has(role.id)) return interaction.reply({content: "Mention a role that's in the server.", ephemeral: true})
    //@ts-ignore
    if (user.roles.cache.has(role.id)) return interaction.reply({content: 'That user already has that role.', ephemeral: true})
    //@ts-ignore
    user.roles.add(role.id)
    //@ts-ignore
    interaction.reply({content: `Successfully added the role ${role.name} to ${user.user.tag}`, ephemeral: true})
}
