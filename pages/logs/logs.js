// logs.js
var config = require('../../utils/config.js')
var common = require('../../utils/common.js')
var app = getApp()
Page({
  data: {
    phone: "",
    password: "",
    midToken: "",
    addInfo: [
      { text: '申请举办国家级、省级学术会议;' },
      { text: '科研教学辅助:如论文润色、指导发表、摄影摄像、课件的插画和动画制作;' },
      { text: '执业环境保障，如保险、媒体、法律等;' },
      { text: '新技术项目孵化;' }
    ],
    scene: '',
    scenes: '',
    loginWay: '1',
    infores: '',
    userId: '',
    userstatus: false,
    Wxcode: '',
    unionid:"",
    openid:'',
    getOnceCode: '1',
    code: '获取验证码',
    phoneNotRepeat: '0',
    phoneNotNull: '0',
    inputValue: '',
    codeValue: '',
    getToken: '',
    wxicon: config.icon + "wc_login0.png",
    xhicon: "https://media.lotusdata.com/19148336414064664.png",
    dricon: "https://media.lotusdata.com/drplus/icon/wc_login2.png",
    agree: false,
    sysToken:'',
    JYToken:'',
    Accountid:'',
    Profilepic:''

  },

  //获取账号信息是否自动登录
  onLoad: function (options) {
    var _this = this
    _this.getToken();
    wx.getStorage({
      key: 'sysToken',
      success: function (res) {
        var sysToken = res.data;
        _this.setData({ sysToken: sysToken})
        wx.getStorage({
          key: 'JYToken',
          success: function (res) {
            var JYToken = res.data;
            _this.setData({ JYToken: JYToken})
            wx.getStorage({
              key: 'Accountid',
              success: function (res) {
                var  Accountid=res.data
                _this.setData({Accountid:Accountid})
                _this.getDetailInfo(JYToken,Accountid)
                }
              })
          }
        })
        // wx.login({
        //   success: function (res) {
        //     _this.setData({ Wxcode: res.code, userstatus: true })
        //     wx.setStorage({ key: 'code', data: res.code, })

        //     _this.getSessionKey()
        //   }
        // })
        
      },
    })
    //存储code
  },
  onShow: function () {
    this.onLoad()
  },
  getToken: function() {
    var _this = this,
     token = '',
        data = {
            username: "system@akso.com",
            password: "123123",
            usertype:"system",
            refreshtoken: '0'
        };
    common.getData(config.cardurl + 'v1/buser/token', 'POST', data).then(function(res) {
        if (res.data.code == "0") {
            var token = "JWT " + res.data.token;
            wx.setStorage({ key: 'sysToken', data: token })
        // _this.getJYToken(token)
        } else {
            common.getPopUp('token获取失败，请重试', 'none')
        }
    }).catch(function(err){
        console.log(err)
    })
},
getJYToken(){
  var  _this=this,
  token = '',
  // sysToken=this.data.token,
  phone=_this.data.phone,
  password=_this.data.password,
        data = {
          "Username":phone,
          "Password":password,
          "Usertype":"homedoctor",
          "Refreshtoken":"1"
      };
    common.getData(config.url3 + 'v1/login/token', 'POST', data).then(function(res) {
        //  console.log(res,777722222)
        if (res.data.code == "0") {
            var token = "JWT " + res.data.data;
            wx.setStorage({ key: 'JYToken', data: token })
            wx.getStorage({
              key: 'JYToken',
              success: function (res) {
          
                var JYToken = res.data;
                _this.setData({ JYToken:JYToken })
                _this.loginSwitch(_this.data.JYToken)
              }
            })
        } else {
            common.getPopUp('token获取失败，请重试', 'none')
        }
    }).catch(function(err){
        console.log(err)
    })
},

  iAgree: function () {
    this.setData({ agree: !this.data.agree })
  },

  //切换登录方式
  // changewx: function () { this.setData({ loginWay: '2' }) },
  changewx: function() {
    this.setData({ loginWay: 2, isFormShow: false ,color : '#888' ,colors : "#fff"})
},
  changexh: function () { 
    this.setData({ loginWay: '0' }) },
  changedr: function () { this.setData({ loginWay: '1' }) },
  goRegisterBasic: function () {
    common.navigateTo('../../manage/createPatient/createPatient')
  },
  gocreatePatientList: function () {
    common.navigateTo('../../manage/createPatientList/createPatient')
  },
  userInfoHandler: function () {
    var that = this;
    wx.getUserProfile({
      desc: '获取用户信息同步个人资料',
      success: function (res) {
        var infores = res;
        wx.login({
          success: function (res) {
            that.setData({ Wxcode: res.code, infores })
            wx.setStorage({ key: 'code', data: res.code, })
            that.loginBtn()
          }
        })
      }
    })


  },

  // 监听输入的账号：
  inputPhone: function (e) { this.setData({ phone: e.detail.value }) },

  // 监听输入的密码
  inputPwd: function (e) { this.setData({ password: e.detail.value }) },

  // 获取手机号输入值
  bindKeyInput: function (e) { this.setData({ inputValue: e.detail.value }) },
  //获取验证码输入值
  bindCode: function (e) { this.setData({ codeValue: e.detail.value }) },

  //获取验证码
  getCode: function () {
    var _this = this,
      tel = _this.data.inputValue;
    if (tel == '' || !(/^1[3|4|7|5|8|9|6][0-9]\d{4,8}$/.test(tel))) { common.getPopUp('手机号非法', 'loading') } else {
      // 获取 管理token
      const u_token = '',
        data = {
          username: "system@akso.com",
          password: "123123",
          refreshtoken: '0'
        };
      common.getData(config.url2 + 'v1/sysuser/token', 'POST', data, u_token).then(function (res) {
        _this.setData({ getToken: 'JWT ' + res.data.token, phoneNotRepeat: '0' })
        var TOKEN = _this.data.getToken,
          data = {
            "filed": "phone",
            "data": tel
          };
        common.getData(config.url2 + 'v1/reg/checkdata', 'POST', data, TOKEN).then(function (res) {
          if (res.data.code == "0") {
            if (res.data.data == 0) { //未注册
              wx.showModal({
                title: '提示',
                content: '您的手机号还未被注册，请先在“云照护”注册账号',
                success: function (res) {
                  if (res.confirm) { } else if (res.cancel) { }
                }
              })
            } else { //已注册
              const data = {};
              common.getData(config.url2 + 'v1/sms/send?phone=' + tel + '&sendtype=register', 'POST', data, TOKEN).then(function (res) {
                _this.setData({ phoneNotNull: '0', getOnceCode: '0' })
                var code = '',
                  stop = true,
                  count = 60;
                if (stop) {
                  stop = false;
                  var timer = setInterval(function () {
                    count--;
                    if (count <= 0) {
                      count = 60;
                      clearInterval(timer);
                      _this.setData({ getOnceCode: '1', code: '重新获取' })
                      stop = true;
                    } else {
                      _this.setData({ getOnceCode: '0', code: count + 's后重发' })
                      stop = true;
                    }
                  }, 1000);
                }
              })
            }
          } else { common.getPopUp('验证码验证失败！', 'loading') }
        })
      })
    }
  },

  // 登录验证
  loginBtn: function () {
    if (this.data.agree === false) {
      wx.showToast({ title: '请先阅读并同意云照护服务协议', icon: 'none', duration: 5000 })
      return;
    }
    if (this.data.loginWay === '0') {
      // return
      this.getJYToken()
    }else if(this.data.loginWay === '1'){
       var phone = this.data.inputValue,
      code = this.data.codeValue;
      this.getUserInfo(phone,code)
      // this.getSessionKey()
    }
  },
  //微信登陆
  getSessionKey() {
    // common.showLoading('正在登录...')
    var that = this,
      Wxcode = that.data.Wxcode,
      token = '',
      data = {
        username: "system@akso.com",
        password: "123123",
        refreshtoken: '0'
      };
    common.getData(config.url2 + 'v1/sysuser/token', 'POST', data, token).then(function (res) {
      if (res.data.code == "0") {
        var token = "JWT " + res.data.token,
          data = {};
          that.setData({ getToken: 'JWT ' + res.data.token, phoneNotRepeat: '0' })
        common.getData(config.url2 + 'v1/wx/code2session?code=' + Wxcode + '&appid=wx8bb3724ea35a8e12', 'POST', data, token)
          .then(function (res) {
            // console.log(res,8882222)
            if (res.data.code == "0") {
              var session_key = res.data.data.session_key,
                unionid = res.data.data.unionid,
                openid = res.data.data.openid;
              wx.setStorage({ key: 'oppid', data: openid })
              that.setData({ unionid, openid })
              if (that.data.loginWay === '0') {
                var phone = that.data.phone,
                  userstatus = that.data.userstatus,
                  password = that.data.password;
                if (userstatus) {
                  if (phone != '' && password != '') {
                    that.loginSwitch()
                    that.loginIncident(phone, password)
                  } 
                  // else { common.getPopUp('信息不完整！', 'loading') }
                } else {
                  // that.getDetailInfo(token, that.data.userId)
                }
              } else if (that.data.loginWay === '1') {
                var phone = that.data.inputValue,
                  userstatus = that.data.userstatus,
                  code = that.data.codeValue;
                if (userstatus) {
                  if (phone != '' && code != '') {
                    that.getUserInfo(phone, code)
                    // that.getOrgToken()
                  }
                  //  else { common.getPopUp('信息不完整！', 'loading') }
                } else {
                  that.getDetailInfo(that.data.JYToken, that.data.userId)
                }
              } else {
                // if (!res.data.data.unionid) {
                //   var infores = that.infores;
                //   var decode_url = config.url2 + 'v1/wx/decryptoruserinfo?appid=wx8bb3724ea35a8e12',
                //     data = { "sessionkey": session_key, "encrypteddata": infores.encryptedData, "iv": infores.iv };
                //   common.getData(decode_url, 'POST', data, token).then(function (res) {
                //     if (res.data.code == "0") {
                //       that.setData({ unionid: res.data.data.unionId })
                //       that.loginSwitch()
                //     }
                //   })
                // } else {
                //   that.setData({ unionid: res.data.data.unionid })
                //   that.loginSwitch()
                // }
              }

            } else {
              common.hideLoading()
              // common.getPopUp('code过期，请重新打开小程序', 'none')
            }
          })
      }
    })
  },

  loginSwitch: function (JYToken) {
    var that = this,
    phone=that.data.phone,
    password=that.data.password;
    // JYToken=that.data.JYToken;
    if (phone != undefined && phone != "") {
      const u_token = '',
        data = {
          "Phone":phone ,
         "Password":password
       }
      common.getData(config.cardurl + 'homedoctor/v1/homeaccount/login', 'POST', data, JYToken).then(function (res) {
        if (res.data.code == "1" ) {
         var   teamId = res.data.data.Teamid,
         Profilepic=res.data.data.Profilepic,
         Accountid=res.data.data.Accountid;
          wx.setStorage({ key: "teamId", data: teamId })
          wx.setStorage({ key: "Accountid", data: Accountid })
          wx.setStorage({ key: "Profilepic", data: Profilepic })
          
          setTimeout(function () { wx.switchTab({url:'/pages/cooperation/cooperation'}) }, 1000)
          wx.showToast({ title: '登录成功', icon: 'success', duration: 2000 })
          // that.getDetailInfo("JWT " + token, userId)
        } else {
          common.hideLoading()
          // common.getPopUp('您未绑定微信，请使用手机号登录', 'loading')
          that.setData({ currentTab: 2, isFormShow: true })
        }
      })
    } else { 
      wx.showToast({ title: '请先正确输入手机号或密码', icon: 'none', duration: 2000 })
    }
  },

  loginIncident: function (phone, password) {
    var _this = this,
      l_url = config.url2 + 'v1/user/login',
      data = { "username": phone, "password": password, "refreshtoken": "0", "accounttype": "union" },
      u_token = '';
    _this.addLogin(l_url, data, u_token)
    _this.getOrgToken()
  },

  getUserInfo: function (phone, code) {
    common.showLoading('正在登录...')
    var _this = this,
      token = _this.data.sysToken,
      url = config.url3+'v1/login/phonevercode',
      data = {
        "Phone":phone,
        "Usertype":"homedoctor",
        "Vercode":code
      };
    common.getData(url,'POST',data,token).then(function (res) {
      // console.log(res,2226666)
      if (res.data.code == '0') {
          var token = "JWT " + res.data.token;
          wx.setStorage({ key: 'JYToken', data: token })
          wx.setStorage({ key: "teamId", data: res.data.data.Teamid })
          wx.setStorage({ key: "Accountid", data: res.data.data.Accountid })
          wx.setStorage({ key: "Profilepic", data: res.data.data.Profilepic })
          setTimeout(function () { wx.switchTab({url:'/pages/cooperation/cooperation'}) }, 1000)
          wx.showToast({ title: '登录成功', icon: 'success', duration: 2000 })
      } else if(res.data.code == '-1'){
        common.hideLoading()
        common.getPopUp(res.data.message, 'loading')
      }
    })
  },

  getDetailInfo: function (token, id) {
    var that = this,
      d_url = config.cardurl + 'homedoctor/v1/homeaccount/' + id,
      data2 = {};
    common.getData(d_url, 'GET', data2, token).then(function (res) {
      // console.log(res,99555)
      if (res.data.code == '1') {
        wx.setStorage({ key: "teamId", data: res.data.data.Teamid })
          wx.setStorage({ key: "Accountid", data: res.data.data.Accountid })
          wx.setStorage({ key: "Profilepic", data: res.data.data.Profilepic })
        common.hideLoading()
       var Accountid = res.data.data.Accountid;
        if (Accountid != undefined || Accountid != '') {
          
          setTimeout(function () { wx.switchTab({url:'/pages/cooperation/cooperation'}) }, 1000)
          common.getPopUp('登录成功！', 'success')
        }
      } else if (res.data.code == '-2') {
        common.getPopUp('token已过期，请重新登录小程序', 'none')
        // that.refreshToken(token,id);
      } else {
        common.hideLoading()
        common.getPopUp('登录失败,请检查登录信息！', 'loading')
      }
    })
  },

  //刷新token
  refreshToken: function (token,id) {
    var that = this,
      u_token = token.slice(4),
      url = config.url2 + 'v1/sysuser/refreshtoken',
      data = { "token": u_token };
    common.getData(url, 'POST', data, '').then(function (res) {
      if (res.data.code == '0') {
        var newtoken = 'JWT ' + res.data.data;
        wx.setStorage({ key: 'accesstoken2', data: newtoken })
        that.getDetailInfo(newtoken,id)
      } else {
        common.hideLoading()
        common.getPopUp('刷新token失败', 'loading')
      }
    })
  },

  
  addLogin: function (url, data, token) {
    var _this = this,
      scene = _this.data.scene,
      scenes = _this.data.scenes;
    common.showLoading('正在登录...')
    common.getData(url, 'POST', data, token).then(function (res) {
      if (res.data.code == '0') {
        var u_token = res.data.token,
          id = res.data.data;
        wx.setStorage({ key: 'accesstoken2', data: 'JWT ' + u_token })
        wx.setStorage({ key: 'userId', data: id })
        _this.getDetailInfo('JWT ' + u_token, id)
      } else {
        common.hideLoading();
        common.getPopUp(res.data.message, 'none')
      }
    }, function (res) {
      common.hideLoading()
      common.getPopUp('登录失败！', 'loading')
    })
  },

  getOrgToken: function () {
    var token = '',
      url = config.orgurl + 'admlogin/token',
      data = {
        "username": "system",
        "password": "Aksosystem",
        "refreshtoken": "0"
      };
    common.getData(url, 'POST', data, token).then(function (res) {
      if (res.data.code == '0') {
        var org_token = res.data.token;
        wx.setStorage({ key: 'accesstoken3', data: 'JWT ' + org_token })
      }
    })
  },
  register: function (){
    common.navigateTo('../register/register') 
  },
  //忘记密码
  forgetPwd: function () { common.navigateTo('../forgetPassword/forgetPassword') },

  watchAgreement: function () {
    common.navigateTo('../agreement/agreement')
  },

  watchPrivacy: function () {
    common.navigateTo('../privacy/privacy')
  }
})