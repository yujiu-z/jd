// pages/servicePlan/servicePlan.js
var app = getApp()
var config = require('../../utils/config.js')
var common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectname:'',
    projectTitle:"",
    introduce:'',
    projectRMB:'',
    JYToken:'',
    teamId:'',
    inputDis:false,
    packid:'',
    projectid:'',
    serviceStatus: ['正常', '停用',],
    status: 0,// 0--正常 1--停用---
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var projectid=options.projectid
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
            if(options.projectid!= undefined){
              _this.setData({inputDis:true,projectid:projectid})
                _this.getPlanList()
               
            }
          }
        })
      },
    })
   
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getPlanList: function () {
    var that = this,
       projectid=that.data.projectid,
      JYToken = that.data.JYToken,
      set_url =config.cardurl+ 'homedoctor/v1/homeproject/'+ projectid,
      data = { 
       };
      common.getData(set_url, 'GET', data, JYToken).then(function (res) {
        if (res.data.code == "1") {
          var data=res.data.data
          common.getPopUp('获取成功！', 'success')
          that.setData({projectname:data.Projectname,introduce:data.Introduce,projectRMB:data.ProjectRMB,projectTitle:data.Projecttitle,inputDis:true})
         
        } else if(res.data.code == "-1") {
          common.getPopUp(res.data.message, 'none')
        }
      })
    
  },
  getProjectname: function(e) {
    var  projectname = e.detail.value;
    this.setData({ projectname:projectname })
},
getProjectTitle:function(e){
  var  projectTitle = e.detail.value;
  this.setData({ projectTitle:projectTitle })
},
getIntroduce:function(e){
   var  introduce=e.detail.value;
   this.setData({introduce:introduce})
},
getProjectRMB:function(e){
  var projectRMB=e.detail.value;
  this.setData({projectRMB:projectRMB})
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
  edit:function(){
    var that = this,
    projectname = that.data.projectname,
    projectTitle=that.data.projectTitle,
    introduce = that.data.introduce,
    projectRMB = that.data.projectRMB,
    teamId=that.data.teamId,
    projectid=that.data.projectid,
      JYToken = that.data.JYToken,
      set_url = config.cardurl+'homedoctor/v1/homeproject/'+ projectid ,
      data = { 
        "Teamid":teamId,  
        "Projectname":projectname,  
        "ProjectTitle":projectTitle, 
        "Introduce":introduce,  
        "ProjectRMB":projectRMB
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
    projectname = that.data.projectname,
    projectTitle=that.data.projectTitle,
    introduce = that.data.introduce,
    projectRMB = that.data.projectRMB,
    teamId=that.data.teamId,
      JYToken = that.data.JYToken,
      set_url = config.cardurl+'homedoctor/v1/homeproject',
      data = { 
        "Teamid":teamId,  
        "Projectname":projectname,  
        "ProjectTitle":projectTitle, 
        "Introduce":introduce,  
        "ProjectRMB":parseInt(projectRMB)
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