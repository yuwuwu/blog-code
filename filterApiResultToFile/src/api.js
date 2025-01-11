/*
 * @Author: yuwuwu
 * @Date: 2024-06-28 13:37:45
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-07-31 20:27:48
 * @FilePath: /markdown-code/getApiInfoToFile/src/api.js
 * @Description:
 */
const axios = require('axios');
const qs = require('qs');

const getGoodsBySku = async (sku) => {
  const { data } = await axios({
    method: 'GET',
    url: `https://shop.canon.com.cn/jiekec/index.php?route=mini/catalog/product/productinfo&s_channel=&b_channel=&timestamp=${Date.now()}&gate_token=d0bf96cd5ce5c513ddae72a2d1a88ae7&product_id=${sku}`,
    headers: {
      Host: 'shop.canon.com.cn',
      token: '3c03d34e7042eddf92ec167e88da2747109fa79385ed4c89e3ca1fcc067051d6',
      Host: 'shop.canon.com.cn',
      'content-type': 'application/x-www-form-urlencoded',
      source: 'wx_mini',
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.49(0x18003135) NetType/WIFI Language/zh_CN',
      Referer:
        'https://servicewechat.com/wxd3d8769854ba9cd1/70/page-frame.html',
    },
  });
  return data;
};
const checkCode = async (code) => {
  const { data } = await axios({
    method: 'post',
    url: `https://shop.canon.com.cn/jiekec/index.php?route=mini/checkout/order/shoppingcodeinfo`,
    headers: {
      Host: 'shop.canon.com.cn',
      referer:
        'https://servicewechat.com/wxd3d8769854ba9cd1/72/page-frame.html',
      xweb_xhr: '1',
      source: 'wx_mini',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/6.8.0(0x16080000) NetType/WIFI MiniProgramEnv/Mac MacWechat/WMPF XWEB/30626',
      token: 'c3b0e3db0d1f4daae77b3295f46d6be8a019703c5037785113c08dba7910c190',
      Accept: '*/*',
      'Sec-Fetch-Site': 'cross-site',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Accept-Language': 'zh-CN,zh',
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie:
        'OCSESSID=b28dd541bddb5190926216b053; acw_tc=707c9fc317224271531166502e0f0f04ef03f217f493f28aaa46d9d4aaf1d3',
    },
    data: qs.stringify({
      code: code,
      s_channel: '',
      b_channel: '',
      timestamp: '1722427076121',
      gate_token: '982e84221290585c6e73f2fe2d761b86',
      code: 'E41835V14R',
      uid: '66543333663',
      token: 'c3b0e3db0d1f4daae77b3295f46d6be8a019703c5037785113c08dba7910c190',
      gate_id: 'MINIGATE',
      verifycode: 'yes',
    }),
  });
  return data;
};
module.exports = {
  getGoodsBySku,
  checkCode,
};
