// pages/changePassword/changePassword.js
// 获取应用实例
var app = getApp();
var config = require('../../utils/config.js');
var common = require('../../utils/common.js');
Page({
  data: {
    u_token: '',
    userId: "",
    wxCode: "",
    checked: false,
    wxavatarUrl: "",
    wxcity: "",
    wxcountry: "",
    wxprovince: "",
    wxgender: "",
    wxnickName: "",
    goOtherPage: config.icon + 'btn_nav_JianTou@2x.png'
  },
  onLoad: function () {
    var that = this
    // app.getUserInfo(function (userInfo) { that.setData({ userInfo: userInfo }) })
    wx.getStorage({
      key: 'accesstoken',
      success: function (res) {
        var u_token = res.data
        wx.getStorage({
          key: 'myId',
          success: function (res) {//成功获取到token值,直接跳过登录页
            that.setData({ u_token: u_token, userId: res.data })
            that.checkedBinded()
          }
        })
      },
      fail: function (res) {
        // common.getPopUp('请重新登陆', 'loading')
        // wx.clearStorage()
        // setTimeout(function () { common.reLaunch('../../pages/logs/logs') }, 500)
      }
    })
    //存储code
    wx.login({ success: function (res) { that.setData({ wxCode: res.code }) } })
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.setData({
          wxavatarUrl: userInfo.avatarUrl,
          wxcity: userInfo.city,
          wxcountry: userInfo.country,
          wxprovince: userInfo.province,
          wxgender: userInfo.gender,
          wxnickName: userInfo.nickName
        })
      }
    })
  },

  onPullDownRefresh: function () { wx.stopPullDownRefresh() },
  //是否绑定微信
  checkedBinded() {
    var that = this,
      TOKEN = that.data.u_token,
      userId = that.data.userId,
      wx_url = config.hurl + 'publichealthuser/' + userId,
      data = {};
    common.getData(wx_url, 'GET', data, TOKEN).then(function (res) {
      if (res.data.code == "0") {
        if (res.data.data.Cuserid != "") { that.setData({ checked: true }) }
        else { that.setData({ checked: false }) }
      } else {
        that.setData({ checked: false })
      }
    })
  },
  // 退出登录清除缓存数据
  btnsave: function (e) {
    try {
      wx.clearStorageSync()
      wx.setStorage({
        key: 'firstLogin',
        data: '1'
      })
      common.getPopUp('退出成功！', 'success')
      setTimeout(function () { common.reLaunch('../../pages/logs/logs') }, 1000)
    } catch (e) {
      // Do something when catch error  
    }
  },

  //remove掉userphone及下缓存
  removeUserphone() {
    var that = this
    wx.removeStorage({
      key: 'userphone',
      success: function (res) {
        that.removeUnionid()
        wx.removeStorage({
          key: 'password',
          success: function (res) {
            wx.removeStorage({
              key: 'accesstoken',
              // success: function (res) { common.reLaunch('../../pages/logs/logs') },
              fail: function () { that.removeUnionid() }
            })
          }, fail: function () { that.removeUnionid() }
        })
      }, fail: function () { that.removeUnionid() }
    })
  },
  //remove掉unionid缓存
 
 
  
  //跳转到修改信息
  changePwd: function () { common.navigateTo('../forgetPassword/forgetPassword') },
  //跳转到管理人数的设置
  numberchange: function () { common.navigateTo('../forgetPassword/forgetPassword') }
})