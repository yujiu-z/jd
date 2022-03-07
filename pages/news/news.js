//index.js
//获取应用实例
var app = getApp()
var config = require('../../utils/config.js')
var common = require('../../utils/common.js')
Page({
  data: {
    news: '',
    method: '0',
    currentTab: 0,
    activity: '',
    informList: [
      {
        Title: '模拟数据',
        // status: '3333',
        publishdate: '2022-01-01'
      },
      {
        Title: '模拟数据111',
        // status: '3333',
        publishdate: '2022-01-01'
      },
       {
        Title: '模拟数据22',
        // status: '3333',
        publishdate: '2022-01-01'
      }
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
    mienList: [
      {
        Title: '模拟数据111111',
        // status: '3333',
        Releasedate: '2022-01-01'
      },
      {
        Title: '模拟数据2222',
        // status: '3333',
        Releasedate: '2022-01-01'
      },
      {
        Title: '模拟数据3333',
        // status: '3333',
        Releasedate: '2022-01-01'
      }
    ],
    myMienList: [],
    myMienPage: 0,
    startX: '',
    startY: '',
    voteList: [],
    pubList: [],
    bookList: [],
    groupid: ''
  },

  onLoad: function () {
    var _this = this
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        _this.setData({ userId: res.data })
      },
    })
    _this.setData({ screenHeight: wx.getSystemInfoSync().windowHeight })
   
  },

  onShow: function () {

    if (this.data.currentTab == 1 && this.data.click == 1 && this.data.u_token3 != '') { this.getMyMienList('0'); this.getMienList(this.data.u_token3, '0'); }
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
          // setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
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
        // setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
      }
    })
  },
  getPubList: function (token, vtime) {
    var that = this,
      get_url = config.url2 + 'v1/doctorpay/pubpayitemlist/1111111111120031001?offset=0&limit=20&key=',
      data = {};
    
    common.getData(get_url, 'GET', data, token).then(function (res) {
    
      console.log(res)
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
        // setTimeout(function () { common.reLaunch('../login/login') }, 1000)
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
  },
  examineMemberInfo: function (e) {
    var that = this,
      token = that.data.u_token3,
      id = e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index,
      orgList = that.data.orgList,
      url = config.orgurl + 'memberpaytitle/list/' + id + '?offset=0&limit=100',
      data = {};
    if (orgList[index].itemShow == false) {
      wx.showLoading({
        title: '查询中...',
        mask: true
      })
      common.getData(url, 'GET', data, token).then(function (res) {
        console.log(res)
        if (res.data.code == '0') {
          var list = res.data.data;
          if (list == null || list.length == 0) {
            orgList[index].items = [];
          } else {
            orgList[index].items = list;
          }
          orgList[index].itemShow = true;
          that.setData({ orgList: orgList })
          wx.hideLoading()
        } else if (res.data.code == '-2') {
          // common.getPopUp('请重新登陆', 'loading')
          // wx.clearStorage()
          // setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
        }
      })
    } else {
      orgList[index].itemShow = false;
      that.setData({ orgList: orgList })
    }
  },

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
        // setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
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

  toperShow(e) {
    var sh = this.data.screenHeight;
    if (e.detail.scrollTop >= 300) {
      this.setData({ topShow: true })
    } else {
      this.setData({ topShow: false })
    }
    if (e.detail.scrollTop + parseInt(sh) >= e.detail.scrollHeight - 2) {
      this.onReachBottom()
    }
  },

  newActivity: function () {
    common.navigateTo('../uploadimg/uploadimg?id=&pid=' + this.data.orgList[this.data.orgIndex].Groupid)
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
        // setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
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

  changeArticle: function (e) {
    common.navigateTo('../uploadimg/uploadimg?id=' + e.currentTarget.dataset.id + '&pid=' + this.data.orgList[this.data.orgIndex].Groupid)
  },

  deleteArticle: function (e) {
    var that = this,
      token = that.data.u_token3,
      id = e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '温馨提示',
      content: '您确定要删除这篇风采文章吗？',
      success: function (res) {
        if (res.confirm) {
          var del_url = config.orgurl + 'news/' + id,
            data = {},
            myMienList = that.data.myMienList;
          common.getData(del_url, 'DELETE', data, token).then(function (res) {
            if (res.data.code == '0') {
              common.getPopUp('删除成功！', 'success');
              myMienList.splice(index, 1);
              that.setData({ myMienList: myMienList })
              that.getMienList(token, '0');
            }
          })
        }
      }
    })
  },

  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.myMienList.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      myMienList: this.data.myMienList
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
    that.data.myMienList.forEach(function (v, i) {
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
    that.setData({ myMienList: that.data.myMienList })
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