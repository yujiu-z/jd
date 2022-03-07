// pages/signature/signature.js
//index.js
//获取应用实例
var config = require('../../utils/config.js');
var common = require('../../utils/common.js');
const app = getApp()
 
Page({
  data: {
    context: null,
    canvas: null,
    index: 0,
    height: 0,
    width: 0,
    u_token: '',
    imgPath: ''
  },
  /**记录开始点 */
  bindtouchstart: function(e) {
    this.data.context.beginPath();
    this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
  },
  /**记录移动点，刷新绘制 */
  bindtouchmove: function(e) {
    
    this.data.context.lineTo(e.changedTouches[0].x, e.changedTouches[0].y);
    this.data.context.font='normal bold 36px Arial,sans-serif';
    this.data.context.lineWidth= 15;
    this.data.context.stroke();
  },
  bindtouchend: function () {
    this.data.context.closePath();
  },
  /**清空画布 */
  clear: function() {
    this.data.context.clearRect(0, 0, this.data.width, this.data.height);
  },
  /**导出图片 */
  export: function() {
    const that = this;
    wx.showLoading({title: '生成中...', mask: true})
    let url = config.cardurl + 'v1/file/standardupload',
        pages = getCurrentPages(),
        prevPage = pages[pages.length - 2];
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: that.data.width,
        height: that.data.height,
        destWidth: that.data.width,
        destHeight: that.data.height,
        fileType: 'PNG',
        canvas: that.data.canvas,
        success(res) {
          wx.uploadFile({
            url: url, 
            filePath: res.tempFilePath,
            name: 'Filedata',
            header: {"Authorization": that.data.u_token},
            success(res) {
              var newurl = JSON.parse(res.data).data
              console.log(newurl,222222)
              prevPage.setData({ signature: newurl })
              wx.navigateBack({ delta: '1' })
            },
            fail(err) {
              // wx.hideLoading()
              wx.showToast({
                title: '上传失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
        },
        fail() {
          wx.hideLoading()
          wx.showToast({
            title: '导出失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
  },
  onLoad: function(options) {
    let that = this;
    wx.getStorage({
      key: 'sysToken',
      success: function(res){
        let token = res.data
        that.setData({u_token: token})
      }
    })
  },
  onShow: function() {
    let query = wx.createSelectorQuery();
    const that = this;
    query.select('#firstCanvas').fields({ node: true, size: true })
    .exec(function(rect) {
      const canvas = rect[0].node;
      const ctx = canvas.getContext('2d');
      const dpr = wx.getSystemInfoSync().pixelRatio;
      var width = rect[0].width * dpr;
      var height = rect[0].height * dpr;
      canvas.width = width;
      canvas.height = height;
      ctx.scale(dpr, dpr);
      that.setData({ canvas, context: ctx, width, height })
    });
  },
  onShareAppMessage: (res) => {
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
    } else {
      console.log("来自右上角转发菜单")
    }
    return {
      title: '手动签名',
      path: '/pages/index/index?id=测试',
      // imageUrl: "/images/1.jpg",
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})
