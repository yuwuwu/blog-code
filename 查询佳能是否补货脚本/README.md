<!--
 * @Author: yuwuwu
 * @Date: 2024-06-28 13:24:04
 * @LastEditors: yuwuwu
 * @LastEditTime: 2024-06-28 13:28:32
 * @FilePath: /markdown-code/查询淘宝商品是否补货脚本/README.md
 * @Description:
-->

# 查询淘宝商品是否补货脚本

## 功能

1.对于加密做的不够好的接口直接模拟接口请求，获取商品的库存信息。 2.针对淘宝商品使用无头浏览器加载对应的商品详情页，然后根据按钮状态判断是否补货。

## 运行

注：项目里包含 project.config.js 文件，因为是个人的敏感信息，所以从 git 中过滤掉了，使用时需要自己添加 project.config.js 文件。

```
npm install
npm run dev:wx //通过api获取商品信息
npm run dev:tb //通过无头浏览器获取商品信息
```
