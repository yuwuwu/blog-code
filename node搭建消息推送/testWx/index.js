/*
 * @Author: yuyongxing
 * @Date: 2022-04-07 14:16:04
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-04-18 10:49:38
 * @Description: 
 */
const axios = require('axios');

const send = async () => {
  const { data } = await axios({
    url: "https://send-wx-message-9g3383r7e56cf5a4-1257712946.ap-shanghai.app.tcloudbase.com/express-starter"
  })
  return data
}
const sendtest = async () => {
  const { data } = await axios({
    url: "http://localhost:3000/?a=123",
    data:{a:123}
  })
  return data
}
sendtest().then(res => {
  console.log(`res:${res}`)
})