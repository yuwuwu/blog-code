const axios = require('axios');
const qs = require('qs');
const { getTimestamp } = require('../utils');
const { wxConfig } = require('../../project.config.js');

const getGoodsBySku = async (sku) => {
  const { data } = await axios({
    method: 'GET',
    url: `https://shop.canon.com.cn/jiekec/index.php?route=mini/catalog/product/productinfo&s_channel=&b_channel=&timestamp=${Date.now()}&gate_token=d0bf96cd5ce5c513ddae72a2d1a88ae7&product_id=${sku}`,
    headers: {
      Host: 'shop.canon.com.cn',
      token: wxConfig.token,
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
      token: wxConfig.token,
      Accept: '*/*',
      'Sec-Fetch-Site': 'cross-site',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Accept-Language': 'zh-CN,zh',
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: wxConfig.cookie,
    },
    data: qs.stringify({
      code: code,
      s_channel: '',
      b_channel: '',
      timestamp: getTimestamp(),
      gate_token: wxConfig.gate_token,
      code: code,
      uid: wxConfig.uid,
      token: wxConfig.token,
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
