var NetUtil = require('../../../utils/netutil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    shopId: 100001,
    bcle: null,
    bcle2: null,
    array: ['徐记海鲜店麓谷店', '美国', '中国', '巴西', '日本'],
    index: 0,
    /*diyongList: [
      {
        img_zhe: "../../../images/dz_zkqz.png", img_dian: "../../../images/dp_wt.png", img_bg: "../../../images/xld_ysq.png", img_xl: "../../../images/ic_more_down.png", left_price: "9.8", left_zhe: "抵", left_man: "满100元使用", left_zeng: "*店面赠送*",
        right_dian: "徐记海鲜店麓谷店", right_data: "2018/03/05-2018/04/05", right_text: "仅限炒菜品类\t不含酒水\t节假日", zl_ys: "", zhe_sjb: '抵', dsyq: '', zdx: 'z-index:1', tc_text01: '仅限炒菜类品 不含酒水 节假日通用 ', tc_text02: '1:仅限炒菜类品 不含酒水 节假日通 ', tc_text03: '2:请将优惠券出示给店家使用........',
      },
      {
        img_zhe: "../../../images/dz_zkqz.png", img_dian: "../../../images/dp_wt.png", img_bg: "../../../images/xld_ysq.png", img_xl: "../../../images/ic_more_down.png", left_price: "9.8", left_zhe: "抵", left_man: "满100元使用", left_zeng: "*店面赠送*",
        right_dian: "徐记海鲜店麓谷店", right_data: "2018/03/05-2018/04/05", right_text: "仅限炒菜品类\t不含酒水\t节假日", zl_ys: "", zhe_sjb: '抵', dsyq: '', tc_text01: '仅限炒菜类品 不含酒水 节假日通用 ', tc_text02: '1:仅限炒菜类品 不含酒水 节假日通 ', tc_text03: '2:请将优惠券出示给店家使用........',
      }
      ,
    ],
    cashList: [
      {
        img_zhe: "../../../images/jb_dzkz.png", img_dian: "../../../images/dp_wt.png", img_bg: "../../../images/cp_ysq.png", img_xl: "../../../images/dc_hexl.png", left_price: "39", left_zhe: "", left_man: "满100元使用", left_zeng: "*店面赠送*",
        right_dian: "徐记海鲜店麓谷店", right_data: "2018/03/05-2018/04/05", right_text: "仅限炒菜品类\t不含酒水\t节假日", zl_ys: "qdys1", zhe_sjb: '金', dsyq: '¥', zdx: 'z-index:1', tc_text01: '仅限炒菜类品 不含酒水 节假日通用 ', tc_text02: '1:仅限炒菜类品 不含酒水 节假日通 ', tc_text03: '2:请将优惠券出示给店家使用........',
      },
      {
        img_zhe: "../../../images/jb_dzkz.png", img_dian: "../../../images/dp_wt.png", img_bg: "../../../images/cp_ysq.png", img_xl: "../../../images/dc_hexl.png", left_price: "39", left_zhe: "", left_man: "满100元使用", left_zeng: "*店面赠送*",
        right_dian: "徐记海鲜店麓谷店", right_data: "2018/03/05-2018/04/05", right_text: "仅限炒菜品类\t不含酒水\t节假日", zl_ys: "qdys1", zhe_sjb: '金', dsyq: '¥', tc_text01: '仅限炒菜类品 不含酒水 节假日通用 ', tc_text02: '1:仅限炒菜类品 不含酒水 节假日通 ', tc_text03: '2:请将优惠券出示给店家使用........',
      }
    ],*/
  },
  tocouponbuy: function () {
    wx.navigateTo({
      url: '../couponbuy/couponbuy',
    })
  },
  editCoupon: function (e) {
    wx.navigateTo({
      url: '../couponedit/couponedit?couponType=' + (this.data.currentTab == 0 ? 'Diyong' : 'Cash') + '&shopId=' + this.data.shopId,
    })
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  touchstart: function (e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    })
  },
  touchmove: function (e) {
    let index = e.currentTarget.dataset.index,//当前索引
      startX = this.data.startX,//开始X坐标
      startY = this.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    this.data.diyongList.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    this.setData({
      diyongList: this.data.diyongList
    })
  },
  touchmove2: function (e) {
    let index = e.currentTarget.dataset.index,//当前索引
      startX = this.data.startX,//开始X坐标
      startY = this.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = this.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    this.data.cashList.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    this.setData({
      cashList: this.data.cashList
    })
  },
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI)
  },
  zhekx: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  ktzdf: function (e) {
    let index = e.currentTarget.dataset.index
    if (this.data.bcle == index) {
      this.setData({
        bcle: null,
      })
    } else {
      this.setData({
        bcle: index,
      })
    }
  },
  ktzdf2: function (e) {
    let index = e.currentTarget.dataset.index
    if (this.data.bcle2 == index) {
      this.setData({
        bcle2: null,
      })
    } else {
      this.setData({
        bcle2: index,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    NetUtil.loadRemoteData('/shop/coupon/loadMyCoupons.do', null, function (result) {
      that.setData({
        cashList: result.model.cashCoupons,
        diyongList: result.model.diyongCoupons
      });
    });
  }
})