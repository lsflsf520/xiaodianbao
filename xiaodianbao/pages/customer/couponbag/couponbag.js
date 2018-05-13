Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    ycbial: true,
    dcklw: false,
  },

  /*选项卡*/
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  ycxians: function () {
    this.setData({
      ycbial: !this.data.ycbial
    })
  },
  lj_shiy: function () {
    wx.navigateTo({
      url: '../employ/employ',
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
      dcklw: true,
    })
  }
})