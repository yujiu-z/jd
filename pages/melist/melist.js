// pages/melist/melist.js
// Admines/itempage/itempage.js
var config = require('../../utils/config.js')
var common = require('../../utils/common.js')
// var Charts = require('../../utils/wxcharts-min.js');
Page({
  data: {
    userId: "",
    // doctorImg: 'https://media.lotusdata.com/drplus/icon/wc_login2.png',
    doctorName: '',
    Profilepic:"",
    Idnumber: '',
    Userid: '',
    levelImg: '',
    userdata: {},
    Token: '',
    docQrode: "",
    docQrodeIcon: config.icon + 'docQrodeIconAdd.png',
    wxname: '点击添加',
    showBadge: false,
    codeList: [
      { text: '我的名片', onclick: 'businessCard', id: 0, enjoy: '预览' },
      { text: '我的小程序码', onclick: 'myWX', id: 2, },
    ],
    proList: [
      { text: '物联设备', onclick: 'myDevice' },
      { text: '设置', onclick: 'mySetting' },
      { text: '更多小程序', onclick: 'moreMiniProgram' },
      { text: '帮助', onclick: 'myHelp' },
      { text: '客服', onclick: '' }
    ],
    modelShow: false,
    status: '',
    u_token: '',
    formIdList: [],
    oppid: '',
    goOtherPage: config.icon + 'btn_nav_JianTou@2x.png'
  },

  moreMiniProgram: function () { common.navigateTo('../more/more') },

  businessCard(e) { common.getPopUp('跳转名片失败', 'none') },

  // 查看二维码
  myWX: function () {
    var docId = this.data.docId;
    common.navigateTo('../../manage/qrCode/qrCode?docId=' + docId + '&type=person')
  },

  // 个人积分
  myIntegral: function () { common.getPopUp('暂未开通', 'loading') },

  //修改头像
  changImgs: function () {
    let that = this;
    wx.chooseImage(1).then(function (res) {
      var newurl = res.tempFiles[0].path,
        token = that.data.Token;
      wx.uploadFile({
        url: config.cardurl + 'file/standardupload',
        method: 'POST',
        filePath: newurl,
        name: 'Filedata',
        header: {
          'Authorization': token,  //如果需要token的话要传
        },
        success: function (res) {
          console.log(res,22333)
          // var obj = JSON.parse(res.data);
          if (obj.code == 0) {
            var doctorImg = obj.data;
            that.setData({ doctorImg });
            that.chang(doctorImg)
          }
        }
      })
    })
  },
  bigImg: function () { wx.previewImage({ current: '', urls: [this.data.doctorImg] }) },
  chang: function (img) {
    var data = this.data.userdata,
      Userid = this.data.Userid,
      token = this.data.u_token;
    data.profilepic = img;
    common.getData('https://api.lotusdata.com/publicHealth/v1/publichealthuser/' + Userid, 'put', data, token).then((res) => {
      console.log(res)
    })
  },

  getToken: function () {
    var that = this;
    var data = {
      "username": "kevin.li@yitushijie.com",
      "password": "123123",
      "refreshtoken": "0"
    },
      url = config.cardurl + 'buser/token';
    common.getData(url, 'POST', data).then(res => {
      console.log(res,88899)
      if (res.data.code == '0') {
        var Token = res.data.token;
        Token = 'JWT ' + Token;
        wx.setStorage({ key: "Token", data: Token })
      }
      that.setData({ Token })
    })
  },

  //我的设备
  myDevice: function () { common.navigateTo('../../pages/myDevice/myDevice') },
  // 设置
  mySetting: function () {
     common.navigateTo('../../pages/changePassword/changePassword') },
  // 帮助
  myHelp: function () {
    // common.getPopUp('敬请期待', 'none');return;
    common.navigateTo('../../Admines/help/help')
  },

  nextStep: function () {
    var leadStatus = this.data.leadStatus;
    this.setData({ leadStatus: leadStatus + 1 })
  },
  onLoad: function () {
    var that = this;
    that.getToken()
    wx.hideHomeButton();
    that.setData({ formIdList: [] })
    that.getDocInfo()
    wx.getStorage({
      key: 'Token',
      success: function (res) {
        var Token = res.data
        console.log(Token,3333666
          )
        that.setData({Token:Token})
        wx.getStorage({
          key: 'myId',
          success: function (res) {
            var userId = res.data
            that.setData({ u_token: u_token, userId: userId })
            
            that.getInfo(u_token)
          
          }, fail: function () { console.log("god bless you") }
        })
      },
      fail: function (res) {
        // common.getPopUp('请重新登陆', 'loading')
        // wx.clearStorage()
        // setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
      }
    })
    wx.getStorage({ key: 'oppid', success: function (res) { that.setData({ oppid: res.data }) }, })
  },

  //获取用户信息
  getDocInfo: function () {
    var that = this;
    wx.getStorage({
      key: 'Profilepic',
      success: function (res) {
        if (res.data != '') {
          that.setData({ doctorImg: res.data })
        } else {
          that.setData({ doctorImg: 'https://media.lotusdata.com/10024256066813961.jpg' })
        }
      },
      fail: function () { that.setData({ doctorImg: 'https://media.lotusdata.com/10024256066813961.jpg' }) }
    })
    wx.getStorage({
      key: 'docName',
      success: function (res) { that.setData({ doctorName: res.data }) }
    })
  },

  //查询用户信息
  getInfo: function (u_token) {
    var that = this;
    wx.getStorage({
      key: 'docIdnumber',
      success: function (res) {
        console.log(res)
        var Idnumber = res.data,
          url = 'https://api.lotusdata.com/publicHealth/v1/publichealthuser/detail/' + Idnumber;
        that.setData({ Idnumber });
        common.getData(url, 'GET', {}, u_token).then(res => {
          var Userid = res.data.data.Userid;
          that.setData({ Userid })
          var Password = res.data.data.Password,
            phone = res.data.data.Phone,
            profilepic = res.data.data.profilepic,
            emiail = res.data.data.Email,
            name = res.data.data.Name,
            userdata = {
              "phone": phone,
              "profilepic": profilepic,
              "email": emiail,
              "name": name
            };
          that.setData({ userdata })
        })
      }
    })
  },

  //获取用户等级信息
  getLevel: function (token, id) {
    var that = this,
      level_url = config.url + 'designerlevel/' + id,
      data = {};
    common.getData(level_url, 'GET', data, token).then(function (res) {
      if (res.data.code == '0') {
        that.setData({ levelImg: res.data.data.Logo })
      }
    })
  },



  showModel: function () { this.setData({ modelShow: true }) },

  hideModel: function () { this.setData({ modelShow: false }) },

  // 会员认证
  goMember: function () { common.navigateTo('../member/member') },

  goAuthentication: function () { common.navigateTo('../doctorCertified/doctorCertified') },

  onHide: function () {
    var _this = this,
      formIdList = _this.data.formIdList,
      oppid = _this.data.oppid,
      u_token = _this.data.u_token,
      sendFormId_url = config.url + 'wx/formid?appid=wx64256017793465f6',
      data = { "openid": oppid, "formids": formIdList };
    common.getData(sendFormId_url, 'POST', data, u_token).then(function (res) {
      if (res.data.code == 0) { _this.setData({ formIdList: [] }) }
    })
  },

  // 收集用户点击得到的formId
  formSubmit: function (e) {
    const _this = this, formIdList = _this.data.formIdList, f_id = e.detail.formId;
    formIdList.push(f_id)
    _this.setData({ formIdList: formIdList })
  }


})