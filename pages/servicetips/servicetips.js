// pages/servicetips/servicetips.js
//index.js
//获取应用实例
var app = getApp()
var dateTimePicker = require('../../utils/dateTimePicker.js');
var config = require('../../utils/config.js')
var common = require('../../utils/common.js')
var myDate = new Date();
var year = myDate.getFullYear();
var month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
var day = myDate.getDate();        //获取当前日(1-31)
function add(nums) {
    if (nums <= 9) { nums = '0' + nums }
    return nums
}
var nowData = add(year) + '-' + add(month) + '-' + add(day);
var nowDatas = add(year) + '-' + add(month) + '-' + add(day+1);
Page({
  data: {
    startTime: nowData,
    endTime: nowDatas,
    news: '',
    method: '0',
    currentTab: 2,
    activity: '',
    voteListPlan:[
  ],
    informList: [
      {
        Title: '模拟数据',
        // status: '3333',
        publishdate: '2022-01-01'
      },
     
    ],
    u_token: '',
    u_token2: '',
    u_id: '',
    page: '0',
    formIdList: [],
    oppid: '',
    teamIcon: 'https://media.lotusdata.com/19148336414064664.png',
    goOtherPage: config.icon + 'btn_nav_JianTou@2x.png',
    userId: '',
    topShow: false,
    canLoadData: true,
    orgList: [],
    status: false,
    status1: '',
    click: 0,
    orgRange: [],
    orgIndex: '0',
    orgMienPage: 0,
    tclick:'0',
    mienList: [
     ],
     nowTime: '',
     recordList:[],
     packList:[],
     planList:[],
    myMienList: [
      {
      Createdate:'2022-2-21'
      }
    ],
    myMienPage: 0,
    startX: '',
    startY: '',
    voteList: [{
      title:'服务计划',
      status:'3333',
      GroupName:'2022-01-01'      
    },
     
    ], 
    pubList: [],
    bookList: [],
    groupid: '',
    JYToken:'',
    teamId:'',
    Accountid:'',
    state:0
    
  },

  onLoad: function (options) {
     
    var _this = this
    wx.getStorage({
      key: 'teamId',
      success: function (res) {
        _this.setData({ teamId: res.data })
        wx.getStorage({
          key: 'JYToken',
          success: function (res) {
           var   JYToken=res.data
           _this.setData({JYToken:JYToken})
           _this.servicePackList()
           _this.servicetipsList()
           wx.getStorage({
            key: 'Accountid',
            success: function (res) {
              var Accountid=res.data
              _this.setData({
                Accountid
              })

              _this.serviceList(_this.data.state)
              _this.dayList()
              _this.recordList()
            }
          })

          }
        })

      },
    })
    _this.setData({ screenHeight: wx.getSystemInfoSync().windowHeight })
    wx.getStorage({
      key: 'accesstoken2',
      success: function (res) {
        var add_token = res.data;
        wx.getStorage({
          key: 'doctorId',
          success: function (res) {
            var u_id = res.data
            _this.setData({ u_token2: add_token, u_id: u_id, page: '0' }) 
          },
        })
      }, fail: function () {
        try {
          // wx.clearStorageSync()
          // common.getPopUp('登录失效', 'loading')
          // setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
        } catch (e) { }
      }
    })
  },
  getPackList:function(status){
    this.setData({
      state:status
    })
    this.serviceList(this.data.state)
  },
  getStartTime: function (e) {
    var that = this,
    startTime = '';
    that.setData({ startTime: e.detail.value })
    // this.recordList()
    if (that.data.endTime < that.data.startTime) {
        common.getPopUp('截止日期应大于起始日期', 'none')
        return
    } else {
      startTime = that.data.startTime;
    }
  },
   // 获取截止日期
   getEndTime: function (e) {
    var that = this,
    endTime = '';
    that.setData({ endTime: e.detail.value })
    that.recordList()
    that.serviceList(that.data.state)
    if (that.data.endTime < that.data.startTime) {
        common.getPopUp('截止日期应大于起始日期', 'none')
        return
    } else {
         endTime = that.data.endTime;
    }
  },

  recordList:function(){
    var that = this,
    teamId=that.data.teamId,
    Accountid=that.data.Accountid,
    JYToken=that.data.JYToken,
    startTime=that.data.startTime +' '+'00:00:00',
    endTime=that.data.endTime +' '+'00:00:00',
    get_url = config.cardurl + 'homedoctor/v1/frequencyrecordlist?start=0&limit=100&detailsid&teamid='+teamId+'&starttime='+startTime+'&endtime='+endTime,
    data = {};
  common.getData(get_url, 'GET', data, JYToken).then(function (res) {
    if (res.data.code == '1' && res.data.data != null ) {
      let list = res.data.data, arr = [];
      if(list.length >0){
        for (let i in list) {
          arr.push({
            Createtime:list[i].Createtime.substr(0,10),
            FRecordid:list[i].FRecordid,
            Frequencyid:list[i].Frequencyid,
            ProjectName:list[i].ProjectName,
            ProjectTitle:list[i].ProjectTitle,
            Remindtime:list[i].Remindtime.substr(0,10),
 
          });
        }
        that.setData({ recordList: arr })
        wx.showTabBarRedDot({
          index: 1
      })
      }else{
        wx.hideTabBarRedDot({
          index: 1
      })
      }
      
     
    } else if (res.data.code == '-2') {
      wx.showTabBarRedDot({
        index: 1
    })
      common.getPopUp('查询失败！', 'loading')
     
    }
  })
  },
  dayList:function(){
    var that = this,
    teamId=that.data.teamId,
    Accountid=that.data.Accountid,
    JYToken=that.data.JYToken,
    get_url = config.cardurl + 'homedoctor/v1/frevaluelist?start=0&limit=100&teamid='+teamId,
    data = {};
  common.getData(get_url, 'GET', data, JYToken).then(function (res) {
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
      that.setData({  mienList: arr })
    } else if (res.data.code == '-2') {
      common.getPopUp('查询失败！', 'loading')
     
    }
  })
  },
  serviceList:function(state){
    var that = this,
    teamId=that.data.teamId,
    Accountid=that.data.Accountid,
    JYToken=that.data.JYToken,
    startTime=that.data.startTime +' '+'00:00:00',
    endTime=that.data.endTime +' '+'00:00:00',
    data = {};
    if(state== 0 ){
     var  get_url = config.cardurl + 'homedoctor/v1/packrecorddetailsyunzhaohulist?start=0&limit=100&residentsid&teamid='+teamId+'&evaluatorid='+Accountid+'&starttime='+startTime+'&endtime='+ endTime+'&state='+ state
    }else if(state== 1){
     var get_url = config.cardurl + 'homedoctor/v1/packrecorddetailsyunzhaohulist?start=0&limit=100&residentsid&teamid='+teamId+'&evaluatorid='+Accountid+'&starttime='+startTime+'&endtime='+ endTime+'&state='+ (state).toString()
    }
  common.getData(get_url, 'GET', data, JYToken).then(function (res) {
    if (res.data.code == '1') {
       if( res.data.data != null){
        let list = res.data.data, arr = []
        that.data.voteListPlan=[]
        for (let i in list) {
          arr.push({
            Createtime:list[i].Createtime.substr(0,10),
            Detailsid:list[i].Detailsid,
            Evaluation:list[i].Evaluation,
            Evaluatorid:list[i].Evaluatorid,
            Perfortime:list[i].Perfortime.substr(0,10),
            Projectid:list[i].Projectid,
            Projectname:list[i].Projectname,
            Residentsid:list[i].Residentsid,
            Serviceimage:list[i].Serviceimage,
            Signature:list[i].Signature, 
            State:list[i].State
          });
        }
        that.setData({ voteListPlan: arr })
       }else{
        let list = res.data.data, arr = []
        that.data.voteListPlan=[]
        
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
            State:list[i].State
          });
        }
        that.setData({ voteListPlan: arr })
       }
     
    } else if (res.data.code == '-2') {
      common.getPopUp('查询失败！', 'loading')
     
    }
  })
  },
  servicetipsList:function(){
    var that = this,
    teamId=that.data.teamId,
    JYToken=that.data.JYToken,
    get_url = config.cardurl + 'homedoctor/v1/homeprojectlist?start=0&temid='+teamId+'&limit=20&state=0',
    data = {};
  common.getData(get_url, 'GET', data, JYToken).then(function (res) {
    if (res.data.code == '1' && res.data.data != null) {
      let list = res.data.data, arr = [];
      for (let i in list) {
        arr.push({
          Projectname:list[i].Projectname,
          Projecttitle:list[i].Projecttitle,
          Projectid:list[i].Projectid,
          Introduce:list[i].Introduce,
          State:list[i].State,
          Updatetime:list[i].Updatetime.substr(0,10),
          isTouchMove:false
          
        });
      }
      that.setData({ planList: arr })
    } else if (res.data.code == '-2') {
      common.getPopUp('查询失败！', 'loading')
     
    }
  })
  },
  servicePackList:function(){
    var that = this,
      teamId=that.data.teamId,
      JYToken=that.data.JYToken,
      get_url = config.cardurl + 'homedoctor/v1/packlist?start=0&temid='+ teamId+'&limit=20&state=0',
      data = {};
    common.getData(get_url, 'GET', data, JYToken).then(function (res) {
      if (res.data.code == '1' && res.data.data != null) {
        let list = res.data.data, arr = [];
        if(list.length>0){
          for (let i in list) {
            arr.push({
              Teamname:list[i].Teamname,
              Packid:list[i].Packid,
              Packname:list[i].Packname,
              Updatetime:list[i].Updatetime.substr(0,10),
              isTouchMove:false
              
            });
          }
          that.setData({ packList: arr })
          wx.showTabBarRedDot({
            index: 1
        })
        }else{
          wx.hideTabBarRedDot({
            index: 1
        })
        }
       
      
      } else if (res.data.code == '-2') {
        common.getPopUp('查询失败！', 'loading')
        // wx.clearStorage()
        setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
      }
    })
  },
  tOnClick: function (e) { 
    var index =e.currentTarget.dataset.index;
  
    if(index == 0){
      this.servicePackList()
    }else if(index == 1){
      this.servicetipsList()
    }
    this.setData({ tclick: e.currentTarget.dataset.index }) },
    tOnClicks: function (e) { 
      var index =e.currentTarget.dataset.index;
      if(index == 0){
        this.serviceList(index)
      }else if(index == 1){
        
        this.serviceList(index)
      }
      this.setData({ tclicks: e.currentTarget.dataset.index }) },
  onShow: function () {

    if (this.data.currentTab == 1 && this.data.click == 1 && this.data.u_token3 != '') { this.getMyMienList('0'); this.getMienList(this.data.u_token3, '0'); }
  },

  getQusStatus: function (token) {
    var that = this,
      get_url = config.cardurl + 'doctorsetting/disablesetting',
      data = {};
    common.getData(get_url, 'GET', data, token).then(function (res) {
      if (res.data.code == 0) {
        var status = res.data.data.Value == '2' ? false : true; // 学习 true显示false隐藏
        that.setData({ status: status })
      } else if (res.data.code == '-2') {
        // common.getPopUp('请重新登陆', 'loading')
        // wx.clearStorage()
        setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
      }
    })
  },
  getMienList: function (token, page) {
    if (this.data.currentTab == 1 && this.data.click == 0) { wx.showLoading({ title: '请稍候...' }) }
    var that = this,
      get_url = config.orgurl + 'news/pid/24370568392343576?offset=' + page + '&limit=20',
      data = {};
    common.getData(get_url, 'GET', data, token).then(function (res) {
      if (res.data.code == '0') {
        var list = res.data.data, arr = page == 0 ? [] : that.data.mienList;
        if (list != null) {
          for (let i in list) {
            list[i].Releasedate = list[i].Releasedate.slice(0, 10);
          }
          that.setData({ mienList: arr.concat(list), orgMienPage: parseInt(page) + 20 })
          if (that.data.currentTab == 1 && that.data.click == 0) { wx.hideLoading(); }
        } else if (res.data.code == '-2') {
          // common.getPopUp('请重新登陆', 'loading')
          // wx.clearStorage()
          setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
        } else {
          if (that.data.currentTab == 1 && that.data.click == 0) {
            wx.hideLoading();
            common.getPopUp('没有更多了', 'none');
          }
        }
      } else {
        if (that.data.currentTab == 1 && that.data.click == 0) {
          wx.hideLoading();
          common.getPopUp('获取失败', 'none');
        }
      }
    })
  },
  //获取投票列表
  
  voteDetail(e) {
    var id = e.currentTarget.dataset.id,
      status = e.currentTarget.dataset.status;
    for (let i in this.data.orgList) {
      if (id == this.data.orgList[i].Groupid) {
      }
    }
    if (this.data.orgList == []) {
      common.getPopUp('您未加入该委员会，暂不支持投票', 'err')
      return;

    }
    if (status == "（暂不支持投票)") {
      common.getPopUp('暂不支持投票', 'err')
      return;
    } else {
      common.navigateTo('../vote/vote?id=' + id)
    }

  },
  //获取会员加入时间
  getuptime: function (token, rid, atoken) {
    var that = this,
      vtoken = atoken;
    var get_url = 'https://org.api.lotusdata.com/operations/v1/member/' + rid;
    common.getData(get_url, 'get', {}, token).then(res => {
      if (res.data.data != null && res.data.code == 0) {
        var time = res.data.data.Createtime.slice(0, 4);
        that.getPubList(vtoken, time);
      } else if (res.data.code == '-2') {
        // common.getPopUp('请重新登陆', 'loading')
        // wx.clearStorage()
        setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
      }
    })
  },
  // 获取公共缴费项目
  getPubList: function (token, vtime) {
    var that = this,
      get_url = config.url2 + 'v1/doctorpay/pubpayitemlist/1111111111120031001?offset=0&limit=20&key=',
      data = {};
    common.getData(get_url, 'GET', data, token).then(function (res) {
      if (res.data.code == '0') {
        var pubList = res.data.data,
          list = [];
        pubList.forEach(v => {
          var tiems = v.title.slice(0, 4);
          if (tiems >= vtime) {
            list.push(v)
          }
        })
        that.setData({ pubList: list })
      } else if (res.data.code == '-2') {
        // common.getPopUp('请重新登陆', 'loading')
        // wx.clearStorage()
        setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
      }
    })
  },
  getNewList: function (token, len) {
    var that = this,
      userid = that.data.userId,
      get_url = config.url2 + 'v1/doctorpay/pubpayitemlist/user/' + userid + '?offset=0&limit=10',
      data = {};
    common.getData(get_url, 'GET', data, token).then(function (res) {
      if (res.data.code == '0') {
        var bookList = res.data.data == null ? [] : res.data.data;
        var time = '',
          id = '',
          list = [];
        if (len == bookList.length) {
          if (bookList.length >= 1) {
            bookList.forEach(v => {
              if (time == '') {
                time = v.Createtime
                time = new Date(time).getTime()
                id = v.RecordID;
              } else {
                var newtime = v.Createtime;
                newtime = new Date(newtime).getTime();
                if (newtime < time) {
                  id = v.RecordID
                }
              }
            })
            bookList.forEach(v => {
            
              if (v.RecordID != id) {
                list.push(v)
              }
            })
            bookList = list;
          } else {
            bookList = []
          }
        }
        that.setData({ bookList: bookList })
      } else if (res.data.code == '-2') {
        // common.getPopUp('请重新登陆', 'loading')
        // wx.clearStorage()
        // setTimeout(function () { common.reLaunch('../login/login') }, 1000)
      }
    })
  },
  // 查询加入的专业委员会
  getOrgList: function (token, id, tokens) {
    var that = this,
      get_url = config.orgurl + 'memberorganization/list/' + id + '?organizationid=1111111111120031001&offset=0&limit=100',
      data = {};
    common.getData(get_url, 'GET', data, token).then(function (res) {
      if (res.data.code == '0') {
        var orgList = res.data.data,
          len = orgList.length;
        that.getNewList(tokens, len);
        if (orgList != null) {
          for (let i in orgList) {
            orgList[i].itemShow = false;
          }
        } else {
          orgList = [];
        }
        that.setData({ orgList: orgList })
      } else if (res.data.code == '-2') {
        // common.getPopUp('请重新登陆', 'loading')
        // wx.clearStorage()
        setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
      }
    })
  },

  //查询有管理风采权限的专业委员会
  getRightOrg: function (token, id) {
    var that = this,
      get_url = config.orgurl + 'organizationgroupdoctor/doctorgroup/' + id,
      data = {};
    common.getData(get_url, 'GET', data, token).then(function (res) {
      if (res.data.code == '0' && res.data.data != null) {
        let list = res.data.data, arr = [];
        for (let i in list) {
          arr.push(list[i].Name);
        }
        that.setData({ orgRange: arr })
      } else if (res.data.code == '-2') {
        // common.getPopUp('请重新登陆', 'loading')
        // wx.clearStorage()
        // setTimeout(function () { common.reLaunch('../login/login') }, 1000)
      }
    })
  },

  // 查看委员列表
  goComitList: function () { common.navigateTo('../comitList/comitList') },

  // 绑定微信
  getWXMethod: function (wxinfo, code) {
    var _this = this,
      userInfo = JSON.parse(wxinfo),
      encryptedData = userInfo.encryptedData,
      iv = userInfo.iv;
    wx.getStorage({
      key: 'accesstoken2',
      success: function (res) {
        var u_token = res.data
        wx.getStorage({
          key: 'doctorId',
          success: function (res) {
            var u_id = res.data,
              getSessionKey_url = config.url2 + 'v1/wx/code2session?code=' + code + '&appid=wx19402fc283d12642',
              data = {};
            common.getData(getSessionKey_url, 'POST', data, u_token).then(function (res) {
              var list = res.data.data,
                session_key = list.session_key,
                decode_url = config.url2 + 'v1/wx/decryptoruserinfo?appid=wx19402fc283d12642',
                data = { "sessionkey": session_key, "encrypteddata": encryptedData, "iv": iv };
              common.getData(decode_url, 'POST', data, u_token).then(function (res) {
                var list = res.data.data,
                  binding_url = config.url2 + 'v1/reg/bindwx/' + u_id + '?appid=wx19402fc283d12642',
                  data = {
                    "openId": list.openId,
                    "unionId": list.unionId,
                    "nickName": list.nickName,
                    "gender": JSON.stringify(list.gender),
                    "city": list.city,
                    "province": list.province,
                    "country": list.country,
                    "avatarUrl": list.avatarUrl
                  };
                common.getData(binding_url, 'POST', data, u_token).then(function (res) {
                  wx.setStorage({ key: 'oppid', data: list.openId, })
                  _this.setData({ oppid: list.openId, })
                })
              })
            })
          }
        })
      },
    })
  },

  getOppid: function (token, code) {
    var _this = this,
      openid_url = config.url2 + 'v1/wx/code2session?code=' + code + '&appid=wx19402fc283d12642',
      data = {};
    common.getData(openid_url, 'POST', data, token).then(function (res) {
      if (res.data.code == 0) { var oppid = res.data.data.openid; } else if (res.data.code == '-2') {
        // common.getPopUp('请重新登陆', 'loading')
        // wx.clearStorage()
        setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
      }
    })
  },

  swichNav: function (e) {
    var _this = this,
      current = e.target.dataset.current;
      

    if (_this.data.currentTab === current) {
      return false;
    } else {
      _this.setData({ currentTab: current })
    }
    if(current == 3){
      
      _this.serviceList(_this.data.state);
    }
  },

  // 选择缴费项目
  

  payDetail: function (e) {
    var id = e.currentTarget.dataset.id,
      fee = e.currentTarget.dataset.fee,
      title = e.currentTarget.dataset.title,
      type = e.currentTarget.dataset.type;
    common.navigateTo('../membersPay/membersPay?id=' + id + '&fee=' + fee + '&title=' + title + '&type=' + type)
  },

  newsInfo: function (e) {
    common.navigateTo('../inform/inform?id=' + e.currentTarget.dataset.id + '&dtype=' + e.currentTarget.dataset.type + '&type=news')
  },

  // 通知数据拉取
  getNews: function (token, page) {
    var _this = this,
      news_url = config.orgurl + 'notice/list?id=1111111111120031001&key&offset=' + page + '&limit=10',
      data = {};
    common.getData(news_url, 'GET', data, token).then(function (res) {
      if (res.data.code == 0) {
        var list = res.data.data,
          informList = _this.data.informList;
        if (list != null && list.length != 0) {
          for (var i in list) {
            list[i].publishdate = (list[i].publishdate).substr(0, 10)
            informList.push(list[i])
          }
          _this.setData({ informList: informList, page: parseInt(page) + 10 })
        }
        _this.setData({ canLoadData: true })
      } else if (res.data.code == '-2') {
        // common.getPopUp('请重新登陆', 'loading')
        // wx.clearStorage()
        // setTimeout(function () { common.reLaunch('../login/login') }, 1000)
      }
    })
  },

  onUnload: function () { this.setData({ method: '0' }) },

  // 上拉加载
  onReachBottom: function () {
    if (this.data.canLoadData == false) { return }
    this.setData({ canLoadData: false })
    var _this = this,
      token = _this.data.u_token3,
      page = _this.data.page,
      currentTab = _this.data.currentTab;
    if (currentTab == 0) { _this.getNews(token, page) }
  },

  onHide: function () {
    var _this = this,
      formIdList = _this.data.formIdList,
      oppid = _this.data.oppid,
      u_token2 = _this.data.u_token2,
      sendFormId_url = config.url2 + 'v1/wx/formid?appid=wx19402fc283d12642',
      data = { "openid": oppid, "formids": formIdList };
    common.getData(sendFormId_url, 'POST', data, u_token2).then(function (res) {
      if (res.data.code == 0) { _this.setData({ formIdList: [] }) } else if (res.data.code == -2) {
        // common.getPopUp('请重新登陆', 'loading')
        // wx.clearStorage()
        // setTimeout(function () { common.reLaunch('../login/login') }, 1000)
      }
    })
  },

  // 收集用户点击得到的formId
  formSubmit: function (e) {
    var _this = this,
      formIdList = _this.data.formIdList,
      f_id = e.detail.formId;
    formIdList.push(f_id)
    _this.setData({ formIdList: formIdList })
  },

  live: function () { common.navigateTo('../htmlFivePage/htmlFivePage') },

  
  newServicePick:function(){
    common.navigateTo('/pages/servicePack/servicePack')
  
  },
  newServicePlan:function(){
    common.navigateTo('/pages/servicePlan/servicePlan')
  },
  newActivity: function () {
    common.navigateTo('/pages/plan/plan')
  },

  secondSwitchChange: function (e) {
    var tab = e.currentTarget.dataset.tab;
    if (tab == this.data.click) { return; }
    this.setData({ click: tab })
    if (tab == '1') { this.getMyMienList('0') }
  },

  getMyMienList: function (page) {
    if (this.data.currentTab == 1 && this.data.click == 1) { wx.showLoading({ title: '请稍候...' }) }
    var that = this,
      token = that.data.u_token3,
      orgIndex = that.data.orgIndex,
      orgList = that.data.orgList,
      get_url = config.orgurl + 'news/list/' + orgList[orgIndex].Groupid + '?offset=' + page + '&limit=20',
      data = {};
    common.getData(get_url, 'GET', data, token).then(function (res) {
      if (res.data.code == '0') {
        var list = res.data.data,
          myMienList = page == '0' ? [] : that.data.myMienList;
        if (list != null) {
          for (let i in list) {
            list[i].Createdate = list[i].Createdate.slice(0, 10) + ' ' + list[i].Createdate.slice(11, 19);
            list[i].isTouchMove = false;
          }
          that.setData({ myMienList: myMienList.concat(list), myMienPage: parseInt(page) + 20 })
          if (that.data.currentTab == 1 && that.data.click == 1) { wx.hideLoading(); }
        } else {
          if (that.data.currentTab == 1 && that.data.click == 1) {
            wx.hideLoading();
            common.getPopUp('没有更多了', 'none');
          }
        }
      } else if (res.data.code == '-2') {
        // common.getPopUp('请重新登陆', 'loading')
        // wx.clearStorage()
        // setTimeout(function () { common.reLaunch('../login/login') }, 1000)
      } else {
        if (that.data.currentTab == 1 && that.data.click == 1) {
          wx.hideLoading();
          common.getPopUp('获取失败', 'none');
        }
      }
    })
  },

  articleDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    common.navigateTo('../inform/inform?dtype=1&id=' + id + '&type=art')
  },
  changeVoteListPlan(e){
    common.navigateTo('../plan/plan?Detailsid=' + e.currentTarget.dataset.id)
  },
  changePlan:function(e){
    common.navigateTo('../servicePlan/servicePlan?projectid=' + e.currentTarget.dataset.id)
  },
  changePack:function(e){
    common.navigateTo('../servicePack/servicePack?packid=' + e.currentTarget.dataset.id)
  },
  changeArticle: function (e) {
    common.navigateTo('../uploadimg/uploadimg?id=' + e.currentTarget.dataset.id + '&pid=' + this.data.orgList[this.data.orgIndex].Groupid)
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
            that.serviceList(that.data.state);
          }
        })
      }
    }
  })
  },
  deletePlan:function(e){
    var that = this,
    token = that.data.JYToken,
     packid= e.currentTarget.dataset.id,
    index = e.currentTarget.dataset.index;
  wx.showModal({
    title: '温馨提示',
    content: '您确定要删除这项服务包吗？',
    success: function (res) {
      if (res.confirm) {
        var del_url = config.cardurl + 'homedoctor/v1/homeproject/' + packid,
          data = {},
          planList = that.data.planList;
        common.getData(del_url, 'DELETE', data, token).then(function (res) {
          if (res.data.code == '0') {
            common.getPopUp('删除成功！', 'success');
            planList.splice(index, 1);
            that.setData({planList: planList })
            that.servicePlanList();
          }
        })
      }
    }
  })
  },
  deletePack: function (e) {
    var that = this,
      token = that.data.JYToken,
       packid= e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '温馨提示',
      content: '您确定要删除这项服务项目吗？',
      success: function (res) {
        if (res.confirm) {
          var del_url = config.cardurl + 'homedoctor/v1/pack/' + packid,
            data = {},
            packList = that.data.packList;
          common.getData(del_url, 'DELETE', data, token).then(function (res) {
            if (res.data.code == '0') {
              common.getPopUp('删除成功！', 'success');
              packList.splice(index, 1);
              that.setData({packList: packList })
              that.servicePackList();
            }
          })
        }
      }
    })
  },

  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.packList.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      packList: this.data.packList
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.packList.forEach(function (v, i) {
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
    that.setData({ packList: that.data.packList })
  },
  touchstart1: function (e) {
    //开始触摸时 重置所有删除
    this.data.planList.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      planList: this.data.planList
    })
  },
  //滑动事件处理
  touchmove1: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.planList.forEach(function (v, i) {
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
    that.setData({ planList: that.data.planList })
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
  changeOrg: function (e) { this.setData({ orgIndex: e.detail.value }); this.getMyMienList('0'); }
})