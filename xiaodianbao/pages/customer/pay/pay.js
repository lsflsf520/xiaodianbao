var NetUtil = require('../../../utils/netutil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dckf: 0,
    tx_src: '../../../images/ic_sel_green.png',
  },
  djl_qu: function (e) {
    var th = this;
    th.setData({
      dckf: e.target.dataset.fkfans,
    })
  },
  agree: function () {
    var th = this;
    if (th.data.tx_src == '../../../images/ic_sel_green.png') {
      th.setData({
        tx_src: '../../../images/ic_unsel.png'
      })
    } else {
      th.setData({
        tx_src: '../../../images/ic_sel_green.png'
      })
    }
  },
  formsubmit: function(e) {
    var formData = e.detail.value;
    formData.userCouponId = this.data.couponId;
    var th = this;
    NetUtil.loadRemoteData('/uc/coupon/useCoupon.do', formData, function(result){
      wx.showToast({
        title: '该券已使用',
        icon: 'success',
        duration: 2000
      });
      setTimeout(function(){
        wx.redirectTo({
          url: '../couponbag/couponbag',
        })
      }, 2000);
    });
  },
  onLoad: function (options) {
    var couponId = options.couponId;
    var shopName = options.shopName;
    this.setData({
      shopName: shopName,
      couponId: couponId
    })
  }
})