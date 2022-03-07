// pages/plan/plan.js
var app = getApp()
var config = require('../../utils/config.js')
var common = require('../../utils/common.js');
const dateTimePicker = require('../../utils/dateTimePicker.js');
var nowTime = common.getTime().slice(0, 10)+' '+common.getTime().slice(11, 19);
var nowData = common.getTime().slice(0, 10)
// var lastTime =common.getTime(common.getTime().slice(0, 10)+1000*60*60*24);
var myDate = new Date();
var year = myDate.getFullYear();
var month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
var day = myDate.getDate();        //获取当前日(1-31)
function add(nums) {
    if (nums <= 9) { nums = '0' + nums }
    return nums
}
var nowDatas = add(year) + '-' + add(month) + '-' + add(day+1);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goOtherPage: 'https://images.yitushijie.com/btn_nav_JianTou@2x.png',
    add: config.icon + 'add.png',
    uploadimgs:'',
    signature:'',
    Evaluationtime:nowTime,
    Residentsid:"",   //居民id
    name:'',
    Projectid:"",  //项目id
    Packid:"",
    ProjectName:"",
    ProjectNames:"",
    Starttime:nowData,
    Endtime:nowDatas,
    Starttimes:"",
    Endtimes:"",
    recordList:[],
    showType: 0,
    token:'',
    JYToken:"",
    Accountid:'',   //评估人id
    evaluation:'',   //服务评价
    planid:'',
    inputDis:false,
    serviceStatus: ['新建', '家医确认','客户同意','客户拒绝'],
    status: 0,
    record:0,
    index:0,
    Recordid:'',
    showTime:0,
    Name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({Residentsid:options.residentsid,name:options.name})
    if (options.signature != '') {
       var  signature=options.signature 
       this.setData({signature:signature})
    }
    var g_url = config.cardurl + '/v1/buser/token',
    data = {
      "username":"kevin.li@yitushijie.com",
      "password":"123123",
      "refreshtoken":"0"
    };
  common.getData(g_url, 'POST', data, {}).then(function (res) {
    if (res.data.code == "0") {
      var token = "JWT " + res.data.token
      wx.setStorage({ key: "token", data: token })
    }
  })
    var that=this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token =res.data
        that.setData({ token:token })
        wx.getStorage({
          key: 'JYToken',
          success: function (res) {
         var   JYToken=res.data
         that.setData({JYToken:JYToken})
         wx.getStorage({
          key: 'Accountid',
          success: function (res) {
         var   Accountid=res.data
         that.setData({Accountid:Accountid})
        
          if(options.Detailsid!= undefined){
            var planid=options.Detailsid
        
            that.planList(JYToken,planid)
            that.setData({inputDis:true,planid:planid})
         }
        
       
          }
        })
          }
        })
      }
    })
  },
  planList: function (JYToken,planid) {
    var that = this,
      set_url =config.cardurl+ 'homedoctor/v1/packrecorddetailsyunzhaohu/'+planid,
      data = { 
       };
      common.getData(set_url, 'GET', data, JYToken).then(function (res) {
        if (res.data.code == "0") {
          var data=res.data.data
          common.getPopUp('获取成功！', 'success')
          that.setData({Packid:data.Packid,Residentsid:data.Residentsid,uploadimgs:data.Serviceimage,signature:data.Signature,evaluation:data.Evaluation,Accountid:data.Accountid,
            ProjectNames:data.Projectname,name:data.Name,
            // Starttime:data.Starttime.substr(0,10),Endtime:data.Endtime.substr(0,10),
             inputDis:true})

        } else if(res.data.code == "-1") {
          common.getPopUp(res.data.message, 'none')
        }
      })
    
  },
  timeChange: function (e) {
    
    if (e.detail.value) { this.setData({ showType: 1 }) }
    else { this.setData({ showType: 0 }) }
    // this.drawLine()
},
ChangeTime:function(e){
  if (e.detail.value) { this.setData({ showTime: 1 }) }
  else { this.setData({ showTime: 0 }) }
},
  getList(e){
    var index = e.detail.value,
       recordObj=   this.data.recordList[index]
  this.setData({ index:index,Name:recordObj.Name,ProjectName:recordObj.ProjectName,Recordid:recordObj.Recordid})
  },
  getStatus(e) {
    var index = e.detail.value,
      status = index;
    this.setData({ status })
},
  edit:function(){
    var that = this,
    Projectid = that.data.Projectid,
    Residentsid = that.data.Residentsid,
    Evaluationtime = that.data.Evaluationtime,
    uploadimgs=that.data.uploadimgs,
    signature=that.data.signature,
    evaluation= that.data.evaluation,
    Accountid=that.data.Accountid,
      JYToken = that.data.JYToken,
      status=that.data.showType,
      set_url = config.cardurl+'homedoctor/v1/packrecorddetailsyunzhaohu/'+ that.data.planid,
      data = {
        "Serviceimage":uploadimgs,
        "Positioning":"",
        "Signature":signature,
        "Evaluation":evaluation,
        "Perfortime":Evaluationtime,
        "State":(status).toString()
        // "State":status,
       };
      common.getData(set_url, 'PUT', data, JYToken).then(function (res) {
        if (res.data.code == "1") {
          common.getPopUp('编辑成功！', 'success')
          let pages =getCurrentPages();
          let prevPage=pages[pages.length -2]
          prevPage.getPackList(that.data.status)
          wx.navigateBack({
            delta:1
          })
        } else if(res.data.code == "-1") {
          common.getPopUp(res.data.message, 'none')
        }
      })
  },
  getEvaluationtime(e) {
    var val = e.detail.value,
    Evaluationtime = val;
    this.setData({ Evaluationtime })
  },
  getStarttime(e){
    var val = e.detail.value,
    Starttime = val;
    this.setData({ Starttime })
  },
  getEndtime(e){
    var val = e.detail.value,
    Endtime = val;
    this.setData({ Endtime })

  },
  getEvaluation:function(e){
    var  evaluation=e.detail.value;
    this.setData({evaluation:evaluation})
 },
 save: function () {
  var that = this,
  Projectid = that.data.Projectid,
  Residentsid = that.data.Residentsid,
  Evaluationtime = that.data.Evaluationtime,
  uploadimgs=that.data.uploadimgs,
  signature=that.data.signature,
  evaluation=that.data.evaluation,
  Accountid=that.data.Accountid,
  Packid=that.data.Packid,
  Starttime=that.data.Starttime,
  Endtime=that.data.Endtime,
  Recordid=that.data.Recordid,
    JYToken = that.data.JYToken,
    showTime=that.data.showTime,

    set_url =config.cardurl+ 'homedoctor/v1/packrecorddetails';
  if(showTime ==1){
   var data = { 
      "Residentsid":Residentsid,
     "Perfortime":Evaluationtime,
     "Evaluatorid":Accountid,
     "Serviceimage":uploadimgs,
     "Positioning":"",
     "Signature":signature,
     "Evaluation":evaluation,
    "Recordid":Recordid,
     "Starttime":Starttime,
     "Endtime":Endtime
    
       }
  }else{
  var  data = { 
      "Residentsid":Residentsid,
     "Perfortime":Evaluationtime,
     "Evaluatorid":Accountid,
     "Serviceimage":uploadimgs,
     "Positioning":"",
     "Signature":signature,
     "Evaluation":evaluation,
    "Recordid":Recordid,
     "Starttime":that.data.Starttimes,
     "Endtime":that.data.Endtimes
       };
  }
    common.getData(set_url, 'POST', data, JYToken).then(function (res) {
      if (res.data.code == "1") {
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toProject(){
    common.navigateTo('../projectList/projectList')
  },
  toResidents(){
      common.navigateTo('../residentsArchives/residentsArchives')
  },
  toSig() {
    common.navigateTo('../signature/signature')
  },
  chooseImages: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) { _this.chooseWxImage('album') }
          else if (res.tapIndex == 1) { _this.chooseWxImage('camera') }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var _this = this,
      token = _this.data.token;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        common.showLoading('上传中...')
        _this.setData({ uploadimgs: '' })
        var tempFilePaths = res.tempFilePaths,
          tempFilePathNum = res.tempFilePaths.length;
        wx.uploadFile({
          url: config.url2 + 'v1/file/standardupload', //接口地址
          method: 'post',
          header: { 'Authorization': token },
          filePath: tempFilePaths[0],
          name: 'Filedata',
          success: function (res) {
            var photo = JSON.parse(res.data),
              data = photo.data;
            _this.setData({ uploadimgs: data })
            common.hideLoading()
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 
  },
  getProjectList:function(name,Packid){
    this.setData({
      ProjectNames:name,
      Packid:Packid
    })
    this.PackList(Packid)
  },
  PackList:function(Packid){
    var that = this,
    JYToken=that.data.JYToken,
      set_url =config.cardurl+ 'homedoctor/v1/packprojectlist?start=0&limit=5&packid='+Packid,
      data = { 
       };
      common.getData(set_url, 'GET', data, JYToken).then(function (res) {
        if (res.data.code == '1' ) {
          if(res.data.data != null){
            let list = res.data.data, arr = [];
            for (let i in list) {
              arr.push({
                Name:list[i].Name,
                Recordid:list[i].Recordid,
                ProjectName:list[i].ProjectName,
               
              });
            }
            that.setData({ recordList: arr })
          }else{
    
            that.setData({ recordList: [] })
          }
        } else if (res.data.code == '-2') {
          common.getPopUp('查询失败！', 'loading')
         
        }
      })
  },
  getWorkUnitList:function(name,Residentsid){
    this.setData({
      name:name,
      Residentsid:Residentsid
    })
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