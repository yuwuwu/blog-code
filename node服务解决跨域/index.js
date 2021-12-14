/*
 * @Author: yuyongxing
 * @Date: 2021-08-27 10:09:47
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-12-14 18:43:02
 * @Description: 
 */
let express = require('express');
let app = express()
let { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/a/', express.static('dist'))
app.use('/img', express.static('dist/img'))
const options = {
    target: 'http://localhost:3000',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '/api': '',
    },
};
app.use('/api', createProxyMiddleware(options));
app.listen(7000);