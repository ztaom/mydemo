<template>
    <div class="static">
        <h3 class="title" @click="share">test components {{platform}} {{isLogin}}</h3>
        <div class="vuex">
            <div>vuex test</div>
            <p></p>
        </div>
        <!-- <div class="animate">
            动画
            <ul>
                <li @click="clickLi">动画1<span class="a" style=""></span></li>
                <li @click="clickLi">动画2<span class="a" style=""></span></li>
                <li @click="clickLi">动画3<span class="a" style=""></span></li>
                <li>动画4<span class="a" style=""></span></li>
            </ul>
        </div> -->
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'static',
    data(){
        return {
            platform: '',
            num: 0
        };
    },
    created () {
    },
    computed: {
        ...mapState({
            isLogin: state => state.isLogin || false,
        }),
    },
    mounted () {
        this.platform = this.$store.getters.getPlatform;
    },
    methods: {
        initIOS() {
            console.log('oh my god!');
        },
        share() {
            if (this.platform === 'ios') {
                this.initIOS();
            } else if (this.platform === 'android') {
                // window.idarex.invokeArticleShare(target);
            }
        },
        // clickLi(e) {
        //     const offsetLeft = e.target.offsetLeft;
        //     const overallLength = 300;
        //     const endPot = overallLength - offsetLeft;
        //     const insetCss = document.styleSheets[0];
        //     const lastChild = e.target.lastChild;
        //     if (e && this.num < 10) {
        //         this.num++;
        //     }
        //     insetCss.insertRule(
        //         `@keyframes mymove_${this.num}{
        //             0%   {transform: translateX(0px) translateY(0px);}
        //             100% {transform: translateX(${endPot}px) translateY(-80px);}
        //         }`
        //     , 2);
        //     lastChild.style.animation = `mymove_${this.num} 3s linear forwards`;
        // }
    }
};
</script>
<style lang="less" scoped>
*{padding:0; margin:0}
.title{text-align:center}
.animate{
    width:100%; height:100px;background:#eee; position:relative;
    ul{
        background:#ccc; height:50px; width:100%; position:absolute; bottom:0; left:0; display:flex;
        li{width:25%; position:relative;}
        span{width:10px; height:10px; background:red; border-radius:10px; display:block; position:absolute; left:0}
    }
}
@keyframes mymove{
    0%   {transform: translateX(0px) translateY(0px);}
    100% {transform: translateX(100px) translateY(-80px);}
}
</style>

