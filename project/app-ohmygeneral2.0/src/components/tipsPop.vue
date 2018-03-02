<template>
    <div class="popwrap">
        <!-- 遮罩 -->
        <div class="masker" v-show="showMasker" v-on:click="reloadEvent" style="background-color: transparent;"></div>
        <!-- 异常轻提示 -->
        <div class="pop p_abnormal" v-show="isShowPop" v-move="{noMove:noMove}">
            <div class="inner">
                <div class="txt">
                    <p v-html="commTipsText"></p>
                </div>
                <div class="btnarea" v-show="isShowBtn" v-on:click="sureEvent">
                    <div class="btn"><span>{{commTextBtn}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'tipsPop',
    data () {
        return {
            noMove: '',
            isShowPop: false,
            isShowBtn: false,
            commTipsText: '集将军卡 免单双十一',
            commTextBtn: '确定'
        };
    },
    computed: mapState({
        lightTips(state) {
            return state.lightTips;
        },
        showMasker(state) {
            return state.showMasker;
        },
    }),
    created () {
        this.init();
    },
    methods:{
        init() {
            const that = this;
            if (this.lightTips) {
                this.commTipsText = this.lightTips.text || this.commTipsText;
                this.isShowBtn = this.lightTips.isShowBtn || false;
                this.commTextBtn = this.lightTips.btnText || this.commTextBtn;
                this.isShowPop = this.lightTips.isShowPop || false;
                if (this.lightTips.isShowPop) {
                    this.noMove = true;
                    const timer = setTimeout(() => {
                        clearTimeout(timer);
                        that.hidePop();
                    }, 4000);
                }
            }
        },
        hidePop() {
            this.$store.commit('LIGHT_TIP', {isShowPop:false});
            this.noMove = false;
        },
        sureEvent() {
            if (this.lightTips && this.lightTips.reloadType) { //重试接口请求
                this.$store.dispatch(this.lightTips.reloadType);
            }
            this.hidePop();
        },
        reloadEvent() {
            this.$store.dispatch('getInitData');
        },
    },
    watch: {
        lightTips() {
            //数据更新
            this.init();
        },
        showMasker() {
            //showMasker
        }
    }
};
</script>