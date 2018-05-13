var NetUtil = require('../../../utils/netutil.js');
var District = require('../../../utils/district.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currUser: null,
    userExtra: {
      servMsg: 'Y',
      smsMsg: 'Y',
    },
    provinceArr: [],
    provIndex: 0,

    cityArr: [],
    cityIndex: 0,

    countyArr: [],
    countyIndex: 0,
  },
  provinceChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    District.chgProvice(that, e.detail.value);
  },
  cityChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    District.chgCity(that, e.detail.value);
  },
  countyChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      countyIndex: e.detail.value
    })
  },
  zxquanb: function () {
    wx.redirectTo({
      url: '../couponbag/couponbag',
    })
  },
  ljcouja: function () {
    wx.navigateTo({
      url: '../award/award',
    })
  },
  toSellerPage: function () {
    if (this.data.shopState == 'PASSED') {
      wx.redirectTo({
        url: '/pages/seller/index/index'
      })
    } else {
      wx.navigateTo({
        url: '/pages/seller/shopedit/shopedit'
      })
    }

  },
  djl_qu: function (e) {
    var th = this;
    th.setData({
      dckf: e.target.dataset.fkfans,
    })
  },
  getMyInfo: function (e) {
    var that = this;
    var getUserInfo = Util.wxPromise(wx.getUserInfo);
    getUserInfo().then(res => {
      console.log(res);
    });
    wx.getUserInfo({
      success: res => {
        var params = {};
        params.encryptedData = res.encryptedData;
        params.iv = res.iv;

        var encryptedData = res.encryptedData;
        NetUtil.loadRemoteData('/uc/wxuser/saveUserInfo.do', params, function (result) {
          NetUtil.storeUserInfo(result.model);
          that.setData({
            currUser: result.model
          });
        });

      }
    })
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function (res) { }
      })
    }
  },
  onLoad: function () {
    var currUser = NetUtil.getCurrUser();

    var that = this;
    NetUtil.loadRemoteData('/uc/wxuser/loadMyInfo.do', null, function (result) {
      var userExtra = result.model.extra ? result.model.extra : {};
      if (!userExtra.servMsg) {
        userExtra.servMsg = 'Y';
      }
      if (!userExtra.smsMsg) {
        userExtra.smsMsg = 'Y';
      }

      that.setData({
        currUser: currUser,
        userExtra: userExtra,
        shopState: result.model.shopState
      });

      District.initDistrict(that);
    });



    /*NetUtil.loadThirdData('http://api.map.baidu.com/geoconv/v1/?coords=112.93134,28.23529&from=1&to=5&ak=FZlvH96kohpB4iOFE4G2oVDluH9fXwZ0', function(data){
      console.log(data);
    })

    NetUtil.loadThirdData('https://api.map.baidu.com/geocoder/v2/?ak=FZlvH96kohpB4iOFE4G2oVDluH9fXwZ0&location=28.23529,112.93134&callback=showLocation&output=json&pois=1', function (data) {
      console.log(data);
    })*/


  }

})