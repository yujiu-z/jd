// pages/perceptionRatingScale/perceptionRatingScale.js
var config = require('../../utils/config.js');
var common = require('../../utils/common.js');
const { icon, imgurl } = require('../../utils/config.js');
var nowTime = common.getTime().slice(0, 10);
Page({
    data: {
      systoken:'',
      number:0,
      tiemlistval:'',//意识水平
      spacesval:'',//视力
      walklistval:'',//听力
      unwalklistval:'',//沟通交流
      tiemlist:[
        {value: '0', name: '神志清醒，对周围环境警觉', checked: false},
        {value: '1', name: '嗜睡，表现为睡眠状态过度延 长。当呼唤或推动其肢体时可唤醒， 并能进行正确的交谈或执行指令，停 止刺激后又继续入睡', checked: false},
        {value: '2', name: '昏睡，一般的外界刺激不能使其 觉醒，给予较强烈的刺激时可有短时 的意识清醒，醒后可简短回答提问， 当剌激减弱后又很快进入睡眠状态', checked: false},
        {value: '3', name: '昏迷，处于浅昏迷时对疼痛刺激 有回避和痛苦表情；处于深昏迷时对 刺激无反应（若评定为昏迷，直接评 定为重度失能，可不进行以下项目的 评估）', checked: false},
      ],
      spaces:[
        {value: '0', name: '分视力完好，能看清书报上的标准字体', checked: false},
        {value: '1', name: '视力有限，看不清报纸标准字 体，但能辨认物体', checked: false},
        {value: '2', name:'辨认物体有困难，但眼睛能跟随 物体移动，只能看到光、颜色和形状', checked: false},
        {value: '3', name: '没有视力，眼睛不能跟随物体移动', checked: false},
      ],
      walklist:[
        {value: '0', name: '可正常交谈，能听到电视、电话、 门铃的声音', checked: false},
        {value: '1', name: '在轻声说话或说话距离超过2米 时听不清', checked: false},
        {value: '2', name: '正常交流有些困难，需在安静 的环境、大声说话或语速很慢，才能听到', checked: false},
        {value: '3', name: '完全听不见', checked: false},
      ],
      unwalklist:[
        {value: '0', name: '无困难，能与他人正常沟通和交流', checked: false},
        {value: '1', name: '能够表达自己的需要或理解别 人的话，但需要增加时间或给予帮助', checked: false},
        {value: '2', name: '勉强可与人交往，谈吐内容不清楚，表情不恰当', checked: false},
        {value: '3', name: '不能表达需要或理解他人的话', checked: false},
      ],
      myid:'',
      Residentsid:'',
      rid:'',
      id:'',
      userid:'',
      u_token:''
    },

    onLoad: function (options) {
        var _this = this
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
                setTimeout(function () { common.reLaunch('../logs/logs') }, 1000)
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
            if(tiemlistval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({tiemlistval,tiemlist})
      this.number()
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
            if(spacesval == i){
              v.checked = true
            }else{
              v.checked = false
            }
          })
      this.setData({spacesval,spaces})
      this.number()
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
      this.number()
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
      this.number()
    },

    number(){
      var self = this.data,
          tiemlistval = self.tiemlistval == '' ? '0' :self.tiemlistval,
          spacesval = self.spacesval == '' ? '0' :self.spacesval,
          walklistval = self.walklistval == '' ? '0' :self.walklistval,
          unwalklistval = self.unwalklistval == '' ? '0' :self.unwalklistval,
          number = tiemlistval*1+spacesval*1+walklistval*1+unwalklistval*1;
          this.setData({number})
    },

    save(){
      var url = 'https://api.lotusdata.com/homedoctor/elderly/v1/abilityscale',
          dates = this.data,
          that = this,
          arr =[ dates.tiemlistval,dates.spacesval,dates.walklistval,dates.unwalklistval],
          data={
            'Elderyid': this.data.id,
            "Residentsid": this.data.Residentsid,
            "Evaluatorid": this.data.myid,
            "Score": this.data.number,
            "Choiceof": JSON.stringify(arr),
            "Assessmentype":"3",//
            "Remark":"感知觉与沟通能力评分表"
          },
          rid = this.data.rid,
          typestatus = '' ;
          if(rid == '' || rid != undefined){
            typestatus = 'POST'
          }else{
            typestatus = 'PUT'
            url = 'https://api.lotusdata.com/homedoctor/elderly/v1/abilityscale/'+this.data.rid;
          }
          arr.forEach((v,i)=>{
            var index = i+1;
            if(v === ''){
              common.getPopUp('第'+index+'提未填写','none')
              throw new Error('终止循环') // 终止循环
            }
          })
          common.getData(url,typestatus,data,this.data.u_token).then(res=>{
            if(res.data.code == 0 ){
              wx.navigateBack({
                delta:1
              })
            }else if(res.data.code == -2){
              that.RefreshSystoken(that.data.systoken)
            }
          })},
          RefreshSystoken(token){
            var url = 'https://auth.lotusdata.com/v1/login/refreshtoken',
                self = this,
                data = {
                    "usertype":"system",
                    "token": token.slice(3)
                  };
                common.getData(url,'POST',data,'').then(res=>{
                  if(res.data.code == 0){
                    if (res.data.code == "0") {
                        var token = "JWT " + res.data.data;
                        self.setData({systoken :token})
                        wx.setStorage({ key: 'systoken', data: token })
                    }else if(res.data.code == -2){
                      self.RefreshSystoken(self.data.systoken)
                    } else {
                        common.getPopUp('token获取失败，请重试', 'none')
                    }
                  }
                })
          }

})