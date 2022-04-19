/*
 * @Author: yuyongxing
 * @Date: 2022-04-07 14:16:04
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-04-19 16:58:27
 * @Description: 
 */
const axios = require('axios');

const send = async () => {
  const { data } = await axios({
    url: "https://send-wx-message-9g3383r7e56cf5a4-1257712946.ap-shanghai.app.tcloudbase.com/express-starter/sendMessage",
    method:"post",
    data:{openid:'o5Rac54skdNaPSt_XPTZmkGhQfxI',title:"中文",desc:'中文'}
  })
  return data
}
const sendtest = async () => {
  const { data } = await axios({
    url: "http://localhost:3000/sendMessage",
    method:"post",
    data:{openid:'o5Rac54skdNaPSt_XPTZmkGhQfxI',title:"中文",desc:'中文'}
  })
  return data
}
send().then(res => {
  console.log(`res:${res}`)
})