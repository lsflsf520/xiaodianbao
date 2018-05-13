var NetUtil = require('../../../utils/netutil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tmpl_no: 0,
  },
  selectTmpl: function (e) {
    this.setData({
      tmpl_no: e.currentTarget.dataset.tmpl_no
    });
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      tmplId: e.currentTarget.dataset.tmplid,
      tmplStyle: e.currentTarget.dataset.style_name
    });
    wx.navigateBack();
  },
  onLoad: function (options) {
    var that = this;
    NetUtil.loadRemoteData('/shop/coupon/loadTmpls.do?couponType=' + options.couponType, null, function (result) {
      that.setData({
        couponTmpls: result.model.couponTmpls,
        couponType: result.model.couponType,
        descp: result.model.descp,
        tmplStyle: options.tmplStyle
      });
    });
  }
})