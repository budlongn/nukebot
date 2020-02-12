import {Message} from 'discord.js'

export default async (args: string[], message: Message) => {
    return await message.channel.send('Received the test!')
}