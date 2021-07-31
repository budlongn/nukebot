import {Message} from 'discord.js'
import nukebotAPI from '../api/nukebot'

export async function pwnism(message: Message) {
    const pwnism = await nukebotAPI.getPwnism()

    return await message.channel.send(pwnism.quote)
}