import store from 'vuex';
import bridge from '@ali/lib-bridge';
import { Browser } from '@ali/browser-detect';

export default {
    callLogin(callbackUrl) {
        if (Browser.isYouku) {
            bridge.showLogin({
                link: callbackUrl,
                from: '', //来源 可选
                callback: () => { //回调函数
                    store.commit('SHOW_LOGIN_SUC_POP', true);
                    location.reload();
                    // this.isPop = false;
                    // this.appLoginSuccess = true;
                    // this.isMasker = true;
                }
            });
        } else {
            location.href = `https://account.youku.com/?callback=${encodeURIComponent(callbackUrl)}`;
        }
    }
};