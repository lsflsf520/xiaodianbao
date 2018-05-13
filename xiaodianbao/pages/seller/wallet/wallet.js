var NetUtil = require('../../../utils/netutil.js');
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    czzxd:0,
    qxbl:true,
    isShowsb:true,
    cghzsbl:false,
    czcglb:true,
    // 公用遮罩层
    tcxsyc:true,
    //余额提现
    yetsck:true,
    //意见反馈
    yjxfk:true,
  },

  toXq: function (e) {
    wx.redirectTo({
      url: '/pages/seller/award/award',
    })
  },
  toIndex: function (e) {
    wx.redirectTo({
      url: '/pages/seller/index/index',
    })
  },
  toWallet: function (e) {
    wx.redirectTo({
      url: '/pages/seller/wallet/wallet',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    NetUtil.loadRemoteData('/uc/wallet/infoview.do', null, function (result) {
      NetUtil.storeUserInfo(result.model);
      that.setData({
        balance: result.model.balance,
        discountCouponNum: result.model.discountCouponNum,
        cashCouponNum: result.model.cashCouponNum,
        myShops: result.model.myShops
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
//  单选
  swichNav_cz: function (e) {

    var that = this;
    if (this.data.czzxd === e.target.dataset.hsbk) {
      
      return false;
    } else {
      that.setData({
        czzxd: e.target.dataset.hsbk
      })
    }
  
  },
  gbtcsj:function(){
      this.setData({
        qxbl: true, tcxsyc:true
      })
  },
  btcxs:function(){
    this.setData({
      qxbl: false, tcxsyc: false,
    })
  },
  tzczjl:function(){
    wx.navigateTo({
      url: '../record/record',
    })
  },
  tzczj2: function () {
    wx.navigateTo({
      url: '../record2/record2',
    })
  },
  bindgbsb:function(){
    this.setData({
      isShowsb:true,
      tcxsyc: true
    })
  },
  bindgbsd: function () {
    this.setData({
      czcglb: true
    })
  },
  bindcghsb:function(e){
    var that = this;
    if ( e.target.dataset.cghsb == 'true') {
      that.setData({
        qxbl: true,
        czcglb: false,
        tcxsyc:true
      })
    } else {
      that.setData({
        qxbl: true,
        isShowsb:false
   
      })
    }
    this.setData({
      yetsck: true,
      tcxsyc: true,
    })

  },
  itmclick: function () {
    wx.navigateTo({
      url: '../tradelog/tradelog',
    })
  },
  toShopDetail: function (e) {
    var shopId = e.currentTarget.dataset.shopid;
    wx.navigateTo({
      url: '/pages/seller/shopdetail/shopdetail?shopId=' + shopId,
    })
  },
  toLottery: function () {
    wx.redirectTo({
      url: '/pages/customer/award/award',
    })
  },
  yttxj:function(){
     this.setData({
       yetsck:false,
       tcxsyc: false,
     })
  },
  lygyeb:function(){
    this.setData({
      yetsck: true,
      tcxsyc: true,
    })
  },
  //意见反馈
  yjfktcl:function(){
    this.setData({
      tcxsyc: false,
      yjxfk: false,
    })
  },
  gbzjyj:function(){
    this.setData({
      tcxsyc: true,
      yjxfk: true,
    })
  }
})
