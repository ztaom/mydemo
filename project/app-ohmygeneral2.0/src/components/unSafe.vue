<template>
    <div class="popwrap" v-show="isShowPop">
        <!-- 遮罩 -->
        <div class="masker"></div>
        <!-- 通用弹窗 -->
        <div class="pop p_normal">
            <div class="inner">
                <div class="p_title" style="font-size:14px; padding:20px 40px; line-height:1.6" v-html="secrityTxt"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'unSafe',
    data() {
        return {
            isShowPop: false,
            secrityTxt: '报！将军们均在外征战迎敌，<br />暂时无法获得将军卡',
        };
    },
    computed: mapState({
        showTips(state) {
            return state.showSafeTip;
        }
    }),
    created() {
        this.init();
    },
    methods: {
        init() {
            this.secrityTxt = window.mgData.baseInfo.secrityTxt;
            this.isShowPop = this.showTips || false;
            this.$store.commit('SHOW_ME', false);
        },
    },
    watch: {
        showTips() {
            //数据更新
            this.init();
        }
    }
};
</script>