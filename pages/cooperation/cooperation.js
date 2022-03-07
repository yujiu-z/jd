// pages/cooperation/cooperation.js
// pages/patientGroup/patientGroup.js
var config = require('../../utils/config.js');
var common = require('../../utils/common.js');
const { icon, imgurl } = require('../../utils/config.js');
var nowTime = common.getTime().slice(0, 10);
var today = new Date().getTime();
Page({
  data: {
    u_token: '',
    u_id: '',
    oppid: '',
    orgstatus: '1',
    sp_creat: config.icon + 'drplus/newicon/sp_creat.png',
    type: '',
    page: '',
    nowTime: nowTime,
    oneButtons: [{ text: '取消' }, { text: '筛选' }],
    nurstatus: false,
    memberValue: '',
    groupMembers: [
    ],
    formIdList: [],
    first: true,
    goOtherPage: 'https://images.yitushijie.com/btn_nav_JianTou@2x.png',
    key:'',
    isSearch: false,
    shareBoxShow: false,
    Typestatus: '2',
    userName: '',
    ageList: [{ label: '不限制', key: '' }, { label: '0-3岁', key: '0-3' }, { label: '3-6岁', key: '3-6' }, { label: '6岁以后', key: '6-65' }, { label: '老年人', key: '65-150' }],
    sexList: [{ label: '不限制', key: '' }, { label: '男', key: '1' }, { label: '女', key: '2' }],
    // rangeList: [{label:'全部',key: '000'},{label: '我的',key:'111'}],
    rangeList: [{ label: '我的', key: '111' }],
    rangeList1: [{ label: '我的', key: '111' }],
    ageShow: false,
    sexShow: false,
    selecttitle: '',
    rangeShow: false,
    chooseAge: '不限制',
    usersid: '',
    chooseSex: '不限制',
    chronic: [],
    searchAge: ['', ''],
    chooseMemberRid: '',
    nurarry: [],
    classarry: [],
    teamName: '',
    // teamId:'',
    goschoollist: [],//幼儿园列表
    classname: '----',
    nursery: '----',
    searchSex: '',
    chooseRange: '我的',
    searchRange: '111',
    checkstatus: true,
    checklist: [],
    groupdataShow: false,
    allNumber: '',
    groupShow: false,
    items: [
      { name: '身高、体重', checked: false },
      { name: '视力', checked: false },
      { name: '查体', checked: false },
      { name: '生化', checked: false },
      { name: '医生意见', checked: false },
    ],
    orgidlist: '',
    orgid: "",
    liststatus: false,
    teamList: [],
    TeamId: '',
    arrs: [],
    groupList: [
      {
        name: '高血压管理',
        value: '001',
        checked: false
      },
      {
        name: '糖尿病管理',
        value: '002',
        checked: false
      },
      {
        name: '肺结核管理',
        value: '003',
        checked: false
      },
      {
        name: '恶性肿瘤管理',
        value: '004',
        checked: false
      },
      {
        name: '精神障碍管理',
        value: '007',
        checked: false
      },
      {
        name: '孕产妇管理',
        value: '005',
        checked: false
      },
    ],
    groupChoose: [],
    chooseMemberId: '',
    teamId:'',
    JYToken:''
  },

  getorglist(id, u_token) {
    var url = 'https://api.lotusdata.com/publicHealth/v1/publichealthuser/orglistbyuserid?userid=' + id,
      that = this,
      orgidlist = [],
      orgidlist1 = [],
      selecttitle = '',
      orgid = '',
      token = u_token;
    common.getData(url, 'GET', '', token).then(res => {
      if (res.data.code == 0 && res.data.data != null) {
        orgidlist = res.data.data;
        orgidlist1 = res.data.data;
        orgidlist1.forEach(v => {
          orgid = v.Orgid;
          selecttitle = v.Name;
        })
        orgidlist.forEach(v => {
          orgid = v.Orgid;
          selecttitle = v.Name;
        })
      }
      that.setData({ orgidlist, orgid, selecttitle, orgidlist1 })
    })
  },
  goAboutPage:function(e){
       var idnumber = e.currentTarget.dataset.idnumber,
       residentsid=e.currentTarget.dataset.residentsid,
       phone=e.currentTarget.dataset.phone,
       name=e.currentTarget.dataset.name
    common.navigateTo('../../pages/personalService/personalService?idnumber='+idnumber+'&residentsid='+residentsid+'&phone='+phone+'&name='+name)
  },
  changeTypestatus(e) {
    let that = this,
      token = that.data.u_token,
      uid = that.data.u_id,
      type = that.data.type,
      key = that.data.key || '',
      sex = that.data.searchSex || '',
      age = that.data.searchByAge || ['', '']
    var Typestatus = e.currentTarget.dataset.status
    this.setData({ Typestatus: e.currentTarget.dataset.status })
    if (Typestatus == '2') {
      this.getUserTeamId(that.data.u_id, false)
    } else {
      this.getUserTeamId(that.data.u_id, true)
    }
  },
  getteamlist(rid, u_token) {
    var url = "https://api.lotusdata.com/publicHealth/v1/publichealthuser/teammember/userlist?userid=" + rid;
    common.getData(url, 'GET', '', u_token).then(res => {
      if (res.data.code == 0) {
        var data = res.data.data == null ? [] : res.data.data,
          teamName = '',
          TeamId = '',
          arrs = [];
        data.forEach((v, i) => {
          if (i == 0) {
            teamName = v.TeamName
            TeamId = v.Teamid
          }
          arrs.push({
            'Name': v.TeamName,
            'Teamid': 'O-' + v.Teamid
          })
        })
        var type = this.data.type
        var that = this,
          key = this.data.key,
          uid = this.data.userid,
          Range = that.data.searchRange,
          Typestatus = that.data.Typestatus;
        if (type == 'jkda' || type == 'jktj' || type == '006' || type == 'lnr' || type == 'OldNus' || type == 'goshcooles' || type == 'sui' || type == 'yimiao') {
          if (Typestatus == '1') {
            this.getByOrg('', key, this.data.page, this.data.age, this.data.sex, type, uid, Range, TeamId);//查询团队
          } else if (Typestatus == '2') {
            this.getByOrg(Range.slice(2), key, this.data.page, this.data.age, this.data.sex, type, uid, Range, '');//查询机构
          }
        } else {
          if (Typestatus == '1') {
            this.classification('', key, '0', type, uid, TeamId)
          } else if (Typestatus == '2') {
            this.classification(Range.slice(2), key, '0', type, uid, '')
          }
        }
        // this.getByOrg('','','0','','',type,'','',TeamId);//查询团队入园体检儿童档案
        this.setData({ arrs, teamName, TeamId: 'O-' + TeamId, searchRange: 'O-' + TeamId })
      }
    })
  },
  getPopupees() {
    var u_id = this.data.u_id
    common.redirectTo('../../manage/childgetinfo/childgetinfo?newstatus=1&uid=' + u_id + '&status=true')
  },
  changeListstatus() {
    var liststatus = this.data.liststatus,
      orgstatus = this.data.orgstatus;
    if (orgstatus == 2) {
      this.setData({ liststatus: !liststatus })
    }
  },

  teamstatus(e) {
    var index = e.currentTarget.dataset.index,
      teamList = this.data.teamList,
      that = this,
      liststatus = this.data.liststatus,
      orgstatus = this.data.orgstatus;
    if (orgstatus == 2) {//当为团队的时候允许她链接团队
      this.setData({ selecttitle: teamList[index].Name, TeamId: teamList[index].Teamid })

    }
  },
  changeteam() {
    var orgid = this.data.orgid,
      that = this,
      teamName = '',
      TeamId = '',
      teamList = [],
      token = this.data.u_token,
      url = 'https://api.lotusdata.com/publicHealth/v1/publichealthuser/teamlistbyorg/' + orgid + '?key=&start=0&limit=50';
    common.getData(url, 'GET', '', token).then(res => {
      if (res.data.code == 0) {
        var arr = res.data.data;
        if (res.data.data != null) {
          teamList = res.data.data;
          teamList.forEach(v => {
            TeamId = v.Teamid;
            teamName = v.Name;
          })
        }
        that.setData({ teamName, TeamId, teamList })
      }

    })
  },

  onLoad: function (options) {
    var _this = this
    _this.getToken();
    wx.getStorage({
        key: 'JYToken',
        success: function (res) {
            var JYToken = res.data
            _this.setData({ JYToken: JYToken})
            wx.getStorage({
                key: 'teamId',
                success: function (res) {
                    var teamId = res.data;
                    // wx.getStorage({ key: 'docName', success: function (res) { _this.setData({ userName: res.data }) }, })
                    // wx.setNavigationBarTitle({ title: options.name })
                    // _this.getorglist(u_id,u_token)
                    _this.setData({ teamId:teamId })
                    _this.getAllNumber(JYToken,teamId,_this.data.key)
                   
                },
              })
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
                  common.getData(config.url2 + 'v1/sysuser/token', 'POST', data, token).then(function(res) {
                   
                      if (res.data.code == "0") {
                          var token = "JWT " + res.data.token;
                          wx.setStorage({ key: 'accesstoken1', data: token })
                      } else {
                          common.getPopUp('token获取失败，请重试', 'none')
                      }
                  }).catch(function(err){
                      console.log(err)
                  })
              },
  addOldNus(e){
    common.navigateTo('../../pages/createPatient/createPatient')
  },
  addSui(e) {
    common.navigateTo('../../pages/createPatient/createPatient')
    // common.navigateTo('../../manage/slowDiseaseFollowUp/slowDiseaseFollowUp?')
  },
  addYiMiao(e) {
    common.navigateTo('../../pages/createPatient/createPatient')
  },
  openorg(e) {
    var index = e.currentTarget.dataset.index;
    if (index == 1) { //组织
      var id = this.data.u_id,
        token = this.data.u_token;
      this.getorglist(id, token)
    } else if (index == 2) {//团队
      this.changeteam()
    }
    this.setData({ orgstatus: index, liststatus: false })
  },

  checkboxChange(e) {
    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].name === values[j]) {
          items[i].checked = true
          break
        }
      }
    }

    this.setData({
      items
    })
  },

  getclasslist(nursery) {
    var that = this,
      url = 'https://api.lotusdata.com/publicHealth/v1/babynursery/class-list?doctorid&nursery=' + nursery;
    common.getData(url, 'GET', '', this.data.u_token).then(res => {
      if (res.data.data != null && res.data.code == 0) {
        var classarry = res.data.data,
          arr = [];
        classarry.forEach(v => {
          arr.push(v.class)
        })
        that.setData({ classarry: arr })
      }
    })
  },

  tapDialogButton(e) {
    var that = this,
      text = e.detail.item.text;
    if (text == '筛选') {
      var page = 0
      that.setData({ goschoollist: [] })
      that.getgoschoollist(page);
    } else {
      this.setData({
        nurstatus: false
      })
    }
  },


  getgoschoollist(page) {
    var items = this.data.items,
      that = this,
      result = '',
      vision = '',
      weight = '',
      height = '',
      opinio = '',
      physical = '',
      biochemical = '';
    items.forEach((v, i) => {
      if (v.checked == true) {
        if (i == 0) {
          weight = '2'
          height = '2'
        };
        if (i == 1) {
          vision = '2'
        }
        if (i == 2) {
          physical = '2'
        }
        if (i == 3) {
          biochemical = '2';
        }
        if (i == 4) {
          opinio = '2'
        }
      }
    })
    var nursery = this.data.nursery == '----' ? '' : this.data.nursery,
      classname = this.data.classname == '----' ? '' : this.data.classname,
      url = 'https://api.lotusdata.com//publicHealth/v1/babynursery/list?offset=' + page + '&limit=20&key=' + this.data.key + '&dateStart&dateEnd&name=&userid&nursery=' + nursery + '&class=' + classname + '&result_health=' + result + '&vision_health=' + vision + '&physical_examination_health=' + physical + '&biochemical_health=' + biochemical + '&is_weight=' + weight + '&is_height=' + height + '&is_opinio=' + opinio;
    common.getData(url, 'GET', '', this.data.u_token).then(res => {
      if (res.data.data != null && res.data.code == 0) {
        var arr = res.data.data;
        var old = that.data.goschoollist;
        arr.forEach(v => {
          v.Testdate = v.TestDate.slice(0, 10);
          old.push(v)
        })
        that.setData({ checkstatus: false, goschoollist: old, page: page * 1 + 20 })
      } else if (res.data.code == 0) {
        var old = that.data.goschoollist;
        that.setData({ checkstatus: false, goschoollist: old })
      }
    })
    this.setData({
      nurstatus: false
    })
  },

  getgoschool(e) {
    var rid = e.currentTarget.dataset.rid,
      username = e.currentTarget.dataset.name,
      idnumber = e.currentTarget.dataset.idnumber,
      sex = e.currentTarget.dataset.sex,
      birthday = e.currentTarget.dataset.birthday,
      nursery = e.currentTarget.dataset.nursery,
      id = e.currentTarget.dataset.id;
    common.navigateTo('../goSchool/goSchool?id=' + id + '&rid=' + rid + '&username=' + username + '&sex=' + sex + '&firstrid=&idnum=' + idnumber + "&pregnantnumber=&birthday=" + birthday + '&Nursery=' + nursery + '&typestatus=1')
  },

  bindPickerChange(e) {
    var index = e.detail.value,
      array = this.data.nurarry;
    this.getclasslist(array[index])
    this.setData({ nursery: array[index] })
  },

  bindPickerChangeclass(e) {
    var index = e.detail.value,
      array = this.data.classarry;
    var classname = array[index];
    this.setData({ classname: classname })
  },

  nurserylist(token, uid) {
    var url = "https://api.lotusdata.com/publicHealth/v1/babynursery/nursery-list?doctorid=&orgid=&teamid=" +
      uid +
      "&offset=0&limit=200&key=",
      that = this;
    common.getData(url, 'GET', '', token).then(res => {
      if (res.data.code == 0 && res.data.data != null) {
        var nurarry = res.data.data,
          arry = [];
        nurarry.forEach(v => {
          arry.push(v.nursery)
        })
        that.setData({ nurarry: arry })
      }
    }).catch(err => {
      console.log(err)
    })
  },

  getPopup() {
    var nurstatus = this.data.nurstatus;
    this.nurserylist(this.data.u_token, this.data.searchRange.slice(2))
    this.setData({ nurstatus: !nurstatus })
  },

  getPopups() {
    var checkstatus = this.data.checkstatus;
    this.setData({ checkstatus: !checkstatus })
  },

  onShow: function () {
    this.onLoad()
  },

  getUserTeamId: function (id, statuser) {
    let that = this,
      token = that.data.u_token,
      rangeList = [{ label: '我的', key: '111' }],
      rangeList1 = [{ label: '我的', key: '111' }],
      Typestatus = that.data.Typestatus,
      get_url = config.hurl + 'publichealthuser/orglistbyuserid?userid=' + id;
    if (statuser) {
      this.setData({ Typestatus: '1' })
      this.getteamlist(id, token)
      return
    }
    common.getData(get_url, 'GET', {}, token).then(function (res) {
      if (res.data.code == 0 && res.data.data != null) {
        var list = res.data.data;
        for (var i = 0; i < list.length; i++) {
          rangeList.push({
            'label': list[i].Name,
            'key': 'O-' + list[i].Orgid
          });
          rangeList1.push({
            'label': list[i].Name,
            'key': 'O-' + list[i].Orgid
          })
        }
        if (list.length >= 1) {
          that.setData({ chooseRange: list[0].Name, searchRange: list[0].Orgid })
          that.switchRange(id)
          var type = that.data.type;
          if (type == 'goshcooles') {
            that.nurserylist(token, list[0].Orgid)
          }
        }
      } else {
        that.getPatientList(token, id, that.data.type, '0', '', '')
      }
      that.setData({ rangeList, rangeList1, usersid: id })
    })

  },

  searchMemberValue: function (e) { this.setData({ key: e.detail.value }) },

  searchMembers: function () {
    var JYToken = this.data.JYToken,
      teamId=this.data.teamId,
       key= this.data.key;
     
    if (key === '') {
      this.setData({ isSearch: false })
    } else {
      this.setData({ isSearch: true })
      this.getAllNumber(JYToken, teamId ,key)
    }
    
  },

  //获取总个数 
  getAllNumber: function (JYToken, teamId,key) {
    var that = this,
    groupMembers=that.data.groupMembers,
      get_url = config.cardurl + 'homedoctor/v1/homeresidentlist?start=0&limit=10&temid='+teamId +'&key='+key;
    common.getData(get_url, 'GET', {}, JYToken).then(function (res) {
      if (res.data.code == '1' && res.data.data != null) {
        let list = res.data.data;
        var arr =[]
        for (let i in list) {
          arr.push({
            sex:list[i].Sex,
            Name:list[i].Name,
            age:list[i].Age,
            Idnumber:list[i].Idnumber,
            Residentsid:list[i].Residentsid,
            Phone:list[i].Phone,
            isTouchMove:false
          });
        }
        that.setData({ groupMembers: arr})
     
  }
    })
  },
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.groupMembers.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      groupMembers: this.data.groupMembers
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
    that.data.groupMembers.forEach(function (v, i) {
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
    that.setData({ groupMembers: that.data.groupMembers })
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
  // 获取列表(旧)
  getPatientList: function (token, uid, type, page, key, orgid) {
    var that = this,
      get_url = '',
      newpage = 20 + page * 1,
      data = {};
      get_url = config.hurl + 'personalbasicinformation/elderly/list?key=' + key + '&start=' + page + '&limit=' + newpage + '&doctorid=' + uid + "&Org_id=" + orgid;
    // wx.showLoading({ title: '获取中...', mask: true })
    common.getData(get_url, 'GET', data, token).then(function (res) {
      if (res.data.code == '0' && res.data.data != null) {
        var list = res.data.data, arr = page == 0 ? [] : that.data.groupMembers;
        for (let i in list) {
          list[i].sex = that.getTrueSex(list[i].Sex);
          if (list[i].Idnumber != '') {
            list[i].Birthday = list[i].Idnumber.slice(6, 10) + '-' + list[i].Idnumber.slice(10, 12) + "-" + list[i].Idnumber.slice(12, 14) + ' 00:00:00'
          }
          var timeStemp = new Date(list[i].Birthday).getTime()
          list[i].age = Math.ceil((today - timeStemp) / 31536000000);
          if (list[i].NewClassid) { list[i].classList = list[i].NewClassid.split(','); }
          else if (list[i].Classid) { list[i].classList = list[i].Classid.split(','); }
          else { list[i].classList = []; }
        }
        that.setData({ groupMembers: arr.concat(list), page: parseInt(page) + 20 })
        wx.hideLoading();
      } else {
        wx.hideLoading();
        if (page == '0') {
          that.setData({ groupMembers: [] })
        }
      }
      that.setData({ first: false })
    })
  },

  searchByAge: function (e) {
    let that = this,
      token = that.data.u_token,
      uid = that.data.u_id,
      age = e.currentTarget.dataset.age.split('-') || '',
      sex = that.data.searchSex || '',
      key = this.data.key,
      type = that.data.type,
      chooseAge = e.currentTarget.dataset.chooseage,
      range = this.data.searchRange;
    this.setData({ ageShow: false, chooseAge, searchAge: age })
    if (range == '111') {
      that.getSearchList(token, uid, '0', age, sex, key)
    } else if (range.slice(0, 2) == 'O-') {
      this.getByOrg(range.slice(2), key, '0', age, sex, type);
    }
    // else if(range == '000') {
    //     this.getSearchList(token,'','0',age, sex,key)
    // } 
    // else if( range.slice(0,2) == 'T-' ){
    //     type = that.transformType(type)
    //     this.getByTeam(range.slice(2),key,'0',age,sex,type);
    // } 
  },



  searchBySex: function (e) {
    let that = this,
      token = that.data.u_token,
      uid = that.data.u_id,
      type = that.data.type,
      age = that.data.searchAge || ['', ''],
      key = this.data.key,
      sex = e.currentTarget.dataset.sex || '',
      chooseSex = e.currentTarget.dataset.choosesex,
      range = this.data.searchRange;
    this.setData({ sexShow: false, chooseSex, searchSex: sex })
    if (range == '111') {
      that.getSearchList(token, uid, '0', age, sex, key)
    } else if (range.slice(0, 2) == 'O-') {
      this.getByOrg(range.slice(2), key, '0', age, sex, type);
    }
    //  else if(range == '000') {
    //     this.getSearchList(token,'','0',age, sex,key)
    // } else if( range.slice(0,2) == 'T-' ){
    //     type = that.transformType(type)
    //     this.getByTeam(range.slice(2),key,'0',age,sex,type);
    // } 
  },

  switchRange: function (e) {
    var rangeList = this.data.rangeList
    var Typestatus = this.data.Typestatus
    if (e.currentTarget == undefined) {
      var chooseRange = this.data.chooseRange,
        userid = e,
        range = 'O-' + this.data.searchRange;
    } else if (Typestatus == '2') {
      var index = e.detail.value,
        chooseRange = rangeList[index].label,
        userid = '',
        range = rangeList[index].key;
    } else if (Typestatus == '1') {
      var arrs = this.data.arrs;
      var index = e.detail.value,
        teamName = arrs[index].Name,
        range = arrs[index].Teamid,
        userid = '',
        TeamId = arrs[index].Teamid;
      this.setData({ teamName, TeamId })
    }
    let that = this,
      token = that.data.u_token,
      uid = that.data.u_id,
      type = that.data.type,
      key = that.data.key || '',
      sex = that.data.searchSex || '',
      age = that.data.searchByAge || ['', ''];
    this.setData({ rangeShow: false, chooseRange, searchRange: range })
    if (range == '111') {
      that.getPatientList(token, uid, type, '0', key)
    } else if (TeamId != '' || range.slice(0, 2) == 'O-') {
      if (type == 'jkda' || type == 'jktj' || type == '006' || type == 'lnr' || type == 'OldNus' || type == 'goshcooles' || type == 'sui' || type == 'yimiao') {
        if (Typestatus == '1') {
          this.getByOrg('', key, '0', age, sex, type, uid, range, TeamId.slice(2));//查询团队
        } else if (Typestatus == '2') {
          this.getByOrg(range.slice(2), key, '0', age, sex, type, uid, range, '');//查询机构
        }
      } else {
        if (Typestatus == '1') {
          this.classification(''.slice(2), key, '0', type, uid, TeamId.slice(2))
        } else if (Typestatus == '2') {
          this.classification(range.slice(2), key, '0', type, uid, '')
        }
      }

    }
    // else if(range == '000') {
    //     this.getSearchList(token,'','0',age,sex,key)
    // } //全部
  },

  groupMember: function (e) {
    var token = this.data.u_token,
      that = this,
      id = e.currentTarget.dataset['rid'],
      rid = e.currentTarget.dataset['id'],
      get_url = 'https://api.lotusdata.com/publicHealth/v1/personalclass/classbyuser/' + id;
    common.getData(get_url, 'GET', {}, token).then(res => {
      if (res.data.code == '0') {
        var list = res.data.data,
          groupList = that.data.groupList;
        for (var j = 0; j < groupList.length; j++) {
          groupList[j].checked = false
        }
        for (let i in list) {
          for (var j = 0; j < groupList.length; j++) {
            if (groupList[j].value == list[i].Classid) {
              groupList[j].checked = true
            }
          }
        }
        that.setData({ groupList, chooseMemberId: id, chooseMemberRid: rid })
      }
    });
    this.setData({ groupShow: true })
  },

  transformType(type) {
    switch (type) {
      case '001':
        return 'hypertension';
      case '002':
        return 'twotypediabetes';
      case 'jkda':
        return 'personbasicinfo';
      case 'lnr': //因为老年人是健康档案中的通过年龄段筛选得到的数据
        return 'lnr';
      case 'oldNus':
        return 'oldNus';
      case 'jktj':
        // return 'healthtest' ; 体检表---之前type 体检表存在重复 用档案接口进行优化操作
        return 'personbasicinfo'
      case '006':
        return 'childbasicinfo';
      case 'goshcooles':
        return 'childbasicinfo';
      case 'sui':
        return 'sui';
      case 'yimiao':
        return 'yimiao';

    }
  },

  getByOrg: function (orgid, key, page, age, sex, type, usersid, ranres, teamid) {
    // wx.showLoading({ title: '获取中...', mask: true });
    var that = this,
      usersid = usersid ? usersid : that.data.usersid,
      token = that.data.u_token,
      page = page == '' ? '0' : page,
      newpage = page * 1 + 20,
      sex = sex == undefined ? '' : sex,
      teamid = teamid == undefined ? '' : teamid,
      get_url = '';
    if (age == '' || age == undefined) {
      age = ['', '']
    }
    type = that.transformType(type)
    if (that.data.type == 'lnr' || that.data.type == 'OldNus') {//老年人
      get_url = config.hurl + 'personalbasicinformation/elderly/list?key=' + key + '&start=' + page + '&limit=' + newpage + '&doctorid=' + usersid + "&Org_id=" + orgid + "&team_id=" + teamid;
    } else if (that.data.type == '006') {//儿童
      get_url = config.hurl + 'publichealthuser/healthfile?userid=&org_id=' + orgid + '&team_id=' + teamid + '&type=' + type + '&sex=&agestart=&ageend=&key=' + key + '&offset=' + page + '&limit=' + newpage;
    } else if (that.data.type == 'goshcooles') {//入园体检
      get_url = config.hurl + 'publichealthuser/healthfile?userid=&org_id=' + orgid + '&team_id=' + teamid + '&type=' + type + '&sex=&agestart=&ageend=&key=' + key + '&offset=' + page + '&limit=' + newpage;
    } else if (that.data.type == 'sui') {
      get_url = config.hurl + 'personalbasicinformation/elderly/list?key=' + key + '&start=' + page + '&limit=' + newpage + '&doctorid=' + usersid + "&Org_id=" + orgid + "&team_id=" + teamid;;
    } else if (that.data.type === 'yimiao') {
      get_url = config.hurl + 'personalbasicinformation/elderly/list?key=' + key + '&start=' + page + '&limit=' + newpage + '&doctorid=' + usersid + "&Org_id=" + orgid + "&team_id=" + teamid;
      // get_url = config.hurl + 'personalbasicinformation/elderly/list?key=' + key + '&start=' + page + '&limit='+ newpage +'&doctorid=' + usersid +"&Org_id=" + orgid;
      // get_url = config.hurl + 'publicHealth/v1/followupofchronicdiseases/list?key'+key+'&userid=&doctorid='+usersid+'&offset='+page+'&limit='+newpage;
    } else {//其他健康体检和健康档案
      get_url = config.hurl + 'publichealthuser/healthfile?userid=&org_id=' + orgid + '&team_id=' + teamid + '&type=' + type + '&sex=' + sex + '&agestart=' + age[0] + '&ageend=' + age[1] + '&key=' + key + '&offset=' + page + '&limit=' + newpage;
    }
    common.getData(get_url, 'GET', {}, token).then(function (res) {
      if (res.data.code == '0' && res.data.data != null) {
        var list = res.data.data,
          arr = page == 0 ? [] : that.data.groupMembers;
        for (let i in list) {
          if (list[i] != null) {
            list[i].sex = that.getTrueSex(list[i].Sex);
            if (list[i].Birthday == '' && list[i].Idnumber != '') {
              list[i].Birthday = list[i].Idnumber.slice(6, 10) + '-' + list[i].Idnumber.slice(10, 12) + "-" + list[i].Idnumber.slice(12, 14) + ' 00:00:00'
            }
            var timeStemp = new Date(list[i].Birthday).getTime();
            list[i].age = Math.ceil((today - timeStemp) / 31536000000);
            list[i].sex = that.getTrueSex(list[i].Sex);
            list[i].phone = list[i].Phone;
            if (list[i].NewClassid) { list[i].classList = list[i].NewClassid.split(','); }
            else if (list[i].Classid) { list[i].classList = list[i].Classid.split(','); }
            else { list[i].classList = []; }
          }
        }
        that.setData({ groupMembers: arr.concat(list), page: parseInt(page) + 20, allNumber: res.data.total })
        wx.hideLoading();
      } else {
        wx.hideLoading();
        if (page == '0') {
          that.setData({ groupMembers: [], allNumber: 0 })
        }
      }
    })
  },

  classification: function (orgid, key, page, type, usersid, teamid) { //居民分类管理
    // type = this.transformType(type)
    orgid = orgid == '1' ? '' : orgid
    // wx.showLoading({ title: '获取中...', mask: true });
    var that = this,
      usersid = usersid ? usersid : that.data.usersid,
      token = that.data.u_token,
      newpage = page * 1 + 20,
      get_url = config.hurl + 'personalclass/classlist/' + type + '?doctorid=&key=' + key + '&start=' + page + '&limit=' + newpage + '&org_id=' + orgid + '&team_id=' + teamid + '&user_id=';
    common.getData(get_url, 'GET', {}, token).then(function (res) {
      if (res.data.code == '0' && res.data.data != null) {
        var list = res.data.data,
          arr = page == 0 ? [] : that.data.groupMembers;
        for (let i in list) {
          if (list[i] != null) {
            list[i].sex = that.getTrueSex(list[i].Sex);
            if (list[i].Birthday == '' && list[i].Idnumber != '') {
              list[i].Birthday = list[i].Idnumber.slice(6, 10) + '-' + list[i].Idnumber.slice(10, 12) + "-" + list[i].Idnumber.slice(12, 14) + ' 00:00:00'
            }
            var timeStemp = new Date(list[i].Birthday).getTime();
            list[i].age = Math.ceil((today - timeStemp) / 31536000000);
            list[i].sex = that.getTrueSex(list[i].Sex);
            if (list[i].NewClassid) { list[i].classList = list[i].NewClassid.split(','); }
            else if (list[i].Classid) { list[i].classList = list[i].Classid.split(','); }
            else { list[i].classList = []; }
          }
        }
        that.setData({ groupMembers: arr.concat(list), page: parseInt(page) + 20, allNumber: res.data.total })
        wx.hideLoading();
      } else {
        wx.hideLoading();
        if (page == '0') {
          that.setData({ groupMembers: [] })
        }
      }
    })
  },

  getByTeam: function (teamid, key, page, age, sex, type) {
    // wx.showLoading({ title: '获取中...', mask: true })
    var that = this,
      uid = that.data.u_id,
      token = that.data.u_token,
      get_url = config.hurl + 'publichealthuser/team/teamuser?teamid=' + teamid + '&userid=' + uid + '&type=' + type + '&key=' + key + '&agestart=&ageend=&sex=' + sex + '&offset=' + page + '&limit=20';
    common.getData(get_url, 'GET', {}, token).then(function (res) {

      if (res.data.code == '0' && res.data.data != null) {
        var list = res.data.data,
          arr = page == 0 ? [] : that.data.groupMembers;
        for (let i in list) {
          if (list[i] != null) {
            list[i].sex = that.getTrueSex(list[i].Sex);
            if (list[i].Birthday == '' && list[i].Idnumber != '') {
              list[i].Birthday = list[i].Idnumber.slice(6, 10) + '-' + list[i].Idnumber.slice(10, 12) + "-" + list[i].Idnumber.slice(12, 14) + ' 00:00:00'
            }
            var timeStemp = new Date(list[i].Birthday).getTime();
            list[i].age = Math.ceil((today - timeStemp) / 31536000000);
          }
        }
        that.setData({ groupMembers: arr.concat(list), page: parseInt(page) + 20 })
        wx.hideLoading();
      } else {
        wx.hideLoading();
        if (page == '0') {
          that.setData({ groupMembers: [] })
        }
      }
    })
  },

  getTrueSex: function (sex) {
    if (sex == '0') { return '未知' }
    else if (sex == '1') { return '男' }
    else if (sex == '2') { return '女' }
    else if (sex == '') { return '男' }
    else { return sex }
  },

  getSearchList: function (token, uid, page, age, sex, key) {
    // wx.showLoading({ title: '获取中...', mask: true })
    var that = this,
      get_url = config.hurl + 'personalbasicinformation/filter?agestart=' + age[0] + '&ageend=' + age[1] + '&sex=' + sex + '&key=' + key + '&doctorid=' + uid + '&type=personbasicinfo&offset=' + page + '&limit=20';
    common.getData(get_url, 'GET', {}, token).then(function (res) {
      if (res.data.code == '0' && res.data.data != null) {
        var list = res.data.data, arr = page == 0 ? [] : that.data.groupMembers;
        for (let i in list) {
          list[i].sex = that.getTrueSex(list[i].Sex);
          if (list[i].Birthday == '' && list[i].Idnumber != '') {
            list[i].Birthday = list[i].Idnumber.slice(6, 10) + '-' + list[i].Idnumber.slice(10, 12) + "-" + list[i].Idnumber.slice(12, 14) + ' 00:00:00'
          }
          var timeStemp = new Date(list[i].Birthday).getTime();
          list[i].age = Math.ceil((today - timeStemp) / 31536000000);
          if (list[i].NewClassid) { list[i].classList = list[i].NewClassid.split(','); }
          else if (list[i].Classid) { list[i].classList = list[i].Classid.split(','); }
          else { list[i].classList = []; }
        }
        that.setData({ groupMembers: arr.concat(list), page: parseInt(page) + 20 })
        wx.hideLoading();
      } else {
        wx.hideLoading();
        if (page == '0') {
          that.setData({ groupMembers: [] })
        }
      }
      that.setData({ first: false })
    })
  },

  openAgeList: function (e) {
    let ageShow = !this.data.ageShow
    this.setData({ ageShow: ageShow })
  },

  openSexList: function (e) {
    let sexShow = !this.data.sexShow
    this.setData({ sexShow, })
  },

  openRangeList: function (e) {
    let rangeShow = !this.data.rangeShow
    this.setData({ rangeShow })
  },


  // 收集用户点击得到的formId
  formSubmit: function (e) {
    var _this = this, formIdList = _this.data.formIdList, f_id = e.detail.formId;
    formIdList.push(f_id)
    _this.setData({ formIdList: formIdList })
  },

  onHide: function () {
    var _this = this,
      formIdList = _this.data.formIdList,
      oppid = _this.data.oppid,
      u_token = _this.data.u_token,
      sendFormId_url = config.url + 'wx/formid?appid=wx64256017793465f6',
      data = { "openid": oppid, "formids": formIdList };
    common.getData(sendFormId_url, 'POST', data, u_token).then(function (res) { if (res.data.code == 0) { _this.setData({ formIdList: [], }) } })
  },

  // 下拉加载
  onPullDownRefresh: function () {
   
    wx.stopPullDownRefresh()
  },

  // 上拉刷新
  onReachBottom: function () {
    let that = this,
      token = that.data.u_token,
      uid = that.data.u_id,
      type = that.data.type,
      key = that.data.key || '',
      Typestatus = that.data.Typestatus,
      sex = that.data.searchSex || '',
      age = that.data.searchByAge || ['', ''],
      Teamid = that.data.TeamId,
      Range = that.data.searchRange;
    if (that.data.type == 'jkda' || that.data.type == 'jktj' || that.data.type == '006' || that.data.type == 'goshcooles' || that.data.type == 'lnr' || that.data.type == 'OldNus' || that.data.type == 'sui' || that.data.type == 'yimiao') {
      if (that.data.checkstatus) {
        if (Range == '111') {
          that.getPatientList(token, uid, this.data.type, this.data.page, key)
        } else if (Range.slice(0, 2) == 'O-') {
          if (this.data.type == 'lnr' || this.data.type == 'OldNus') {
            that.getPatientList(token, uid, this.data.type, this.data.page, key)
          }
          if (type == 'jkda' || type == 'jktj' || type == '006' || type == 'lnr' || type == 'OldNus' || type == 'goshcooles' || type == 'sui' || type == 'yimiao') {
            if (Typestatus == '1') {
              this.getByOrg('', key, this.data.page, age, sex, type, uid, Range, Teamid.slice(2));//查询团队
            } else if (Typestatus == '2') {
              this.getByOrg(Range.slice(2), key, this.data.page, age, sex, type, uid, Range, '');//查询机构
            }
          } else {
            let type = that.transformType(that.data.type)
            this.classification(Range.slice(2), key, this.data.page, type, uid)
          }
          // this.getByOrg(Range.slice(2),key,this.data.page,age,sex,type);
        }
      } else {
        var index = this.data.goschoollist.length;
        if (index % 20 == 0) {
          this.getgoschoollist(this.data.page)
        }
      }
      // else if(Range == '000') {
      //     this.getSearchList(token,'',this.data.page,age,sex,key)
      // } else if (Range.slice(0,2) == 'T-'){
      //     let type = that.transformType(that.data.type)
      //     this.getByTeam(Range.slice(2),key,this.data.page,age,sex,type);
      // }
    } else {
      if (Range == '111') {
        that.getPatientList(token, uid, this.data.type, this.data.page, key, '')
      } else if (Range.slice(0, 2) == 'O-') {
        if (that.data.type == 'jkda' || that.data.type == 'jktj' || that.data.type == '006' || that.data.type == 'lnr' || that.data.type == 'OldNus' || that.data.type == 'goshcooles' || that.data.type == 'sui' || that.data.type == 'yimiao') {
          this.getByOrg(Range.slice(2), key, this.data.page, age, sex, type, uid, Range);
        } else {
          if (Typestatus == '1') {
            this.classification('', key, this.data.page, type, uid, Teamid.slice(2))
          } else if (Typestatus == '2') {
            this.classification(Range.slice(2), key, this.data.page, type, uid, '')
          }
        }

      }
    }
  },

  // 查看群成员信息
  memberInfo: function (e) {

    var id = e.currentTarget.dataset.id,
      rid = e.currentTarget.dataset.rid,
      name = e.currentTarget.dataset.name,
      classlist = e.currentTarget.dataset.classlist,
      phone = e.currentTarget.dataset.phones,
      type = this.data.type;

    classlist = JSON.stringify(classlist);
    if (type == 'dead') {
      common.navigateTo('../../manage/deathConfirm/deathConfirm?rid=' + rid)
      return
    } else if (type == 'jktj') {
      var get_url = config.hurl + 'personalbasicinformation/' + id,
        data = {},
        token = this.data.u_token;
      common.getData(get_url, 'GET', data, token).then(res => {
        if (res.data.code == 0) {
          common.navigateTo('../filesList/filesList?rid=' + res.data.data.Recordid + '&name=healthCheck&username=' + name)
        }
      })
    } else if (type == 'OldNus') {
      common.navigateTo('../../manage/oldNuslist/oldNuslist?Idnumber=' + id + '&name=' + name + '&phone=' + phone + '&w_id=' + rid + '&searchRange=' + this.data.searchRange)
    } else if (type == 'goshcooles') {
      common.navigateTo('../../manage/parklist/parklist?u_id=' + rid)
    } else if (type == 'sui') {
      common.navigateTo('../../manage/slowDiseaseList/slowDiseaseList?Idnumber=' + id + '&name=' + name + '&phone=' + phone + '&w_id=' + rid + '&searchRange=' + this.data.searchRange)
    }
    else if (type == 'yimiao') {
      common.navigateTo('../../manage/yiMiaoList/yiMiaoList?Idnumber=' + id + '&name=' + name + '&phone=' + phone + '&w_id=' + rid + '&searchRange=' + this.data.searchRange)
    }
    else {
      common.navigateTo('../userRecord/userRecord?w_id=' + (type == '006' ? rid : id) + '&type=' + type + '&cla=' + classlist)
    }

  },

  closeShareBox: function () { this.setData({ shareBoxShow: false }) },

  onShareAppMessage(res) {
    if (res.from === 'button') {
      return {
        title: '您的公卫医生 ' + this.data.userName + ' 邀请您建立健康档案',
        path: '/pages/setFile/setFile?userid=' + this.data.u_id,
        imageUrl: 'https://media.lotusdata.com/12781245083680778.jpg'
      }
    }
  },

  groupCancel: function () {
    this.setData({ groupShow: false })
  },
  groupCancels: function () {
    this.setData({ groupdataShow: false })
  },
  groupConfirm: function () {
    wx.showLoading({ title: '分组中' })
    var groupChoose = this.data.groupChoose,
      token = this.data.u_token,
      url = config.hurl + 'personalclass',
      that = this,
      data = {
        classid: groupChoose,
        userid: this.data.chooseMemberId
      };
    common.getData(url, 'POST', data, token).then(function (res) {
      if (res.data.code == '0') {
        wx.hideLoading();
        common.getPopUp('分组成功！', 'success');
        if (groupChoose.includes('001') || groupChoose.includes('002')) {
          that.setData({ groupShow: false, groupdataShow: true })
        } else {
          that.setData({ groupShow: false })
        }
        that.getGroupdata(that.data.chooseMemberId, that.data.groupChoose)
      } else {
        that.setData({ groupShow: false })
        wx.hideLoading();
        common.getPopUp('分组设置失败', 'none');
      }
    })
  },
  getGroupdata(e, choose) {
    let chronic = [];
    choose.map((v) => {
      if (v === '001') {
        chronic.push({
          "value": '高血压',
          'date': nowTime,
          'name': '1'
        })
      } else if (v === '002') {
        chronic.push({
          "value": '糖尿病',
          'date': nowTime,
          'name': '2'
        })
      }
    })
    this.setData({ chronic });
  },

  changeDate(e) {
    if (e.currentTarget.dataset['index'] == '高血压') {
      var chronic = this.data.chronic;
      chronic[0].date = e.detail.value;
      this.setData({ chronic });
    } else if (e.currentTarget.dataset['index'] == '糖尿病') {
      var chronic = this.data.chronic;
      chronic[1].date = e.detail.value;
      this.setData({ chronic })
    }
  },
  //修改时间
  groupConfirms(e) {
    wx.showLoading({ title: '修改中...' })
    var token = this.data.u_token,
      id = this.data.chooseMemberRid,
      url = config.hurl + 'personalbasicinformation/' + id,
      type = 'jkda',
      that = this;
    common.getData(url, 'GET', type, token).then(function (res) {
      if (res.data.code == '0') {
        let data = res.data.data,
          list = data.Disease != '' ? JSON.parse(data.Disease) : '',
          chronic = that.data.chronic;
        if (list.length != 0) {
          if (list[0].name != '0') {
            for (let i = 0; i < list.length; i++) {
              for (let j = 0; j < chronic.length; j++) {
                if (list[i].name == chronic[j].name) {
                  list[i].date = chronic[j].date;
                }
              }
            }
            list = list.concat(chronic);
            var nowlist = [];
            for (var i = 0; i < list.length; i++) {
              for (var j = i + 1; j < list.length; j++) {
                if (list[i].name == list[j].name) {
                  ++i;
                }
              }
              nowlist.push(list[i]);
            }
            list = nowlist;
          }
        } else {
          list = that.data.chronic;
        }
        data.Disease = JSON.stringify(list);
        var rid = res.data.data.Recordid;
        that.getCoverInfo(token, rid, data, id)
      } else {
        common.getPopUp('修改失败！', 'error');
        that.setData({ groupdataShow: false })
      }
    })
  },

  getCoverInfo: function (token, rid, datas, id) {
    var that = this,
      url = config.hurl + 'personalbasicinformation/' + id,
      get_url = config.hurl + 'coverpage/detail/' + rid,
      data = {};
    common.getData(get_url, 'GET', data, token).then(function (res) {
      if (res.data.code == '0') {
        var info = res.data.data;
        var newdata = {
          "idnumber": datas.Idnumber,
          "name": datas.Name,
          "sex": datas.Sex,
          "age": datas.Age,
          "now_address": info.NowAddress,
          "nativeplace": info.Nativeplace,
          'now_address_code': info.NowAddressCode,
          "address_code": info.AddressCode,
          "birthday": datas.Birthday,
          'file_status': info.FileStatus,
          "employer": datas.Employer,
          "contact_name": datas.ContactName,
          "contact_phone": datas.ContactPhone,
          "nation": datas.Nation,
          "career": datas.Career,
          "culturallevel": datas.Culturallevel,
          "home_type": datas.HomeType,
          "phone": datas.Phone,
          "email": datas.Email,
          "bloodtype": datas.BloodType,
          "religion": datas.Religion,
          "marry": datas.Marry,
          "tag": datas.Marry,
          "signdoctor": datas.Signdoctor,
          "source": datas.Source,
          "idqrcode": datas.Idqrcode,
          "photourl": datas.Photourl,
          "code": datas.Code,
          'file_status': datas.FileStatus,
          "buildPerson": datas.EmergencyContact,
          "emergencyContact": data.EmergencyContact,
          "contactPhone": datas.ContactPhone,
          "paytype": datas.Paytype,
          "medicineallergy": datas.Medicineallergy,
          "bao_lou": datas.BaoLou,
          "disease": datas.Disease,
          "diseasedate": datas.Diseasedate,
          "surgeryname": datas.Surgeryname,
          "surgerydate": datas.Surgerydate,
          "traumaname": datas.Traumaname,
          "traumadate": datas.Traumadate,
          "reason": datas.Reason,
          "blooddate": datas.Blooddate,
          "father": datas.father,
          "mother": datas.Mother,
          "brothersister": datas.Brothersister,
          "children": datas.Children,
          "geneticdiseases": datas.Geneticdiseases,
          "disability": datas.Disability,
          "chu_fang": datas.ChuFang,
          "ran_liao": datas.RanLiao,
          "yin_shui": datas.YinShui,
          "cesuo": datas.Cesuo,
          "qin_chu_lan": datas.QinChuLan,
          "upload": datas.Upload
        };
        common.getData(url, 'PUT', newdata, token).then(function (res) {
          if (res.data.code == '0') {
            common.getPopUp('修改成功！', 'success');
            that.setData({ groupdataShow: false })
          } else {
            common.getPopUp('修改失败！', 'error');
            that.setData({ groupdataShow: false })
          }
        })
      } else {
        wx.hideLoading();
        // common.getPopUp('获取信息失败', 'none');
        common.navigateBack();
      }
    })
  },

  getGroup: function (e) { this.setData({ groupChoose: e.detail.value }) },

  //新建协管
  newAssist: function () { },

  //新建教育活动
  newActive: function () { }
})