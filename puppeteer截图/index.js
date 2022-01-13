/*
 * @Author: yuyongxing
 * @Date: 2022-01-10 11:33:26
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-01-13 18:50:39
 * @Description: 
 */
const express = require('express');
const app = express()
const getImg =require('./puppeteer.js')



// {
//   "width":750,
//   "height":1101,
//   "url":"https://yqft-api.test.hi-cloud.net/activity-new/common/testShare.html?name=%E4%BA%8E%E4%BA%94%E4%BA%94&url=http://foxgoing.oss-cn-beijing.aliyuncs.com/mdImg/1433418892058333.png",
//   "ele":".share-box",
//   "waitTime":1
// }
app.use(express.json())
app.post('/api/getShareImg', (req, res) => {
  let params = req.body
  let errorMap = {
    width: "海报宽度",
    height: "海报高度",
    url: "生成海报页面地址",
    ele: "截取的元素",
  }
  for (let i in errorMap) {
    if (!params[i]) {
      res.json({
        code: 0,
        msg: `${errorMap[i]}必传`
      })
      return
    }
  }


  getImg(req.body).then(file => {
    res.json({
      code: 1,
      data: file,
      msg: ""
    })
  })

});
const server = app.listen(7000, '0.0.0.0', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('app start listening at http://%s:%s', host, port);
});