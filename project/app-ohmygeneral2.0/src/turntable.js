require('./less/base.less');
require('./less/turntable.less');

import Vue from 'vue';
import TurnTable from './components/turntable';

/* eslint-disable no-new */
new Vue({
    el: '#turntable',
    template: '<TurnTable/>',
    components: { TurnTable }
});