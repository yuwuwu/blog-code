/*
 * @Author: yuyongxing
 * @Date: 2022-04-02 11:11:27
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-04-15 22:55:54
 * @Description: 
 */

const axios = require('axios');
const { SendKey, users } = require('./config.js')



/**
 * @Author: yuyongxing
 * @param {*} aid
 * @param {*} uuid
 * @param {*} cookie
 * @return {*} data
 * @Date: 2022-04-15 22:52:34
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 查询用户可收集bug数
 */
const getBugList = async (aid, uuid, cookie) => {
    let { data } = await axios({
        url: `https://api.juejin.cn/user_api/v1/bugfix/not_collect?aid=${aid}&uuid=${uuid}`,
        method: 'post',
        headers: { Cookie: cookie }
    })
    return data
}

/**
 * @Author: yuyongxing
 * @param {*} aid
 * @param {*} uuid
 * @param {*} cookie
 * @param {*} params
 * @return {*}data
 * @Date: 2022-04-15 22:53:01
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 收集bug
 */
const collectBug = async (aid, uuid, cookie, params) => {
    let { data } = await axios({
        url: `https://api.juejin.cn/user_api/v1/bugfix/collect?aid=${aid}&uuid=${uuid}`,
        method: 'post',
        data: params,
        headers: { Cookie: cookie }
    })
    return data
}

/**
 * @Author: yuyongxing
 * @param {*} aid
 * @param {*} uuid
 * @param {*} cookie
 * @return {*} data
 * @Date: 2022-04-15 22:53:16
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 获取活动详情
 */
const getBugFixGameInfo = async (aid, uuid, cookie) => {
    let { data } = await axios({
        url: `https://api.juejin.cn/user_api/v1/bugfix/competition?aid=${aid}&uuid=${uuid}`,
        method: 'post',
        headers: { Cookie: cookie }
    })
    return data
}

/**
 * @Author: yuyongxing
 * @param {*} aid
 * @param {*} uuid
 * @param {*} cookie
 * @param {*} params
 * @return {*} data
 * @Date: 2022-04-15 22:53:32
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 获取活动用户详情:可用Bug数量
 */
const getBugFixGameUserInfo = async (aid, uuid, cookie, params) => {
    let { data } = await axios({
        url: `https://api.juejin.cn/user_api/v1/bugfix/user?aid=${aid}&uuid=${uuid}`,
        method: 'post',
        data: params,
        headers: { Cookie: cookie }
    })
    return data
}

/**
 * @Author: yuyongxing
 * @param {*} aid
 * @param {*} uuid
 * @param {*} cookie
 * @param {*} params
 * @return {*} data
 * @Date: 2022-04-15 22:53:49
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 参与活动
 */
const bugFix = async (aid, uuid, cookie, params) => {
    let { data } = await axios({
        url: `https://api.juejin.cn/user_api/v1/bugfix/fix?aid=${aid}&uuid=${uuid}`,
        method: 'post',
        data: params,
        headers: { Cookie: cookie }
    })
    return data
}

/**
 * @Author: yuyongxing
 * @param {*} title
 * @param {*} desp
 * @return {*} data
 * @Date: 2022-04-15 22:54:07
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 微信推送
 */
const sendWxMessage = async (title, desp) => {
    title = encodeURIComponent(title)
    desp = encodeURIComponent(desp)
    let { data } = await axios({
        url: `https://sctapi.ftqq.com/${SendKey}.send?title=${title}&desp=${desp}`,
        method: 'post'
    })
    return data
}

/**
 * @Author: yuyongxing
 * @param {*} aid
 * @param {*} uuid
 * @param {*} cookie
 * @param {*} bugList
 * @return {*} {err_no: err_no,err_msg: err_msg}
 * @Date: 2022-04-15 22:51:23
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 根据列表收取Bug
 */
const collectBugByList = async (aid, uuid, cookie, bugList) => {
    let err_msg = ""
    let err_no = 0
    for (let j = 0; j < bugList.length; j++) {
        const params = {
            bug_time: bugList[j].bug_time,
            bug_type: bugList[j].bug_type
        }
        let res_collectBug = await collectBug(aid, uuid, cookie, params)
        if (res_collectBug.err_no != 0) {
            err_no = 1001
            err_msg += `${res_collectBug.err_msg}; `
        }
    }
    return {
        err_no: err_no,
        err_msg: err_msg
    }
}

/**
 * @Author: yuyongxing
 * @param {*} aid
 * @param {*} uuid
 * @param {*} cookie
 * @return {*}
 * @Date: 2022-04-15 22:54:24
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 参与游戏
 */
const joinBugFix = async (aid, uuid, cookie) => {
    let msg = ""
    const res_bugFixGameInfo = await getBugFixGameInfo(aid, uuid, cookie)
    msg = res_bugFixGameInfo.err_msg
    if (res_bugFixGameInfo.err_no == 0 && res_bugFixGameInfo.data.award_status == 1) {
        // 活动进行中
        const res_bugFixGameUserInfo = await getBugFixGameUserInfo(aid, uuid, cookie, { competition_id: res_bugFixGameInfo.data.competition_id })
        // 用户已参与的bug数：bug_fix_num
        // 用户剩余的bug数：user_own_bug
        const bug_fix_num = res_bugFixGameUserInfo.data.bug_fix_num
        const user_own_bug = res_bugFixGameUserInfo.data.user_own_bug
        if (bug_fix_num < 10 && user_own_bug >= 10) {
            const res_bugFix = await bugFix(aid, uuid, cookie, { competition_id: res_bugFixGameInfo.data.competition_id })
            if (res_bugFix.err_no == 0) {
                return {
                    err_no: 0,
                    err_msg: res_bugFixGameInfo.data.competition_name
                }
            }
            msg = res_bugFix.err_msg
        }

    } else if (res_bugFixGameInfo.err_no == 0 && res_bugFixGameInfo.data.award_status == 0) {
        msg = "活动已结束"
    }
    return {
        err_no: 1001,
        err_msg: msg
    }
}


/**
 * @Author: yuyongxing
 * @param {*}
 * @return {*}
 * @Date: 2022-04-15 22:54:39
 * @LastEditors: yuyongxing
 * @LastEditTime: Do not edit
 * @Description: 主函数
 */
const bugFix_start = async () => {
    for (let i = 0, len = users.length; i < len; i++) {
        let title = 'bugfix成功'
        let desp = ''
        const user = users[i]
        // 查询bug数量
        const res_bugList = await getBugList(user.aid, user.uuid, user.cookie)
        if (res_bugList.err_no == 0) {
            // 收集bug
            const res_collectBugByList = await collectBugByList(user.aid, user.uuid, user.cookie, res_bugList.data)
            if (res_collectBugByList.err_no == 0) {
                desp = `收集${res_bugList.data.length}个bug成功;`
            } else {
                title = 'bugfix失败'
                desp = res_collectBugByList.err_msg
            }
        }
        // 参与活动
        const res_joinBugFix = await joinBugFix(user.aid, user.uuid, user.cookie)
        if (res_joinBugFix.err_no == 0) {
            desp += res_joinBugFix.err_msg + "参与成功"
        } else {
            desp += "参与失败：" + res_joinBugFix.err_msg
        }
        await sendWxMessage(title, desp)
    }
}
exports.bugFix_start = bugFix_start