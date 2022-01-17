/*
 * @Author: yuyongxing
 * @Date: 2022-01-10 17:16:48
 * @LastEditors: yuyongxing
 * @LastEditTime: 2022-01-17 19:04:54
 * @Description:红包雨游戏类
 */
class RedPacketGame {
  constructor(opt) {
    this.width = opt.width
    this.height = opt.height
    this.targerId = opt.targerId
    this.ctx = this.setCanvas()
    this.image = opt.image
    this.redPacketImg = this.setImage()
    this.isIng = false
    this.isEnd = false
    this.isClick = false
    this.timer = null
    this.moveTimer = null
    this.redPackets = []
    this.clicks = []
  }
  setImage() {
    const img = new Image()
    img.src = this.image
    return img
  }
  setCanvas() {
    const canvas = document.getElementById(this.targerId)
    canvas.addEventListener('click', this.handleClick.bind(this))
    canvas.width = this.width
    canvas.height = this.height
    return canvas.getContext("2d")
  }
  //   开始执行动画
  start() {
    if (this.isIng) return
    this.isIng = true
    this.clicks = []
    this.redPacketMove()
    console.log(this.redPackets)
  }
  //   结束执行动画
  end() {
    console.log(this.timer, this.moveTimer)
    this.redPackets = []
    this.isIng = false
    this.timer && clearInterval(this.timer)
    this.moveTimer && window.cancelAnimationFrame(this.moveTimer)
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  //   点击事件，获取被点击的红包
  handleClick(e) {
    e.preventDefault && e.preventDefault()
    if (!this.isIng) return
    const pos = {
      x: e.clientX,
      y: e.clientY
    }
    for (let i = 0, length = this.redPackets.length; i < length; i++) {
      const redPacket = this.redPackets[i]
      // 点击的x坐标大于区域的x坐标，并且小于x+width
      // 并且点击的y坐标大于区域的y坐标，并且小于y+height
      if (
        pos.x >= redPacket.x && pos.x - redPacket.x <= redPacket.w &&
                pos.y >= redPacket.y && pos.y - redPacket.y <= redPacket.h
      ) {
        this.redPackets[i].isClick = true
        this.redPackets[i].clickY = redPacket.y
        this.clicks.push(this.redPackets[i])
        break
      }
    }
  }
  //   创建红包元素
  createRedPacket(list) {
    list = list || [1]
    for (let i = 0; i < list.length; i++) {
      this.redPackets.push(new RedPacket({
        x: this.randomFn(20, this.width - 40),
        y: -this.randomFn(20, 100),
        image: this.redPacketImg,
        point: list[i]
      }))
    }
  }
  //   红包动画：先清空画布，在绘制一次
  redPacketMove() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0, length = this.redPackets.length; i < length; i++) {
      const redPacket = this.redPackets[i]
      if (redPacket.isClick) {
        // 分数向上动画
        redPacket.y = redPacket.y - redPacket.step
        if (redPacket.y < redPacket.clickY - 100) {
          this.redPackets.splice(i, 1)
          i--
          length--
          continue
        }
        this.ctx.font = "18px bold 黑体";
        this.ctx.fillStyle = "#FFD442";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("+" + redPacket.point, redPacket.x, redPacket.y)
      } else {
        // 红包向下动画
        redPacket.y = redPacket.y + redPacket.step
        if (redPacket.y >= this.height - redPacket.h) {
          this.redPackets.splice(i, 1)
          i--
          length--
          continue
        }
        this.ctx.drawImage(redPacket.image, redPacket.x, redPacket.y, redPacket.w, redPacket.h)
      }
    }
    //
    this.moveTimer && window.cancelAnimationFrame(this.moveTimer)
    this.moveTimer = window.requestAnimationFrame(this.redPacketMove.bind(this))
  }
  //   生成min到max之间的随机数
  randomFn(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min + '', 10)
  }
}
/**
 * 红包类：生成单个红包
 * w,h:宽高
 * x，y:坐标
 * point:积分
 * image:图片地址
 * step:速度
 * isclick:是否被点击了
 * clickY:被点击时的y坐标，用来计算显示的积分值什么位置消失
 */
class RedPacket {
  constructor(opt) {
    this.w = [40,50,60,70,80][opt.point]||40
    this.h = [40,50,60,70,80][opt.point]||40
    this.x = opt.x || 0
    this.y = opt.y || 0
    this.point = opt.point || 0
    this.image = opt.image
    this.step = opt.step || 2
    this.isClick = false
    this.clickY = 0
  }
}
