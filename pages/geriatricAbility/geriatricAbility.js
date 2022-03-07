// pages/geriatricAbility/geriatricAbility.js

var config = require('../../utils/config.js');
var common = require('../../utils/common.js');
const { icon, imgurl } = require('../../utils/config.js');
var nowTime = common.getTime().slice(0, 10);
Page({
    data: {
      systoken:'',
      number:0,
      myid:'',
      positionsta:[
        {value: '0', name: '不需要帮助', checked: false},
        {value: '1', name: '在他人的语言指导下或照看下能够完成', checked: false},
        {value: '2', name: '需要他人动手帮助，但以自身完成为主', checked: false},
        {value: '3', name: '主要靠帮助，自身只是配合', checked: false},
        {value: '4', name: '完全需要帮助或更严重的情况', checked: false},
      ],
      bedchairsta:[
        {value: '0', name: '个体可以独立地完成床椅转移', checked: false},
        {value: '1', name: '个体在床椅转移时需要他人监控或指导', checked: false},
        {value: '2', name: '个体在床椅转移时需要他人小量接触式帮助', checked: false},
        {value: '3', name: '个体在床椅转移是需要他人大量接触式帮助', checked: false},
        {value: '4', name: '个体在床椅转移时完全依赖他人', checked: false},
      ],
      walklist:[
        {value: '0', name: '个体能独立平地步行50m左右,且无摔倒风险', checked: false},
        {value: '1', name: '个体能独立平地步行50m左右,但存在摔倒风险,需要他人监控，或使用拐杖、助行器等辅助工具', checked: false},
        {value: '2', name: '个体在步行时需要他人小量扶持帮助', checked: false},
        {value: '3', name: '个体在步行时需要他人大量扶持帮助', checked: false},
        {value: '4', name: '无法步行,完全依赖他人', checked: false},
      ],
      unwalklist:[
        {value: '0', name: '个体能够独立地使用轮椅 (或电动车)从A地移动到B地', checked: false},
        {value: '1', name: '个体使用轮椅 (或电动车)从A地移动至b地需要监视或指导', checked: false},
        {value: '2', name: '个体使用轮椅（或电动车）从A地移动至b地需要小量接触式帮助', checked: false},
        {value: '3', name: '个体使用轮椅（或电动车）从A地移动至b地需要大量接触式帮助', checked: false},
        {value: '4', name: '个体使用轮椅（或电动车）时完全依赖他人', checked: false},
      ],
      endurancelist:[
        {value: '0', name: '正常完成 日常活动，无疲劳', checked: false},
        {value: '1', name: '正常完成 日常活动轻度费力,有疲劳感', checked: false},
        {value: '2', name: '完成日常活动比较费力,经常疲劳', checked: false},
        {value: '3', name: '完成日常活动十分费力,绝大多数时候都很疲劳', checked: false},
        {value: '4', name: '不能完成日常活动，极易疲劳', checked: false},
      ],
      lowlist:[
        {value: '0', name: '不需要帮助', checked: false},
        {value: '1', name: '在他人的言语指导下或照看下能够完成', checked: false},
        {value: '2', name: '需要他人动手帮助，但以自身完成为主', checked: false},
        {value: '3', name: '主要靠帮助，自身只是配合', checked: false},
        {value: '4', name: '完全需要帮助，或更严重的情况', checked: false},
      ],
      foodlist:[
        {value: '0', name: '不需要帮助', checked: false},
        {value: '1', name: '在他人的言语指导下或照看下能够完成', checked: false},
        {value: '2', name: '使用餐具有些困难，但以自身完成为主', checked: false},
        {value: '3', name: '需要喂饭，喂食量超过一半', checked: false},
        {value: '4', name: '完全需要帮助，或更严重的情况', checked: false},
      ],
      repairlist:[
        {value: '0', name: '不需要帮助', checked: false},
        {value: '1', name: '在他人的言语指导下或照看下能够完成', checked: false},
        {value: '2', name: '需要他人帮助，但以自身完成为主', checked: false},
        {value: '3', name: '主要靠帮助，自身只是配合', checked: false},
        {value: '4', name: '完全需要帮助，或更严重的情况', checked: false},
      ],
      Dressing:[
        {value: '0', name: '不需要帮助', checked: false},
        {value: '1', name: '在他人的言语指导下或照看下能够完成', checked: false},
        {value: '2', name: '需要他人帮助，但以自身完成为主', checked: false},
        {value: '3', name: '主要靠帮助，自身只是配合', checked: false},
        {value: '4', name: '完全需要帮助，或更严重的情况', checked: false},
      ],
      Wearpants:[
        {value: '0', name: '不需要帮助', checked: false},
        {value: '1', name: '在他人的言语指导下或照看下能够完成', checked: false},
        {value: '2', name: '需要他人帮助，但以自身完成为主', checked: false},
        {value: '3', name: '主要靠帮助，自身只是配合', checked: false},
        {value: '4', name: '完全需要帮助，或更严重的情况', checked: false},
      ],
      bodylist:[
        {value: '0', name: '不需要帮助', checked: false},
        {value: '1', name: '在他人的言语指导下或照看下能够完成', checked: false},
        {value: '2', name: '需要他人帮助，但以自身完成为主', checked: false},
        {value: '3', name: '主要靠帮助，自身只是配合', checked: false},
        {value: '4', name: '完全需要帮助，或更严重的情况', checked: false},
      ],
      usewslist:[
        {value: '0', name: '不需要帮助', checked: false},
        {value: '1', name: '在他人的言语指导下或照看下能够完成', checked: false},
        {value: '2', name: '需要他人帮助，但以自身完成为主', checked: false},
        {value: '3', name: '主要靠帮助，自身只是配合', checked: false},
        {value: '4', name: '完全需要帮助，或更严重的情况', checked: false},
      ],
      control:[
        {value: '0', name: '每次都不失控', checked: false},
        {value: '1', name: '每月失控1-3次左右', checked: false},
        {value: '2', name: '每周失控一次左右', checked: false},
        {value: '3', name: '每天失控一次左右', checked: false},
        {value: '4', name: '每次都失控', checked: false},
      ],
      bigcontrol:[
        {value: '0', name: '每次都不失控', checked: false},
        {value: '1', name: '每月失控1-3次左右', checked: false},
        {value: '2', name: '每周失控一次左右', checked: false},
        {value: '3', name: '每天失控一次左右', checked: false},
        {value: '4', name: '每次都失控', checked: false},
      ],
      usemedicine:[
        {value: '0', name: '能够自己负责在正确的时间服用正确的药物', checked: false},
        {value: '1', name: '在他人的语言指导下或照看下能够完成', checked: false},
        {value: '2', name: '如果事先准备好服用的药物份量，可自行服药', checked: false},
        {value: '3', name: '主要依靠帮助服药', checked: false},
        {value: '4', name: '完全不能自行服用药物', checked: false},
      ],
      positionstaval:'',//卧位状态
      bedchairstaval:'',//床椅移动
      walklistval:'',//平地步行
      unwalklistval:'',//非步行移动
      endurancelistval:'',//活力耐力
      lowlistval:'',//上下楼梯
      foodlistval:'',//食物摄取
      repairlistval:'',//修饰
      Dressingval:'',//脱上衣
      Wearpantsval:'',//脱裤子
      bodylistval:'',//身体清洁
      usewslistval:'',//使用厕所
      controlval:'',//小便控制
      bigcontrolval:'',//大便控制
      usemedicineval:'',//服用药物
      userid:'',
      rid:'',
      id:'',
      Residentsid:'',
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
                      var myid = res.data;
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
                setTimeout(function () { common.reLaunch('../login/login') }, 1000)
            }
        })
    },  

    getinfo(rid,token){
      var url = 'https://api.lotusdata.com/homedoctor/elderly/v1/abilityscale/'+rid,
          that = this;
      common.getData(url,'GET','',token).then(res=>{
        if(res.data.code == 0){
          var arr  = JSON.parse(res.data.data.Choiceof ) ;
              arr.forEach((v,i)=>{
                if(i==0){
                  that.positionstachange(v,true)
                }else if(i==1){
                  that.getbedchairsta(v,true)
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
                }else if(i==8){
                  that.getDressing(v,true)
                }else if(i==9){
                  that.getWearpants(v,true)
                }else if(i==10){
                  that.getbodylist(v,true)
                }else if(i==11){
                  that.getusewslist(v,true)
                }else if(i==12){
                  that.getcontrol(v,true)
                }else if(i==13){
                  that.getbigcontrol(v,true)
                }else if(i==14){
                  that.getusemedicine(v,true)
                }
              })
        }
      })
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
            if(walklistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({walklistval,walklist})
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
            if(foodlistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({foodlistval,foodlist})
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
            if(repairlistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({repairlistval,repairlist})
      this.getnumber()
    },

    getDressing(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var Dressing = this.data.Dressing,
          Dressingval = val*1;
          Dressing.forEach((v,i)=>{
            if(Dressingval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({Dressingval,Dressing})
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
            if(lowlistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({lowlistval,lowlist})
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
            if(endurancelistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({endurancelistval,endurancelist})
      this.getnumber()
    },

    getWearpants(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var Wearpants = this.data.Wearpants,
          Wearpantsval = val*1;
          Wearpants.forEach((v,i)=>{
            if(Wearpantsval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({Wearpantsval,Wearpants})
      this.getnumber()
    },

    getusewslist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var usewslist = this.data.usewslist,
          usewslistval = val*1;
          usewslist.forEach((v,i)=>{
            if(usewslistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({usewslistval,usewslist})
      this.getnumber()
    },

    getcontrol(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var control = this.data.control,
          controlval = val*1;
          control.forEach((v,i)=>{
            if(controlval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({controlval,control})
      this.getnumber()
    },

    getusemedicine(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var usemedicine = this.data.usemedicine,
      usemedicineval = val*1;
          usemedicine.forEach((v,i)=>{
            if(usemedicineval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({usemedicineval,usemedicine})
      this.getnumber()
    },

    getbigcontrol(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var bigcontrol = this.data.bigcontrol,
          bigcontrolval = val*1;
          bigcontrol.forEach((v,i)=>{
            if(bigcontrolval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({bigcontrolval,bigcontrol})
      this.getnumber()
    },
    
    getbodylist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var bodylist = this.data.bodylist,
          bodylistval = val*1;
          bodylist.forEach((v,i)=>{
            if(bodylistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({bodylistval,bodylist})
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
            if(unwalklistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({unwalklistval,unwalklist})
      this.getnumber()
    },

    getbedchairsta(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var bedchairsta = this.data.bedchairsta,
          bedchairstaval = val*1;
          bedchairsta.forEach((v,i)=>{
            if(bedchairstaval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({bedchairstaval,bedchairsta})
      this.getnumber()
    },

    positionstachange(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var positionsta = this.data.positionsta,
          positionstaval = val*1;
          positionsta.forEach((v,i)=>{
            if(positionstaval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({positionstaval,positionsta})
      this.getnumber()
    },

    getnumber(){
     var  positionstaval = this.data.positionstaval=='' ? 0 : this.data.positionstaval,
          usemedicineval =  this.data.usemedicineval=='' ? 0 : this.data.usemedicineval,
          bigcontrolval =  this.data.bigcontrolval=='' ? 0 : this.data.bigcontrolval,
          controlval =  this.data.controlval=='' ? 0 : this.data.controlval,
          usewslistval =  this.data.usewslistval=='' ? 0 : this.data.usewslistval,
          bodylistval =  this.data.bodylistval=='' ? 0 : this.data.bodylistval,
          Wearpantsval =  this.data.Wearpantsval=='' ? 0 : this.data.Wearpantsval,
          Dressingval =  this.data.Dressingval =='' ? 0 : this.data.Dressingval,
          repairlistval =  this.data.repairlistval =='' ? 0 : this.data.repairlistval,
          foodlistval =  this.data.foodlistval =='' ? 0 : this.data.foodlistval,
          lowlistval =  this.data.lowlistval =='' ? 0 : this.data.lowlistval,
          endurancelistval =  this.data.endurancelistval =='' ? 0 : this.data.endurancelistval,
          unwalklistval =  this.data.unwalklistval =='' ? 0 : this.data.unwalklistval,
          walklistval =  this.data.walklistval =='' ? 0 : this.data.walklistval,
          bedchairstaval =  this.data.bedchairstaval =='' ? 0 : this.data.bedchairstaval;
     var   number = positionstaval +usemedicineval+bigcontrolval +controlval +usewslistval +bodylistval +Wearpantsval +Dressingval +repairlistval +foodlistval +lowlistval +endurancelistval +unwalklistval +walklistval +bedchairstaval ;
     this.setData({number})
    },

    save(){
      var url = 'https://api.lotusdata.com/homedoctor/elderly/v1/abilityscale',
          dates = this.data,
          arr = [dates.positionstaval,dates.bedchairstaval,dates.walklistval,dates.unwalklistval,dates.endurancelistval,dates.lowlistval,dates.foodlistval,dates.repairlistval,dates.Dressingval,dates.Wearpantsval,dates.bodylistval,dates.usewslistval,dates.controlval,dates.bigcontrolval,dates.usemedicineval],
          data={
            'Elderyid': this.data.id,
            "Residentsid": this.data.Residentsid,
            "Evaluatorid": this.data.myid,
            "Score": this.data.number,
            "Choiceof": JSON.stringify(arr),
            "Assessmentype":"1",//1、
            "Remark":"老年人日常生活活动能力"
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
            }
          })
    },

     
})