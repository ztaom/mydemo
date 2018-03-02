import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', component: (resolve) => resolve(require('../components/index')), meta: { requiresTimer: true }}, // a meta field},
        { path: '/cardlist', component: (resolve) => resolve(require('../components/list')), meta: {requiresTimerBack: true }},
        { path: '/turntable', component: (resolve) => resolve(require('../components/turntable')) }
    ]
});
export default router;
