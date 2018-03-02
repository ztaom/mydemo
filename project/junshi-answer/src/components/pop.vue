<template>
    <div class="pop" v-if="pop.isShow">
        <div class="cover"></div>
        <div class="layer" v-if="pop.resultPop">
            <span class="close" @click="setClose"></span>
            <img :src="mtConfig.pageData.award_icon" class="award"/>
            <img :src="mtConfig.pageData.pop_content"/>
            <img :src="mtConfig.pageData.btn_icon" class="btnhd" @click="gohd"/>
        </div>
        <div class="toast" v-if="pop.toast">
            {{pop.msg}}
        </div>
        <div class="share" v-if="pop.share">
            <img :src="mtConfig.pageData.share_tip"/>
        </div>
    </div>
</template>
<script>
export default{
    computed:{
        mtConfig(){
            return this.$store.state.mtConfig;
        },
        pop(){
            return this.$store.state.pop;
        }
    },
    methods:{
        setClose(){
            this.$store.commit('SET_POP_STATE', []);
        },
        gohd(){
            location.href = '//h5.m.youku.com/ju/jslm2.html#/';
        }
    }
};
</script>