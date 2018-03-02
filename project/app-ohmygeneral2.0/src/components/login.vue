<template>
    <!-- 弹层 -->
    <div class="loginwrap" v-show="dialogLoginShow" v-move="{noMove: noMove}">

        <!-- 遮罩 -->
        <div class="masker"></div>

        <!-- 通用登录弹窗 -->
        <div class="pop p_login" style="display:block">
            <div class="inner">
                <div class="close" @click="dialogHide('dialogLoginShow')"></div>
                <div class="p_title">集将军卡 免单双十一</div>
                <div class="txt">
                    <p>{{tipsText}}</p>
                </div>
                <div class="btnarea">
                    <div class="btn blue_btn" @touchend.stop="callLogin"><span>立即登录</span></div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import fn from '../common/login';
import { logh5 } from '@ali/lib-goldlog';

export default {
    name: 'loginwrap',

    data () {
        return {
            tipsText: '每日首次访问可获得将军卡1张',
        };
    },
    computed: {
        isLogin() {
            return this.$store.state.isLogin;
        },
        dialogLoginShow(){
            return this.$store.state.dialogLoginShow ? true : false;
        },
        noMove(){
            return this.dialogLoginShow;
        }
    },
    created() {
        this.tipsText = window.mgData.baseInfo.loginTips || '每日首次访问可获得将军卡1张';
    },
    methods: {
        callLogin() {
            logh5.goldlog('CLK', 'everyloginbtn');
            window.commonData.homePlayer.pause();
            fn.callLogin();
        },
        dialogHide(dialogName){
            this.$store.commit('HIDE_DIALOG', dialogName);
        }
    }
};
</script>

<style scope lang='less'>

</style>
