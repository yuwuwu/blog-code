/*
 * @Author: yuyongxing
 * @Date: 2022-04-28 23:34:24
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-04-28 23:49:50
 * @Description: 唤醒app
 */
class openApp {
    constructor(opt) {
        console.log(opt)
        this.URLScheme = opt.URLScheme
        this.downLoadUrl = opt.downLoadUrl
        this.UniversalLink = opt.UniversalLink
        this.ua = navigator.userAgent.toLowerCase()
        this.timer = null
    }
    isIOS() {
        return !!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || this.ua.includes("mac os x")
    }
    isAndroid() {
        return this.ua.includes("android") || this.ua.includes("Android") || this.ua.includes("Adr")
    }
    isWeixin() {
        return this.ua.match(/MicroMessenger/i) == "micromessenger"
    }
    isQQ() {
        return this.ua.match(/QQ/i) == "qq"
    }
    isWeibo() {
        return this.ua.match(/WeiBo/i) == "weibo"
    }
    watchVisibility() {
        document.addEventListener("visibilitychange",  ()=> {
            if (document.visibilityState == 'hidden') {
                this.timer && clearTimeout(this.timer)
            }
        })
    }
    open() {
        if (this.isWeixin() || this.isQQ() || this.isWeibo()) {
            //逻辑处理
            alert('请在在浏览器打开页面')
            return false
        }
        if (this.isAndroid()) {
            this.watchVisibility()
            window.location.href = this.URLScheme
            this.timer = setTimeout( ()=> {
                window.location.href = this.downLoadUrl;
            }, 3000);
            return
        }
        if (this.isIOS()) {
            if (this.UniversalLink) {
                window.location.href = this.UniversalLink
                return
            }
            this.watchVisibility()
            window.location.href = this.URLScheme
            this.timer = setTimeout( ()=> {
                window.location.href = this.downLoadUrl;
                clearTimeout(this.timer)
            }, 3000);
            return
        }
    }
}

