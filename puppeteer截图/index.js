/*
 * @Author: yuyongxing
 * @Date: 2022-01-10 11:33:26
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-01-13 18:14:02
 * @Description: 
 */
const express = require('express');
const app = express()
const getImg =require('./puppeteer.js')




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