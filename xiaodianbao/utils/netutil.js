const SERV_DOMAIN = 'http://api-dev.qiyejieshao.cn:8080';
const getRemoteUrl = uri => {
  if (!uri) {
    throw "code:'ILLEGAL_PARAM', errMsg:'参数uri不能为空'";
  } else if(uri.startsWith('http')) {
    return uri;
  }
  
  return SERV_DOMAIN + (uri.startsWith('/') ? uri : '/' + uri);
}

const storeTK = tk => {
  wx.setStorageSync("tk", tk);
}

const storeUserInfo = userInfo => {
  wx.setStorageSync("userInfo", userInfo);
}

const getTK = () => {
  return wx.getStorageSync("tk");
}

const getCurrUser = () => {
  return wx.getStorageSync("userInfo");
}

const loadThirdData = (url, success, fail) => {
  var MsgUtil = require('msgutil');
  if (!url) {
    MsgUtil.warn("url is null");
    return;
  }
  wx.showLoading({
    title: '加载中。。。',
    mask: true
  })
  wx.request({
    url: url,
    method: "GET",
    header: {
      //设置参数内容类型为x-www-form-urlencoded
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function(data){
      if (typeof success == 'function'){
        success(data);
      } else {
        console.log('success request "' + url + '"');
      }
    },
    fail: function(xhr){
      if (typeof fail == 'function') {
        fail(data);
      } else {
        console.log('fail request "' + url + '"');
      }
    },
    complete: function(data) {
      wx.hideLoading();
    }
  });
}

const loadRemoteData = (uri, data, success, fail, complete) => {
  
  var MsgUtil = require('msgutil');
  if (!uri) {
    MsgUtil.warn("uri");
    return;
  }
  var url = getRemoteUrl(uri);
  var tk = getTK();
  var options = { 
    url: url, 
    method: "GET",
    header: {
      //设置参数内容类型为x-www-form-urlencoded
      'content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'tk': tk
    }
  };
  if (data) {
    options.data = data;
    if (typeof data == "object") {
      options.method = "POST";
    }
  }
  
  options.success = function (result) {
    if (result.data.redirectUrl) { // 如果返回参数中的redirectUrl不为空，那么优先处理这个重定向，其它逻辑不会被执行
      location.href = result.data.redirectUrl;
      return;
    }
    if (result.data.resultCode == "SUCCESS") {
      if (success != null) {
        success(result.data);
      } else {
        MsgUtil.success("操作成功！");
      }
    } else {
      if (result.data.resultCode == "NOT_LOGON"){
        getApp().doLogon();
      } else if (typeof fail == 'function') {
        fail(xhr, result.data);
      } else {
        MsgUtil.warn(result.data.resultMsg ? result.data.resultMsg : "操作错误！");
      }
    }
  };
  options.fail = function (xhr) {
    if(typeof fail == 'function') {
      fail(xhr);
    } else {
      MsgUtil.warn(JSON.stringify(xhr));
    }
  };
  options.complete = function(result){
    wx.hideLoading();
    if (typeof complete == 'function') {
      complete(result.data);
    }
  }
  
  wx.showLoading({
    title: '加载中。。。',
    mask: true
  })
  wx.request(options);
}

const uploadFile = function(filePath, success, fail) {
  console.log('upload file path ' + filePath)
  var tk = getTK();
  wx.uploadFile({
    url: SERV_DOMAIN + "/upload/image.do",
    filePath: filePath,
    name: 'imageInfo',
    header: {
      'content-type': 'multipart/form-data',
      'tk': tk
    }, // 设置请求的 header
    success: function (res) {
      console.log(res);
      if (res.statusCode == 200 && !res.data.result_code) {
        typeof success == "function" && success(res.data);
      } else {
        typeof fail == "function" && fail(res);
      }
    },
    fail: function (res) {
      console.log(res);
      typeof fail == "function" && fail(res);
    }
  })
}

module.exports = {
  loadRemoteData: loadRemoteData,
  loadThirdData: loadThirdData,
  storeTK: storeTK,
  storeUserInfo: storeUserInfo,
  getCurrUser: getCurrUser,
  uploadFile: uploadFile
}