/*
 * @Author: yuyongxing
 * @Date: 2021-12-20 07:28:48
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-04-21 23:31:26
 * @Description: 
 */
const express = require("express");
const config = require("../utils/wxConfig.js")
const sha1 = require('node-sha1')
const router = express.Router();
const urlencode= require('urlencode')
const {getOpenid,getAccessToken,sendWxMessage} = require('../models/wxApi')

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
	const redirect_uri = urlencode("https://send-wx-message-9g3383r7e56cf5a4-1257712946.ap-shanghai.app.tcloudbase.com/express-starter/getUserInfo")
    const scope = 'snsapi_userinfo';
	res.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=STATE&connect_redirect=1#wechat_redirect`)
});

// 根据code当前用户查询信息
router.get("/getUserInfo", async (req, res, next)=> {
	try {
		const {appid,secret} = config
		const code =  req.query.code
		const res_getOpenid = await getOpenid(appid,secret,code)
        if(res_getOpenid.openid){
			res.render("index", { title: "复制key" ,openid:res_getOpenid.openid});
		}else{
			res.render("error", { res_getOpenid});
		}
	} catch (error) {
		res.render("error", { errcode:500,errmsg: error });
	}
	
});

// 推送模板消息
router.post("/sendMessage",async  (req, res, next)=> {
	try {
		const {openid,title,desc} = req.body
		const {appid,secret} = config
		const res_getAccessToken = await getAccessToken(appid,secret)
		console.log(res_getAccessToken)
		if(res_getAccessToken.errcode > 0){
			res.send(res_getAccessToken)
			return
		}
		const res_sendWxMessage = await sendWxMessage(openid,res_getAccessToken.access_token,title,desc)
		if(res_sendWxMessage.errcode > 0){
			res.send(res_sendWxMessage)
			return
		}
		res.send({
			errcode:0,
			errmsg:'ok',
			res_getAccessToken
		})
	} catch (error) {
		res.send( { errcode:500,errmsg: error });
	}
})
module.exports = router;

