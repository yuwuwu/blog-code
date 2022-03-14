#!/usr/bin/env node
/*
 * @Author: yuyongxing
 * @Date: 2022-03-09 11:46:31
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-03-14 16:15:09
 * @Description: cli入口
 */
const fs = require("fs");
const version = require("../package.json").version;
const path = require("path");
const chalk = require("chalk");
const program = require("commander");
const { choiceTemplateQuestion, isRemoveDirQuestion, nodeProjectQuestion } = require("./tools/questions")
const rimraf = require("rimraf");
const download = require("download-git-repo");
const ora = require("ora");
const { getIndexTemplate, getPackageTemplate } = require("./tools/createNodeTemplate")
const execa = require("execa");

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
if (program.args.length < 2) return program.help();



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


async function createNodeTemplate() {
  await nodeProjectQuestion().then(answers => {
    fs.writeFileSync(getProjectName() + "/index.js", getIndexTemplate(answers))
    fs.writeFileSync(getProjectName() + "/package.json", getPackageTemplate(answers))
  })
}


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

function getProjectName() {
  return path.resolve(process.cwd(), program.args[0])
}

async function cliStart() {
  // 1.创建项目文件目录
  await mkdirByProjectName()
  // 2.选择模板
  const { choice } = await choiceTemplateQuestion()
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