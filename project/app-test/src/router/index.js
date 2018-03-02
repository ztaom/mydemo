import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/page/index';
import Score from '@/page/score';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: Index,
        meta: { requiresIndex: true }
    }, {
        path: '/score',
        name: 'score',
        component: Score,
        meta: { requiresIndex: true }
    }]
});
