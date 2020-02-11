import {Message} from "discord.js"
import move from '../commands/move'

export default async (command: string, args: string[], message: Message) => {
    switch (command) {
        case 'move':
            return await move(args, message)
        default:
            return
    }
}