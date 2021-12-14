/*
 * @Author: yuyongxing
 * @Date: 2021-08-27 10:09:47
 * @LastEditors: yuyongxing
 * @LastEditTime: 2021-12-14 17:40:35
 * @Description: 
 */
let express = require('express');
let app = express()
let { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/moebius/', express.static('dist'))
const options = {
    target: 'http://yqft-wd-panel.test.hi-cloud.net',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '/api': '',
    },
};
app.use('/api', createProxyMiddleware(options));
app.listen(7000);