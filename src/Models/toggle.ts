import {Snowflake} from 'discord.js'
import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    guildID: String,
    Toggle: Boolean
})

export type Toggle = {
    guildID: Snowflake
    Toggle: Boolean
}

export default mongoose.model<Toggle>('Toggle', Schema, 'Toggle')
