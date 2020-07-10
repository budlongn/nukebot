import {Client, Collection, Message} from 'discord.js'
import {config} from 'dotenv-flow'
import {parseArgs} from './helpers/parsing'
import {initializeAPIClients} from './config/config'
import * as fs from "fs"

class ExtendedClient extends Client {
    public commands?: Collection<string, any>
}

config()

const client: ExtendedClient = new Client()
client.commands = new Collection()

const commandFiles: string[] = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.js'));
commandFiles.map((file: string) => {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
})

const prefix = '!'

client.on('ready', async () => {
    await initializeAPIClients()
    await client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Kicking Doors and Slapping Whores',
            type: 'PLAYING'
        }
    })
    console.log('Bot Online')
})

client.on('message', async (message: Message) => {
    if (message.author.bot) return
    if (!message.guild) return
    let performGamaAlert: boolean = process.env.PERFORM_GAMA_ALERT === 'true'

    if (performGamaAlert && message.author.id === process.env.GAMA_ID && message.channel.id === process.env.ALERT_CHANNEL_ID) {
        await client.commands.get('gamapost').execute(null, message)
    }
    if (performGamaAlert && message.author.id === process.env.PWN_ID && message.channel.id === process.env.ALERT_CHANNEL_ID) {
        await client.commands.get('pwnpost').execute(null, message)
    }

    if (!message.content.startsWith(prefix)) return

    const args: string[] = parseArgs(prefix, message.content)
    const command: string = args.shift().toLowerCase()
    if (command === 'pwnpost' || command === 'gamapost') return

    try {
        return await client.commands.get(command).execute(args, message)
    } catch {
        return await message.channel.send('I have no idea what the FUCK you\'re talking about')
    }
})


client.login(process.env.DISCORD_TOKEN).then(() => {
    console.log('Login Success')
}).catch((e) => {
    console.log(e)
})

