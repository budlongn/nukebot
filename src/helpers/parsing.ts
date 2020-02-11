export function parseArgs(prefix: string, messageContent: string): string[] {
    return messageContent.slice(prefix.length).trim().match(/[^\s"']+|"([^"]*)"|'([^']*)'/g).map((arg) => {
        return arg.replace(/['"]/g, '')
    })
}