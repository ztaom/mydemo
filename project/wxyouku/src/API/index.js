// 接口请求
import wepy from 'wepy'

/**
 * 播放页接口-获取视频详情
 * @param {*} args
 */
const playPageDetail = (args, resolve) => {
  // return new Promise((resolve) => {
  wepy.request({
    url: `https://service.dandelion.youku.com/weixin/playDetail`,
    data: args,
    success: (data) => {
      resolve({'isSuccess': true, 'result': data});
    },
    fail: (data) => {
      resolve({'isSuccess': false, 'result': data});
    }
  });
  // });
};

/**
 * 播放页接口-卡片信息
 * @param {*} args
 */
const playPageComment = (args, callback) => {
  wepy.request({
    url: `https://service.dandelion.youku.com/weixin/playDetailComponent`,
    data: args,
    success: (data) => {
      callback({'isSuccess': true, 'result': data});
    },
    fail: (data) => {
      callback({'isSuccess': false, 'result': data});
    }
  })
};
/**
 * 播放页接口-banner配置
 * @param {*} args
 */
const playPageConfig = (callback) => {
  wepy.request({
    url: 'https://hudong.alicdn.com/api/data/v2/86407b9ff0fc4c7bb50fc457b3a165db.js',
    success: (data) => {
      callback({'isSuccess': true, 'result': data});
    },
    fail: (data) => {
      callback({'isSuccess': false, 'result': data});
    }
  })
};
/**
 * 播放服务
 * @param {*} args
 */
const getUpsData = (args, callback) => {
  wepy.request({
    url: `https://ups.youku.com/ups/get.json`,
    data: args,
    success: (data) => {
      callback({'isSuccess': true, 'result': data});
    },
    fail: (data) => {
      callback({'isSuccess': false, 'result': data});
    }
  })
};

const getFans = (args, callback) => {
  wepy.request({
    url: `https://api.m.youku.com/api/subscribe/get`,
    data: args,
    method: 'POST',
    header: {'content-type': 'application/x-www-form-urlencoded'},
    success: (data) => {
      callback({'isSuccess': true, 'result': data});
    },
    fail: (data) => {
      callback({'isSuccess': false, 'result': data});
    }
  });
}
/**
 * 栏目接口
 * @param {*} args
 */
const getNavData = (callback) => {
  wepy.request({
    url: 'https://service.dandelion.youku.com/weixin/pages',
    success: (data) => {
      callback({'isSuccess': true, 'result': data});
    },
    fail: (data) => {
      callback({'isSuccess': false, 'result': data});
    }
  })
}

/**
 * 首页和列表接口
 * @param {*} args
 */
const getBaseData = (args, callback) => {
  wepy.request({
    url: `https://service.dandelion.youku.com/weixin/pageById`,
    data: args,
    success: (data) => {
      callback({'isSuccess': true, 'result': data});
    },
    fail: (data) => {
      callback({'isSuccess': false, 'result': data});
    }
  })
}

export {
  playPageDetail,
  playPageComment,
  playPageConfig,
  getUpsData,
  getNavData,
  getBaseData,
  getFans
}
