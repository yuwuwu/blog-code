/*
 * @Author: yuyongxing
 * @Date: 2022-01-13 18:07:56
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-01-16 20:32:08
 * @Description: 工具方法
 */
const puppeteer = require("puppeteer");
const genericPool = require('generic-pool')


const waitTime = (n) => new Promise((r) => setTimeout(r, n));
const initPuppeteerPool = () => {
  if (global.pp) global.pp.drain().then(() => global.pp.clear())
  const opt = {
    max: 4,//最多产生多少个 puppeteer 实例 。
    min: 1,//保证池中最少有多少个实例存活
    testOnBorrow: true,// 在将 实例 提供给用户之前，池应该验证这些实例。
    autostart: false,//是不是需要在 池 初始化时 初始化 实例
    idleTimeoutMillis: 1000 * 60 * 60,//如果一个实例 60分钟 都没访问就关掉他
    evictionRunIntervalMillis: 1000 * 60 * 3,//每 3分钟 检查一次 实例的访问状态
    maxUses: 2048,//自定义的属性：每一个 实例 最大可重用次数。
    validator: () => Promise.resolve(true)
  }
  const factory = {
    create: () =>
      puppeteer.launch({
        // headless:false,//有头模式
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
      }).then(instance => {
        instance.useCount = 0;
        return instance;
      }),
    destroy: instance => {
      instance.close()
    },
    validate: instance => {
      return opt.validator(instance).then(valid => Promise.resolve(valid && (opt.maxUses <= 0 || instance.useCount < opt.maxUses)));
    }
  };
  const pool = genericPool.createPool(factory, opt)
  const genericAcquire = pool.acquire.bind(pool)
  // 重写了原有池的消费实例的方法。添加一个实例使用次数的增加
  pool.acquire = () =>
    genericAcquire().then(instance => {
      instance.useCount += 1
      return instance
    })

  pool.use = fn => {
    let resource
    return pool
      .acquire()
      .then(r => {
        resource = r
        return resource
      })
      .then(fn)
      .then(
        result => {
          // 不管业务方使用实例成功与后都表示一下实例消费完成
          pool.release(resource)
          return result
        },
        err => {
          pool.release(resource)
          throw err
        }
      )
  }
  return pool;
}
global.pp = initPuppeteerPool()

module.exports = async (opt) => {
  try {
    const browser = await global.pp.use()
    const page = await browser.newPage();
    await page.goto(opt.url);
    await page.setViewport({
      width: opt.width,
      height: opt.height,
    });
    await waitTime(opt.waitTime || 0);
    const ele = await page.$(opt.ele);
    const base64 = await ele.screenshot({
      // path: "a.png",
      fullPage: false,
      omitBackground: true,
      encoding: 'base64'
    });
    await page.close()
    return 'data:image/png;base64,'+ base64
  } catch (error) {
    throw error
  }
};
