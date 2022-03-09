#!/usr/bin/env node
/*
 * @Author: yuyongxing
 * @Date: 2022-03-09 11:46:31
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-03-09 18:27:47
 * @Description: cli入口
 */
const fs = require("fs")
const path = require("path")
const chalk = require('chalk');
const program = require('commander');
const inquirer = require('inquirer');
// chalk.blue('Hello world!')
console.log(chalk.green("正在创建..."), process.argv)
console.log(chalk.green(process.cwd(), "当前路径"))

program.version('0.0.1')
    .parse(process.argv);

console.log(program.args);
if (fs.existsSync(program.args[0])) {
    console.log(chalk.red(program.args[0] + "文件夹已存在"))
    isRemoveDir()
} else {
    fs.mkdirSync(path.resolve(process.cwd(), program.args[0]))
    choiceTemplate()
}

function choiceTemplate() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: '选择要使用的模板:',
            default: 0,
            choices: [
                { value: "https://github.com/yuwuwu/vue-mobile-template", name: 'vue2+vant移动端模板' },
                { value: "https://github.com/yuwuwu/vue-pc-template", name: 'vue2+element后台管理模板' }
            ]
        }])
        .then(answers => {
            console.log('answers', answers)
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
}
function downloadByGit() {

}
function isRemoveDir() {
    inquirer.prompt([{
        type: 'confirm',
        message: '是否覆盖原文件夹？',
        name: 'ok'
    }]).then(answers => {
        if (answers.ok) {
           console.log(123)
        }
    })
}