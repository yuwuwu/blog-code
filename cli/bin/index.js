#!/usr/bin/env node
/*
 * @Author: yuyongxing
 * @Date: 2022-03-09 11:46:31
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-03-13 23:05:59
 * @Description: cli入口
 */
const fs = require("fs");
const version = require("../package.json").version;
const path = require("path");
const chalk = require("chalk");
const program = require("commander");
const {choiceTemplateQuestion,isRemoveDirQuestion,nodeProjectQuestion} = require("./questions")
const rimraf = require("rimraf");
const download = require("download-git-repo");
const ora = require("ora");
const {getIndexTemplate,getPackageTemplate} = require("./createNodeTemplate")
const execa =require("execa")

program
  .command("init <project-name>")
  .description("初始化项目文件")
  .action((projectName) => {
    console.log(chalk.green("项目名称：" + projectName));
  });

program
  .on("--help", function () {
    console.log();
    console.log(chalk.green("你可以这样使用:yuwuwu init <project-name>"));
    console.log();
  });

program
  .version(version,'-v,--version')
  .parse(process.argv);
if (program.args.length < 2) return program.help();

const projectName = path.resolve(process.cwd(), program.args[0]);

if (fs.existsSync(program.args[0])) {
    console.log(chalk.red(program.args[0] + "文件夹已存在"));
    isRemoveDir();
} else {
    fs.mkdirSync(projectName);
    choiceTemplate();
}

function choiceTemplate() {
  choiceTemplateQuestion()
        .then((answers) => {
            let { choice } = answers
            switch (choice) {
                case 'node':
                    createNodeTemplate()
                    break;
                default:
                    downloadByGit(choice);
            }
        })
}
/**
 * @Author: yuyongxing
 * @param {*} url
 * @return {*}
 * @Date: 2022-03-11 11:21:50
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 下载git仓库代码模板
 */
function downloadByGit(url) {
    const loading = ora("downloading").start()
    download(url, projectName, { clone: false }, function (err) {
        loading.stop()
        if (err) {
            console.log(chalk.red(err));
            process.exit(1)
        }
        console.log(chalk.green('success!'));
    });
}

/**
 * @Author: yuyongxing
 * @param {*}
 * @return {*}
 * @Date: 2022-03-11 11:21:47
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 创建node模板
 */
function createNodeTemplate() {
  nodeProjectQuestion().then(answers=>{
      fs.writeFileSync(projectName+"/index.js",getIndexTemplate(answers))
      fs.writeFileSync(projectName+"/package.json",getPackageTemplate(answers))
      installModules()
  })
}

/**
 * @Author: yuyongxing
 * @param {*}
 * @return {*}
 * @Date: 2022-03-10 15:37:25
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description:
 */
function isRemoveDir() {
  isRemoveDirQuestion().then(answers => {
            if (answers.ok) {
                rimraf.sync(projectName);
                fs.mkdirSync(projectName);
                choiceTemplate()
            }
        });
}
function installModules(){
  execa("yarn", {
    cwd: projectName
  },["install"])
}