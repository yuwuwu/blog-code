/*
 * @Author: yuyongxing
 * @Date: 2021-11-10 19:00:21
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-11-11 19:51:57
 * @Description: 
 */
// https://github.com/famanoder/dps
// https://blog.csdn.net/zz_jesse/article/details/116452550
// dom元素过滤成骨架屏
const puppeteer = require('puppeteer');
const {getSkeletonHtml} = require('./util.js')

async function openPage(){
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
  await page.goto(option.url,{waitUntil:"networkidle0"});

  await page.screenshot({
    path: new Date().getTime()+'.png',
    fullPage: true
  });
  const skeletonHtml = getSkeletonHtml(page)
  console.log("skeletonHtml",skeletonHtml)

//   const content = await getScriptContent()
//   await this.page.addScriptTag({ content })
//   await sleep(defer)
//   await this.page.evaluate(async (options) => {
//     const { genSkeleton } = Skeleton
//     genSkeleton(options)
//   }, options)
//   console.log("file: index.js ~ line 33 ~ content", content)

  await browser.close();
}
openPage()