// require('./less/base.less');
// require('./less/style.less');

import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// 异步加载图片
const loadImg = function (url) {
    return new Promise( (resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = function () {
            resolve();
        };
        img.onerror = function () {
            reject();
        };
    });
};

Promise.all([
    loadImg('https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2012728022,1071344941&fm=173&s=2282944F5AB4A4DE54ADB8A801007081&w=640&h=1094&img.JPEG'),
    loadImg('https://gw.alicdn.com/tfs/TB1vVA7iiqAXuNjy1XdXXaYcVXa-750-1206.png?v123'),
    loadImg('https://gw.alicdn.com/tfs/TB1WJ2kkNrI8KJjy0FpXXb5hVXa-702-413.png?v123'),
]).then( () => {
    console.log('all images are loaded!');
});

// Vue.directive('tap', {
//     bind: (el, binding) => {
//         let startTx, startTy, endTx, endTy;
//         el.addEventListener('touchstart', (e) => {
//             const touch = e.touches[0];
//             startTx = touch.clientX;
//             startTy = touch.clientY;
//             el.addEventListener('touchend', (e) => {
//                 const touch = e.changedTouches[0];
//                 endTx = touch.clientX;
//                 endTy = touch.clientY;
//                 if (Math.abs(startTx - endTx) < 6 && Math.abs(startTy - endTy) < 6) {
//                     const method = binding.value.method;
//                     const params = binding.value.params;
//                     method(params);
//                 }
//             }, false);
//         }, false);
//     }
// });

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});