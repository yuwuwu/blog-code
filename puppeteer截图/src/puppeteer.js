/*
 * @Author: yuyongxing
 * @Date: 2022-01-13 18:07:56
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-01-14 18:21:28
 * @Description: 工具方法
 */
const puppeteer = require("puppeteer");


const waitTime = (n) => new Promise((r) => setTimeout(r, n));
module.exports = async (opt) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      slowMo: 0,
      args: [
        '--no-zygote',
        '--no-sandbox',
        '--disable-gpu',
        '--no-first-run',
        '--single-process',
        '-disable-extensions',
        "--disable-xss-auditor",
        '--disable-web-security',
        '--disable-dev-shm-usage',
        '--disable-popup-blocking',
        '--disable-setuid-sandbox',
        '--disable-accelerated-2d-canvas',
        '--enable-features=NetworkService',
        '--blink-settings=imagesEnabled=false',
      ]
    });
    browser.useCount = 0
    console.log(browser.useCount, "br")
    const page = await browser.newPage();
    await page.goto(opt.url);
    await page.setViewport({
      width: opt.width,
      height: opt.height,
    });
    await waitTime(opt.waitTime || 0);
    const ele = await page.$(opt.ele);
    const base64 = await ele.screenshot({
      fullPage: false,
      omitBackground: true,
      encoding: 'base64'
    });
    await browser.close();
    return base64
  } catch (error) {
    throw error
  }
};
