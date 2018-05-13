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
  tyxiey: function () {
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
  }
})