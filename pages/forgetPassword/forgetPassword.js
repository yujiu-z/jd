// pages/forgetPassword/forgetPassword.js
var app = getApp()
var config = require('../../utils/config.js')
var common = require('../../utils/common.js')
Page({
  data: {
    telephone: '17326416904',
    password:'123456',
    rawpassword:"",
    teamId:'6427973578932047990',
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
    token:"",
    get_token: '',
    nowTime:'',
    Accountid:'',
    teamId:"",
    JYToken:'',
    Accountid:'',
    Phone:'',
    Password:'',
    Teamid:'',
    Createtime:'',
    Idcardnumber:'',
    Profilepic:'',
    Sex:'',
    AccountName:'',
    Address:''
  },

  //获取手机号码
  //获取手机号码
  EventHandle: function (e) { this.setData({ telephone: e.detail.value }) },
  //用户输入的密码
  bindPassword:function(e){
    this.setData({ password:e.detail.value})},
    //确认密码
    bindRawpassword:function(e){
     this.setData({
      rawpassword:e.detail.value
     })
    },
    //团队id
  bindTeamid:function(e){
    this.setData({ teamId:e.detail.value})
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

  // 获取验证码
  bindphonecode: function (e) {

    this.setData({ codePhone: e.detail.value })
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
  onLoad: function () {
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
    that.setData({ hasLogin: app.globalData.hasLogin })
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data

        that.setData({ token:token })
        wx.getStorage({
          key: 'teamId',
          success: function (res) {
            var teamId = res.data
            wx.getStorage({
              key: 'Accountid',
              success: function (res) {
                var Accountid = res.data
                that.setData({Accountid: Accountid})
              
                wx.getStorage({
                  key: 'JYToken',
                  success: function (res) {
                    var JYToken = res.data
                    that.setData({ teamId: teamId, Accountid: Accountid ,JYToken:JYToken})
                    that.getUserInfo();
                  }
                })
               
              }
            })
           
          },
        })
      },
    })
  },
    getUserInfo: function () {
      // common.showLoading('正在登录...')
      var _this = this,
      JYToken = _this.data.JYToken,
        Accountid= _this.data.Accountid,
        url = config.cardurl+'homedoctor/v1/homeaccount/'+Accountid,
      data={};
      common.getData(url,'GET',data,JYToken).then(function (res) {
        if (res.data.code == '1') {
               var  Accountid= res.data.data.Accountid,
                    Phone=res.data.data.Phone,
                    Password=res.data.data.Password,
                    Teamid=res.data.data.Teamid,
                    Createtime=res.data.data.Createtime.slice(0,10),
                    Idcardnumber=res.data.data.Idcardnumber,
                    Profilepic=res.data.data.Profilepic,
                    Sex=res.data.data.Sex=='男'?'0':(that.data.sex=='女'?'0':'未知'),
                    AccountName=res.data.data.AccountName,
                    Mail=res.data.data.Mail,
                    Address=res.data.data.Address;
                    _this.setData({
                      Accountid:Accountid,
                      telephone:Phone,
                      password:Password,
                      teamId:Teamid,
                      birthday:Createtime,
                      idcardnumber:Idcardnumber,
                      uploadimgs:Profilepic,
                      sex:Sex,
                      name:AccountName,
                      address:Address,
                      mail:Mail
                    })
          // wx.setStorage({ key: "teamId", data: teamId })
          // wx.setStorage({ key: "Accountid", data: Accountid })
          // wx.setStorage({ key: "Profilepic", data: Profilepic })
            // setTimeout(function () { wx.switchTab({url:'/pages/news/news'}) }, 1000)
            // wx.showToast({ title: '登录成功', icon: 'success', duration: 2000 })
          // wx.setStorage({ key: 'accesstoken2', data: 'JWT ' + u_token })
          
          // _this.getDetailInfo('JWT ' + u_token, id)
        } else {
          common.hideLoading()
        
        }
      })
  },
  btnext: function () { common.navigateTo('../resetSuc/resetSuc') },



  // 点击获取验证码
  verifyCodeEvent: function (e) {//发送验证码
    //  把这个that指向从新指向
    var that = this,
      u_token = that.data.u_token,
      telephone = that.data.telephone,              //用户输入的手机号
      userpassword = that.data.userpassword,        //用户输入的密码
      confirmpassword = that.data.confirmpassword;  //用户输入的确认密码
    if (telephone == '' | !(/^1[3|4|7|5|8][0-9]\d{4,8}$/.test(telephone))) { common.getPopUp('手机号非法！', 'loading') }
    else {
      that.setData({ codeDis: true })
      var data = {
        username: "system@akso.com",
        password: "123123",
        refreshtoken: '0'
      };
      common.getData(config.url2 + 'v1/sysuser/token', 'POST', data, u_token).then(function (res) {
        that.setData({ getToken: 'JWT ' + res.data.token, phoneNotRepeat: '0' })
        var TOKEN = that.data.getToken
        // var getCode_url = config.url + 'interfaces/userinfo/sendCode.action?phone=' + telephone + '&type=' + '0',
        var getCode_url = config.url2 + 'v1/sms/send?phone=' + telephone + '&sendtype=register',
          data = {};
        common.getData(getCode_url, 'POST', data, TOKEN).then(function (res) {
          if (res.data.code == 0) {
            common.getPopUp('发送成功！', 'success')
            that.setData({ getOnceCode: '0', codePhone: res.data.message })
            var sixCode = res.data.message,
              code = '',
              stop = true,
              count = 60;
            if (stop) {
              stop = false;
              var timer = setInterval(function () {
                count--;
                if (count <= 0) {
                  count = 60;
                  clearInterval(timer);
                  that.setData({ getOnceCode: '1', phoneCode: '重新获取' })
                  stop = true;
                } else {
                  that.setData({ getOnceCode: '0', phoneCode: count + 's后再获取' })
                  stop = true;
                }
              }, 1000);
            }
          }
        })
      })

    }
  },
  btnsave: function () {
    var that = this,
    telephone = that.data.telephone,
    password = that.data.password,
    rawpassword = that.data.rawpassword,
    teamId = that.data.teamId,
    name = that.data.name,
    sex = that.data.sex=='0'?'男':(that.data.sex=='1'?'女':'未知'),
    birthday = that.data.birthday,
    type = parseInt(that.data.type),
    profilepic = that.data.uploadimgs,
    address = that.data.address,
    mail = that.data.mail,
    idcardnumber = that.data.idcardnumber,
    JYToken = that.data.JYToken,
    Accountid=that.data.Accountid,
    teamId=that.data.teamId,
      set_url = 'https://api.lotusdata.com/homedoctor/v1/homeaccount/'+Accountid,
      data = { "phone": telephone, 
      "password": password,
      "rawpassword":rawpassword,
      "teamid": teamId,
      "name": name,
      "sex":sex,
      "birthday": birthday,
      "type":type,
      "profilepic": profilepic,
      "address":address,
      "mail":mail,
      "idcardnumber": idcardnumber,
      "state":1
     };
    if (telephone != '') {
      common.getData(set_url, 'PUT', data, JYToken).then(function (res) {
        if (res.data.code == "1") {
          common.getPopUp('修改成功！', 'success')
                setTimeout(function () {
                  common.reLaunch('../logs/logs')
                  // common.reLaunch('../../pages/login/login?u_phone=' + telephone + '&u_pwd=' + userpassword + '&u_token=' + u_token)
                }, 1000)
        
        } else {
          common.getPopUp(res.data.message, 'none')
        }
      })
    } else {
      //  common.getPopUp('验证码不能为空', 'loading')
       }
  },
})
