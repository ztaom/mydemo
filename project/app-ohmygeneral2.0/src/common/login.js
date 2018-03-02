/**
 * login
 */

import { browser as Browser } from '@ali/browser-detect';
import bridge from '@ali/lib-bridge';
export default {
    /**
     * 调用登录组件进行登录
     * @return {[type]} [description]
     */
    callLogin() {
        if (Browser.isYoukuHD || Browser.isYouku) {
            const href = location.href;
            bridge.showLogin({
                link: href,
                from:'jiangjunling', //来源 可选
                callback: () => {
                    location.reload();
                }
            });
        }
    }
};