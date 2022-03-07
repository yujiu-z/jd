// pages/qrCode/qrCode.js
var config = require('../../utils/config.js');
var common = require('../../utils/common.js');
Page({
  data: {
    u_token: '',
    myId: '',
    docName: '',
    docSrc: '',
    docHospital: '',
    docDep: '',
    docSex: '',
    wxPic: '',
    again: '0',
    settingShow: false,
    qrType: '0',  //'0'个人 '1'团队
    typeArr: ['个人建档', '儿童表单', '健康体检', '老年人', '高血压随访', '糖尿病随访', '孕产妇', '儿童体检登记'],
    typeIndex: 0,
    tips: '扫一扫上方小程序码建档'
  },

  onLoad(options) {
    wx.showLoading({ title: '请稍候', mask: true })
    var that = this;
    wx.getStorage({
      key: 'accesstoken',
      success: function (res) {
        var u_token = res.data;
        wx.getStorage({
          key: 'myId',
          success: function (res) {
            var myId = res.data;
            that.setData({ u_token: u_token, myId: myId })
            that.getQrCode()
          }
        })
      }
    })
    wx.getStorage({
      key: 'headImg',
      success: function (res) {
        if (res.data != '') {
          that.setData({ docSrc: res.data })
        } else {
          that.setData({ docSrc: 'https://media.lotusdata.com/10024256066813961.jpg' })
        }
      },
      fail: function () { that.setData({ docSrc: 'https://media.lotusdata.com/10024256066813961.jpg' }) }
    })
    wx.getStorage({
      key: 'docName',
      success: function (res) { that.setData({ docName: res.data }) }
    })
  },

  changeType: function (e) {
    this.setData({ typeIndex: e.detail.value });
    wx.showLoading({ title: '请稍候', mask: true })
    this.getQrCode();
  },

  getQrCode: function () {
    var that = this,
      typeIndex = that.data.typeIndex,
      get_url = '',
      tips = '',
      TOKEN = that.data.u_token,
      data = {};
    if (typeIndex == '0') {
      get_url = 'https://api.lotusdata.com/v1/wx/wxapppagecode?appid=wx64256017793465f6';
      data = { "scene": that.data.myId, "page": "pages/setFile/setFile" };
      tips = '扫一扫上方小程序码建档';
    } else if (typeIndex == '1') {
      get_url = 'https://api.lotusdata.com/v1/wx/wxapppagecode?appid=wxb749c5b8e8473763';
      data = { "scene": '5_' + that.data.myId, "page": "manage/publicIdnum/publicIdnum" };
      tips = '扫一扫上方小程序码填儿童表单';
    } else if (typeIndex == '2') {
      get_url = 'https://api.lotusdata.com/v1/wx/wxapppagecode?appid=wxb749c5b8e8473763';
      data = { "scene": '3_' + that.data.myId, "page": "manage/publicIdnum/publicIdnum" };
      tips = '扫一扫上方小程序码填体检档案';
    } else if (typeIndex == '3') {
      get_url = 'https://api.lotusdata.com/v1/wx/wxapppagecode?appid=wxb749c5b8e8473763';
      data = { "scene": '0_' + that.data.myId, "page": "manage/publicIdnum/publicIdnum" };
      tips = '扫一扫上方小程序码老年人自理能力评估';
    } else if (typeIndex == '4') {
      get_url = 'https://api.lotusdata.com/v1/wx/wxapppagecode?appid=wxb749c5b8e8473763';
      data = { "scene": '1_' + that.data.myId, "page": "manage/publicIdnum/publicIdnum" };
      tips = '扫一扫上方小程序码高血压随访';
    } else if (typeIndex == '5') {
      get_url = 'https://api.lotusdata.com/v1/wx/wxapppagecode?appid=wxb749c5b8e8473763';
      data = { "scene": '2_' + that.data.myId, "page": "manage/publicIdnum/publicIdnum" };
      tips = '扫一扫上方小程序码糖尿病随访';
    } else if (typeIndex == '6') {
      get_url = 'https://api.lotusdata.com/v1/wx/wxapppagecode?appid=wxb749c5b8e8473763';
      data = { "scene": '4_' + that.data.myId, "page": "manage/publicIdnum/publicIdnum" };
      tips = '扫一扫上方小程序码产后第一次随访';
    } else if (typeIndex == '7') {
      get_url = 'https://api.lotusdata.com/v1/wx/wxapppagecode?appid=wx64256017793465f6';
      data = { "scene": '4_' + that.data.myId, "page": "manage/childgetinfo/childgetinfo" };
      tips = '扫一扫上方儿童基本信息录入';
    }
    common.getData(get_url, 'POST', data, TOKEN).then(function (res) {
      if (res.data.code == 0) {
        that.setData({ wxPic: res.data.data, tips: tips })
        wx.hideLoading()
      }
    })
  },

  save: function () {
    var _this = this,
      again = _this.data.again,
      qrCodeImg = _this.data.wxPic,
      pic = _this.data.docSrc,
      docName = _this.data.docName,
      tips = _this.data.tips,
      context = wx.createCanvasContext('firstCanvas');
    if (again == '0') {
      _this.setData({ again: '1' })
      common.showLoading('正在生成...')
      common.downloadFile(qrCodeImg).then(function (res) {
        var wxImg = res.tempFilePath;
        context.setFillStyle('white')
        context.fillRect(0, 0, 320, 390)

        context.drawImage(wxImg, 20, 80, 280, 280)

        context.setTextAlign('left')
        context.setFillStyle('black')
        context.setFontSize(20)
        context.fillText(docName, 90, 40)

        context.setTextAlign('center')
        context.setFillStyle('gray')
        context.setFontSize(16)
        context.fillText(tips, 160, 375)

        common.downloadFile(pic).then(function (res) {
          var mysrc = res.tempFilePath;
          context.drawImage(mysrc, 20, 20, 60, 60)
          context.draw(true, function (e) {
            wx.canvasToTempFilePath({
              canvasId: 'firstCanvas',
              x: 0,
              y: 0,
              width: 320,
              height: 390,
              success: function (res) {
                var tempFilePath = res.tempFilePath;
                wx.saveFile({
                  tempFilePath: tempFilePath,
                  success: function (res) {
                    var savedFilePath = res.savedFilePath;
                    wx.saveImageToPhotosAlbum({
                      filePath: res.savedFilePath,
                      success(res) {
                        common.hideLoading()
                        common.getPopUp('保存成功', 'success')
                        wx.removeSavedFile({ filePath: savedFilePath, complete: function (res) { } })
                        _this.setData({ again: '0' })
                      },
                      fail() {
                        common.hideLoading()
                        _this.setData({ settingShow: true, again: '0' })
                      }
                    })
                  },
                  fail: function (e) {
                    wx.getSavedFileList({
                      success: function (res) {
                        for (var i in res.fileList) { wx.removeSavedFile({ filePath: res.fileList[i].filePath, complete: function (res) { } }) }
                        _this.save()
                      }
                    })
                  }
                });
              }, complete: function (e) { }
            });
          })
        })
      })
    } else if (again == '1') {
      common.getPopUp('请勿重复操作！', 'loading')
      setTimeout(function () { common.showLoading('生成图片中...') }, 1000)
    }
  },

  handler: function (e) {
    if (e.detail.authSetting['scope.writePhotosAlbum']) {
      this.setData({ settingShow: false })
      this.save()
    }
  },

  cancel: function () {
    this.setData({ settingShow: false })
  }
})