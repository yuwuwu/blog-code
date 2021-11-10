/*
 * @Author: yuyongxing
 * @Date: 2021-11-10 19:00:21
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-11-10 19:05:09
 * @Description: 
 */
let express = require('express');
let app = express()
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com/famanoder/dps');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})()
app.listen(7000);