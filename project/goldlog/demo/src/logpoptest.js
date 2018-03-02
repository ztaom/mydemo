require('./less/base.less');
require('./less/style.less');

// import sendlog from '../goldlog/logpop.js';
import { logpop } from '@ali/lib-goldlog';

//设置全局的
logpop.setLogName('/yt/ykh5.ykh5.ykh5', 'H46956154');
logpop.setActId('logpop');
logpop.setPageId('logpoppage');

const params = {
    'canyu': 1
};
logpop.goldlog('EXP', 'exposure', params);

//页面曝光pv/uv
window.WindVane.call('WVPopLayer', 'display', {}, () => {
    setTimeout(() => {
        logpop.goldlog('EXP', 'exposure');
    }, 1000);
});
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
    logpop.goldlog('CLK', 'clickbtn1');
});

//业务参与率
document.querySelector('.btn2').addEventListener('click', () => {
    logpop.goldlog('CLK', 'clickbtn2', params);
});