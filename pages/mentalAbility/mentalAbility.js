// pages/oldNuspirit/oldNusSpirit.js
var config = require('../../utils/config.js');
var common = require('../../utils/common.js');
const { icon, imgurl } = require('../../utils/config.js');
var nowTime = common.getTime().slice(0, 10);
Page({
    data: {
      systoken:'',
      tiemlist:[
        {value: '0', name: '时间观念 (年 、月、日、叶)清楚', checked: false},
        {value: '1', name: '时间观念有些下降，年、月、日不清楚，但有时相差几天', checked: false},
        {value: '2', name: '时间观念很差，年、月、日不清楚，可知上半年或下半年', checked: false},
        {value: '3', name: '时间观念很差，年、月、日不清楚，可知上午或下午', checked: false},
        {value: '5', name: '无时间观念', checked: false},
      ],
      spaces:[
        {value: '0', name: '可单独出远门，能很快掌握新环境的方位', checked: false},
        {value: '1', name: '可独立来往于近街，知道现住地址的名称和方位，但不知回家路线', checked: false},
        {value: '2', name:'只能单独在家附近行动，对现住地址只知道名称，不知道方位', checked: false},
        {value: '3', name: '只能在左邻右舍间串门，对现住地不知名称和方位', checked: false},
        {value: '5', name: '不能单独出现', checked: false},
      ],

      walklist:[
        {value: '0', name: '知道周围人们的关系，知道祖孙、叔 伯、姑姨、侄子侄女等称谓的意义；可分辨 陌生人的大致年龄和身份，可用适当称呼', checked: false},
        {value: '1', name: '只知家中亲密近亲的关系，不会分辨 陌生人的大致年龄，不能称呼陌生人', checked: false},
        {value: '2', name: '只能称呼家中人，或只能照样称呼， 不知其关系，不辨辈分', checked: false},
        {value: '3', name: '只认识常同住的亲人，可称呼子女或 孙子女，可辨熟人和生人', checked: false},
        {value: '5', name: '只认识保护人，不辨熟人和生人', checked: false},
      ],

      unwalklist:[
        {value: '0', name: '总是能够保持与社会、年龄所适应的 长、短时记忆，能够完整的回忆', checked: false},
        {value: '1', name: '出现轻度的记忆紊乱或回忆不能（不能回忆即时信息，3个词语经过5分钟后仅 能回忆0-1个）', checked: false},
        {value: '2', name: '出现中度的记忆紊乱或回忆不能（不能 回忆近期记忆，不记得上一顿饭吃了什么）', checked: false},
        {value: '3', name: '出现重度的记忆紊乱或回忆不能（不 能回忆远期记忆，不记得自己的老朋友）', checked: false},
        {value: '5', name: '记忆完全紊乱或完全不能对既往事物 进行正确的回忆', checked: false},
      ],

      endurancelist:[
        {value: '0', name: '没出现', checked: false},
        {value: '1', name: '正常完成 日常活动轻度费力,有疲劳感', checked: false},
        {value: '2', name: '完成日常活动比较费力,经常疲劳', checked: false},
        {value: '3', name: '完成日常活动十分费力,绝大多数时候都很疲劳', checked: false},
        {value: '5', name: '不能完成日常活动，极易疲劳', checked: false},
      ],

      lowlist:[
        {value: '0', name: '不需要帮助', checked: false},
        {value: '1', name: '每月出现一两次', checked: false},
        {value: '2', name: '每周出现一两次', checked: false},
        {value: '3', name: '过去3天里出现过一两次', checked: false},
        {value: '5', name: '过去3天里天天出现', checked: false},
      ],

      foodlist:[
        {value: '0', name: '没出现', checked: false},
        {value: '1', name: '每月出现一两次', checked: false},
        {value: '2', name: '每周出现一两次', checked: false},
        {value: '3', name: '过去3天里出现过一两次', checked: false},
        {value: '5', name: '过去3天里天天出现', checked: false},
      ],

      repairlist:[
        {value: '0', name: '无强迫症状（如反复洗手、关门、上 厕所等）', checked: false},
        {value: '1', name: '每月有1-2次强迫行为', checked: false},
        {value: '2', name: '每周有1-2次强迫行为', checked: false},
        {value: '3', name: '过去3天里出现过一两次', checked: false},
        {value: '5', name: '过去3天里天天出现', checked: false},
      ],

      Dressing:[
        {value: '0', name: '金钱的管理、支配、使用，能独立完成', checked: false},
        {value: '1', name: '因担心算错，每月管理约1000元', checked: false},
        {value: '2', name: '因担心算错，每月管理约300元', checked: false},
        {value: '3', name: '接触金钱机会少，主要由家属代管', checked: false},
        {value: '5', name: '完全不接触金钱等', checked: false},
      ],
      tiemlistval:'',//时间观念
      spacesval:'',//空间观念
      walklistval:'',//人物定向
      unwalklistval:'',//记忆
      endurancelistval:'',//攻击行为
      lowlistval:'',//抑郁症状
      foodlistval:'',//强迫行为
      repairlistval:'',//财富
      number:0,
      rid:'',
      id:'',
      Residentsid:'',
      myid:'',
      userid:'',
      u_token:''
    },

    onLoad: function (options) {
        var _this = this;
        wx.getStorage({
            key: 'JYTokens',
            success: function (res) {
                var u_token = res.data
                _this.setData({u_token:u_token})
                wx.getStorage({
                    key: 'Accountid',
                    success: function (res) {
                      var myid = res,data
                      wx.getStorage({
                        key:'sysToken',
                        success:function(res){
                          var systoken = res.data;
                          _this.setData({systoken,myid,Residentsid: options.Residentsid ,rid: options.rid,id: options.id ,userid:options.Evaluatorid})
                          if(options.rid != '' && options.rid != undefined){
                            _this.getinfo(options.rid,systoken)
                          }
                        }
                      })
                    },
                })
            },
            fail: function (res) {
                common.getPopUp('请重新登陆', 'loading')
                wx.clearStorage()
                setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
            }
        })
    },

    RefreshSystoken(token){
      var url = 'https://auth.lotusdata.com/v1/login/refreshtoken',
          self = this,
          data = {
              "usertype":"system",
              "token": token.slice(3)
            };
          common.getData(url,'POST',data,'').then(res=>{
              if (res.data.code == "0") {
                  var token = "JWT " + res.data.data;
                  self.setData({systoken :token})
                  wx.setStorage({ key: 'systoken', data: token })
              } else if (res.data.code == -2){
                that.RefreshSystoken(that.data.systoken)
              }
          })
    },

    gettiemlist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var tiemlist = this.data.tiemlist,
          tiemlistval = val*1;
          tiemlist.forEach((v,i)=>{
            if(tiemlistval == 5){
              i++
            }
            if(tiemlistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({tiemlistval,tiemlist})
      this.getnumber()
    },

    getinfo(rid,token){
      var url = 'https://api.lotusdata.com/homedoctor/elderly/v1/abilityscale/'+rid,
          that = this;
      common.getData(url,'GET','',token).then(res=>{
        if(res.data.code == 0){
          var arr  = JSON.parse(res.data.data.Choiceof ) ;
              arr.forEach((v,i)=>{
                if(i==0){
                  that.gettiemlist(v,true)
                }else if(i==1){
                  that.getspaces(v,true)
                }else if(i==2){
                  that.getwalklist(v,true)
                }else if(i==3){
                  that.getunwalklist(v,true)
                }else if(i==4){
                  that.getendurancelist(v,true)
                }else if(i==5){
                  that.getlowlist(v,true)
                }else if(i==6){
                  that.getfoodlist(v,true)
                }else if(i==7){
                  that.getrepairlist(v,true)
                }
              })
        }else if (res.data.code == -2){
          that.RefreshSystoken(that.data.systoken)
        }
      })
    },

    getspaces(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var spaces = this.data.spaces,
          spacesval = val*1;
          spaces.forEach((v,i)=>{
            if(spacesval == 5){
              i++
            }
            if(spacesval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({spaces,spacesval})
      this.getnumber()
    },

    getwalklist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var walklist = this.data.walklist,
          walklistval = val*1;
          walklist.forEach((v,i)=>{
            if(walklistval == 5){
              i++
            }
            if(walklistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({walklist,walklistval})
      this.getnumber()
    },

    getunwalklist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var unwalklist = this.data.unwalklist,
          unwalklistval = val*1;
          unwalklist.forEach((v,i)=>{
            if(unwalklistval == 5){
              i++
            }
            if(unwalklistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({unwalklist,unwalklistval})
      this.getnumber()
    },

    getendurancelist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var endurancelist = this.data.endurancelist,
          endurancelistval = val*1;
          endurancelist.forEach((v,i)=>{
            if(endurancelistval == 5){
              i++
            }
            if(endurancelistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({endurancelist,endurancelistval})
      this.getnumber()
    },

    getlowlist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var lowlist = this.data.lowlist,
          lowlistval = val*1;
          lowlist.forEach((v,i)=>{
            if(lowlistval == 5){
              i++
            }
            if(lowlistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({lowlist,lowlistval})
      this.getnumber()
    },

    getfoodlist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var foodlist = this.data.foodlist,
          foodlistval = val*1;
          foodlist.forEach((v,i)=>{
            if(foodlistval == 5){
              i++
            }
            if(foodlistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({foodlist,foodlistval})
      this.getnumber()
    },

    getrepairlist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var repairlist = this.data.repairlist,
          repairlistval = val*1;
          repairlist.forEach((v,i)=>{
            if(repairlistval == 5){
              i++
            }
            if(repairlistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({repairlist,repairlistval})
      this.getnumber()
    },

  getnumber(){
    var self = this.data,
        tiemlistval=   self.tiemlistval == ''? '0' :  self.tiemlistval*1, 
        spacesval  = self.spacesval*1 == ''? '0' : self.spacesval*1,
        walklistval = self.walklistval*1  == ''? '0' :  self.walklistval*1,
        unwalklistval  =  self.unwalklistval*1== ''? '0' :  self.unwalklistval*1,
        endurancelistval = self.endurancelistval*1 == ''? '0' :  self.endurancelistval*1,
        lowlistval = self.lowlistval*1  == ''? '0' : self.lowlistval*1,
        foodlistval = self.foodlistval*1  == ''? '0' :  self.foodlistval*1,
        repairlistval  = self.repairlistval  == ''? '0' :  self.repairlistval,
        number= tiemlistval*1 + spacesval*1 + walklistval*1 + unwalklistval*1 + endurancelistval*1 + lowlistval*1 + foodlistval*1 + repairlistval*1;
        this.setData({number})
  },

  save(){
    var url = 'https://api.lotusdata.com/homedoctor/elderly/v1/abilityscale',
        self = this.data,
        that = this,
        arr = [self.tiemlistval,self.spacesval, self.walklistval,self.unwalklistval,self.endurancelistval,self.lowlistval,self.foodlistval,self.repairlistval],
        data={
          'Elderyid': this.data.id,
          "Residentsid": this.data.Residentsid,
          "Evaluatorid": this.data.myid,
          "Score": this.data.number,
          "Choiceof": JSON.stringify(arr),
          "Assessmentype":"2",//
          "Remark":"精神状态与社会参与能力评分表"
        },
        rid = this.data.rid,
        typestatus = '' ;
        arr.forEach((v,i)=>{
          var index = i+1;
          if(v === ''){
            common.getPopUp('第'+index+'提未填写','none')
            throw new Error('终止循环') // 终止循环
          }
        })
        if(rid == '' || rid != undefined){
          typestatus = 'POST'
        }else{
          typestatus = 'PUT'
          url = 'https://api.lotusdata.com/homedoctor/elderly/v1/abilityscale/'+this.data.rid;
        }
        common.getData(url,typestatus,data,this.data.u_token).then(res=>{
          if(res.data.code == 0 ){
            wx.navigateBack({
              delta:1
            })
          }else if (res.data.code == -2){
            that.RefreshSystoken(that.data.systoken)
          }
        })
  },

})