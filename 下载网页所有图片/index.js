/*
 * @Author: yuyongxing
 * @Date: 2021-11-24 19:39:28
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-12-29 10:35:15
 * @Description: 
 */
const puppeteer = require('puppeteer');
let url = "https://mp.weixin.qq.com/s/qUrZsZrphixCBg2PTMca0Q"

async function openPage() {
    const option = {
        url: url,
        device: "iPhone 6"
    }
    // 初始化puppeteer
    const browser = await puppeteer.launch();
    // 打开页面
    const page = await browser.newPage();
    // 设定打开页面的设备
    await page.emulate(puppeteer.devices[option.device])
    // 打开的页面地址
    await page.goto(option.url, { waitUntil: "networkidle0" });


    const skeletonHtml = getSkeletonHtml(page)
    
    console.log(skeletonHtml)
    //   await sleep(defer)
    // await this.page.evaluate(async (options) => {
    //   const { genSkeleton } = Skeleton
    //   genSkeleton(options)
    // }, options)
    //   console.log("file: index.js ~ line 33 ~ content", content)
    await page.screenshot({
        // path: new Date().getTime() + '.png',
        path: 'test.png',
        fullPage: true
    });
    await browser.close();
}
openPage()