var NetUtil = require('netutil.js');

const getDistrictIndex = (districtArr, districtId) => {
  if (districtId) {
    for (var districtIndex in districtArr) {
      if (districtId == districtArr[districtIndex].id) {
        return districtIndex;
      }
    }
  }
  return 0;
};
const getDistrictId = (districtArr, districtIndex) => {
  if (districtIndex >= 0) {
    return districtArr[districtIndex].id;
  }
  return -1;
};

const getDistrictByParentId = (parentId, success) => {
  NetUtil.loadRemoteData('/base/district/loadByParentId.do', { parentId: parentId }, success, function(xhr){
    MsgUtil.warn("地区数据加载异常");
  });
};

const changeByProvId = (currPageObj, provId) => {
  getDistrictByParentId(provId, function (result) {
    var cityId = 0;
    if (currPageObj.data.userExtra) {
      cityId = currPageObj.data.userExtra.cityId;
    }
    var cityArr = result.model;//加载指定省份下的城市
    var cityIndex = getDistrictIndex(cityArr, cityId);//获取当前城市id在城市列表中的索引
    if (!cityId) {
      cityId = cityArr[cityIndex].id;
    }
    currPageObj.setData({
      cityArr: cityArr,
      cityIndex: cityIndex
    });
    changeByCityId(currPageObj, cityId);
  });
}

const changeByCityId = (currPageObj, cityId) => {
  getDistrictByParentId(cityId, function (result) {
    var countyArr = result.model;//加载指定城市下的县级市
    if (countyArr && countyArr.length > 0) {
      var countyId = 0;
      if (currPageObj.data.userExtra) {
        countyId = currPageObj.data.userExtra.countyId;
      }
      var countyIndex = getDistrictIndex(countyArr, countyId);//获取当前县级市id在县级市表中的索引
      currPageObj.setData({
        countyArr: countyArr,
        countyIndex: countyIndex
      });
    }
  })
}

const initDistrict = (currPageObj) => {
  var provId = 0, cityId = 0, countyId = 0;
  if (currPageObj.data.userExtra){
    provId = currPageObj.data.userExtra.provinceId;
    cityId = currPageObj.data.userExtra.cityId;
    countyId = currPageObj.data.userExtra.countyId;
  }
  
  getDistrictByParentId(0, function(result){
    var provArr = result.model;//加载所有省份
    var provIndex = getDistrictIndex(provArr, provId);//获取当前省份id在省列表中的索引
    if(!provId) {
      provId = provArr[provIndex].id;
    }
    currPageObj.setData({
      provArr: provArr,
      provIndex: provIndex
    });
    changeByProvId(currPageObj, provId);
  });
}

const chgProvice = (currPageObj, provIndex) => {
  var provId = getDistrictId(currPageObj.data.provArr, provIndex);
  currPageObj.setData({
    provIndex: provIndex
  });
  changeByProvId(currPageObj, provId);
}

const chgCity = (currPageObj, cityIndex) => {
  var cityId = getDistrictId(currPageObj.data.cityArr, cityIndex);
  currPageObj.setData({
    cityIndex: cityIndex
  });
  changeByCityId(currPageObj, cityId);
}

module.exports = {
  initDistrict: initDistrict,
  getDistrictId: getDistrictId,
  chgProvice: chgProvice,
  chgCity: chgCity
}