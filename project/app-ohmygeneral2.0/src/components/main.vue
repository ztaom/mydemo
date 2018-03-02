<template>
    <div class="mainvue">
        <!-- 领取成功弹窗 -->
        <div class="p_ok" v-show="isShowAwardPop">
            <div class="inner">
                <div class="txt">{{getCardText}}</div>
                <p class="prizetip">另送
                    <em>“{{awardText}}”</em>，已存入
                    <em>我的奖品</em>
                </p>
            </div>
        </div>

        <div class="p_ok_single" v-show="isShowTextPop">
            <div class="inner">
                <div class="txt">{{textTips}}</div>
            </div>
        </div>

        <div class="popwrap" v-show="versionPop">
            <!-- 遮罩 -->
            <div class="masker"></div>
            <!-- 通用弹窗 -->
            <div class="pop p_normal">
                <div class="inner">
                    <div class="p_title">{{lowVersionText}}</div>
                    <div class="btnarea">
                        <div v-on:click="downloadEvent" class="btn blue_btn">
                            <span>{{commTextBtn}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 红包雨提示 -->
        <div class="popwrap" v-show="showRedRain">
            <!-- 遮罩 -->
            <div class="masker"></div>
            <div class="pop p_swordrain">
                <div class="inner">
                    <div class="close" v-on:click="hideRedRain"></div>
                    <img :src="redRainPic" class="pic">
                </div>
            </div>
        </div>

        <!-- 直播提示 -->
        <div class="popwrap" v-show="showLivePop">
            <!-- 遮罩 -->
            <div class="masker"></div>
            <div class="pop p_swordrain p_live">
                <div class="inner">
                    <div class="close" v-on:click="hideLivePop"></div>
                    <img :src="livePopPic" @click="toLive" class="pic">
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex';
import { browser } from '@ali/browser-detect';
import fn from '../common/fn';
import bridge from '@ali/lib-bridge';
import { logh5 } from '@ali/lib-goldlog';
export default {
    name: 'main',
    data() {
        return {
            isShowTipPop: false,
            isShowMasker: false,
            outsideOpenUrl: '//h5.m.youku.com//ju/omgoutsite.html', //站外推广页地址
            codePageUrl: '//hudong.vip.youku.com/act/padewm.html', //二维码页面地址
            fromLogin: false,
            getCardText: '领取成功',
            noCardText: '你已经参与过了，别太贪心',
            awardText: '开心最重要啦~',
            isShowAwardPop: false,
            isShowTextPop: false,
            textTips: '欢迎参与集将军卡活动',
            versionPop: false,
            lowVersionText: '版本过低，请升级客户端之后再参与',
            commTextBtn: '去更新',
            showRedRain: false, //是否展示红包雨预告
            redRainPic: null,
            livePopPic: null,
            livePopUrl: null,
            showLivePop: false, //是否显示直播弹窗
            isReady: false,
        };
    },
    computed: mapState({
        constData(state) {
            return state.constData;
        },
        redRainData() {
            return this.showRedRain;
        },
        livePopData() {
            return this.showLivePop;
        },
        showMe(state) {
            return state.showMe;
        }
    }),
    created() {
        if (window.mgData) {
            this.outsideOpenUrl = window.mgData.initPop.outsideOpenUrl;
            this.codePageUrl = window.mgData.initPop.codePageUrl;
            this.getCardText = window.mgData.initPop.getCardText;
            this.noCardText = window.mgData.initPop.noCardText;
            this.lowVersionText = window.mgData.initPop.lowVersionText;
            this.commTextBtn = window.mgData.initPop.lowVersionBtn;
            this.redRainPic = window.mgData.baseInfo.rainPic;
            this.livePopPic = window.mgData.livePop.pic;
            this.livePopUrl = window.mgData.livePop.url;
            this.showLivePop = window.mgData.livePop.showPop;
        }
        // const versionArr = (browser.version).split('.');
        // const youkuVersion = parseInt(versionArr[0] * 1000) + parseInt(versionArr[1] * 10) + parseInt(versionArr[2]);
        if (browser.isYouku && !(browser.isYoukuHD || browser.isIPad)) {
            // if ((browser.isAndroid && youkuVersion < 6100) || (browser.isIOS && youkuVersion < 6101)) {
            if (!browser.isWindVane) {
                //提示版本过低,不支持windVane
                this.versionPop = true;
            } else {
                this.isReady = true;
                this.init();
            }
        } else if (browser.isYoukuHD || browser.isIPad || browser.isDesktop) {
            //pad端/PC端 出二维码页面，扫码跳转到站外宣传页
            console.log('PC');
            location.href = this.codePageUrl;
        } else {
            // 站外打开活动页跳转到站外宣推页
            // location.href = this.outsideOpenUrl; //上线时使用
            //console.log('站外打开');
            // this.isReady = true;//上线时去掉
            // this.init();//上线时去掉
        }
    },
    methods: {
        init() {
            this.setRedRain();
            this.setTipPop();
        },
        setRedRain() {
            if (window.localStorage) {
                const mtShowRain = window.mgData.showRedRain;
                const nowDate = parseInt(fn.formateDate(this.constData.rctime));
                const lgDate = parseInt(window.localStorage.getItem('showRainDate')) || false;//展示红包雨预告弹窗时，localStorage存储的当天日期，例如"20171012"
                const checkState = parseInt(window.localStorage.getItem('chekckMatchLogin')) || false;//引导用户登录领取弹窗，用户点击登录按钮时，localStorage存储的服务器返回的时间戳，用于判断用户是否从登录页回来

                if (checkState) {
                    const checkDurTime = parseInt((parseInt(this.constData.rctime) - checkState) / 1000);
                    if (checkDurTime < window.mgData.awardTerm && this.constData.isLogin) {
                        //奖品同步结果提示，成功或失败+抽奖信息
                        this.fromLogin = true;
                    }
                    window.localStorage.removeItem('chekckMatchLogin');
                }

                if (mtShowRain) {
                    if (!lgDate || (nowDate > lgDate)) {//通过服务端返回的时间戳解析的日期判断用户当天是否出过红包雨预告弹窗
                        window.localStorage.setItem('showRainDate', nowDate);
                        this.showRedRain = mtShowRain;
                        const redRainTime = parseInt(window.mgData.baseInfo.redRainTime) || 3000;
                        setTimeout(() => {
                            this.showRedRain = false;
                        }, redRainTime);
                    }
                } else {
                    if (lgDate) {//当天不展示红包雨预告，并且存在localStorage--showRainDate,则清除掉showRainDate
                        window.localStorage.removeItem('showRainDate');
                    }
                }
            }
        },
        setTipPop() {
            const setTime = parseInt(window.mgData.baseInfo.redRainTime) || 5000;
            if ( this.showMe && !this.showRedRain && this.constData && this.constData.tips && this.constData.tips.type) {
                const tipsType = this.constData.tips.type; //提示类型： 1 纯文案提示 2 返回卡,最多三张 3同步成功/失败提示
                const that = this;
                const intervalRC = parseInt(window.mgData.baseInfo.intervalRC) || 500;
                setTimeout(() => {
                    that.showTipPop(tipsType);
                    this.$store.commit('SHOW_ME', false);
                }, intervalRC);
            }
            if (this.showLivePop) {
                setTimeout(() => {
                    this.showLivePop = false;
                    this.$store.commit('SHOW_ME', false);
                }, setTime);
            }

        },
        showTipPop(type) {//提示类型： 1 纯文案提示 2 返回卡,最多三张 3同步成功/失败提示
            switch (type) {
                case 1: {
                    //文案提示
                    this.showTextPop();
                    break;
                }
                case 2: {
                    //得卡提示+抽奖信息
                    this.showCardPop();
                    break;
                }
                case 3: {
                    //文案提示+抽奖信息
                    this.showUpdatePop();
                    break;
                }
                default:
            }
        },
        showTextPop() {
            //纯文案提示
            this.textTips = this.constData.tips.text || this.textTips;
            this.isShowTextPop = true;
        },
        showCardPop() {
            const cardPop = {
                isShowPop: true,
                isSetLS: true, //是否设置localStorage
                cardCount: this.constData.tips.cardCount || null,
                cardList: this.constData.tips.cardList || null,
                randomAward: this.constData.tips.randomAward || null
            };
            this.$store.commit('CARDPOP_DATA', cardPop);
        },
        showUpdatePop() {
            if (this.fromLogin) {
                if (this.constData.tips.status && this.constData.tips.randomAward) {
                    this.getCardText = this.constData.tips.text || this.getCardText;
                    this.awardText = this.constData.tips.randomAward.name;
                    this.isShowAwardPop = true;
                } else {
                    //纯文案展示
                    this.textTips = this.constData.tips.text || (this.constData.tips.status ? this.getCardText : this.noCardText);
                    this.isShowTextPop = true;
                }
            }
        },
        hideRedRain() {
            this.showRedRain = false;
        },
        hideLivePop() {
            this.showLivePop = false;
        },
        autoHideLivePop() {

        },
        toLive() {
            logh5.goldlog('CLK', 'clickToLive');
            if (this.livePopUrl) {
                bridge.playLive({
                    id: this.livePopUrl //直播id
                });
            }
        },
        downloadEvent() {
            //去更新
            const downloadSrc = browser.isAndroid ? window.mgData.baseInfo.downloadAdr : window.mgData.baseInfo.downloadIOS;
            location.href = downloadSrc;
        }
    },
    watch: {
        constData() {
            if (this.isReady) {
                this.init();
            }
        },
        redRainData() {
            if (this.isReady) {
                this.setTipPop();
            }
        },
        LivePopData() {
            if (this.isReady) {
                this.setTipPop();
            }
        }
    }
};
</script>
