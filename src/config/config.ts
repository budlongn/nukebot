import * as Blizzard from 'blizzard.js'

let blizzardAPI

export async function getBlizzardClient() {
    if (!blizzardAPI) {
        blizzardAPI = Blizzard.initialize({
            key: process.env.BATTLE_NET_API_CLIENT_ID,
            secret: process.env.BATTLE_NET_API_SECRET,
            origin: 'us',
            locale: 'en_US'
        })

        const authRequest = await blizzardAPI.getApplicationToken()

        blizzardAPI.defaults.token = authRequest.data.access_token
    }
    return blizzardAPI
}