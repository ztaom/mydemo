<template>
<div class="main">
    <outline></outline>
    <div class="back">
        <img :src="mtConfig.back.entry"/>
        <div class="aniwrap">
            <div class="people p_left">
                <div class="hd"><img :src="mtConfig.ani_answer.left_hd"></div>
                <div class="bd"><img :src="mtConfig.ani_answer.left_bd"></div>
                <div class="hand"><img :src="mtConfig.ani_answer.left_hand"></div>
            </div>
            <div class="left_shand"><img :src="mtConfig.ani_answer.left_shand"></div>
            <div class="people p_right">
                <div class="hd"><img :src="mtConfig.ani_answer.right_hd"></div>
                <div class="bd"><img :src="mtConfig.ani_answer.right_bd"></div>
                <div class="hand"><img :src="mtConfig.ani_answer.right_hand"></div>
            </div>
            <div class="right_shand"><img :src="mtConfig.ani_answer.right_shand"></div>
            <div class="heart">
                <img :src="mtConfig.ani_answer.heart" class="pic">
            </div>
            <div class="vip">
                <img :src="mtConfig.ani_answer.award_case" class="pic">
            </div>
        </div>
    </div>
    <div class="entry">
        <img :src="mtConfig.pageData.start_answer" class="startanswer" @click="entryAnswer">
        <!-- <router-link :to="{path:/answer}" tag="button" class="entry-btn"></router-link> -->
    </div>
</div>
</template>

<script>
import outline from '../components/outline';
import { logh5 } from '@ali/lib-goldlog';
export default {
    name: 'hello',
    created(){
        /*eslint no-console: 0*/
        this.$store.dispatch('UPDATE_ANSWER');
        this.$store.dispatch('DEFAULT_CURRENT_ANSWER');
    },
    computed:{
        mtConfig(){
            return this.$store.state.mtConfig;
        },
        answerData(){
            return this.$store.state.answerData;
        }
    },
    methods:{
        entryAnswer(){
            if (this.answerData) {
                logh5.goldlog('CLK', 'answerStart');
                this.$router.push('/answer');
            }
        }
    },
    components:{
        outline
    }
};
</script>
