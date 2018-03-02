require('./less/base.less');
require('./less/style.less');

import Vue from 'vue';
import vueTap from 'v-tap';
import App from './App';
import store from './store';
import 'babel-polyfill';
import { logh5 } from '@ali/lib-goldlog';
import { browser } from '@ali/browser-detect';
import bridge from '@ali/lib-bridge';
import mtData from './data/mt-data';
import { directive } from './common/directive';
import router from './router/router';


logh5.setActId('315721');
logh5.setPageId('index');

Vue.config.productionTip = false;

store.dispatch('getInitData');

mtData.setMTData(window.mgData);

if (browser.isYouku && !browser.isYoukuHD) { //站内客户端屏蔽右上角分享
    if (browser.isAndroid) {
        bridge.setTitleBar({ //安卓
            setText: '周周抢现金 集将军卡免单双11', //标题栏文案
            showShare: true, //是否显示分享
            showCopy: false, //是否显示复制链接
            showWeb: false, //是否显示外部浏览器
        });
    } else {
        bridge.pageShare({ //IOS
            show: 'yes', //是否显示webview三点控制
            title: window.mgData.defaultShareInfo.title,
            link: window.mgData.defaultShareInfo.url,
            img: window.mgData.defaultShareInfo.img
        });
    }
}
let iLastTouch = null;
/* 阻止用户双击使屏幕上滑 */
document.body.addEventListener('touchend', (event) => {
    const iNow = new Date().getTime();
    iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
    const delta = iNow - iLastTouch;
    if (delta < 500 && delta > 0) {
        event.preventDefault();
        return false;
    }
    iLastTouch = iNow;
}, false);

Vue.use(directive);
Vue.use(vueTap);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App },
    created() {
        this.redrct();
    },
    data() {
        return {
            before: 0,
            after: 0,
            during: 0, //离开主页距离开奖时间差
            endDuring: 0 //离开主页距离开奖结束时间差
        };
    },
    methods: {
        redrct() {
            router.beforeEach((to, from, next) => {
                if (from.matched.some(record => record.meta.requiresTimer)) {
                    this.before = this.getNowTime();
                    next();
                } else if (to.matched.some(record => record.meta.requiresTimer)) {
                    this.after = this.getNowTime();
                    this.during = this.$store.state.durOpenTime - (this.after - this.before);
                    this.endDuring = this.$store.state.durEndTime - (this.after - this.before);
                    this.$store.commit('DUROPENTIME', this.during);
                    this.$store.commit('DURENDTIME', this.endDuring);
                    next();
                } else {
                    next(); // 确保一定要调用 next()
                }
            });
        },
        getNowTime() {
            return new Date().valueOf();
        }
    }
});

