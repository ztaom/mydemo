<template>
    <div class="index">
        <c-test></c-test>
        <qa father-component="item"></qa>
    </div>  
</template>
<script>
// import mockData from '../config/data';
// import { Browser } from '@ali/browser-detect';
export default {
    name: 'index',
    data(){
        return {
        };
    },
    components: {
        'cTest': () => import('../components/test'),
        'qa': () => import('../components/qa'),
    },
    mounted () {
        const u = navigator.userAgent;
        if ( u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 ) {
            this.$store.dispatch('setApp', 'android');
        } else if ( /iPhone|iPad/.test(u) ) {
            this.$store.dispatch('setApp', 'ios');
        }
        // console.log(u);
    },
    created () {
        this.$store.dispatch('getLogin');
        console.log(this.$store.state.isLogin);
        // 倒计时
        // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        // async function sleepWork() {
        //     for (let i = 1; i <= 10; ++i) {
        //         console.log(i);
        //         await sleep(1000);
        //     }
        // }
        // sleepWork();
        // const num = '' || 0;
        // console.log(num);
        // console.log(mockData);
    },
    methods: {
    }
};
</script>
