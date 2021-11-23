import {WebhookClient} from 'discord.js'
import ExtendedClient from '../structures/Client'
import {Event, Run} from '../structures/Event'

export const event: Event = {
    name: 'ready'
}

export const run: Run = (client: ExtendedClient) => {
    process.on('unhandledRejection', (error: Error) => {
        const wc = new WebhookClient({
            url: 'https://discord.com/api/webhooks/898383267106021377/gLLYkGoVe1FE9JrmnIXY_qFP6VPtgYlPNysRypDPLbZLltPjtKyisw4Lizy_DRO-PoMW'
        })
        wc.send({
            embeds: [
                {
                    author: {
                        name: 'Unhandled Rejection',
                        url: client.user.displayAvatarURL({format: 'png', size: 1024})
                    },
                    description: `[${client.user.username}(${client.user.id}) Error:] ${error.stack}`,
                    color: 'DARK_BUT_NOT_BLACK'
                }
            ]
        })
    })

    process.on('uncaughtException', (error) => {
        const wc = new WebhookClient({
            url: 'https://discord.com/api/webhooks/898383267106021377/gLLYkGoVe1FE9JrmnIXY_qFP6VPtgYlPNysRypDPLbZLltPjtKyisw4Lizy_DRO-PoMW'
        })
        wc.send({
            embeds: [
                {
                    author: {
                        name: 'Uncaught Exception',
                        url: client.user.displayAvatarURL({format: 'png', size: 1024})
                    },
                    description: `[${client.user.username}(${client.user.id}) Error:] ${error.stack}`,
                    color: 'DARK_BUT_NOT_BLACK'
                }
            ]
        })
    })
}
