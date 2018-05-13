var NetUtil = require('../../../utils/netutil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    date2: '2019-09-01',
    date3: '2019-09-01',
    date4: '2019-09-01',
    time: '12:01',
    time2: '12:01',
    time3: '12:01',
    time4: '12:01',
    discountType: 'Amount',
    shopId: 0
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })
  },
  bindDateChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date3: e.detail.value
    })
  },
  bindDateChange4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date4: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindTimeChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time2: e.detail.value
    })
  },
  bindTimeChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time3: e.detail.value
    })
  },
  bindTimeChange4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time4: e.detail.value
    })
  },
  selectStyle: function (e) {
    wx.navigateTo({
      url: '../couponstyle/couponstyle?couponType=' + this.data.couponType + "&tmplStyle=" + this.data.tmplStyle,
    })
  },
  changeRecvAfterUsed: function () {
    if (this.data.couponData && "Y" == this.data.couponData.recvAfterUsed) {
      this.setData({ recvAfterUsed: "N"});
    } else {
      this.setData({ recvAfterUsed: "Y" });
    }
  },
  changeOnlinePay: function () {
    if (this.data.couponData && "Y" == this.data.couponData.onlinePay) {
      this.setData({ onlinePay: "N" });
    } else {
      this.setData({ onlinePay: "Y" });
    }
  },
  changeUseInHoliday: function () {
    if (this.data.couponData && "Y" == this.data.couponData.useInHoliday) {
      this.setData({ useInHoliday: "N" });
    } else {
      this.setData({ useInHoliday: "Y" });
    }
  },
  formsubmit: function(e){
    var formData = e.detail.value;
    formData.discountType = this.data.discountType;
    formData.tmplFileName = this.data.tmplStyle;
    formData.recvAfterUsed = this.data.recvAfterUsed ? this.data.recvAfterUsed : 'N';
    formData.onlinePay = this.data.onlinePay ? this.data.onlinePay : 'N';
    formData.useInHoliday = this.data.useInHoliday ? this.data.useInHoliday : 'N';
    formData.couponType = this.data.couponType;
    formData.shopId = this.data.shopId ? this.data.shopId : 0;
    NetUtil.loadRemoteData('/shop/coupon/doSave.do', formData, function (result) {
      wx.redirectTo({
        url: '/pages/seller/xuanquan/xuanquan',
      });
    });
  },
  onLoad: function (options) {
    var that = this;
    var shopCouponId = options.shopCouponId;
    var couponType = options.couponType;
    var shopId = options.shopId;
    if (shopCouponId) {
      NetUtil.loadRemoteData('/shop/coupon/loadShopCoupon.do', { shopCouponId: shopCouponId}, function (result) {
        that.setData({
          couponData: result.model,
          tmplStyle: result.model.tmplFileName,
          couponType: result.model.couponType,
          shopId: shopId
        });   
      });
    } else if (couponType){
      NetUtil.loadRemoteData('/shop/coupon/loadDefTmpl.do?couponType=' + couponType, null, function (result) {
        that.setData({
          couponData: result.model,
          tmplStyle: result.model.tmplFileName,
          couponType: result.model.couponType,
          shopId: shopId
        }); 
      });
    } else {
      //提示参数错误

    }
  },
  onShow: function(options) {
    var that = this;
    if (this.data.tmplId && !this.couponData) {
      NetUtil.loadRemoteData('/shop/coupon/loadTmpl.do', { tmplId: this.data.tmplId }, function (result) {
        that.setData({
          couponData: result.model,
          tmplStyle: result.model.tmplFileName,
          couponType: result.model.couponType
        });
      });
    }
  }
})