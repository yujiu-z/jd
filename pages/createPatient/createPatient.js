// pages/createPatient/createPatient.js
var config = require('../../utils/config.js');
var common = require('../../utils/common.js');
Page({
  data: {
    userid: '',
    u_token: '',
    u_id: '',
    idnum: '',
    name: '',
    sex: '',
    groupList: ['高血压管理', '糖尿病管理', '肺结核管理', '恶性肿瘤管理', '健康体检管理', '孕产妇管理', '儿童健康管理', '精神障碍管理', '中医药健康管理', '预防接种'],
    groupIndex: 0,
    JYToken:""
  },

  onLoad(options) {
    var _this = this;
    _this.getToken();
    wx.getStorage({
      key: 'accesstoken',
      success: function (res) {
        var u_token = res.data
        _this.setData({ u_token: u_token})
        wx.getStorage({
          key: 'JYToken',
          success: function (res) {
            var JYToken = res.data
            _this.setData({JYToken: JYToken })
          }
        })
      },
      fail: function (res) {
        // common.getPopUp('请重新登陆', 'loading')
        // wx.clearStorage()
        // setTimeout(function () { common.reLaunch('../logs/logs') }, 500)
      }
    })
  },
  getToken: function() {
    var token = '',
        data = {
            username: "system@akso.com",
            password: "123123",
            refreshtoken: '0'
        };
    common.getData(config.url2 + '/v1/sysuser/token', 'POST', data, token).then(function(res) {
        if (res.data.code == "0") {
            var token = "JWT " + res.data.token;
            wx.setStorage({ key: 'accesstoken', data: token })

        } else {
            common.getPopUp('token获取失败，请重试', 'none')
        }
    }).catch(function(err){
        console.log(err)
    })
},


  scanSuccess: function (e) { 
     console.log(e,2225555)
    this.setData({ idnum: e.detail.id.text, name: e.detail.name.text, sex: e.detail.gender.text == '男' ? 1 : 2 }) },

  exist: function () {
    var idnum = this.data.idnum.trim().toUpperCase();
    if (idnum == '') {
      common.getPopUp('请填写身份证号', 'none')
      return;
    }
    if (!(/^\d{17}([0-9X]$)/.test(idnum))) {
      common.getPopUp('身份证号格式不正确', 'none')
      return;
    }
    // common.redirectTo('../informationSheet/informationSheet?id='+idnum)
    // return
    var that = this,
      token = that.data.JYToken,
      url = config.cardurl + 'homedoctor/v1/homeresident?residentsid=&idnumber=' + idnum,
      data = {};
    common.getData(url, 'GET', data, token).then(function (res) {
      console.log(res,6699999)
      if (res.data.code == '1' && res.data.data == null) {
        //没有档案记录
        // common.redirectTo('../informationSheet/informationSheet?id=' + idnum + '&newr=1&name=' + that.data.name + '&sex=' + that.data.sex)
        common.redirectTo('../informationSheet/informationSheet?id=' + idnum)
      } else if (res.data.code == '1' && res.data.data.length != 0) {
        //有档案记录
        var resData = res.data.data;
        wx.showModal({
          title: '温馨提示',
          content: '该居民已有档案！',
          confirmText: '确定',
          success: function (res) {

            if (res.confirm) {
              //档案迁移

            } else if (res.cancel) {
              wx.navigateBack()
            }
          }
        })
      } else {
        common.getPopUp('查询失败请重试', 'none')
      }
    })
  },

  getIdnum: function (e) {
    var idnum = e.detail.value;
    if (idnum.length >= 17) {
      this.setData({ idnum, sex: idnum[16] % 2 == 0 ? '2' : '1' })
    } else {
      this.setData({ idnum, sex: '' })
    }
  }
})