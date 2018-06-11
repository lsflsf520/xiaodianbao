var NetUtil = require('../../../utils/netutil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 'RECVD',
    ycbial: true,
    hasUsed: false,
    RECVDCoupons: null
  },

  /*选项卡*/
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var that = this;
      var state = e.target.dataset.current;
      if (!this.data[state + "Coupons"]){
        NetUtil.loadRemoteData('/uc/coupon/load.do?state=' + state, null, function (result) {
          if ("USED" == state){
            that.setData({
              USEDCoupons: result.model,
              currentTab: state
            });
          } else if ("RECVD" == state) {
            that.setData({
              RECVDCoupons: result.model,
              currentTab: state
            });
          } else {
            that.setData({
              EXPIREDCoupons: result.model,
              currentTab: state
            });
          }    
        });
      } else {
        that.setData({
          currentTab: state
        })
      }     
    }
  },
  ycxians: function () {
    this.setData({
      ycbial: !this.data.ycbial
    })
  },
  useCoupon: function (e) {
    var couponId = e.currentTarget.dataset.couponId;
    var shopName = e.currentTarget.dataset.shopName;
    wx.navigateTo({
      url: '../pay/pay?couponId=' + couponId + '&shopName=' + shopName,
    })
  },
  tzxbd: function () {
    wx.redirectTo({
      url: '../me/me',
    })
  },
  fjdian: function () {
    wx.navigateTo({
      url: '../nearby/nearby',
    })
  },
  ljcouja: function () {
    wx.navigateTo({
      url: '../award/award',
    })
  },
  djbtnm: function () {
    var th = this;
    th.setData({
      hasUsed: true,
    })
  },
  onLoad: function (options) {
    var that = this;
    NetUtil.loadRemoteData('/uc/coupon/load.do?state=RECVD', null, function (result) {
      that.setData({
        RECVDCoupons: result.model
      });
    });
  }
})