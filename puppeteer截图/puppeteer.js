/*
 * @Author: yuyongxing
 * @Date: 2022-01-13 18:07:56
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-01-13 23:00:54
 * @Description: 
 */
const puppeteer = require("puppeteer");
const waitTime = (n) => new Promise((r) => setTimeout(r, n));
module.exports = async (opt) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '–disable-gpu',
        '–disable-dev-shm-usage',
        '–disable-setuid-sandbox',
        '–no-first-run',
        '–no-sandbox',
        '–no-zygote',
        '–single-process'
      ]
    });
    const page = await browser.newPage();
    await page.goto(opt.url);
    await page.setViewport({
      width: opt.width,
      height: opt.height,
    });
    await waitTime(opt.waitTime||500);
    const ele = await page.$("opt.ele");
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
