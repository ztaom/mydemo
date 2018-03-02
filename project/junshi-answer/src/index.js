require('./static/less/base.less');
require('./static/less/style.less');

import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import { logh5 } from '@ali/lib-goldlog';

Vue.config.productionTip = false;

logh5.setActId('322782');
logh5.setPageId('answer');

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});