import {Message} from 'discord.js'
import {getBlizzardClient} from "../config/config"
import {Boss, Character, Class, Raid, Spec, Talents} from "../types/battlenet"
import {find, get} from 'lodash'

export async function lookup(args: string[], message: Message) {
    const client = await getBlizzardClient()
    const resp = await client.wow.character(['progression', 'talents', 'items'], {
        origin: 'us',
        realm: args[0],
        name: args[1]
    })
    const character: Character = resp.data
    const spec: Spec = find(character.talents, (x: Talents) => {
        return x.selected
    }).spec

    await message.channel.send({
        embed: {
            author: {
                name: `${character.name} - ${character.realm} | ${spec.name} ${Class[character.class]} | ${character.items.averageItemLevelEquipped} ilvl | ${character.items.neck.azeriteItem.azeriteLevel} HoA`,
                url: `https://worldofwarcraft.com/en-us/character/${args[0]}/${args[1]}`
            },
            thumbnail: {
                url: `http://render-us.worldofwarcraft.com/character/${character.thumbnail}`
            },
            color: 3447003,
            description: 'Character data and stuff',
            fields: [
                {
                    name: 'Raid Progress',
                    value: buildRecentRaidList(character.progression.raids),
                    inline: true
                },
                {
                    name: 'M+ data maybe?',
                    value: 'Or something else',
                    inline: true
                }
            ]
        }
    })
}

function buildRecentRaidList(raids: Raid[]): string {
    let progString: string = ''
    for (let i: number = raids.length - 1; i >= raids.length - 5; i--) {
        const raid: Raid = raids[i]
        const highestDifficulty: string = raid.mythic > 0 ? 'mythic' : raid.heroic > 0 ? 'heroic' : raid.normal > 0 ? 'normal' : 'lfr'
        const count: number = raid.bosses.filter((x: Boss) => {
            return get(x, `${highestDifficulty}Kills`, 0) > 0
        }).length
        progString = progString.concat(`**${raid.name}:** ${count}/${raid.bosses.length}${highestDifficulty.slice(0, 1).toUpperCase()}\n`)
    }
    return progString
}