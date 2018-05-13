//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['徐记海鲜店麓谷店', '美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
     currentTab: 0,  
     currentTabr: 0,  
  },

  toXq: function(e){
    wx.redirectTo({
      url: '/pages/seller/xuanquan/xuanquan',
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  itmclick:function(){
    wx.navigateTo({
      url: '../detailed/detailed',
    })
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
  swichNavr: function (e) {

    var that = this;
    
    if (this.data.currentTabr === e.target.dataset.currentsr) {
      return false;
    } else {
      that.setData({
        currentTabr: e.target.dataset.currentsr
      })
    }
  }
})
