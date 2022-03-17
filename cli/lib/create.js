/*
 * @Author: yuyongxing
 * @Date: 2022-03-15 10:52:57
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-03-17 13:55:38
 * @Description: 
 */
const fs = require("fs");
const program = require("commander");
const path = require("path");
const chalk = require("chalk");
const rimraf = require("rimraf");
const download = require("download-git-repo");
const ora = require("ora");
const execa = require("execa");
const { choiceTemplateQuestion, isRemoveDirQuestion, nodeProjectQuestion } = require("./questions")
const { getIndexTemplate, getPackageTemplate } = require("./createNodeTemplate")


/**
 * @Author: yuyongxing
 * @param {*}
 * @return {*}
 * @Date: 2022-03-15 11:12:54
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 创建文件夹，问询是否覆盖同名目录
 */
async function mkdirByProjectName() {
    if (fs.existsSync(program.args[0])) {
      console.log(chalk.red(program.args[0] + "文件夹已存在"));
      await isRemoveDirQuestion().then(answers => {
        if (answers.ok) {
          rimraf.sync(getProjectName());
          fs.mkdirSync(getProjectName());
        }
      });
    } else {
      fs.mkdirSync(getProjectName());
    }
  }
  
/**
 * @Author: yuyongxing
 * @param {*}
 * @return {*} answer：选择的模板
 * @Date: 2022-03-15 11:13:41
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 问询选择的模板
 */
async function choiceTemplate(){
    return await choiceTemplateQuestion()
}

/**
 * @Author: yuyongxing
 * @param {*} url
 * @return {*}
 * @Date: 2022-03-15 11:14:54
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 根据url下载github模板
 */
function downloadByGit(url) {
    const loading = ora("downloading").start()
    return new Promise((res, rej) => {
      download(url, getProjectName(), { clone: false }, function (err) {
        loading.stop()
        if (err) {
          console.log(chalk.red(err));
          rej()
          process.exit(1)
        }
        console.log(chalk.green('download success!'));
        res()
      });
    })
  
  }
  
  
  /**
   * @Author: yuyongxing
   * @param {*}
   * @return {*}
   * @Date: 2022-03-15 11:15:25
   * @LastEditors: yuyongxing
   * @LastEditTime: Do not edit
   * @Description: 问询用户需要选择的插件，通过ejs语法写入
   */
  async function createNodeTemplate() {
    await nodeProjectQuestion().then(answers => {
      fs.writeFileSync(getProjectName() + "/index.js", getIndexTemplate(answers))
      fs.writeFileSync(getProjectName() + "/package.json", getPackageTemplate(answers))
    })
  }
  
  
  /**
   * @Author: yuyongxing
   * @param {*}
   * @return {*}
   * @Date: 2022-03-15 11:16:04
   * @LastEditors: yuyongxing
   * @LastEditTime: Do not edit
   * @Description: 执行 'cd  xxxx';'yarn install'
   */
  async function installModules() {
    const loading = ora("install...").start()
    await execa("yarn", { cwd: getProjectName() }, ["install"])
      .then(() => {
        loading.stop()
      })
      .catch((err) => {
        console.log(chalk.red(err))
        loading.stop()
      })
  }
  
  /**
   * @Author: yuyongxing
   * @param {*}
   * @return {*} path
   * @Date: 2022-03-15 11:28:40
   * @LastEditors: yuyongxing
   * @LastEditTime: Do not edit
   * @Description: 返回文件绝对路径
   */
  function getProjectName() {
    return path.resolve(process.cwd(), program.args[0])
  }

  module.exports = {
    mkdirByProjectName,
    choiceTemplate,
    downloadByGit,
    createNodeTemplate,
    installModules
  }