// pages/personalService/personalService.js

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
    teamId:'',
    JYToken:"",
    voteListPlan:[],
    state:0
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
                    wx.getStorage({
                      key:'JYToken',
                      success:function(res){
                        var JYToken=res.data
                        _this.setData({JYToken : JYToken})
                        _this.serviceList()
                      }
                    })
                   
                }
              })
           
          }
        })
      },
    })
  },
  getPackList:function(status){
    this.setData({
      state:status
    })
    this.serviceList()
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
  serviceList:function(){
    var that = this,
    teamId=that.data.teamId,
    Accountid=that.data.Accountid,
    residentsid=that.data.residentsid,
    JYToken=that.data.JYToken,
    state=that.data.state,
     get_url = config.cardurl + 'homedoctor/v1/packrecorddetailsyunzhaohulist?start=0&limit=100&residentsid='+residentsid+'&teamid&evaluatorid&starttime&endtime&state='+ state,
    // get_url = config.cardurl + 'homedoctor/v1/packrecorddetailsyunzhaohulist?start=0&limit=5&residentsid='+residentsid+'&teamid&evaluatorid',
    data = {};
  common.getData(get_url, 'GET', data, JYToken).then(function (res) {
    console.log(res)
    if (res.data.code == '1' && res.data.data != null) {
      let list = res.data.data, arr = [];
      for (let i in list) {
        arr.push({
          Createtime:list[i].Createtime.substr(0,10),
          Detailsid:list[i].Detailsid,
          Evaluation:list[i].Evaluation,
          Evaluatorid:list[i].Evaluatorid,
          Perfortime:list[i].Perfortime,
          Projectid:list[i].Projectid,
          Projectname:list[i].Projectname,
          Residentsid:list[i].Residentsid,
          Serviceimage:list[i].Serviceimage,
          Signature:list[i].Signature, 
        });
      }
      that.setData({ voteListPlan: arr })
    } else if (res.data.code == '-2') {
      common.getPopUp('查询失败！', 'loading')
     
    }
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
   /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  touchstart2: function (e) {
    //开始触摸时 重置所有删除
    this.data.voteListPlan.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      voteListPlan: this.data.voteListPlan
    })
  },
  //滑动事件处理
  touchmove2: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.voteListPlan.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({ voteListPlan: that.data.voteListPlan })
  },
  deleteVoteListPlan:function(e){
    var that = this,
    token = that.data.JYToken,
    Detailsid= e.currentTarget.dataset.id,
    index = e.currentTarget.dataset.index;
  wx.showModal({
    title: '温馨提示',
    content: '您确定要删除这项服务记录吗？',
    success: function (res) {
      if (res.confirm) {
        var del_url = config.cardurl + 'homedoctor/v1/packrecorddetails/' + Detailsid,
          data = {},
          voteListPlan = that.data.voteListPlan;
        common.getData(del_url, 'DELETE', data, token).then(function (res) {
          if (res.data.code == '0') {
            common.getPopUp('删除成功！', 'success');
            voteListPlan.splice(index, 1);
            that.setData({voteListPlan: voteListPlan })
            that.serviceList();
          }
        })
      }
    }
  })
  },
  changeVoteListPlan(e){
    common.navigateTo('../plan/plan?Detailsid=' + e.currentTarget.dataset.id)
  },
  onclick(e) {
    var rid = e.currentTarget.dataset.elderyid;
    common.navigateTo('../oldNus/oldNus?rid=' + rid)
  },
  addOldNus(e) {
    common.navigateTo('../oldNuslist/oldNuslist?idnumber=' + this.data.idnumber + '&name=' + this.data.name + '&phone=' + this.data.phone+'&residentsid='+ this.data.residentsid )
  },
  newActivity: function () {
    common.navigateTo('/pages/plan/plan?residentsid='+ this.data.residentsid+'&name='+this.data.name)
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