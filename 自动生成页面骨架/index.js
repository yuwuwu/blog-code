/*
 * @Author: yuyongxing
 * @Date: 2021-11-10 19:00:21
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-11-11 11:25:40
 * @Description: 
 */
let express = require('express');
let app = express()
const puppeteer = require('puppeteer');

(async () => {
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
    path: 'example.png',
    fullPage: true
  });

  const content = await getScriptContent()
  await this.page.addScriptTag({ content })
  await sleep(defer)
  await this.page.evaluate(async (options) => {
    const { genSkeleton } = Skeleton
    genSkeleton(options)
  }, options)
  console.log("file: index.js ~ line 33 ~ content", content)

  // await browser.close();
})()
app.listen(7000);