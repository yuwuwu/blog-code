/*
 * @Author: yuwuwu
 * @Date: 2024-06-18 16:32:53
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-06-18 16:40:29
 * @FilePath: /查询淘宝商品是否补货脚本/getGoodsByTb.js
 * @Description: 获取淘宝商城商品库存
 */
const puppeteer = require("puppeteer");



const waitTime = (n) => new Promise((r) => setTimeout(r, n));
const getTbGoods = async (list = []) => {
  const browser = await puppeteer.launch({
    headless: true, //使无头浏览器可见，便于开发过程中观察
    devtools: true, // 启动浏览器时默认打开开发者工具控制台
    ignoreHTTPSErrors: true, //忽略https错误
    defaultViewport: null, //默认视窗大小
    slowMo: 100, //慢速模式，模拟人类操作
    args: [
      "--disable-infobars",
      "--no-zygote",
      "--no-sandbox",
      "--disable-gpu",
      "--no-first-run",
      "--single-process",
      "--disable-extensions",
      "--disable-xss-auditor",
      "--disable-dev-shm-usage",
      "--disable-popup-blocking",
      "--disable-setuid-sandbox",
      "--disable-accelerated-2d-canvas",
      "--enable-features=NetworkService",
    ],
  });

  const getResult = async () => {
    const result = [];
    for (let el of list) {
      const page = await browser.newPage(); //打开新的空白页
      await page.goto(el.url, {
        waitUntil: "domcontentloaded",
      }); //访问页面
      await waitTime(1500);
      const hasStock = await page.evaluate((el) => {
        console.log(el,"el");
        Object.defineProperty(navigator, "webdriver", { get: () => false });
        const loginDom = document.querySelector(".baxia-dialog");
        if (loginDom) {
          loginDom.style.display = "none";
        }
        const divList = document.querySelectorAll("div");
        let buttonDom = null;
        for (let element of divList) {
          if (element.className.includes("Actions--leftButtons")) {
            buttonDom = element;
          }
        }
        if (buttonDom && buttonDom.textContent != "商品已经卖光啦~") {
          return {
            hasStock:true,
            title:el.title,
          };
        }
        console.log(buttonDom.textContent);
        return {
          hasStock:false,
          title:el.title,
        };
      },el);
      result.push(hasStock);
    }
    await browser.close();
    return result;
  };
   return await getResult();
};
module.exports = getTbGoods;
