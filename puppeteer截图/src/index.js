/*
 * @Author: yuyongxing
 * @Date: 2022-01-10 11:33:26
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-01-16 18:51:21
 * @Description: 主入口文件
 */
const express = require('express')
const createError = require("http-errors")
const route = require("./route.js")
const app = express()


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  // res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials","true");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method === "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
  else  next();
});


// 中间件--json化入参
app.use(express.json())
// 初始化路由
route(app)
// 错误拦截
app.use(function(req, res, next) {
	next(createError(404));
});
app.use(function (err, req, res, next) {
  let result = {
    code:0,
    msg: err.message,
    err: err.stack
  }
  res.status(err.status||500).json(result)
})
// 启动服务监听7000端口
const server = app.listen(7000, '0.0.0.0', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('app start listening at http://%s:%s', host, port);
});