import {Client, Collection, GuildMember, Message, Permissions, VoiceChannel} from 'discord.js'

const client = new Client()
const prefix = '!'

client.on('ready', async () => {
    console.log('Bot Online')
    await client.user.setPresence({
        status: 'online',
        game: {
            name: 'Kicking Doors and Slapping Whores',
            type: 'PLAYING'
        }
    })
})

client.on('message', async (message: Message) => {
    if (message.author.bot) return
    if (!message.guild) return
    if (!message.content.startsWith(prefix)) return

    const args: string[] = message.content.trim().match(/[^\s"']+|"([^"]*)"|'([^']*)'/g).map((arg) => {
        return arg.replace(/['"]/g, '')
    })
    const command: string = args.shift().toLowerCase()

    if (command === '!move') {
        if (!message.member.hasPermission(Permissions.FLAGS.MOVE_MEMBERS)) {
            return await message.reply(`I'm sorry ${message.member.displayName}, I'm afraid I can't let you do that`)
        }
        if (args.length != 2) {
            return await message.reply('Mention exactly TWO channels retard.')
        }

        const fromChannel: VoiceChannel = message.guild.channels.find((x) => {
            return x.type === 'voice' && x.name === args[0]
        }) as VoiceChannel
        const toChannel: VoiceChannel = message.guild.channels.find((x) => {
            return x.type === 'voice' && x.name === args[1]
        }) as VoiceChannel

        const users: Collection<string, GuildMember> = fromChannel.members

        users.forEach((user: GuildMember) => {
            user.setVoiceChannel(toChannel.id)
        })
    }
})

client.login('<DISCORD_BOT_KEY_GOES_HERE>')