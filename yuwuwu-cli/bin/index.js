#!/usr/bin/env node
/*
 * @Author: yuyongxing
 * @Date: 2022-03-09 11:46:31
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-03-23 23:33:15
 * @Description: cli入口
 */

const version = require("../package.json").version;
const chalk = require("chalk");
const program = require("commander");
const {
  mkdirByProjectName,
  choiceTemplate,
  downloadByGit,
  createNodeTemplate,
  installModules } = require("../lib/create")
  

program
  .command("init <project-name>")
  .description("初始化项目文件")
  .action((projectName) => {
    console.log(chalk.green("项目名称：" + projectName));
    cliStart()
  });

program
  .on("--help", function () {
    console.log();
    console.log(chalk.green("你可以这样使用:yuwuwu init <project-name>"));
    console.log();
  });

program
  .version(version, '-v,--version')
  .parse(process.argv);
if (program.args.length < 2) program.help();



async function cliStart() {
  // 1.创建项目文件目录
  await mkdirByProjectName()
  // 2.选择模板
  const { choice } = await choiceTemplate()
  // 3.根据模板下载对应的文件
  switch (choice) {
    case 'node':
      await createNodeTemplate()
      break;
    default:
      await downloadByGit(choice);
  }
  // 4.安装依赖
  await installModules()
}