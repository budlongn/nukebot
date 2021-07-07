import {Message} from 'discord.js'

export async function help(message: Message) {
    return await message.author.send('!clear <number>\nDeletes a specified number of messages from the channel\n\n' +
        '!startraffle #CHANNEL_NAME \'MESSAGE\'\nStarts a raffle in the specified channel using the specified message\n\n' +
        '!enter\nEnters the currently running raffle you must include a screenshot in the same message\n\n' +
        '!pickwinner\nRandomly selects a winner for the currently running raffle\n\n' +
        '!endraffle\nEnds the currently running raffle, THIS DOES NOT PICK A WINNER\n\n' +
        '!hax\nPosts a funny quote from weeb guild\n\n' +
        '!lookup <REALM_NAME> <CHARACTER_NAME>\nPerforms a quick lookup for a wow character\n\n' +
        '!move \'FROM_VOICE_CHANNEL\' \'TO_VOICE_CHANNEL\'\nMoves all users from the first voice channel, to the second voice channel\n\n' +
        '!sales\nList sales for the current week\n\n' +
        '!sales add\nStarts a Q&A series to add a sale\n\n' +
        '!sales list YYYY-MM-DD\nLists sales for the week of the specified date, if no date is provided it will list sales for the current week\n\n' +
        '!sales delete <SALE_ID_NUMBER>\nDeletes a specified sale, use the list command to find the id\n\n')
}