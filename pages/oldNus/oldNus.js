// pages/oldNus/oldNus.js
// pages/patientGroup/patientGroup.js
var config = require('../../utils/config.js');
var common = require('../../utils/common.js');
const { icon, imgurl } = require('../../utils/config.js');
var nowTime = common.getTime().slice(0, 10);
Page({
  data: {
    items: [
      { value: '0', name: '本人', checked: true },
      { value: '1', name: '代理', checked: false },
    ],
    needlist: [
      { value: '0级（能力完好）', name: '0级（能力完好）', checked: true },
      { value: '1级（轻度失能）', name: '1级（轻度失能）', checked: false },
      { value: '2级（中度失能）', name: '2级（中度失能）', checked: false },
      { value: '3级（重度失能）', name: '3级（重度失能）', checked: false },
      { value: '4级（极重度失能）', name: '4级（极重度失能）', checked: false },
    ],
    oldnumber: '',
    systoken: '',
    sexs: [
      { value: '1', name: '男', checked: true },
      { value: '2', name: '女', checked: false },
    ],
    marriages: [
      { value: '0', name: '未婚', checked: true },
      { value: '1', name: '已婚', checked: false },
      { value: '2', name: '丧偶', checked: false },
      { value: '3', name: '离婚', checked: false },
    ],
    lives: [
      { value: '0', name: '与子女同住', checked: true },
      { value: '1', name: '与亲友同住', checked: false },
      { value: '2', name: '孤寡', checked: false },
      { value: '3', name: '独居', checked: false },
      { value: '4', name: '与配偶同住', checked: false },
    ],
    oldability: [
      { value: '完好', name: '完好', checked: true },
      { value: '轻度受损', name: '轻度受损', checked: false },
      { value: '中度受损', name: '中度受损', checked: false },
      { value: '重度受损', name: '重度受损', checked: false },
    ],
    Assessmenttypelist: [
      { value: '1', name: '首次评估', checked: true },
      { value: '2', name: '重复评估', checked: false },
    ],
    fillintype: '0',
    docid: "",
    rid:'',
    options: {},
    change: false,
    isDisabled: true,
    signature: '',
    sysToken:'',
    JYToken:'',
    JYTokens:'',
    Accountid:"",
    residentsid:'',
    savedata: {
      "Assessmenttype": "1",    //评估类型
      "Abilitygrade": "",//老年人能力等级
      "Richangshenghuoid": "", //老年人日常生活活动能力评分表id44444
      "Jingshenzhuangtaiid": "", //精神状态与社会参与能力评分表id4444
      "Ganzhijueid": "",//感知觉与沟通能力评分表id4444
      "Sufferfrom": "",//老年鰊合征罹患項数（有的有几项4444      
      "Sufferid": "",// 老年鰊合征罹患id4444       
      "Levelcareneed": "",//护理需求等级4444
      "Evaluatorid": '',//14888367367370922247
      "Signature": "",// 电子签名4444      
      "Opinion": "",//评估机构意见
      "Name": "", //              
      "Sex": "1",//            
      "Age": '',//                
      "Idnumber": "",//   
      'gotype': '1',
      "Adress": "",//北京市房山区
      "Registeredplace": "",//户籍所在地  
      "Maritalstatus": 0,//   婚姻状况   
      "Livingsituation": 0, //   居住情况
      "Agentname": "", //代理人姓名      
      "Relation": "",//与申请人关系         
      "Agentadress": "",//代理人地址   
      "Agentphone": "",//代理人电话        
      "Birthday": '',  //生日      
      "Phone": "",  //电话
      "Evaluationtime": nowTime,  //评估时间
      'options': '' 
    }
  },

  onLoad: function (options) {
    var _this = this;
    if (options != '' && options != undefined) {
      if(options.rid !=  ''&& options.rid != undefined && options.rid != null){
        this.setData({rid : options.rid,options,signature: options.signature})
      // if (options.residentsid != '' && options.residentsid != undefined && options.residentsid != null) {
      //   // console.log(options.residentsid,5565688)
      //   var savedata = this.data.savedata;
      //   savedata.Idnumber = options.Idnumber;
      //   savedata.Residentsid=options.residentsid;
      //   savedata.Phone = options.phone;
      //   savedata.Name = options.name;
      //   this.setData({ residentsid: options.residentsid, options, signature: options.signature,savedata })
      } else if (options.Idnumber != '') {
        var savedata = this.data.savedata;
        savedata.Idnumber = options.Idnumber;
        savedata.Phone = options.phone;
        savedata.Name = options.name;
        savedata.Residentsid=options.residentsid;
        _this.getidnumber(options.Idnumber, true)
        _this.setData({ savedata, options ,residentsid: options.residentsid,signature: options.signature})
      }else if(options.rid !=''){
        this.setData({rid : options.rid,options,signature: options.signature})
      }
    }
    wx.getStorage({
      key: 'sysToken',
      success: function (res) {
        var sysToken = res.data
        _this.setData({sysToken:sysToken})
        _this.getJYToken()
        wx.getStorage({
          key: 'Accountid',
          success: function (res) {
            var Accountid = res.data;
            _this.setData({Accountid:Accountid})
           
            wx.getStorage({
              key: 'JYTokens',
              success: function (res) {
                var JYTokens = res.data;
                _this.setData({JYTokens:JYTokens})
                if (options.rid != undefined) {
                  _this.getinfo()
                }
              }
            })
           
          },
        })
      },
      fail: function (res) {
        // common.getPopUp('请重新登陆', 'loading')
        // wx.clearStorage()
        // setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
      }
    })
  },
  getJYToken(){
    var  _this=this,
    token = '',
    sysToken=this.data.sysToken,
          data = {
            "username":"system@akso.com",
            "password":"123123",
            "usertype":"system",
            "refreshtoken":"0"
        };
       
      common.getData(config.url3 + 'v1/login/token', 'POST', data, sysToken).then(function(res) {
          if (res.data.code == "0") {
              var token = "JWT " + res.data.data;
              wx.setStorage({ key: 'JYTokens', data: token })
              wx.getStorage({
                key: 'JYTokens',
                success: function (res) {
                  var JYTokens = res.data;
                  _this.setData({ JYTokens:JYTokens })
                }
              })
          } else {
              common.getPopUp('token获取失败，请重试', 'none')
          }
      }).catch(function(err){
          console.log(err)
      })
  },
  
  onShow() {
    var options = this.data.options;
    if (this.data.signature != '') {
      options.signature = this.data.signature;
    }
    this.onLoad(options)
  },

  gooldsun(e) {
    var id = e.target.dataset.id,
      residentsid = e.target.dataset.residentsid,
      rid = e.target.dataset.rid;
    this.saves(1, true)
  },

  gooldJi() {
    this.saves(2, true)
  },

  gooldga() {
    this.saves(3, true)
  },

  gooldSUff() {
    this.saves(4, true)
  },

  getinfo() {
    var self = this,
    url = 'https://api.lotusdata.com/homedoctor/elderly/v1/careneeds/' + this.data.rid,
    JYTokens = self.data.JYTokens;
   
    common.getData(url, 'GET', '', JYTokens).then(res => {
     
      if (res.data.code == 0) {
        var arry = res.data.data;
        arry.Evaluationtime = arry.Evaluationtime.slice(0, 10)
        self.sexChange(arry.Sex, true)
        self.livesChange(arry.Livingsituation, true)
        self.marriageChange(arry.Maritalstatus, true)
        if (arry.Agentname == '') {
          self.getfillintype(0, true)
        } else {
          self.getfillintype(1, true)
        }
        self.getoldability(arry.Abilitygrade, true)
        self.getAssessmenttype(arry.Assessmenttype, true)
        self.needlistchange(arry.Levelcareneed, true)
        var change = true;
        var signature = self.data.signature == undefined ? arry.Signature : self.data.signature;
        self.setData({ savedata: arry, change, signature })
      } else if (res.data.code == -2) {
        // self.Refreshsystoken(self.data.systoken)
      }
    })
  },

  Refreshsystoken(token) {
    var url = 'https://auth.lotusdata.com/v1/login/refreshtoken',
      self = this,
      data = {
        "usertype": "system",
        "token": token.slice(3)
      };
    common.getData(url, 'POST', data, '').then(res => {
      if (res.data.code == 0) {
        if (res.data.code == "0") {
          var token = "JWT " + res.data.data;
          self.setData({ systoken: token })
          common.getPopUp('token已刷新请重试', 'none')
          wx.setStorage({ key: 'systoken', data: token })
        } else {
          common.getPopUp('token获取失败，请重试', 'none')
        }
      }
    })
  },

  getoldability(e, change) {
    var val = '';
    if (change) {
      val = e
    } else {
      val = e.detail.value
    }
    var savedata = this.data.savedata,
      oldability = this.data.oldability;
    savedata.Abilitygrade = val;
    oldability.forEach((v, i) => {
      if (v.value == val) {
        v.checked = true
      } else {
        v.checked = false
      }
    })
    this.setData({ savedata, oldability });
  },

  getAssessmenttype(e, change) {
    var val = '';
    if (change) {
      val = e
    } else {
      val = e.detail.value
    }
    var savedata = this.data.savedata,
      Assessmenttypelist = this.data.Assessmenttypelist;
    savedata.Assessmenttype = val;
    Assessmenttypelist.forEach((v, i) => {
      if (i == val) {
        v.checked = true
      } else {
        v.checked = false
      }
    })
    this.setData({ savedata, Assessmenttypelist });
  },

  //填写类型
  getfillintype(e, change) {
    var val = '';
    if (change) {
      val = e
    } else {
      val = e.detail.value
    }
    var items = this.data.items;
    items.forEach((v, i) => {
      if (i == val) {
        v.checked = true
      } else {
        v.checked = false
      }
    })
    this.setData({ fillintype: val, items });
  },

  needlistchange(e, change) {
    var val = '';
    if (change) {
      val = e
    } else {
      val = e.detail.value
    }
    var savedata = this.data.savedata,
      needlist = this.data.needlist;
    savedata.Levelcareneed = val;
    needlist.forEach((v, i) => {
      if (v.value == val) {
        v.checked = true
      } else {
        v.checked = false
      }
    })
    this.setData({ savedata, needlist });
  },

  sexChange(e, change) {
    var val = '';
    if (change) {
      val = e
    } else {
      val = e.detail.value
    }
    var savedata = this.data.savedata,
      sexs = this.data.sexs;
    savedata.Sex = val;
    sexs.forEach((v, i) => {
      if ((i * 1 + 1) == val) {
        v.checked = true
      } else {
        v.checked = false
      }
    })
    this.setData({ savedata, sexs });
  },

  //居住情况
  livesChange(e, change) {
    var val = '';
    if (change) {
      val = e
    } else {
      val = e.detail.value
    }
    var savedata = this.data.savedata,
      lives = this.data.lives;
    savedata.Livingsituation = val * 1;
    lives.forEach((v, i) => {
      if (i == val) {
        v.checked = true
      } else {
        v.checked = false
      }
    })
    this.setData({ savedata, lives });
  },

  //婚姻状况
  marriageChange(e, change) {
    var val = '';
    if (change) {
      val = e
    } else {
      val = e.detail.value
    }
    var savedata = this.data.savedata,
      marriages = this.data.marriages;
    savedata.Maritalstatus = val * 1;
    marriages.forEach((v, i) => {
      if (i == val) {
        v.checked = true
      } else {
        v.checked = false
      }
    })
    this.setData({ savedata, marriages });
  },

  getnewaddress(e) {
    var val = e.detail.value,
      savedata = this.data.savedata;
    savedata.Adress = val;
    this.setData({ savedata })
  },

  getEvaluationtime(e) {
    var val = e.detail.value,
      savedata = this.data.savedata;
    savedata.Evaluationtime = val;
    this.setData({ savedata })
  },

  getRelation(e) {
    var val = e.detail.value,
      savedata = this.data.savedata;
    savedata.Relation = val;
    this.setData({ savedata })
  },

  getAgentname(e) {
    var val = e.detail.value,
      savedata = this.data.savedata;
    savedata.Agentname = val;
    this.setData({ savedata })
  },

  getAgentadress(e) {
    var val = e.detail.value,
      savedata = this.data.savedata;
    savedata.Agentadress = val;
    this.setData({ savedata })
  },

  getAgentphone(e) {
    var val = e.detail.value,
      savedata = this.data.savedata;
    savedata.Agentphone = val;
    this.setData({ savedata })
  },

  getaddress(e) {
    var val = e.detail.value,
      savedata = this.data.savedata;
    savedata.Registeredplace = val;
    this.setData({ savedata })
  },

  getphone(e) {
    var val = e.detail.value,
      savedata = this.data.savedata;
    savedata.Phone = val;
    this.setData({ savedata })
  },

  getName(e) {
    var val = e.detail.value,
      savedata = this.data.savedata;
    savedata.Name = val;
    this.setData({ savedata })
  },

  getage(e) {
    var val = e.detail.value,
      savedata = this.data.savedata;
    savedata.Age = val;
    this.setData({ savedata })
  },

  getbirthday(e) {
    var val = e.detail.value,
      savedata = this.data.savedata;
    savedata.Birthday = val;
    this.setData({ savedata })
  },

  getidnumber(e, change) {
    if (change) {
      var val = e
    } else {
      var val = e.detail.value
    }
    var savedata = this.data.savedata;
    savedata.Idnumber = val;
    if (val.length == '18') {
      var age = 0,
        newyear = nowTime.slice(0, 4),
        newmonth = nowTime.slice(5, 7),
        newdata = nowTime.slice(8, 10),
        oldyear = val.slice(6, 10),
        oldmonth = val.slice(10, 12),
        olddata = val.slice(12, 14),
        sex = val.slice(16, 17),
        old = oldyear + '-' + oldmonth + "-" + olddata;
      var val = sex % 2 == 1 ? '1' : '2',
        savedata = this.data.savedata,
        sexs = this.data.sexs;
      savedata.Sex = val;
      sexs.forEach((v, i) => {
        if ((i * 1 + 1) == val) {
          v.checked = true
        } else {
          v.checked = false
        }
      })
      this.setData({ savedata, sexs })
      savedata.Birthday = old;
      if (newmonth < oldmonth) {
        age = newyear - oldyear - 1;
      } else if (newmonth == oldmonth) {
        if (newdata < olddata) {
          age = newyear - oldyear - 1;
        } else {
          age = newyear - oldyear;
        }
      } else {
        age = newyear - oldyear;
      }
      savedata.Age = age;
      if (age < 65) {
        common.getPopUp('老年人服务需要到达65岁', 'none')
      }
    }
    this.setData({ savedata })
  },

  toSig() {
    common.navigateTo('../signature/signature')
  },

  Refreshsystoken(token) {
    var url = 'https://auth.lotusdata.com/v1/login/refreshtoken',
      self = this,
      data = {
        "usertype": "system",
        "token": token.slice(4)
      };
    common.getData(url, 'POST', data, '').then(res => {
      if (res.data.code == 0) {
        if (res.data.code == "0") {
          var token = "JWT " + res.data.data;
          common.getPopUp('token已刷新请重试', 'none')
          wx.setStorage({ key: 'systoken', data: token })
        } else if (res.data.code == -2) {
          self.Refreshsystoken(self.data.systoken)
        } else {
          common.getPopUp('token获取失败，请重试', 'none')
        }
      }
    })
  },

  saves(e, status) {
    if (status) {
      var type = e;
    }
    var savedata = this.data.savedata,
      self = this,
      JYTokens = this.data.JYTokens;
     savedata.Evaluatorid = this.data.Accountid.toString();   //评估人id
     savedata.Signature = this.data.signature;
    // if (savedata.Idnumber == '') {
    //   common.getPopUp('身份证号不能为空', 'none')
    //   return;
    // }
    // if (savedata.Age < 65) {
    //   common.getPopUp('老年人服务需要到达65岁', 'none')
    //   return;
    // }
    // if (savedata.Idnumber.length != 18) {
    //   common.getPopUp('身份证号格式不规范', 'none')
    //   return;
    // }
    // if (savedata.Name == '') {
    //   common.getPopUp('姓名不能为空', 'none')
    //   return;
    // }

    var change = this.data.change,
      url = 'https://api.lotusdata.com/homedoctor/elderly/v1/careneeds',
      statuschange = change ? 'PUT' : 'POST';
    if (change) {
      url = 'https://api.lotusdata.com/homedoctor/elderly/v1/careneeds/' + this.data.rid;
    }
    common.getData(url,statuschange,savedata,JYTokens).then(res => {
      if (res.data.code == 0) {
        var options = self.data.options;
        options.rid = res.data.data;
        if (type == 1) {
          common.navigateTo('../geriatricAbility/geriatricAbility?rid=' + self.data.savedata.Richangshenghuoid + '&Residentsid=' + self.data.savedata.Residentsid + '&id=' + res.data.data + '&Residentsid=' + self.data.savedata.Residentsid + '&Evaluatorid=' + self.data.savedata.Evaluatorid);
         
        } else if (type == 2) {
          common.navigateTo('../mentalAbility/mentalAbility?rid=' + self.data.savedata.Jingshenzhuangtaiid + '&Residentsid=' + self.data.savedata.Residentsid + '&id=' + res.data.data + '&Residentsid=' + self.data.savedata.Residentsid + '&Evaluatorid=' + self.data.savedata.Evaluatorid);
        } else if (type == 3) {
          common.navigateTo('../perceptionRatingScale/perceptionRatingScale?rid=' + self.data.savedata.Ganzhijueid + '&Residentsid=' + self.data.savedata.Residentsid + '&id=' + res.data.data + '&Residentsid=' + self.data.savedata.Residentsid + '&Evaluatorid=' + self.data.savedata.Evaluatorid);
        } else if (type == 4) {
          common.navigateTo('../elderlyPatients/elderlyPatients?rid=' + self.data.savedata.Sufferid + '&Residentsid=' + self.data.savedata.Residentsid + '&id=' + res.data.data + '&Residentsid=' + self.data.savedata.Residentsid + '&Evaluatorid=' + self.data.savedata.Evaluatorid);
        } else {
          if (self.data.change) {
            wx.navigateBack({
              delta: 1
            })
          } else {
            common.getPopUp(res.data.message, 'none')
            // console.log(self.data.savedata.Richangshenghuoid,self.data.savedata.Residentsid,res.data.data,self.data.savedata.Evaluatorid)
            common.navigateTo('../geriatricAbility/geriatricAbility?rid=' + self.data.savedata.Richangshenghuoid + '&Residentsid=' + self.data.savedata.Residentsid + '&id=' + res.data.data + '&Residentsid=' + self.data.savedata.Residentsid + '&Evaluatorid=' + self.data.savedata.Evaluatorid);
          }
        }
      } else if (res.data.code == -2) {
        self.Refreshsystoken(self.data.systoken)
      } else {
        common.getPopUp(res.data.message, 'none')
        self.Refreshsystoken(self.data.systoken)
      }
    }).catch(err => {
      console.log(err)
    })
  }
})