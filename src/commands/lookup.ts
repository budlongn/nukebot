import {Message} from 'discord.js'
import {getBlizzardClient, getRaiderIOClient} from "../config/config"
import {Boss, Character, Class, Raid, Spec, Talents} from "../types/character.Types"
import {find, get} from 'lodash'
import {utc} from 'moment'
import {DungeonRun, RaiderIOCharacterData} from "../types/raiderio.Types"

export async function lookup(args: string[], message: Message) {
    const blizzardClient = await getBlizzardClient()
    const raiderIOClient = await getRaiderIOClient()

    const resp = await blizzardClient.wow.character(['progression', 'talents', 'items'], {
        origin: 'us',
        realm: args[0],
        name: args[1]
    })
    const character: Character = resp.data
    const spec: Spec = find(character.talents, (x: Talents) => {
        return x.selected
    }).spec
    const {data: raiderIOData} = await raiderIOClient.get('/api/v1/characters/profile', {
        params: {
            region: 'us',
            realm: args[0],
            name: args[1],
            fields: 'mythic_plus_best_runs,mythic_plus_scores_by_season:current'
        }
    })

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
                    name: 'Mythic Plus',
                    value: buildMythicPlusDungeonList(raiderIOData),
                    inline: true
                }
            ]
        }
    })
}

function buildRecentRaidList(raids: Raid[]): string {
    let dataString: string = ''

    if (!raids) {
        dataString = '**Battle.net API is Down**'
    } else {
        for (let i: number = raids.length - 1; i >= raids.length - 5; i--) {
            const raid: Raid = raids[i]
            const highestDifficulty: string = raid.mythic > 0 ? 'mythic' : raid.heroic > 0 ? 'heroic' : raid.normal > 0 ? 'normal' : 'lfr'
            const count: number = raid.bosses.filter((x: Boss) => {
                return get(x, `${highestDifficulty}Kills`, 0) > 0
            }).length
            dataString = dataString.concat(`**${raid.name}:** ${count}/${raid.bosses.length}${highestDifficulty.slice(0, 1).toUpperCase()}\n`)
        }
    }
    return dataString
}

function buildMythicPlusDungeonList(raiderIOData: RaiderIOCharacterData): string {
    let dataString: string

    if (!raiderIOData) {
        dataString = '**RaiderIO is down AF**'
    } else {
        dataString = `Raider.IO Score: ${raiderIOData.mythic_plus_scores_by_season[0].scores.all}\n`
        for (let i = 0; i < Math.min(raiderIOData.mythic_plus_best_runs.length, 3); i++) {
            const dungeon: DungeonRun = raiderIOData.mythic_plus_best_runs[i]
            const formatString = dungeon.clear_time_ms >= 3600000 ? 'HH:mm:ss' : 'mm:ss'
            const timeString = utc(dungeon.clear_time_ms).format(formatString)
            dataString = dataString.concat(`**+${dungeon.mythic_level}** - ${dungeon.short_name} - ${timeString}\n`)
        }
    }

    return dataString
}