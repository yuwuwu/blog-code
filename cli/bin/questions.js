/*
 * @Author: yuyongxing
 * @Date: 2022-03-11 15:24:59
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-03-13 18:52:51
 * @Description: 用户交互模块，需要用户输入、选择
 */
const inquirer = require("inquirer");

/**
 * @Author: yuyongxing
 * @param {*}
 * @return {*}
 * @Date: 2022-03-11 15:53:00
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 问题：选择要生成的模板
 */
function choiceTemplateQuestion() {
    return inquirer.prompt([
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
                {
                    value: "node",
                    name: "自定义node模板",
                },
            ],
        },
    ])
}
/**
 * @Author: yuyongxing
 * @param {*}
 * @return {*}
 * @Date: 2022-03-11 15:53:20
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 问题：是否覆盖同名文件价
 */
function isRemoveDirQuestion() {
    return inquirer.prompt([
        {
            type: "confirm",
            message: "是否覆盖原文件夹?",
            name: "ok",
        }
    ])
}
function nodeProjectQuestion() {
    return inquirer.prompt([
        {
            type: 'inpute',
            name: 'name',
            message: '请输入项目名称',
            validate(name) {
                if (name) return true;
                return "P请输入项目名称";
            }
        },
        {
            type: 'inpute',
            name: 'description',
            message: '请输入项目简介'
        },
        {
            type: 'inpute',
            name: 'author',
            message: '请输入作者名称'
        },
        {
            type: "input",
            name: "port",
            message: "请输入运行端口,默认8000",
            default() {
                return 8000;
            },
        },
        {
            type: "checkbox",
            name: "modules",
            message: "选择要使用的中间件或依赖",
            choices: [
                {
                    name: "cors",
                },
                {
                    name: "bodyParser",
                }
            ],
        }
    ])
}
module.exports = {
    choiceTemplateQuestion,
    isRemoveDirQuestion,
    nodeProjectQuestion
}