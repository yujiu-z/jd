// pages/projectList/projectList.js
// pages/residentsArchives/residentsArchives.js
// manage/workUnit/workUnit.js
var app = getApp()
var config = require('../../utils/config.js')
var common = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryunit:'',
    page:0,
    token:'',
    tableData:[],
    Hospitalid:'',
    Address:'',
    appList:[],
    Residentsid:"",
    personNameList:[],
    name:'',
    JYToken:"",
    teamId:'',
    Projectid:'',
    Packid:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    wx.getStorage({
      key: 'JYToken',
      success: function (res) {
          var JYToken = res.data;
          _this.setData({JYToken:JYToken});
          wx.getStorage({
            key: 'teamId',
            success: function (res) {
                var teamId = res.data;
               _this.setData({teamIdn:teamId});
               _this.getdoctorunit(JYToken, teamId)
            }
          })

         
      }
      })

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
  searchKeywords: function (e) {
    this.setData({ queryunit: e.detail.value }) },
    searchs: function () {
      if (this.data.queryunit == '') {
          common.getPopUp('请输入关键词', 'none');
          return;
      }
      this.setData({ status: '1', page: 0})
      this.getdoctorunit(this.data.token, 0,this.data.queryunit)
  },
  changeList:function(){
    let pages =getCurrentPages();
    let prevPage=pages[pages.length -2]
    prevPage.getProjectList(this.data.name,this.data.Packid)
    wx.navigateBack({ delta: 1});
    return
  },
  
  getdoctorunit:function(JYToken, teamId){
    var  that=this,
       
         tableData=that.data.tableData,
        // g_url=  config.cardurl+ 'homedoctor/v1/homeprojectlist?start=0&temid='+teamId+'&limit=10&state=0',
        g_url = config.cardurl + 'homedoctor/v1/packlist?start=0&temid='+ teamId+'&limit=5&state=0',
        data={};
      common.getData(g_url, 'GET', data,JYToken).then(function (res) {
          console.log(res,44999)
            tableData=[]
            if(res.data.code  == '1'){
             var list=res.data.data
             for(var i  in   list){
              list[i].click= false
            }

            list.forEach((v)=>{
              tableData.push({
                Packname:v.Packname,
                Packid:v.Packid,
                State:v.State,
                click: v.click
              })
            })  
             that.setData({
              tableData:tableData
             })
             
            }
       })
  },
  thisPerson:function(e){
       
      var index = e.currentTarget.dataset.index;
      var tableData = this.data.tableData,
        id=e.currentTarget.dataset.id,
      appList=this.data.appList,
      name = e.currentTarget.dataset.name,
      personNameList= this.data.personNameList;
      tableData[index].click = !tableData[index].click;
      for(var i=0;i< tableData.length;i++){
           if(index == i){
            tableData[i].click =true
            this.data.name=tableData[i].Packname
            this.data.Packid=tableData[i].Packid
          
           }else{
            tableData[i].click =false
           }
      }
      this.setData({
        appList:appList,
        tableData:tableData,
        name:this.data.name,
        personNameList:personNameList,
        Packid:this.data.Packid
      })
      
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