import {Client, GuildMember} from "discord.js"

const client = new Client()

client.on('message', message => {
    if (!message.guild) return;

    if (message.content.startsWith('!move')) {
        const channels = message.guild.channels.filter((x) => {
            return x.type === 'voice'
        })

        if (channels.array().length != 2) {
            message.reply('Mention exactly TWO channels retard.')
        }

        const users: Array<GuildMember> = channels[0].members.array()

        users.forEach((user: GuildMember) => {

        })
    }
})