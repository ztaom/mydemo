require('./less/base.less');
require('./less/style.less');
import sendlog from '../goldlog/logpop.js';

//设置全局的
sendlog.setActId('logh5');

const params = {
    'canyu': 1
};

sendlog.goldlog('EXP', 'exposure');

//页面曝光pv/uv
// window.WindVane.call('WVPopLayer', 'display', {}, function(s){
// 	sendlog.goldlog('EXP', 'exposure')
// }, function(e) {

// });

// window.WindVane.call('DJH5Player', 'videoinfo', {}, function(e) {
//   // alert('videoinfo success: ' + JSON.stringify(e.param));


//   if (e && e.param) {
//       const videoInfo = e.param['videoinfo'];

//       try {
//           const eid = videoInfo['video']['encodeid'];
//           alert(JSON.stringify(videoInfo['video']))
//       } catch (ew) {
//           console.error('data error!');
//       }
//   }

// }, function(e) {
//   alert('videoinfo failure: ' + JSON.stringify(e));
// });

//点击发送埋点
document.querySelector('.btn1').addEventListener('click', () => {
    sendlog.goldlog('CLK', 'clickbtn1');
});

//业务参与率
document.querySelector('.btn2').addEventListener('click', () => {
    sendlog.goldlog('CLK', 'clickbtn2', params);
});