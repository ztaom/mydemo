import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/view/index';
import Answer from '@/view/answer';
import Result from '@/view/result';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        }, {
            path: '/answer',
            name: 'Answer',
            component: Answer
        }, {
            path: '/result',
            name: 'Result',
            component: Result
        }
    ]
});
