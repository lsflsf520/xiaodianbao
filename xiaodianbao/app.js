//app.js
var NetUtil = require('/utils/netutil.js');
App({
  onLaunch: function () {
    /*var tk = this.getTk();
    if (!tk){
      // 登录
      this.doLogon();
    }*/
   
    this.checkCurrSession();
  },
  //最终供外面调用的方法
  doLogon: function(){
    var currApp = this;
    //调用登录接口
    wx.login({
      success: function (e) {
        NetUtil.loadRemoteData('/uc/wxuser/dologon.do', { code: e.code}, function (result) {
          NetUtil.storeTK(result.model.tk);
        });
      }
    });
  },
  /*getTk: function(){
    if (this.globalData.tk) {
      return this.globalData.tk;
    }
    this.globalData.tk = wx.getStorageSync("tk");
    return this.globalData.tk;
  },
  getCurrUser: function() {
    if (this.globalData.userInfo) {
      return this.globalData.userInfo;
    }
    this.globalData.userInfo = wx.getStorageSync("userInfo");
    return this.globalData.userInfo;
  },*/
  checkCurrSession: function() {
    var NetUtil = require('/utils/netutil.js');
    NetUtil.loadRemoteData('/uc/wxuser/checkSession.do', null, function (result) {
      console.log('session is available');
    });
  }
})