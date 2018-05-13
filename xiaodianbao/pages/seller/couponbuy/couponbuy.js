Page({

  /**
   * 页面的初始数据
   */
  data: {
    dckf: 0,
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
    cwts_tc: true,
    gonts: true,
    cwts_tc2: true,
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  gmdzs: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  dknzew: function () {
    this.setData({
      cwts_tc: true,
      gonts: true,
    })
  },
  dknzew2: function () {
    this.setData({
      cwts_tc2: true,
      gonts: true,
    })
  },
  dk_ysc: function () {
    this.setData({
      cwts_tc2: false,
      gonts: false,
    })
  },
  djl_qu: function (e) {
    var th = this;
    th.setData({
      dckf: e.target.dataset.fkfans,
    })
  },
})