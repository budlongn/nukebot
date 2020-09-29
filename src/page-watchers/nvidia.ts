import puppeteer from 'puppeteer'
import {isEqual} from 'lodash'
import {WebhookClient} from 'discord.js'

let existingProduct: string

export const nvidiaCheck = async (webhookClient: WebhookClient) => {
    const url = 'https://www.nvidia.com/en-us/shop/geforce/?page=1&limit=9&locale=en-us&search=rtx%203080'
    const browser = await puppeteer.launch()
    try {
        const page = await browser.newPage()
        await page.setViewport({
            width: 2560,
            height: 1440
        })
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36')
        await page.goto(url, {waitUntil: 'networkidle0'})
        await sleep(5000)

        const newProduct: string = await page.evaluate(() => {
            let product: string = null
            document.querySelectorAll('#resultsDiv > div > div').forEach((element) => {
                const selected = element.querySelector('div.details-col > h2')
                if (selected.textContent === 'NVIDIA GEFORCE RTX 3080') {
                    product = element.outerHTML
                }
            })
            return product
        })

        if (!isEqual(existingProduct, newProduct)) {
            if (existingProduct) {
                await webhookClient.send(`<@${process.env.ME_ID}> <@${process.env.SANDY_ID}> <@${process.env.HOANG_ID}> Page change detected <${url}>`, {
                    files: [await page.screenshot()]
                })
            }
            existingProduct = newProduct
        }
    } catch (e) {
        console.log(e)
        await webhookClient.send(`Nvidia Encountered an error\n${e}`)
    } finally {
        await browser.close()
    }
    setTimeout(() => {
        nvidiaCheck(webhookClient)
    }, 1000 * 10)
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}