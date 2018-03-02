<template>
    <div class="popwrap" v-show="isShowPop" v-move="{noMove:noMove}">
        <!-- 遮罩 -->
        <div class="masker"></div>
        <!-- 通用弹窗 -->
        <div class="pop p_normal">
            <div class="inner">
                <div v-on:click="hidePop" class="close"></div>
                <div class="p_title">{{commTextTitle}}</div>
                <div class="txt">
                    <p>{{commTipsText}}</p>
                </div>
                <div class="btnarea">
                    <div v-on:click="sureEvent" class="btn blue_btn"><span>{{commTextBtn}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'commPop',
    data () {
        return {
            noMove: '',
            isShowPop: false,
            commTextTitle: '集将军卡 免单双十一',
            commTipsText: '',
            commTextBtn: '确定'
        };
    },
    computed: mapState({
        commPopData(state) {
            return state.commPopData;
        }
    }),
    created () {
        this.init();
    },
    methods:{
        init() {
            if (this.commPopData) {
                this.commTextTitle = this.commPopData.title || (window.mgData && window.mgData.commTextTitle) || this.commTextTitle;
                this.commTipsText = this.commPopData.text || '';
                this.commTextBtn = this.commPopData.btnText || this.commTextBtn;
                this.isShowPop = this.commPopData.isShowPop || false;
                if (this.commPopData.isShowPop) {
                    this.noMove = true;
                }
            }
        },
        hidePop() {
            this.$store.commit('COMMPOP_DATA', {isShowPop:false});
            this.noMove = false;
        },
        sureEvent() {
            if (this.commPopData && this.commPopData.reloadType) { //重试接口请求
                this.$store.dispatch(this.commPopData.reloadType);
            }
            this.$store.commit('COMMPOP_DATA', {isShowPop:false});
            this.noMove = false;
        }
    },
    watch: {
        commPopData() {
            //数据更新
            this.init();
        }
    }
};
</script>
