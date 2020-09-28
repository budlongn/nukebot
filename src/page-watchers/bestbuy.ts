import puppeteer from 'puppeteer'
import {isEqual} from 'lodash'
import {WebhookClient} from 'discord.js'

let existingProduct: string

export const bestbuyCheck = async (webhookClient: WebhookClient) => {
    const url = 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440'
    const browser = await puppeteer.launch()
    try {
        const page = await browser.newPage()
        await page.setViewport({
            width: 2560,
            height: 1440
        })
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36')
        await page.goto(url)
        await sleep(5000)

        const newProduct: string = await page.evaluate(() => {
            return document.getElementsByClassName('add-to-cart-button')[0].textContent
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
        bestbuyCheck(webhookClient)
    }, 1000 * 10)
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}