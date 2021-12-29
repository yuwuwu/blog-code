/*
 * @Author: yuyongxing
 * @Date: 2021-11-24 19:39:28
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-12-29 18:03:04
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
    const browser = await puppeteer.launch({headless:true});
    // 打开页面
    const page = await browser.newPage();
    // 设定打开页面的设备
    // await page.emulate(puppeteer.devices[option.device])
    await page.setViewport({width: 1190, height: 8000});
    // 打开的页面地址
    await page.goto(option.url, { waitUntil: "networkidle0" });
    await page.evaluate(() => { 
        window.scrollTo(0,3000)
        setTimeout(()=>{
           return Promise.resolve(window.scrollTo(0,document.body.scrollHeight))
        },3000)
        
    })

    const arr= await page.evaluate(()=>{
        let images = document.querySelectorAll('img')
        let srcs = []
        for(let i=0;i<images.length;i++){
            console.log(images[i])
           srcs.push(images[i].src)
        }
        return srcs
        console.log(images)
        return new Promise((resolve,reject)=>{
           for(let i in images){

           }
        })
        
    })
    console.log(arr)

  
    
   

    await page.screenshot({
        // path: new Date().getTime() + '.png',
        path: 'test.png',
        fullPage: true
    });
    await browser.close();
}
openPage()