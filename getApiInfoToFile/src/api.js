/*
 * @Author: yuwuwu
 * @Date: 2024-06-28 13:37:45
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-07-02 16:41:23
 * @FilePath: /markdown-code/getApiInfoToFile/src/api.js
 * @Description:
 */
const axios = require('axios');

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
module.exports = {
  getGoodsBySku,
};
