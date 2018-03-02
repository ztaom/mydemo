/**
 * v2ex API：https://www.v2ex.com/p/7v9TEc53
 *
 **/

// 接口请求
import wepy from 'wepy'

/**
 * 播放页接口-获取视频详情
 * @param {*} args
 */
// const playPageDetail = (args, resolve) => {
//   // return new Promise((resolve) => {
//   wepy.request({
//     url: `https://service.dandelion.youku.com/weixin/playDetail`,
//     data: args,
//     success: (data) => {
//       resolve({'isSuccess': true, 'result': data});
//     },
//     fail: (data) => {
//       resolve({'isSuccess': false, 'result': data});
//     }
//   });
//   // });
// };

// const getFans = (args, callback) => {
//   wepy.request({
//     url: `https://api.m.youku.com/api/subscribe/get`,
//     data: args,
//     method: 'POST',
//     header: {'content-type': 'application/x-www-form-urlencoded'},
//     success: (data) => {
//       callback({'isSuccess': true, 'result': data});
//     },
//     fail: (data) => {
//       callback({'isSuccess': false, 'result': data});
//     }
//   });
// }


/**
 * 获取javascript最高的列表
 * https://api.github.com/ // 直接打开可以查看github 可以使用的api
 * @param {*} args
 */
const getJavascript = (args, callback) => {
  wepy.request({
    url: 'https://api.github.com/search/repositories',
    data: args,
    success: (data) => {
      callback({'isSuccess': true, 'result': data})
    },
    fail: (data) => {
      callback({'isSuccess': false, 'result': data})
    }
  })
}



export {
  getJavascript,
}
