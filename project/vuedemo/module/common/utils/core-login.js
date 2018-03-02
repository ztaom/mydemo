/**
 * a core object to handle user login 
 * you cloud subscribe the message "get-is-login"
 **/
import PubSub from 'pubsub-js';
import Mtop from '../../mtop';
import config from '../military/config';

module.exports = {
    getLogin() {
        const params = {
            mtopDomain: config.mtopDomain, 
            appKey: config.appKey,
            api: 'com.youku.aplatform.weakGet', 
            ecode: 0, 
            bizType: 'aacc.isLogin', 
            bizParam: {
                //uid:781124763
            },
        };
        Mtop.getMtopinfo(params).then((res) => {
            PubSub.publish('get-is-login', res);
        }, (e) => {
            PubSub.publish('get-is-login', {});
        });
    },
};
