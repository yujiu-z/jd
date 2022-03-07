// pages/servicePack/servicePack.js
var app = getApp()
var config = require('../../utils/config.js')
var common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    packname:'',
    introduce:'',
    rmb:'',
    JYToken:'',
    teamId:'',
    inputDis:false,
    packid:'',
    serviceStatus: ['正常', '停用',],
    status: 0,// 0--正常 1--停用---
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var packid=options.packid
    var _this = this
    wx.getStorage({
      key: 'JYToken',
      success: function (res) {
        var JYToken=res.data

        _this.setData({ JYToken:JYToken })
        wx.getStorage({
          key: 'teamId',
          success: function (res) {
            var teamId=res.data
            _this.setData({ JYToken:JYToken,teamId:teamId })
            if(options.packid!= undefined){
              _this.setData({inputDis:true,packid:packid})
                _this.getPackList()
               
            }
          }
        })
      },
    })
   
    
  },
  getStatus(e) {
    var index = e.detail.value,
      status = index;
    this.setData({ status })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  getPackname: function(e) {
    var  packname = e.detail.value;
    this.setData({ packname:packname })
},
getIntroduce:function(e){
   var  introduce=e.detail.value;
   this.setData({introduce:introduce})
},
getRMB:function(e){
  var rmb=e.detail.value;
  this.setData({rmb:rmb})
},
getPackList: function () {
  var that = this,
  packid=that.data.packid,
    JYToken = that.data.JYToken,
    set_url =config.cardurl+ 'homedoctor/v1/pack/'+ packid,
    data = { 
     };
    common.getData(set_url, 'GET', data, JYToken).then(function (res) {
      if (res.data.code == "0") {
        var data=res.data.data
        common.getPopUp('获取成功！', 'success')
        that.setData({packname:data.Packname,introduce:data.Introduce,rmb:data.RMB,inputDis:true})
       
      } else if(res.data.code == "-1") {
        common.getPopUp(res.data.message, 'none')
      }
    })
  
},
edit:function(){
  var that = this,
  packname = that.data.packname,
  introduce = that.data.introduce,
  rmb = that.data.rmb,
  status=that.data.status,
  packid=that.data.packid,
    JYToken = that.data.JYToken,
    set_url = config.cardurl+'homedoctor/v1/pack/'+ packid ,
    data = { "Packname": packname, 
      "Introduce": introduce,
      "RMB": rmb,
      "State":status
     };
    common.getData(set_url, 'PUT', data, JYToken).then(function (res) {
      if (res.data.code == "0") {
        common.getPopUp('编辑成功！', 'success')
        wx.navigateBack({
          delta:1
        })
      } else if(res.data.code == "-1") {
        common.getPopUp(res.data.message, 'none')
      }
    })
},
save: function () {
  var that = this,
  packname = that.data.packname,
  introduce = that.data.introduce,
  rmb = that.data.rmb,
  teamId=that.data.teamId,
    JYToken = that.data.JYToken,
    set_url = 'https://api.lotusdata.com/homedoctor/v1/pack',
    data = { "Packname": packname, 
      "Introduce": introduce,
      "RMB": rmb,
      "Teamid":teamId
     };
    common.getData(set_url, 'POST', data, JYToken).then(function (res) {
      if (res.data.code == "0") {
        common.getPopUp('添加成功！', 'success')
        wx.navigateBack({
          delta:1
        })
      } else if(res.data.code == "-1") {
        common.getPopUp(res.data.message, 'none')
      }
    })
  
},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})