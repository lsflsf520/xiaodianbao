
var NetUtil = require('../../../utils/netutil.js');
var wxCharts = require('../../../libs/wxcharts/wxcharts.js');
const app = getApp()
var diyongCouponChart = null;
var cashCouponChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['徐记海鲜店麓谷店', '美国', '中国', '巴西', '日本'],
    
    index: 0,
    diyongTab: 0,  
    cashTab: 0,  
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
  drawChart: function (canvasId, model) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    
    return new wxCharts({
      canvasId: canvasId,
      type: 'line',
      categories: model.categories,
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: '已领取',
        data: model.recvedDatas,
        /*format: function (val, name) {
          return val.toFixed(2);
        }*/
      }, {
        name: '已使用',
        data: model.usedDatas,
        /*format: function (val, name) {
          return val.toFixed(2);
        }*/
      }, {
          name: '新用户',
          data: model.newUserDatas,
          /*format: function (val, name) {
          return val.toFixed(2);
        }*/
      }, {
        name: '老用户',
        data: model.oldUserDatas,
        /*format: function (val, name) {
          return val.toFixed(2);
        }*/
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '数量',
        /*format: function (val) {
          return val.toFixed(2);
        },*/
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    NetUtil.loadRemoteData('/data/loadLatestDayData.do', { shopId: 100001, couponType: 'Diyong'}, function (result) {
      diyongCouponChart = that.drawChart('diyongChart', result.model);
    });
    //var simulationData = this.createSimulationData();
    NetUtil.loadRemoteData('/data/loadLatestDayData.do', { shopId: 100001, couponType: 'Cash' }, function (result) {
      cashCouponChart = that.drawChart('cashChart', result.model);
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
  diyongSwitch: function (e) {

    var that = this;

    if (this.data.diyongTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        diyongTab: e.target.dataset.current
      })
      var url = this.data.cashTab == 1 ? '/data/loadLatestMonthData.do' : '/data/loadLatestDayData.do';
      NetUtil.loadRemoteData(url, { shopId: 100001, couponType: 'Diyong' }, function (result) {
        diyongCouponChart = that.drawChart('diyongChart', result.model);
      });
    }
  },
  cashSwitch: function (e) {

    var that = this;
    
    if (this.data.cashTab === e.target.dataset.currentsr) {
      return false;
    } else {
      that.setData({
        cashTab: e.target.dataset.currentsr
      })
      var url = this.data.cashTab == 1 ? '/data/loadLatestMonthData.do' : '/data/loadLatestDayData.do';
      NetUtil.loadRemoteData(url, { shopId: 100001, couponType: 'Cash' }, function (result) {
        cashCouponChart = that.drawChart('cashChart', result.model);
      });
    }
  }
})
