import {Message} from 'discord.js'
import move from '../commands/move'
import test from '../commands/test'

export default async (command: string, args: string[], message: Message) => {
    switch (command) {
        case 'move':
            return await move(args, message)
        case 'test':
            return await test(args, message)
        default:
            return await message.channel.send('I have no idea what the FUCK you\'re talking about')
    }
}