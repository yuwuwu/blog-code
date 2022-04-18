/*
 * @Author: yuyongxing
 * @Date: 2021-12-20 07:28:48
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-04-18 11:45:43
 * @Description: 
 */
const express = require("express");
const config = require("../utils/wxConfig.js")
const sha1 = require('node-sha1')
const router = express.Router();

// 验证消息来自微信服务器
router.get("/", function (req, res, next) {
	const token = config.token
	const signature = req.query.signature
	const nonce = req.query.nonce
	const timestamp = req.query.timestamp
	const str = [token, timestamp, nonce].sort().join('')
	const sha = sha1(str)
	if (sha === signature) {
		const echostr = req.query.echostr; //获取微信请求参数echostr
		res.send(echostr + ''); //正常返回请求参数echostr
	} else {
		res.send('验证失败');
	}
});

// 网页授权回调获取code
router.get("/authorize", function (req, res, next) {
	const appid = config.appid
	const redirect_uri = urlencode("http://127.0.0.1:3000/getAccessToken"); //这里的url需要转为加密格式，它的作用是访问微信网页鉴权接口成功后微信会回调这个地址，并把code参数带在回调地址中
    const scope = 'snsapi_userinfo';
	res.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=STATE&connect_redirect=1#wechat_redirect`)
});

// 根据code当前用户查询信息
router.get("/getAccessToken", function (req, res, next) {
	const code =  req.query.code
	res.render("index", { title: "Tencent CloudBase + Express" ,code:code});
});
module.exports = router;

