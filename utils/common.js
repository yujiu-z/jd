// request 
module.exports.getData = function (url, method, data, header) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: encodeURI(url),
      data: data,
      method: method,
      header: { 'Authorization': header },
      success: function (res) { resolve(res) },
      fail: function (res) { reject(res) }
    })
  })
}

// 选择图片
module.exports.chooseImage = function (num, sourceType) {
  return new Promise(function (resolve, reject) {
    wx.chooseImage({
      count: num, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: sourceType ? sourceType : ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) { resolve(res) },
      fail: function (res) { reject(res) }
    })
  })
}

// 视频上传
module.exports.chooseVideo = function (num) {
  return new Promise(function (resolve, reject) {
    wx.chooseVideo({
      count: num,
      sourceType: ['album', 'camera'],
      success: function (res) { resolve(res) },
      fail: function (res) { reject(res) }
    })
  })
}

// 图片、视频上传
module.exports.getUploadData = function (url, method, header, filePath, name) {
  return new Promise(function (resolve, reject) {
    wx.uploadFile({
      url: encodeURI(url),
      method: method,
      header: { 'Authorization': header },
      filePath: filePath,
      name: name,
      success: function (res) { resolve(res) },
      fail: function (res) { reject(res) }
    })
  })
}

// 去掉h5标签
module.exports.deleteHtml = function (content) {
  var content = content.replace(/<[^>]+>/g, "")
  content = content.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
  content = content.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
  content = content.replace(/ /ig, '');//去掉
  content = content.replace(/&nbsp;/ig, '')//去掉nb空格
  content = content.replace(/&gt;/ig, '>')//大于号
  content = content.replace(/&lt;/ig, '<')//小于号
  content = content.replace(/\n/g, '')//去掉换行符
  return content
}

// 提示弹窗
module.exports.getPopUp = function (text, status) { wx.showToast({ title: text, icon: status, duration: 1000, }) }

// 提示弹窗(需主动调用 wx.hideLoading 才能关闭提示框)
module.exports.showLoading = function (text) { wx.showLoading({ title: text, }) }

// 隐藏弹窗 wx.showLoading() 提示框
module.exports.hideLoading = function () { wx.hideLoading() }

// 跳转至其他页面
module.exports.navigateTo = function (pageUrl) { wx.navigateTo({ url: pageUrl, }) }

// 关闭当前页面，跳转至其他页面
module.exports.redirectTo = function (pageUrl) { wx.redirectTo({ url: pageUrl, }) }

// 调至tabar 页面
module.exports.switchTab = function (pageUrl) { wx.switchTab({ url: pageUrl, }) }

// 关闭指定页面以外的所有页面
module.exports.reLaunch = function (pageUrl) { wx.reLaunch({ url: pageUrl, }) }

// 返回上一页
module.exports.navigateBack = function () { setTimeout(function () { wx.navigateBack('1') }, 1000) }

// 本地下载图片
module.exports.downloadFile = function (url) {
  return new Promise(function (resolve, reject) {
    wx.downloadFile({
      url: url,
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

// 获取当前时间
module.exports.getTime = function () {
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth() + 1;  // 获取当前月份(0-11,0代表1月)
  var day = myDate.getDate();         // 获取当前日(1-31)
  var hours = myDate.getHours();      // 获取当前小时数(0-23)
  var minutes = myDate.getMinutes();  // 获取当前分钟数(0-59)
  var seconds = myDate.getSeconds();  // 获取当前秒数(0-59)
  function str(num) {
    if (num <= 9) { num = '0' + num }
    return num
  }
  var nowDate = year + '-' + str(month) + '-' + str(day) + ' ' + str(hours) + ':' + str(minutes) + ':' + str(seconds)
  return nowDate
}

module.exports.formatTime = function (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const weekday = date.getDay()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':') + ' ' + weekdayStyle(weekday)

  function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  function weekdayStyle(date) {
    if (date == 0) { date = '周日' }
    else if (date == 1) { date = '周一' }
    else if (date == 2) { date = '周二' }
    else if (date == 3) { date = '周三' }
    else if (date == 4) { date = '周四' }
    else if (date == 5) { date = '周五' }
    else if (date == 6) { date = '周六' }
    return date
  }
}

