var NetUtil = require('netutil.js');

const getIndex = (dataArr, id) => {
  if (id) {
    for (var index in dataArr) {
      if (id == dataArr[index].id) {
        return index;
      }
    }
  }
  return 0;
};
const getId = (dataArr, index) => {
  if (index >= 0) {
    return dataArr[index].id;
  }
  return -1;
};

const loadByParentId = (parentId, success) => {
  NetUtil.loadRemoteData('/base/industry/loadByParentId.do', { parentId: parentId }, success, function (xhr) {
    MsgUtil.warn("行业数据加载异常");
  });
};

const changeByRootId = (currPageObj, rootId) => {
  loadByParentId(rootId, function (result) {
    var subId = 0;
    if (currPageObj.data.shop) {
      subId = currPageObj.data.shop.subIndId;
    }
    var subArr = result.model;//加载指定父行业下的子行业列表
    var subIndex = getIndex(subArr, subId);//获取当前子行业id在subArr子行业列表中的索引
    currPageObj.setData({
      subArr: subArr,
      subIndex: subIndex
    });
  });
}

const initIndustry = (currPageObj) => {
  var rootId = 0, subId = 0;
  if (currPageObj.data.shop) {
    rootId = currPageObj.data.shop.indId;
    subId = currPageObj.data.shop.subIndId;
  }

  loadByParentId(0, function (result) {
    var rootArr = result.model;//加载所有省份
    var rootIndex = getIndex(rootArr, rootId);//获取当前店铺的一级行业所在一级行业列表中的索引
    if (!rootId) {
      rootId = rootArr[rootIndex].id;
    }
    currPageObj.setData({
      rootArr: rootArr,
      rootIndex: rootIndex
    });
    changeByRootId(currPageObj, rootId);
  });
}

const chgRoot = (currPageObj, rootIndex) => {
  var rootId = getId(currPageObj.data.rootArr, rootIndex);
  currPageObj.setData({
    rootIndex: rootIndex
  });
  changeByRootId(currPageObj, rootId);
}

module.exports = {
  initIndustry: initIndustry,
  getId: getId,
  chgRoot: chgRoot
}