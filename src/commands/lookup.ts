import {Collection, GuildMember, Message, VoiceChannel} from 'discord.js'
import {getBlizzardClient} from "../config/config"

export async function lookup(args: string[], message: Message) {
    const client = await getBlizzardClient()
    const resp = await client.wow.character(['profile'], {origin: 'us', realm: args[0], name: args[1]})
    await message.channel.send({
        embed: {
            author: {
                name: message.client.user.username,
                icon_url: message.client.user.avatarURL
            },
            color: 3447003,
            title: resp.data.name,
            url: 'https://google.com',
            description: 'Character data and stuff',
            fields: [
                {
                    name: 'Test',
                    value: 'More Testing'
                },
                {
                    name: 'Test 2',
                    value: 'More Testing'
                }
            ]
        }
    })
}