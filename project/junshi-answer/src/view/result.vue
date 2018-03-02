<template>
<div class="main">
    <outline></outline>
    <div class="back">
        <img :src="mtConfig.back.result"/>
    </div>
    <div class="result">
        <div class="msg"><p v-html="mtConfig.pageData.answer_result_msg"></p><span class="num">{{current.accuracy}}</span></div>
        <div class="draw" @click="drawAward"><img :src="mtConfig.pageData.draw"/></div>
        <div class="invite" @click="setShare"><img :src="mtConfig.pageData.invite"/></div>
    </div>
    <pop></pop>
</div>
</template>

<script>
import { logh5 } from '@ali/lib-goldlog';
import outline from '../components/outline';
import pop from '../components/pop';
export default {
    name: 'result',
    created(){
        /*eslint no-console: 0*/
        if (!this.current.accuracy) {
            this.$router.push('/');
        }
    },
    computed: {
        mtConfig(){
            return this.$store.state.mtConfig;
        },
        current(){
            return this.$store.state.current;
        }
    },
    methods:{
        drawAward(){
            this.$store.dispatch('PRIZE_DATA').then(() => {
                this.res = this.$store.state.prizeDate;
                if (this.res.code === 0) {
                    this.$store.commit('SET_POP_STATE', ['resultPop', true]);
                    logh5.goldlog('CLK', 'answerPrize');
                } else if (this.res.code === 1001) {
                    location.href = `https://account.youku.com/?callback=${encodeURIComponent(location.href)}`;
                } else {
                    this.$store.commit('SET_POP_STATE', ['toast', true, this.res.desc]);
                    setTimeout(() => {
                        this.$store.commit('SET_POP_STATE', []);
                    }, 1000);
                }
            });
        },
        setShare(){
            logh5.goldlog('CLK', 'answerShare');
            this.$store.commit('SET_POP_STATE', ['share', true]);
        }
    },
    components:{
        outline,
        pop
    }
};
</script>
