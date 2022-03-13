/*
 * @Author: yuyongxing
 * @Date: 2022-03-13 17:22:41
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-03-13 22:56:09
 * @Description: 
 */
const ejs = require("ejs")
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

function getIndexTemplate(config){
  const ejsTemplateData = fs.readFileSync(path.resolve(process.cwd(),"bin/nodeTemplate/index.ejs"))
  const indexTemplateData = ejs.render(ejsTemplateData.toString(),{
    port: config.port,
    modules: config.modules
  })
  return prettier.format(indexTemplateData,{ parser: "babel" })
}
function getPackageTemplate(config){
  const ejsTemplateData = fs.readFileSync(path.resolve(process.cwd(),"bin/nodeTemplate/package.ejs"))
  const packageTemplateData = ejs.render(ejsTemplateData.toString(),{
    name: config.name,
    description: config.description,
    author: config.author,
    modules: config.modules
  })
  return prettier.format(packageTemplateData,{ parser: "json" })
}
module.exports = {
    getIndexTemplate,
    getPackageTemplate
}