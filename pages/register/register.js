// pages/register/register.js
// pages/forgetPassword/forgetPassword.js
var app = getApp()
var config = require('../../utils/config.js')
var common = require('../../utils/common.js')
Page({
  data: {
    telephone: '17326416904',
    password:'123456',
    teamid:'6427973578932047990',
    name:'余酒',
    nowTime:'',
    birthday:'',
    sexList: ['男', '女', '未知'],
    sex: 0,
    roleType:['管理员','普通成员'],
    type:'1',
    address:'',
    mail:"",
    idcardnumber:"6240088894524156165",
    add: config.icon + 'add.png',
    uploadimgs:'',
    profilepic:'',
    userpassword: '',
    confirmpassword: '',
    codePhone: "",
    flag: false,
    codeDis: false,
    phoneCode: "获取验证码",
    telephone: "",
    getOnceCode: "1",
    u_token: '',
    u_pwd: '',
    get_token: '',
    vToken:"",
    token:"",
    JYToken:''
  },

  //获取手机号码
  EventHandle: function (e) { this.setData({ telephone: e.detail.value }) },
  //用户输入的密码
  bindPassword:function(e){
    this.setData({ password:e.detail.value})},
    //团队id
  bindTeamid:function(e){
    this.setData({ teamid:e.detail.value})
  },
  //姓名
  bindName:function(e){
    this.setData({name:e.detail.value})
  },
  //出生日期
  getBirthday: function (e) { this.setData({ birthday: e.detail.value }) },
  //性别
  getSex: function (e) {
    this.setData({ sex: e.detail.value })
  },
  getRoleType:function(e){
    this.setData({
      type:e.detail.value
    })
  },
  //地址
  bindAddress:function(e){
    this.setData({
      address:e.detail.value
    })
  },
  bindMail:function(e){this.setData({ mail:e.detail.value})
  },
  bindIdcardnumber: function (e) { this.setData({ idcardnumber:e.detail.value})},
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
    // u_id = _this.data.u_id;
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
  passwordinput: function (e) { this.setData({ userpassword: e.detail.value }) },
  
  // 获取确认密码
  bindReplaceInput: function (e) { this.setData({ confirmpassword: e.detail.value }) },

  // 获取验证码
  bindphonecode: function (e) {

    this.setData({ codePhone: e.detail.value })
  },

  onLoad(options) {
    var that = this
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
    var nowTime = common.getTime().slice(0, 10)
    that.setData({ nowTime: nowTime })
    wx.getStorage({
      key: 'JYToken',
      success: function (res) {
        var token1 = res.data;
        wx.getStorage({
          key: 'token',
          success: function (res) {
            var token = res.data;
            that.setData({ JYToken: token1,token: token})
          }
        })
        
      }
    })
    wx.getStorage({
      key: 'accesstoken',
      success: function (res) {
        var u_token = res.data
        wx.getStorage({
          key: 'password',
          success: function (res) {
            var u_pwd = res.data
            getToken
            wx.getStorage({
              key: 'password',
              success: function (res) {
                var u_pwd = res.data
                
              }
            })
            that.setData({ u_token: u_token, u_pwd: u_pwd })
          },
        })
      },
    })

    // var get_url = config.url2 + '/v1/sysuser/token',
    //   data = { "username": "uuapp.li@gmail.com", "password": "123123", "refreshtoken": "0" };
    // common.getData(get_url, 'POST', data, that.data.get_token).then(function (res) {
    //   console.log(res, 77111)
    //   var u_token = res.data.token
    //   that.setData({ get_token: 'JWT ' + u_token })
    // })
  },

  btnext: function () { common.navigateTo('../resetSuc/resetSuc') },  
  btnsave: function () {
    var that = this,
      telephone = that.data.telephone,
      password = that.data.password,
      teamid = that.data.teamid,
      name = that.data.name,
      sex = that.data.sex=='0'?'男':(that.data.sex=='1'?'女':'未知'),
      birthday = that.data.birthday,
      type = parseInt(that.data.type),
      profilepic = that.data.uploadimgs,
      address = that.data.address,
      mail = that.data.mail,
      idcardnumber = that.data.idcardnumber,
      JYToken = that.data.JYToken,
      set_url = 'https://api.lotusdata.com/homedoctor/v1/homeaccount',
      data = { "phone": telephone, 
        "password": password,
        "teamid": teamid,
        "name": name,
        "sex":sex,
        "birthday": birthday,
        "type":type,
        "profilepic": profilepic,
        "address":address,
        "mail":mail,
        "idcardnumber": idcardnumber
       };
    // if (telephone != '') {
      common.getData(set_url, 'POST', data, JYToken).then(function (res) {
        if (res.data.code == "1") {
          common.getPopUp('注册成功！', 'success')
          common.reLaunch('../logs/logs')
        } else if(res.data.code == "-1") {
          common.getPopUp(res.data.message, 'none')
        }
      })
    // } else { common.getPopUp('验证码不能为空', 'loading') }
  },
  
})
