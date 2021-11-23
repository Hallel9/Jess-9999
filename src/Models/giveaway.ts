import mongoose from 'mongoose'
import { Snowflake } from 'discord.js'
const giveawaySchema = new mongoose.Schema(
	{
		messageId: String,
		channelId: String,
		guildId: String,
		startAt: Number,
		endAt: Number,
		ended: Boolean,
		winnerCount: Number,
		prize: String,
		messages: {
			giveaway: String,
			giveawayEnded: String,
			inviteToParticipate: String,
			drawing: String,
			dropMessage: String,
			//@ts-ignore
			winMessage: mongoose.Mixed,
			//@ts-ignore
			embedFooter: mongoose.Mixed,
			noWinner: String,
			winners: String,
			endedAt: String,
			hostedBy: String,
		},
		thumbnail: String,
		hostedBy: String,
		winnerIds: { type: [String], default: undefined },
		//@ts-ignore
		reaction: mongoose.Mixed,
		botsCanWin: Boolean,
		//@ts-ignore
		embedColor: mongoose.Mixed,
		//@ts-ignore
		embedColorEnd: mongoose.Mixed,
		exemptPermissions: { type: [], default: undefined },
		exemptMembers: String,
		bonusEntries: String,
		//@ts-ignore
		extraData: mongoose.Mixed,
		lastChance: {
			enabled: Boolean,
			content: String,
			threshold: Number,
			//@ts-ignore
			embedColor: mongoose.Mixed,
		},
		pauseOptions: {
			isPaused: Boolean,
			content: String,
			unPauseAfter: Number,
			//@ts-ignore
			embedColor: mongoose.Mixed,
			durationAfterPause: Number,
		},
		isDrop: Boolean,
		allowedMentions: {
			parse: { type: [String], default: undefined },
			users: { type: [String], default: undefined },
			roles: { type: [String], default: undefined },
		},
	},
	{ id: false },
)

export type GiveawayType = {
	messageId: Snowflake
	channelId: Snowflake
	guildID: Snowflake
	startAt: Number
	endAt: Number
	ended: Boolean
	winnerCount: Number
	prize: String
	messages: {
		giveaway: String
		giveawayEnded: String
		inviteToParticipate: String
		drawning: String
		dropMessage: String
		winMessage: mongoose.Mixed
		embedFooter: mongoose.Mixed
		noWinner: String
		winners: String
		endedAt: String
		hostedBy: String
	}
	thumbnail: String
	hostedBy: String
	winnerIds: { type: [String]; default: undefined }
	reaction: mongoose.Mixed
	botsCanWin: Boolean
	embedColor: mongoose.Mixed
	embedColorEnd: mongoose.Mixed
	exemptPermissions: { type: []; default: undefined }
	exemptMembers: String
	bonusEntries: String
	//@ts-ignore
	extraData: mongoose.Mixed
	lastChance: {
		enabled: Boolean
		content: String
		threshold: Number
		//@ts-ignore
		embedColor: mongoose.Mixed
	}
	pauseOptions: {
		isPaused: Boolean
		content: String
		unPauseAfter: Number
		//@ts-ignore
		embedColor: mongoose.Mixed
		durationAfterPause: Number
	}
	isDrop: Boolean
	allowedMentions: {
		parse: { type: [String]; default: undefined }
		users: { type: [String]; default: undefined }
		roles: { type: [String]; default: undefined }
	}
}
{
	id: false
}

// Create the model
module.exports = mongoose.model<GiveawayType>('giveaways', giveawaySchema)
