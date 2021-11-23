import {Client, Collection, CommandInteraction} from 'discord.js'
import {Event} from './Event'
import Config from './Config'
import {glob} from 'glob'
import {promisify} from 'util'
import {config} from 'dotenv'
import {connect} from 'mongoose'
import {SlashCommand} from './SlashCommand'
import {DisTube} from 'distube'
import {SpotifyPlugin} from '@distube/spotify'
import {SoundCloudPlugin} from '@distube/soundcloud'
import {GiveawaysManager} from 'discord-giveaways'
import {GiveawaysManagerEvents} from 'discord-giveaways'
const Levels = require('discord-xp')
config()
const {TOKEN, DB} = process.env
const globPromise = promisify(glob)

class ExtendedClient extends Client {
    constructor() {
        super({
            intents: ['GUILDS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS', 'GUILD_INVITES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'GUILD_PRESENCES', 'GUILD_VOICE_STATES', 'GUILD_WEBHOOKS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'],
            partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER']
        })
    }
    public slashCommands: Collection<string, SlashCommand> = new Collection()
    public distube = new DisTube(this, {
        emitNewSongOnly: true,
        emitAddSongWhenCreatingQueue: false,
        plugins: [
            new SpotifyPlugin({
                api: {
                    clientId: '1da6f4498f6346ac97c6d08038c60b46',
                    clientSecret: '006bb942719849c38b02732120f8d72f'
                }
            }),
            new SoundCloudPlugin()
        ]
    })
    public giveawaysManager = new GiveawaysManager(this)
    public Levels = Levels
    public config: Config = {
        OWNERS: [''],
        PREFIX: '::'
    }
    public async init() {
        connect(DB).then(() => console.log(`Connected to database`))
        this.login(TOKEN)
        // connect(DB)
        //    .then(() => {
        //       console.log(`Connected to database`);
        //    })
        //    .catch((err) => {
        //       console.log(`Failed to connect to database`);
        //       console.log(err);
        //    });

        // Slash Commands
        const slashCommandFiles = await globPromise(`${process.cwd()}/src/commands/**/*.ts`)
        const arrayOfSlashCommands = []
        slashCommandFiles.map((value) => {
            const file = require(value)
            if (!file.command?.name) return
            const run = file.run
            const propertiesObject = {...file.command}
            const properties = Object.assign(propertiesObject, {run: run})
            this.slashCommands.set(properties.name, properties)
            if (['MESSAGE', 'USER'].includes(properties.type)) delete properties.description
            arrayOfSlashCommands.push(properties)
        })
        this.on('ready', async () => {
            await this.guilds.cache.find((g) => g.id === '852992845757415424').commands.set(arrayOfSlashCommands)
            // await this.application.commands.set(arrayOfSlashCommands);
        })
        this.Levels.setURL(process.env.DB)
        // Events
        const eventFiles: string[] = await globPromise(`${process.cwd()}/src/events/**/*.ts`)
        eventFiles.map(async (evenFile: string) => {
            // @ts-ignore
            const event = await import(evenFile)
            if (event?.event?.disabled) return
            this.on(event.event.name, event.run.bind(null, this))
        })
        // Distube Events
        const distubeFiles: string[] = await globPromise(`${process.cwd()}/src/Distube/**/*.ts`)
        distubeFiles.map(async (evenFile: string) => {
            const event = await import(evenFile)
            if (event?.event?.disabled) return
            this.distube.on(event.event.name, event.run.bind(null, this))
        })

        // Giveaway Events
        const giveFiles: string[] = await globPromise(`${process.cwd()}/src/Giveaways/**/*.ts`)
        giveFiles.map(async (evenFile: string) => {
            const event = await import(evenFile)
            this.on(event.event.name, event.run.bind(null, this))
        })
    }
    log(args: String) {
        console.log(`[${new Date().toLocaleString()}]`, args)
    }
}

export default ExtendedClient
