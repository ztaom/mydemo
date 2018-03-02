<template>
    <div class="popwrap" v-show="isShowPop" v-move="{noMove: noMove}">
        <!-- 遮罩 -->
        <div class="masker"></div>
        <!-- 通用弹窗 -->
        <div class="pop p_normal">
            <div class="inner">
                <div v-on:click="hidePop" class="close"></div>
                <div class="p_title">{{commTipsText}}</div>
                <div class="btnarea">
                    <div v-on:click="sureEvent" class="btn blue_btn">
                        <span>{{commTextBtn}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { browser } from '@ali/browser-detect';
export default {
    name: 'commPop',
    data() {
        return {
            noMove: '',
            isShowPop: false,
            commTextTitle: '集将军卡 免单双十一',
            commTipsText: '版本过低，请升级到最新版本再参与~',
            commTextBtn: '去更新'
        };
    },
    computed: mapState({
        showLowverion(state) {
            this.noMove = state.showLowverion;
            return state.showLowverion;
        }
    }),
    created() {
        this.init();
    },
    methods: {
        init() {
            this.commTipsText = window.mgData.initPop.lowVersionText;
            this.commTextBtn = window.mgData.initPop.lowVersionBtn;
            this.isShowPop = this.showLowverion || false;
        },
        hidePop() {
            this.$store.commit('SHOW_LOWVERSION', false);
        },
        sureEvent() {
            //去更新
            const downloadSrc = browser.isAndroid ? window.mgData.baseInfo.downloadAdr : window.mgData.baseInfo.downloadIOS;
            location.href = downloadSrc;
        }
    },
    watch: {
        showLowverion() {
            //数据更新
            this.init();
        }
    }
};
</script>
