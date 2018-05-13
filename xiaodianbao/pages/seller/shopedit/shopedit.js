var NetUtil = require('../../../utils/netutil.js');
var Industry = require('../../../utils/industry.js');
var District = require('../../../utils/district.js');
var bmap = require('../../../libs/bmap/bmap-wx.min.js');
var QQMapWX = require('../../../libs/qmap/qqmap-wx-jssdk.min.js');
var wxMarkerData = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否同意协议
    tyxy: true,
    posterUname: '尚方宝剑',
    shop: { logo: '../../../images/ic_shop_g.png', licence: '' },
    mapWidth: '100%',
    mapHeight: '180rpx',
    tysrc: '../../../images/ic_sel_green.png',
    //上传图片的路径
    files: "../../../images/btn_add_pic.png",
    //picker   数据
    rootArr: [],
    rootIndex: 0,
    subArr: [],
    subIndex: 0,

    provArr: [],
    provIndex: 0,
    cityArr: [],
    cityIndex: 0,
    countyArr: [],
    countyIndex: 0
  },
  //协议是否同意
  xysfty: function () {
    if (this.data.tyxy == true) {
      this.setData({
        tyxy: !this.data.tyxy,
        tysrc: '../../../images/ic_sel_red.png'
      })
    } else {
      this.setData({
        tyxy: !this.data.tyxy,
        tysrc: '../../../images/ic_sel_green.png'

      })
    }

  },
  //picker   事件
  bindRootIndChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    Industry.chgRoot(that, e.detail.value);
  },
  bindSubIndChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      subIndex: e.detail.value
    })
  },
  provinceChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    District.chgProvice(that, e.detail.value);
  },
  cityChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    District.chgCity(that, e.detail.value);
  },
  countyChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      countyIndex: e.detail.value
    })
  },
  chooseImageTap: function () {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album');
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera');
          }
        }
      }
    })
  },
  //上传图片
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgPath = res.tempFilePaths[0];
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          shop: { logo: imgPath }
        });

        NetUtil.uploadFile(imgPath, function (result) {
          console.log(result);
        });
      }
    })
  },

  //查看上传的图片 
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  getLocationInfo: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log('map', res);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: [
            {
              id: 0
              , iconPath: "../../../images/ic_pin.png"
              , longitude: res.longitude
              , latitude: res.latitude
              , width: 30
              , height: 50
            }
          ]
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  getLngLat: function () {
    var that = this;
    this.mapCtx = wx.createMapContext("map4select");
    this.mapCtx.getCenterLocation({
      success: function (res) {

        that.setData({
          longitude: res.longitude
          , latitude: res.latitude
          , markers: [
            {
              id: 0
              , iconPath: "../../../images/ic_pin.png"
              , longitude: res.longitude
              , latitude: res.latitude
              , width: 30
              , height: 50
            }
          ]
        })

      }
    })
  },
  regionchange(e) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置
    if (e.type == 'end') {
      this.getLngLat();
    }
  },
  markertap(e) {
    console.log(e)
  },
  formsubmit: function (e) {
    var that = this;
    var indId = Industry.getId(this.data.rootArr, this.data.rootIndex);
    var subIndId = Industry.getId(this.data.subArr, this.data.subIndex);
    var provId = District.getDistrictId(this.data.provArr, this.data.provIndex);
    var cityId = District.getDistrictId(this.data.cityArr, this.data.cityIndex);
    var countyId = District.getDistrictId(this.data.countyArr, this.data.countyIndex);
    var formData = e.detail.value;
    formData.logo = this.data.shop.logo;
    formData.licence = this.data.shop.licence;
    formData.indId = indId;
    formData.subIndId = subIndId;
    formData.provinceId = provId;
    formData.cityId = cityId;
    formData.countyId = countyId;
    formData.id = this.data.shopId;
    NetUtil.loadRemoteData('/shop/doSave.do', formData, function (result) {
      wx.redirectTo({
        url: '../../../pages/seller/shopdetail/shopdetail?shopId=' + result.model,
      });
    });
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this;
    var isModify = options.modify;
    var shopId = options.shopId ? options.shopId : 0;
    this.getLocationInfo();
    NetUtil.loadRemoteData('/shop/loadMyFirstShop.do', { shopId: shopId }, function (result) {
      var myFirstShop = result.model;
      if (!myFirstShop || isModify) {
        that.setData({
          shopId: shopId,
          shop: myFirstShop,
          userExtra: myFirstShop
        })
        Industry.initIndustry(that);

        District.initDistrict(that);
      } else if (myFirstShop.checkState == 'CHECKING') {
        wx.redirectTo({
          url: '../../../pages/seller/shopdetail/shopdetail?shopId=' + myFirstShop.id,
        });
      } else {
        //进入店长钱包页

      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    /*var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        // 发起regeocoding检索请求 
        BMap.regeocoding({
          location: res.latitude + ", " + res.longitude,
          //location: '39.915, 116.404',
          fail: fail,
          success: success,
          // 此处需要在相应路径放置图片文件 
          iconPath: '../../../libs/bmap/images/marker_red.png',
          // 此处需要在相应路径放置图片文件 
          iconTapPath: '../../../libs/bmap/images/marker_red.png'
        });
      },
    })

    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'FZlvH96kohpB4iOFE4G2oVDluH9fXwZ0'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      console.log('lat:' + wxMarkerData[0].latitude + ",long:" + wxMarkerData[0].longitude);

      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }

    var demo = new QQMapWX({
      key: '32RBZ-3QDLJ-SCSFF-KRXXP-3PUET-5TBG5' // 必填
    });

    // 调用接口
    demo.reverseGeocoder({
      location: {
        latitude: 28.23529,
        longitude: 112.93134
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });*/
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

  }
})