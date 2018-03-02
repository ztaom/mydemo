<template>
    <div class="popwrap" v-show="isShowPop" v-move="{noMove:noMove}">
        <!-- 遮罩 -->
        <div class="masker"></div>

        <!-- 获得卡片弹窗 未登录 -->
        <div class="pop p_getcard p_n_login_pop" v-show="isShowNoLoginPop">
            <div class="inner">
                <div v-on:click="hidePop" class="close"></div>
                <div class="nologinpic">
                    <img :src="LoginPic" alt="" class="pic">
                </div>
                <div class="btnarea">
                    <div v-on:click="callLogin" class="btn blue_btn">
                        <img :src="loginImg" alt="" class="pic">
                    </div>
                </div>
            </div>
        </div>

        <!-- 获得卡片弹窗 已登陆-->
        <div class="pop p_getcard p_login_pop" v-show="isShowLoginPop">
            <div class="inner">
                <div v-on:click="hidePop" class="close"></div>
                <div class="cardnum">{{cardPopTitle}}共{{cardNum}}张</div>
                <div class="card"><img :src="cardIcon" class="pic"></div>
                <div class="gettxt" v-show="isShowAward">
                    <p>{{awardName}}已存入
                        <em>我的奖品</em>
                    </p>
                </div>
                <div class="btnarea">
                    <div v-on:click="toShare" class="btn gray_btn">
                        <img :src="shareImg" alt="" class="pic">
                        <!-- <span>{{shareText}}</span> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { logh5 } from '@ali/lib-goldlog';
import bridge from '@ali/lib-bridge';
import RequestData from '../data/data';
import fn from '../common/login';
import { mapState } from 'vuex';
export default {
    name: 'cardPop',
    data() {
        return {
            noMove: '',
            isShowPop: false,
            isShowAward: false,
            isShowNoLoginPop: false,
            isShowLoginPop: false,
            cardPopTitle: '获得将军卡',
            cardNum: 1,
            cardIcon: '//gw.alicdn.com/tfs/TB1kaHEqgoQMeJjy0FpXXcTxpXa-480-623.png',
            awardName: '开心最重要啦~',
            loginText: '登录领取',
            shareText: '晒一下',
            isSharing: false,
            loginImg: '',
            shareImg: '',
            LoginPic: ''
        };
    },
    computed: mapState({
        cardPopData(state) {
            return state.cardPopData;
        },
        isLogin(state) {
            return state.isLogin;
        },
        initData(state) {
            return state.initData;
        }
    }),
    created() {
        if (window.mgData) {
            this.cardPopTitle = window.mgData.cardPop.popTitle || this.cardPopTitle;
            this.loginText = window.mgData.cardPop.loginText || this.loginText;
            this.shareText = window.mgData.cardPop.shareText || this.shareText;
            this.loginImg = window.mgData.baseInfo.cardLoginBtn;
            this.shareImg = window.mgData.baseInfo.cardShareBtn;
            this.LoginPic = window.mgData.baseInfo.cardLoginPic;
        }
        this.init();
    },
    methods: {
        init() {
            if (this.cardPopData && this.cardPopData.cardCount && this.cardPopData.cardList && this.cardPopData.cardList[0]) {
                this.cardNum = this.cardPopData.cardCount || 1;
                this.cardIcon = this.$store.state.iconMap.popIcon.get(this.cardPopData.cardList[0].id) || this.cardIcon;
                // alert(JSON.stringify(this.cardPopData.cardList[0]));

                if (this.cardPopData.randomAward && this.cardPopData.randomAward[0] && this.cardPopData.randomAward[0].name) {
                    const awardNum = this.cardPopData.randomAward.length;
                    if (awardNum > 1) {
                        this.awardName = `同时获得“${this.cardPopData.randomAward[0].name}”等奖品，`;
                    } else {
                        this.awardName = `同时获得“${this.cardPopData.randomAward[0].name}”奖品，`;
                    }
                    this.isShowAward = true;
                } else {
                    this.isShowAward = false;
                }

                if (this.$store.state.isLogin) {
                    this.isShowLoginPop = true;
                    this.isShowNoLoginPop = false;
                } else {
                    this.isShowNoLoginPop = true;
                    this.isShowLoginPop = false;
                }

                this.isShowPop = this.cardPopData.isShowPop;
                this.noMove = this.cardPopData.isShowPop;
            } else {
                this.noMove = false;
                this.isShowPop = false;
            }
        },
        hidePop() {
            logh5.goldlog('CLK', 'clickcloseicon');
            this.$store.commit('CARDPOP_DATA', { isShowPop: false });
            this.$store.commit('SHOW_ME', false);
            this.noMove = false;
        },
        async toShare() {
            logh5.goldlog('CLK', 'getsharebtn');
            if (this.isLogin && !this.isSharing) {
                this.isSharing = true;
                const param = {
                    shareType: 3
                };
                let shareData = window.commonData.shareDefault;
                try {
                    const getShareResult = await RequestData.getShareInfo(param);//获取分享信息
                    if (getShareResult && getShareResult.data && getShareResult.data.data) {
                        shareData = getShareResult.data.data;
                    }
                } catch (e) {
                    console.log(e);
                }
                const shareDocId = shareData.shareDocId || window.commonData.shareDefault.shareDocId;
                logh5.goldlog('EXP', `set_shareid_${shareDocId}`);
                window.localStorage.setItem('tt', '');//tt存储用于做分享任务的token

                bridge.setShare({
                    title: shareData.title || window.commonData.shareDefault.shareTitle,
                    link: shareData.shortUrl || window.commonData.shareDefault.shareUrl,
                    img: shareData.pic || window.commonData.shareDefault.shareImg, //带http、https协议的图片
                    taskId: window.mgData.baseInfo.taskId,
                    desc: shareData.desc || window.commonData.shareDefault.shareDesc, //分享内容描述
                });
                this.isSharing = false;
            } else {
                this.isShowPop = false;
                this.$store.commit('SHOW_LOGIN_TOAST', true);
                this.noMove = false;
            }
        },
        callLogin() {
            logh5.goldlog('CLK', 'everyloginbtn');
            if (window.localStorage) {//chekckLogin值为最近一次返回的服务器时间，点击登录按钮时存储，初始化时用于判断用户是否从登录页回来
                window.localStorage.setItem('chekckMatchLogin', this.initData.rctime);
            }
            window.commonData.homePlayer.pause();
            fn.callLogin();
        },
    },
    watch: {
        cardPopData() {
            //数据更新
            this.init();
        }
    }
};
</script>
