/*
 * @Author: yuyongxing
 * @Date: 2022-01-10 11:33:26
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-01-13 00:04:37
 * @Description: 
 */
const express = require('express');
const app = express()
const puppeteer = require("puppeteer");


const getImg = async (opt) => {
  console.log(opt,"opt")
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const className = ".share-box";
  await page.goto("https://yqft-api.test.hi-cloud.net/activity-new/common/testShare.html");
  await page.setViewport({
    width: opt.width,
    height: 750,
  });
  await waitTime(2000);
  const item = await page.$(className);
  // 不加path 返回buffer
  await item.screenshot({ path: "item.png" });
  await browser.close();
};


const waitTime = (n) => new Promise((r) => setTimeout(r, n));
app.use(express.json())
app.post('/api/getShareImg', (req, res) => {
  console.log(req.query,req.params,req.body, "参数")
  getImg(req.body)

});
const server = app.listen(7000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('app start listening at http://%s:%s', host, port);
});