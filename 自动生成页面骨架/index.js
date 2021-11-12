/*
 * @Author: yuyongxing
 * @Date: 2021-11-10 19:00:21
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-11-12 10:31:33
 * @Description: 
 */
// https://github.com/famanoder/dps
// https://blog.csdn.net/zz_jesse/article/details/116452550
// dom元素过滤成骨架屏
const puppeteer = require('puppeteer');
const { getSkeletonHtml, getDomByScript } = require('./util.js')

async function openPage() {
    const option = {
        url: "http://landing.powerxene.com/static/test/index.html",
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
    console.log(getDomByScript())
    //   const content = await getScriptContent()
    await page.addScriptTag({ url: 'https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js', content: getDomByScript })
    let script = getDomByScript()
    let rect = await page.evaluate((script) => {
        $('img').css('display','none')
        console.log(script)
    },script)
    console.log(rect)
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