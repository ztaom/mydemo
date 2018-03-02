<template>
<div class="main">
    <outline></outline>
    <div class="back">
        <div class="avatar">
            <div :class="[isYet ? (accuracy ? 'ani_ok' : 'ani_error') : 'ani_normal']" :style="{backgroundImage:'url(' + mtConfig.ani_answer.avatar + ')'}"></div>
        </div>
        <!-- 选择时加pauseani 暂停包子动画-->
        <div :class="[isYet ? 'baozi pauseani' : 'baozi']"><img :src="mtConfig.ani_answer.baozi"></div>
        <img :src="bgImg"/>
    </div>
    <div class="answer">
        <div class="list" v-for="(list, index) in answerData" v-if="current.index === index">
            <div class="mt">
                <span><em>{{index+1}}</em>/{{QALen}}</span>
                <p>{{list.question}}</p>
            </div>
            <div class="QA">
                <p v-for="(item, indexex) in list.option" @click="chooseAnswer($event, item.optionDesc, list.answer, list.question)" :class="(list.answer === item.optionDesc && isYet) ? 'answer_right' : ''">{{item.optionDesc}}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
// ;
import outline from '../components/outline';
import { logh5 } from '@ali/lib-goldlog';
export default {
    name: 'awswer',
    data () {
        return {
            // 司马懿：//gw.alicdn.com/tfs/TB19.IyhN6I8KJjy0FgXXXXzVXa-750-1206.jpg
            // 诸葛亮：//gw.alicdn.com/tfs/TB1YYtFfyqAXuNjy1XdXXaYcVXa-750-1206.jpg
            // 张飞：//gw.alicdn.com/tfs/TB1ZbtFfyqAXuNjy1XdXXaYcVXa-750-1206.jpg
            bgImg:'',
            QALen:'',
            isYet:false,
            accuracy:false
        };
    },
    mounted(){
        /*eslint no-console: 0*/
        this.changeBg();
        if (this.current.index === 5 ) {
            this.$router.push('/');
        }
        if (this.answerData) {
            this.QALen = this.answerData.length;
        } else {
            this.$router.push('/');
        }
    },
    computed:{
        mtConfig(){
            return this.$store.state.mtConfig;
        },
        current(){
            return this.$store.state.current;
        },
        answerData(){
            return this.$store.state.answerData;
        }
    },
    updated(){
        if (this.current.index === 5 ) {
            this.$router.push('/result');
        }
    },
    methods:{
        chooseAnswer(e, name, answer, question){
            if (name === answer) {
                e.target.className = 'answer_right';
                this.accuracy = true;
            } else {
                e.target.className = 'answer_error';
                this.accuracy = false;
            }
            this.isYet = true;

            logh5.goldlog('CLK', `clickAns_${this.current.index}_question=${question}_accuracy=${this.accuracy}`);
            setTimeout(() => {
                this.isYet = false;
                e.target.className = '';
                this.changeBg();
                this.$store.dispatch('CURRENT_ANSWER', this.accuracy);
            }, 2000);
        },
        changeBg(){
            const backIndex = parseInt(Math.random() * 3);
            this.bgImg = this.mtConfig.back.answer[backIndex].pic;
        }
    },
    components:{
        outline
    }
};
</script>
