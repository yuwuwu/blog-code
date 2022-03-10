#!/usr/bin/env node
/*
 * @Author: yuyongxing
 * @Date: 2022-03-09 11:46:31
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-03-10 18:25:47
 * @Description: cli入口
 */
const fs = require("fs");
const version = require('../package.json').version
const path = require("path");
const chalk = require("chalk");
const program = require("commander");
const inquirer = require("inquirer");
const rimraf = require("rimraf");
const download = require("download-git-repo");
const ora = require("ora");


program.version(version)
       .usage()
        parse(process.argv);

const dir = path.resolve(process.cwd(), program.args[0]);
console.log(program.args);
if (fs.existsSync(program.args[0])) {
    console.log(chalk.red(program.args[0] + "文件夹已存在"));
    isRemoveDir();
} else {
    fs.mkdirSync(dir);
    choiceTemplate();
}

function choiceTemplate() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "选择要使用的模板:",
                default: 0,
                choices: [
                    {
                        value: "github:yuwuwu/vue-mobile-template",
                        name: "vue2+vant移动端模板",
                    },
                    {
                        value: "github:yuwuwu/vue-pc-template",
                        name: "vue2+element后台管理模板",
                    },
                ],
            },
        ])
        .then((answers) => {
            console.log("answers", answers);
            downloadByGit(answers.choice);
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
}
function downloadByGit(url) {
    console.log(url)
    const loading = ora("downloading").start()
    download(url, dir, { clone: false }, function (err) {
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
 * @Date: 2022-03-10 15:37:25
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description:
 */
function isRemoveDir() {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "是否覆盖原文件夹？",
                name: "ok",
            },
        ])
        .then((answers) => {
            if (answers.ok) {
                rimraf.sync(dir);
                fs.mkdirSync(dir);
                choiceTemplate()
            }
        });
}
