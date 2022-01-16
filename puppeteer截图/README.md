<!--
 * @Author: yuyongxing
 * @Date: 2022-01-16 20:48:47
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-01-16 21:07:54
 * @Description: 
-->

# node+puppeteer的截图服务

## 安装
```
npm install
yarn install
```

## 运行
```
npm start
yarn start
```

## 使用
以jq为例
```
$.ajax({
    method: "post",
    url: "node服务启动的地址" + "/api/getShareImg",
    headers: { "content-type": "application/json" },
    type: "JSON",
    data: JSON.stringify({
        "width": 750,
        "height": 750,
        "url": "要访问的地址",
        "ele": "body",
        "waitTime": 0
    }),
    success: res => {
        console.log(res)
    },

})
```
<b>src/puppeteer.js里的代码是未使用连接池的代码，如果并发量很小或者本地测试的话可以引用这个文件。src/puppeteerByPool.js里的代码是使用了连接池的代码，相关配置项都有注释，可以根据自己的需求修改。</b>