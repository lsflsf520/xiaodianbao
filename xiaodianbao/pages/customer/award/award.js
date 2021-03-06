var NetUtil = require('../../../utils/netutil.js');

if (!Array.prototype.shuffle) {
  Array.prototype.shuffle = function () {
    for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
  };
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    turn: false, //控制是否翻转
    anmSwitch: false,
    time: "开始",
    selCouponIndex: -1,
    canRecv: false,
    hideCoupon: false,
    hideStartBtn: false,
    recved: false,
  },
  startAnimation: function () {
    var that = this;
    that.setData({
      turn: true,
    });
    setTimeout(function () {
      that.setData({
        anmSwitch: true,
      });
      var currCoupons = that.data.coupons;
      currCoupons.shuffle();
      that.setData({ coupons: currCoupons});
    }, 300);
    var cd = 3;
    var sety = setInterval(function () {
      that.setData({
        time: cd,
      });
      cd--;
      if (that.data.time < 1) {
        that.setData({
          time: "开始",
          anmSwitch: false,
        });
        setTimeout(function () {
          that.setData({
            canRecv: true,
          });
        }, 500)
        clearInterval(sety);
      }
    }, 500)

  },
  recvCoupon: function (e) {
    var that = this;
    if (that.data.canRecv) {
      var couponId = e.currentTarget.dataset.couponid;
      var selCouponIndex = e.currentTarget.dataset.couponIndex;
      that.setData({
        couponId: couponId,
        hideStartBtn: true,
        hideCoupon: true,
      })

      NetUtil.loadRemoteData('/uc/coupon/recvCoupon.do?shopCouponId=' + couponId, null, function (result) {
        var recvedCouponId = result.model;
        that.setData({
          selCouponIndex: selCouponIndex,
          recved: true
        })
      });

    }

  },
  zxquanb: function () {
    wx.redirectTo({
      url: '../couponbag/couponbag',
    })
  },
  tzxbd: function () {
    wx.redirectTo({
      url: '../me/me',
    })
  },
  onLoad: function (options) {
    var that = this;
    NetUtil.loadRemoteData('/shop/coupon/loadByShopId.do?shopId=' + 100001, null, function (result) {
      that.setData({
        shop: result.model.shop,
        coupons: result.model.dbDatas
      })
    })
  }
})