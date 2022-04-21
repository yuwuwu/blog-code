/*
 * @Author: yuyongxing
 * @Date: 2022-04-07 14:16:04
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-04-21 23:45:13
 * @Description: 
 */
const axios = require('axios');

const send = async () => {
  const { data } = await axios({
    url: "https://send-wx-message-9g3383r7e56cf5a4-1257712946.ap-shanghai.app.tcloudbase.com/express-starter/sendMessage",
    method:"post",
    data:{openid:'o5Rac54skdNaPSt_XPTZmkGhQfxI',title:"这是标题",desc:'这是内容'}
  })
  return data
}
send().then(res => {
  console.log(`res:${JSON.stringify(res)}`)
})
  const sendtest = async () => {
    const { data } = await axios({
      url: "http://localhost:3000/sendMessage",
      method:"post",
      data:{openid:'o5Rac54skdNaPSt_XPTZmkGhQfxI',title:"这是标题",desc:'这是内容'}
    })
    return data
  }
