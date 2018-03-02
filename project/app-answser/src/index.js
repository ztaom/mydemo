import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
import store from './store/';
import ajax from './config/ajax';

Vue.use(VueRouter)
const router = new VueRouter({
    routes
})

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
