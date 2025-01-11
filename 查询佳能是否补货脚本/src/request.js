/*
 * @Author: yuwuwu
 * @Date: 2024-06-20 17:56:46
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-06-20 18:47:58
 * @FilePath: /markdown-code/查询淘宝商品是否补货脚本/src/request.js
 * @Description:
 */
const axios = require("axios");
const { wxConfig } = require("../project.config.js");

const request = axios.create({
  headers: {
    Host: "shop.canon.com.cn",
    token: wxConfig.token,
    "content-type": "application/x-www-form-urlencoded",
    source: "wx_mini",
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.49(0x18003135) NetType/WIFI Language/zh_CN",
    Referer: "https://servicewechat.com/wxd3d8769854ba9cd1/70/page-frame.html",
  },
});

module.exports = request;
