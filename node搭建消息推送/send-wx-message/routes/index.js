/*
 * @Author: yuyongxing
 * @Date: 2021-12-20 07:28:48
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-04-10 23:14:35
 * @Description: 
 */
const express = require("express");
const config = require("../utils/wxConfig.js")
const sha1 = require('node-sha1')
const router = express.Router();

// 微信验证接口
router.get("/", function (req, res, next) {
  const token = config.token; //获取配置的token
	const signature = req.query.signature; //获取微信发送请求参数signature
	const nonce = req.query.nonce; //获取微信发送请求参数nonce
	const timestamp = req.query.timestamp; //获取微信发送请求参数timestamp
	const str = [token, timestamp, nonce].sort().join(''); //排序token、timestamp、nonce后转换为组合字符串
	const sha = sha1(str); //加密组合字符串
	if (sha === signature) {
		const echostr = req.query.echostr; //获取微信请求参数echostr
        res.send(echostr + ''); //正常返回请求参数echostr
	} else {
		res.send('验证失败');
	}
});

module.exports = router;
