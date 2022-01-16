/*
 * @Author: yuyongxing
 * @Date: 2022-01-13 18:07:56
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-01-16 18:30:22
 * @Description: 工具方法
 */
const puppeteer = require("puppeteer");


const waitTime = (n) => new Promise((r) => setTimeout(r, n));
module.exports = async (opt) => {
  try {
    const browser = await puppeteer.launch({
      args: [
        '--no-zygote',
        '--no-sandbox',
        '--disable-gpu',
        '--no-first-run',
        '--single-process',
        '--disable-extensions',
        "--disable-xss-auditor",
        '--disable-dev-shm-usage',
        '--disable-popup-blocking',
        '--disable-setuid-sandbox',
        '--disable-accelerated-2d-canvas',
        '--enable-features=NetworkService',
      ]
    });
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
    return 'data:image/png;base64,'+ base64
  } catch (error) {
    throw error
  }
};
