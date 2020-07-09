import {Message} from 'discord.js'

export async function pwnpost(message: Message) {
    const regex: RegExp = /(https?|chrome):\/\/[^\s$.?#].[^\s]*/gm

    if (regex.test(message.content) || message.attachments.first()) {
        await message.react(process.env.EMOJI_ID)
    }
}