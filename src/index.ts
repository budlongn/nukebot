import {Client, Message} from 'discord.js'
import commandHandler from './handlers/command'

const client = new Client()
const prefix = '!'

client.on('ready', async () => {
    console.log('Bot Online')
    await client.user.setPresence({
        status: 'online',
        game: {
            name: 'Kicking Doors and Slapping Whores',
            type: 'PLAYING',
        },
    })
})

client.on('message', async (message: Message) => {
    if (message.author.bot) return
    if (!message.guild) return
    if (!message.content.startsWith(prefix)) return

    const args: string[] = message.content.slice(prefix.length).trim().match(/[^\s"']+|"([^"]*)"|'([^']*)'/g).map((arg) => {
        return arg.replace(/['"]/g, '')
    })
    const command: string = args.shift().toLowerCase()

    return await commandHandler(command, args, message)
})

client.login('Njc2NjE0NTYxNzI5NjA5NzM4.XkLz1w.LqI8EXQDsgTR5xbbxSj_8kvJ3qk')