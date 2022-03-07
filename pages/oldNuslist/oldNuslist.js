// pages/oldNuslist/oldNuslist.js
// pages/patientGroup/patientGroup.js
var config = require('../../utils/config.js');
var common = require('../../utils/common.js');
const { icon, imgurl } = require('../../utils/config.js');
var nowTime = common.getTime().slice(0, 10);
Page({
  data: {
    goOtherPage: config.icon + 'btn_nav_JianTou@2x.png',
    docid: "",
    buttons: [{ text: '取消' }, { text: '确定' }],
    showstatus: false,
    rid: '',
    systoken: '',
    idnumber: '',
    name: '',
    startx: 0,
    startY: 0,
    end: 0,
    teamid: '',
    searchRange: '',
    list: [
    ],
    idnumber:'',
    residentsid:'',
    phone:'',
    teamId:''
  },

  onLoad: function (options) {
    var _this = this,
      searchRange = options.searchRange,
      idnumber=options.idnumber,
      residentsid=options.residentsid,
       phone=options.phone,
       name=options.name
     _this.setData({idnumber:idnumber,residentsid:residentsid,phone:phone,name:name})
     _this.getJYToken()
    wx.getStorage({
      key: 'Accountid',
      success: function (res) {
        var docid = res.data;
        wx.getStorage({
          key: 'JYTokens',
          success: function (res) {
            var systoken = res.data,
              phone = '',
              idnumber = options.idnumber,
              name = options.name;
              wx.getStorage({
                key:'teamId',
                success:function(res){
                     var  teamId =res.data
                     if (options.phone == '') {
                      phone = ''
                    } else {
                      options = options.phone
                    }
                    _this.setData({ systoken, docid, idnumber, name, phone, options, searchRange,teamId })
                    _this.getodlNus(systoken,teamId,idnumber, docid, searchRange)
                }
              })
           
          }
        })
      },
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
                  // if (u_token.slice(4) != '') { _this.getDetailInfo(u_token, userId) }
                }
              })
          } else {
              common.getPopUp('token获取失败，请重试', 'none')
          }
      }).catch(function(err){
          console.log(err)
      })
  },
  
  tapDialogButton(e) {
    var val = e.detail.item.text;
    if (val == '取消') {
      this.setData({ showstatus: false })
    } else {
      this.del()
    }
  },

  onShow() {
    // if(this.data.options!=undefined){}
  },

  touchstart(e) {
    var startx = e.changedTouches[0].clientX,
      list = this.data.list,
      starty = e.changedTouches[0].clientY;
    list.forEach(v => {
      v.telstatus = false
    })
    this.setData({ startx, starty, list })
  },

  del(e) {
    var rid = e == undefined ? this.data.rid : e.currentTarget.dataset.elderyid,
      self = this,
      url = 'https://api.lotusdata.com/homedoctor/elderly/v1/careneeds/' + rid;
    if (this.data.showstatus == false) {
      this.setData({ showstatus: true, rid })
      return
    }
    common.getData(url, 'DELETE', '', this.data.systoken).then(res => {
      if (res.data.code == 0) {
        common.getPopUp(res.data.message, 'none')
        this.setData({ showstatus: false })
        this.getodlNus(this.data.systoken,this.data.teamId,this.data.idnumber, this.data.docid, this.data.searchRange)
      } else if (res.data.code == -2) {
        self.RefreshSystoken(self.data.systoken)
      } else {
        common.getPopUp(res.data.message, 'none')
      }
    })
  },

  touchmove(e) {
    var endx = e.changedTouches[0].clientX,
      endy = e.changedTouches[0].clientY,
      startx = this.data.startx,
      telstatus = false,
      i = e.currentTarget.dataset.va,
      list = this.data.list,
      starty = this.data.starty;
    if (endx + 30 < startx) {
      list[i].telstatus = true
    }
    if (endx + 30 >= startx) {
      list[i].telstatus = false
    }
    this.setData({ telstatus, list })

  },

  onclick(e) {
    var rid = e.currentTarget.dataset.elderyid;
    common.navigateTo('../oldNus/oldNus?rid=' + rid)
  },

  addOldNus(e) {
    common.navigateTo('../oldNus/oldNus?Idnumber=' + this.data.idnumber + '&name=' + this.data.name + '&phone=' + this.data.phone+'&residentsid='+ this.data.residentsid )
  },


  getodlNus(token,teamId, idnumber, docid, searchRange) {
    var url = 'https://api.lotusdata.com/homedoctor/elderly/v1/careneedsyunzhaohulist?start=0&teamid='+teamId+'&limit=10&idnumber='+idnumber+'&accountid='+docid +'&key=1',
      self = this;
    common.getData(url, 'GET', '', token).then(res => {
      if (res.data.code == 0) {
        if (res.data.data != null) {
          var arr = res.data.data;
          arr.forEach(v => {
            v.time = v.Evaluationtime.slice(0, 10)
            v.telstatus = false
          })
          self.setData({ list: arr })
        } else {
          self.setData({ list: [] })
        }
      } else if (res.data.code == -2) {
        self.RefreshSystoken(self.data.systoken)
      }
    })
  },

  RefreshSystoken(token) {
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
          self.setData({ systoken: token })
          wx.setStorage({ key: 'systoken', data: token })
          self.getodlNus(token, self.data.idnumber, self.data.docid)
        } else if (res.data.code == -2) {
          self.RefreshSystoken(self.data.systoken)
        } else {
          common.getPopUp('token获取失败，请重试', 'none')
        }
      }
    })
  }

})