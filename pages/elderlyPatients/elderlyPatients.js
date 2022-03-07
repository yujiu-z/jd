// pages/elderlyPatients/elderlyPatients.js

var config = require('../../utils/config.js');
var common = require('../../utils/common.js');
const { icon, imgurl } = require('../../utils/config.js');
var nowTime = common.getTime().slice(0, 10);
Page({
    data: {
      systoken:'',
      myid:'',
      Nextstatuslist:[
        {value: '0', name: '否', checked: false},
        {value: '1', name: '是', checked: false},
      ],
      Deliriumlist:[
        {value: '0', name: '否', checked: false},
        {value: '1', name: '是', checked: false},
      ],
      painlist:[
        {value: '0', name: '否', checked: false},
        {value: '1', name: '是', checked: false},
      ],
      Parkinsonlist:[
        {value: '0', name: '否', checked: false},
        {value: '1', name: '是', checked: false},
      ],
      depressionlist:[
        {value: '0', name: '否', checked: false},
        {value: '1', name: '是', checked: false},
      ],
      syncopelist:[
        {value: '0', name: '否', checked: false},
        {value: '1', name: '是', checked: false},
      ],
      multiplelist:[
        {value: '0', name: '否', checked: false},
        {value: '1', name: '是', checked: false},
      ],
      dementialist:[
        {value: '0', name: '否', checked: false},
        {value: '1', name: '是', checked: false},
      ],
      insomnialist:[
        {value: '0', name: '否', checked: false},
        {value: '1', name: '是', checked: false},
      ],
      urinarylist:[
        {value: '0', name: '否', checked: false},
        {value: '1', name: '是', checked: false},
      ],
      pressurelist:[
        {value: '0', name: '否', checked: false},
        {value: '1', name: '是', checked: false},
      ],
      usewslist:[
        {value: '0', name: '否', checked: false},
        {value: '1', name: '是', checked: false},
      ],
      control:[
        {value: '0', name: '否', checked: false},
        {value: '1', name: '是', checked: false},
      ],
      bigcontrol:[
        {value: '0', name: '否', checked: false},
        {value: '1', name: '是', checked: false},
      ],
      Nextstatus:'',//跌倒
      Delirium:'',//谵妄
      pain:'',//慢性疼痛
      Parkinson:'',//帕金森
      depression:'',//抑郁症
      syncope:'',//晕厥
      multiple:'',//多重用药
      dementia:'',//痴呆
      insomnia:'',//失眠
      urinary:'',//尿失禁
      pressure:'',//压力性损伤
      other:'',
      rid:'',
      id:'',
      userid:"",
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
              // setTimeout(function () { common.reLaunch('../login/login') }, 1000)
          }
      })
  },  

  getinfo(rid,token){
    var url = 'https://api.lotusdata.com/homedoctor/elderly/v1/abilityscale/'+rid,
        that = this;
    common.getData(url,'GET','',token).then(res=>{
      if(res.data.code == 0){
        var arr  = JSON.parse(res.data.data.Choiceof ) ,
            other = res.data.data.Remark;
            that.setData({other})
            arr.forEach((v,i)=>{
              if(i==0){
                that.getNextstatuslist(v,true)
              }else if(i==1){
                that.getDeliriumlist(v,true)
              }else if(i==2){
                that.getpainlist(v,true)
              }else if(i==3){
                that.getParkinsonlist(v,true)
              }else if(i==4){
                that.getdepressionlist(v,true)
              }else if(i==5){
                that.getsyncopelist(v,true)
              }else if(i==6){
                that.getmultiplelist(v,true)
              }else if(i==7){
                that.getdementialist(v,true)
              }else if(i==8){
                that.getinsomnialist(v,true)
              }else if(i==9){
                that.geturinarylist(v,true)
              }else if(i==10){
                that.getpressurelist(v,true)
              }
            })
      }else if (res.data.code == -2){
        that.RefreshSystoken(that.data.systoken)
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
            }
        })
  },

  getpainlist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var painlist = this.data.painlist,
          pain = val*1;
          painlist.forEach((v,i)=>{
            if(pain == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({pain,painlist})
    },

    getmultiplelist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var multiplelist = this.data.multiplelist,
          multiple = val*1;
          multiplelist.forEach((v,i)=>{
            if(multiple == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({multiple,multiplelist})
    },

    getdementialist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var dementialist = this.data.dementialist,
          dementia = val*1;
          dementialist.forEach((v,i)=>{
            if(dementia == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({dementia,dementialist})
    },

    getinsomnialist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var insomnialist = this.data.insomnialist,
          insomnia = val*1;
          insomnialist.forEach((v,i)=>{
            if(insomnia == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({insomnia,insomnialist})
    },

    getsyncopelist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var syncopelist = this.data.syncopelist,
          syncope = val*1;
          syncopelist.forEach((v,i)=>{
            if(syncope == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({syncope,syncopelist})
    },

    getdepressionlist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var depressionlist = this.data.depressionlist,
          depression = val*1;
          depressionlist.forEach((v,i)=>{
            if(depression == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({depression,depressionlist})
    },

    geturinarylist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var urinarylist = this.data.urinarylist,
          urinary = val*1;
          urinarylist.forEach((v,i)=>{
            if(urinary == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({urinary,urinarylist})
    },

    getNextstatuslist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var Nextstatuslist = this.data.Nextstatuslist,
          Nextstatus = val*1;
          Nextstatuslist.forEach((v,i)=>{
            if(Nextstatus == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({Nextstatus,Nextstatuslist})
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
    },
    
    getpressurelist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var pressurelist = this.data.pressurelist,
          pressure = val*1;
          pressurelist.forEach((v,i)=>{
            if(pressure == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({pressure,pressurelist})
    },

    getParkinsonlist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var Parkinsonlist = this.data.Parkinsonlist,
          Parkinson = val*1;
          Parkinsonlist.forEach((v,i)=>{
            if(Parkinson == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({Parkinsonlist,Parkinson})
    },

    getDeliriumlist(e,change){
      if(change){
        var val = e;
      }else{
        var val = e.detail.value;
      }
      var Deliriumlist = this.data.Deliriumlist,
          Delirium = val*1;
          Deliriumlist.forEach((v,i)=>{
            if(Delirium == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({Delirium,Deliriumlist})
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
    },

    getother(e){
      var val = e.detail.value;
      this.setData({other:val})
    },

    save(){
      var url = 'https://api.lotusdata.com/homedoctor/elderly/v1/abilityscale',
          dates = this.data,
          arr = [dates.Nextstatus,dates.Delirium,dates.pain,dates.Parkinson,dates.depression,dates.syncope,dates.multiple, dates.dementia,dates.insomnia,dates.urinary, dates.pressure,],
          data={
            'Elderyid': this.data.id,
            "Residentsid": this.data.Residentsid,
            "Evaluatorid": this.data.myid,
            "Score": '',
            "Choiceof": JSON.stringify(arr),
            "Assessmentype":"4",
            "Remark":this.data.other
          },
          scores=0,
          rid = this.data.rid,
          typestatus = '' ;
          arr.forEach((v,i)=>{
            var index = i+1;
            scores++
            if(v === ''){
              common.getPopUp('第'+index+'提未填写','none')
              throw new Error('终止循环') // 终止循环
            }
          })
          data.Score = scores;
          if(rid == ''&& rid != undefined){
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