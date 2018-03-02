'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJavascript = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var getJavascript = function getJavascript(args, callback) {
  _wepy2.default.request({
    url: 'https://api.github.com/search/repositories',
    data: args,
    success: function success(data) {
      callback({ 'isSuccess': true, 'result': data });
    },
    fail: function fail(data) {
      callback({ 'isSuccess': false, 'result': data });
    }
  });
}; /**
    * v2ex API：https://www.v2ex.com/p/7v9TEc53
    *
    **/

// 接口请求
exports.getJavascript = getJavascript;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImdldEphdmFzY3JpcHQiLCJhcmdzIiwiY2FsbGJhY2siLCJyZXF1ZXN0IiwidXJsIiwiZGF0YSIsInN1Y2Nlc3MiLCJmYWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBTUE7Ozs7OztBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7Ozs7QUFLQSxJQUFNQSxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQUNDLElBQUQsRUFBT0MsUUFBUCxFQUFvQjtBQUN4QyxpQkFBS0MsT0FBTCxDQUFhO0FBQ1hDLFNBQUssNENBRE07QUFFWEMsVUFBTUosSUFGSztBQUdYSyxhQUFTLGlCQUFDRCxJQUFELEVBQVU7QUFDakJILGVBQVMsRUFBQyxhQUFhLElBQWQsRUFBb0IsVUFBVUcsSUFBOUIsRUFBVDtBQUNELEtBTFU7QUFNWEUsVUFBTSxjQUFDRixJQUFELEVBQVU7QUFDZEgsZUFBUyxFQUFDLGFBQWEsS0FBZCxFQUFxQixVQUFVRyxJQUEvQixFQUFUO0FBQ0Q7QUFSVSxHQUFiO0FBVUQsQ0FYRCxDLENBaERBOzs7OztBQUtBO1FBMkRFTCxhLEdBQUFBLGEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIHYyZXggQVBJ77yaaHR0cHM6Ly93d3cudjJleC5jb20vcC83djlURWM1M1xuICpcbiAqKi9cblxuLy8g5o6l5Y+j6K+35rGCXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4vKipcbiAqIOaSreaUvumhteaOpeWPoy3ojrflj5bop4bpopHor6bmg4VcbiAqIEBwYXJhbSB7Kn0gYXJnc1xuICovXG4vLyBjb25zdCBwbGF5UGFnZURldGFpbCA9IChhcmdzLCByZXNvbHZlKSA9PiB7XG4vLyAgIC8vIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuLy8gICB3ZXB5LnJlcXVlc3Qoe1xuLy8gICAgIHVybDogYGh0dHBzOi8vc2VydmljZS5kYW5kZWxpb24ueW91a3UuY29tL3dlaXhpbi9wbGF5RGV0YWlsYCxcbi8vICAgICBkYXRhOiBhcmdzLFxuLy8gICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4vLyAgICAgICByZXNvbHZlKHsnaXNTdWNjZXNzJzogdHJ1ZSwgJ3Jlc3VsdCc6IGRhdGF9KTtcbi8vICAgICB9LFxuLy8gICAgIGZhaWw6IChkYXRhKSA9PiB7XG4vLyAgICAgICByZXNvbHZlKHsnaXNTdWNjZXNzJzogZmFsc2UsICdyZXN1bHQnOiBkYXRhfSk7XG4vLyAgICAgfVxuLy8gICB9KTtcbi8vICAgLy8gfSk7XG4vLyB9O1xuXG4vLyBjb25zdCBnZXRGYW5zID0gKGFyZ3MsIGNhbGxiYWNrKSA9PiB7XG4vLyAgIHdlcHkucmVxdWVzdCh7XG4vLyAgICAgdXJsOiBgaHR0cHM6Ly9hcGkubS55b3VrdS5jb20vYXBpL3N1YnNjcmliZS9nZXRgLFxuLy8gICAgIGRhdGE6IGFyZ3MsXG4vLyAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgaGVhZGVyOiB7J2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcbi8vICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuLy8gICAgICAgY2FsbGJhY2soeydpc1N1Y2Nlc3MnOiB0cnVlLCAncmVzdWx0JzogZGF0YX0pO1xuLy8gICAgIH0sXG4vLyAgICAgZmFpbDogKGRhdGEpID0+IHtcbi8vICAgICAgIGNhbGxiYWNrKHsnaXNTdWNjZXNzJzogZmFsc2UsICdyZXN1bHQnOiBkYXRhfSk7XG4vLyAgICAgfVxuLy8gICB9KTtcbi8vIH1cblxuXG4vKipcbiAqIOiOt+WPlmphdmFzY3JpcHTmnIDpq5jnmoTliJfooahcbiAqIGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vIC8vIOebtOaOpeaJk+W8gOWPr+S7peafpeeci2dpdGh1YiDlj6/ku6Xkvb/nlKjnmoRhcGlcbiAqIEBwYXJhbSB7Kn0gYXJnc1xuICovXG5jb25zdCBnZXRKYXZhc2NyaXB0ID0gKGFyZ3MsIGNhbGxiYWNrKSA9PiB7XG4gIHdlcHkucmVxdWVzdCh7XG4gICAgdXJsOiAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS9zZWFyY2gvcmVwb3NpdG9yaWVzJyxcbiAgICBkYXRhOiBhcmdzLFxuICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICBjYWxsYmFjayh7J2lzU3VjY2Vzcyc6IHRydWUsICdyZXN1bHQnOiBkYXRhfSlcbiAgICB9LFxuICAgIGZhaWw6IChkYXRhKSA9PiB7XG4gICAgICBjYWxsYmFjayh7J2lzU3VjY2Vzcyc6IGZhbHNlLCAncmVzdWx0JzogZGF0YX0pXG4gICAgfVxuICB9KVxufVxuXG5cblxuZXhwb3J0IHtcbiAgZ2V0SmF2YXNjcmlwdCxcbn1cbiJdfQ==