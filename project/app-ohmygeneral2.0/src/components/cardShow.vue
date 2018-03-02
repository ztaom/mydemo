<template>
    <!-- 卡片显示区域 -->
    <div class="cardwrap" v-if="roles.length > 0" id="cardwrap">
        <div class="cardlist">
            <div :class="'item i_'+(index+1)" v-for="(item, index) in roles" v-tap="{ methods : appear, index : index}">
                <!-- <div class="card"><img v-bind:src="item.icon" class="pic"></div> -->
                <div class="card"><img v-bind:src="(parseInt(item.num) > 0) ? homeIcon.get(item.id) : backIcon.get(item.id)" class="pic"></div>
                <div class="getcardnum">{{item.num || 0}}张</div>
            </div>
            <!-- 卡片点击提示 -->
            <div class="clicktip" v-show="clickTipShow" v-tap="{ methods : appear, index : 2}">
                <div class="acircle"><img :src="scalePic" class="pic"></div>
                <div class="tippic"><img :src="clickTipPic" class="pic"></div>
            </div>
        </div>
        <!-- 集齐开奖 -->
        <div class="openarea">
            <div class="utxt recordbtn" @click="getCardlist()">我的卡片</div>
            <!--<div class="utxt recordbtn" @click="getRecord('dialogCHShow')">得卡明细</div>-->
            <div class="openprizebtn">
                <!--过期-->
                <div v-if="isOver" class="openbtn o_gray_btn">本期兑奖已结束</div>
                <!--刚刚点击过开奖按钮，并成功领取奖品-->
                <div v-else-if="isGetPrize" v-on:click="draw(3)" class="openbtn o_gray_btn">已开奖</div>
                <!--刚刚点击过开奖按钮，并成功领取奖品-->
                <div v-else-if="isErrorPrize" v-on:click="draw(3)" class="openbtn o_gray_btn">已开奖</div>
                <!--开奖按钮-->
                <div v-else-if="isLogin && cardData.avaliable && isTime && !cardData.isopencham" v-on:click="draw(1)" class="openbtn o_colour_btn">集齐五卡开奖</div>
                <!--未登录时点击开奖按钮-->
                <div v-else-if="isLogin === false" v-on:click="draw(4)" class="openbtn o_gray_btn">{{prizeTxt}}</div>
                <!--未满足开奖条件按钮-->
                <div v-else-if="cardData.avaliable === false" v-on:click="draw(2)" class="openbtn o_gray_btn">{{prizeTxt}}</div>
                <!--未到开奖时间-->
                <div v-else-if="!isTime" v-on:click="draw(5)" class="openbtn o_gray_btn">{{prizeTxt}}</div>
                <!--已开奖按钮-->
                <div v-else-if="cardData.isopencham" v-on:click="draw(3)" class="openbtn o_gray_btn">已开奖</div>
            </div>
            <div class="utxt myaward" @click="toAward">{{myawardtext}}<span></span></div>
        </div>
        <div class="masker" v-show="maskShow"></div>
        <RecordList></RecordList>
        <!-- （点击卡片之后出现）人物相关视频组件 -->
        <VideoPrize :roles="roles"></VideoPrize>
        <!-- 开奖弹窗 -->
        <div class="pop p_prize_hb" v-show="prizePop" v-move="{noMove: noMove}" v-if="prizeData && prizeData.openAward">
            <div class="rotatebg"></div>
            <div class="inner">
                <div class="close" v-on:click="close()"></div>
                <div class="prize">
                    <div class="hongbao" v-show="isCouponFee">{{couponFee}}</div>
                    <div class="mdj">
                        <div class="plus" v-show="isCouponFee && isFreecoupon">加</div>
                        <img v-show="isFreecoupon" src="//gw.alicdn.com/mt/TB1dhl6r43IL1JjSZPfXXcrUVXa-367-130.png" class="pic">
                    </div>
                    <div class="hb_tips">最高11.11万</div>
                </div>
                <div class="btnarea">
                    <a style="display:inline-block;text-decoration: none;" class="btn orange_btn" v-on:click="goLook()" :href="mgData.myAwardUrl"><span>立即查看</span></a>
                    <div class="btn gray_btn" style="display:block" v-on:click="goShare(3, '')"><span>晒一下</span></div>
                </div>
                <div class="caidai"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { logh5 } from '@ali/lib-goldlog';
import bridge from '@ali/lib-bridge';
import { mapState } from 'vuex';
import RequestData from '../data/data';
export default {
    name: 'cardwrap',
    components: {
        'VideoPrize': () => import('./videoPrize'),
        'RecordList': () => import('./recordList')
    },
    data () {
        return {
            isGetPrize: false, //开奖成功
            isErrorPrize: false, //开奖失败
            isTime: false, //是否到开奖时间
            isOver: false, //兑奖已结束，默认未结束
            isCouponFee: false, //开奖后是否有现金
            isFreecoupon: false, //开奖后是否有免单抽奖券
            couponFee: '无', //集齐开奖后显示的金额
            mgData: null, //mt配置数据获取
            num:'',
            maskShow: false,
            noMove: '', //开奖弹窗出现禁止遮罩滚动
            prizePop: false, //开奖弹窗
            roles: [], //5张将军卡
            role: null,
            arrPlayer: [], //5个播放器对象
            playIndex: -1, //当前播放的视频索引
            isVideoShow: false,
            isOpen: 0,
            popObj: {
                title: '集将军卡 免单双十一',
                text: '',
                btnText: '确定',
                isShowPop: false
            },
            clickTipShow: true,
            clickTipPic: window.mgData.otherInfo.clickTipPic,
            scalePic: window.mgData.otherInfo.scalePic,
            drawPic: window.mgData.baseInfo.openBtnY,
            unDrawPic: window.mgData.baseInfo.openBtnN,
            overDrawPic: window.mgData.baseInfo.openBtnO,
            myawardtext: window.mgData.baseInfo.myAwardTxt,
            shareData: null, //点击“晒一下”时，获取的分享数据
            homeIcon: null,
            backIcon: null,
            canDraw: true, //开奖按钮加锁
            canShare: true, //给“晒一晒”按钮加锁
            prizeTxt: '集齐五卡开奖' //开奖按钮文案
        };
    },
    computed: mapState({
        idata(state) {
            if (state) {
                return state;
            }
        },
        cardData(state) {
            return state.cardData;
        },
        prizeData(state) {
            if (state.openPrizeData) {
                return state.openPrizeData;
            }
        },
        isLogin(store) {
            return store.isLogin;
        },
        durOpenTime(state) {
            return state.durOpenTime;
        },
        durEndTime(state) {
            return state.durEndTime;
        }
    }),
    created () {
        this.mgData = window.mgData;
        this.init();
    },
    methods: {
        toStar(e) {
            const sIndex = e.currentTarget.getAttribute('data-index');
            const sId = e.currentTarget.getAttribute('data-starid');
            let star = 'star';
            star = `${star}${(Number(sIndex) + 1)}`;
            logh5.goldlog('CLK', star);
            // 跳转星球话题
            bridge.navigatorPlanets({
                target : `youku://planet/fans_topic_homepage?id=${sId}`,
                fallback : `https://m.planet.youku.com/topic?id=${sId}`,
                vi : '6.6.2.1',
                va : '6.6.3.3'
            });
        },
        init() {
            if (this.$store.state.iconMap) {
                this.homeIcon = this.$store.state.iconMap.homeIcon;
                this.backIcon = this.$store.state.iconMap.backIcon;
            }
            if (this.cardData.roles && this.cardData.roles.length > 0) {
                this.roles = this.cardData.roles;
            }
            this.calTime();
        },
        //计算开奖时间
        calTime() {
            const constData = this.idata.constData;
            if (constData.rctime && constData.openchamtime && constData.endchamtime) {
                const nowTime = constData.rctime;
                const startTime = constData.openchamtime;
                const endTime = constData.endchamtime;
                const diff = startTime - nowTime;
                if (nowTime >= startTime && nowTime <= endTime) {
                    this.isTime = true;
                    //开奖结束，将按钮置灰
                    const endDiff = endTime - nowTime;
                    if (endDiff >= 0 && endDiff <= 8640000) {
                        this.$store.commit('DURENDTIME', endDiff);
                    }
                } else if (diff > 0){
                    //开奖倒计时
                    this.$store.commit('DUROPENTIME', diff);
                } else {
                    this.isOver = true;
                }
            }
        },
        calEndDiff() {
            const endDiff = this.durEndTime;
            const _this = this;
            setTimeout(() => {
                _this.isOver = true;
            }, endDiff);
        },
        calDiff() {
            const diff = this.durOpenTime;
            if (diff > 0) {
                const txt = '距离开奖还有';
                const dayBase = 24 * 60 * 60 * 1000;
                const hourBase = 60 * 60 * 1000;
                const minuteBase = 60 * 1000;

                const day = Math.floor(diff / dayBase);
                const hour = Math.floor((diff - day * dayBase) / hourBase);
                const minute = Math.floor((diff - day * dayBase - hour * hourBase) / minuteBase);
                const second = Math.floor((diff - day * dayBase - hour * hourBase - minute * minuteBase ) / 1000);
                if (day > 0) {
                    this.prizeTxt = `${txt}${day}天`;
                    if (day === 1) {
                        this.goTimer(diff);
                    }
                } else if (hour > 0) {
                    this.prizeTxt = `${txt}${hour}小时`;
                    this.goTimer(diff);
                } else if (minute > 0) {
                    this.prizeTxt = `${txt}${minute}分钟`;
                    this.goTimer(diff);
                } else if (second > 0) {
                    this.prizeTxt = `${txt}${second}秒`;
                    this.goTimer(diff);
                } else {
                    this.isTime = true;
                    this.prizeTxt = '集齐五卡开奖';
                }
            }
        },
        goTimer(diff) {
            let nowDiff = diff;
            const _this = this;
            window.openPrizeTimer = setInterval(() => {
                window.clearInterval(window.openPrizeTimer);
                nowDiff -= 1000;
                if (nowDiff > 0) {
                    _this.$store.commit('DUROPENTIME', nowDiff);
                } else {
                    window.clearInterval(window.openPrizeTimer);
                }
            }, 1000);
        },
        //展开人物相关视频组件
        appear(params) {
            const index = params.index;
            if (!window.commonData.homePlayer.isPause) {
                window.commonData.homePlayer.pause();
            }
            if (this.isLogin) {
                const _role = this.roles[index];
                const cardId = _role.id;
                const cardName = _role.name;
                logh5.goldlog('CLK', `card_${cardId}_${cardName}`);
                this.clickTipShow = false;
                this.isVideoShow = true;
                this.$store.commit('DETAIL_INDEX', index);
                this.$store.commit('DETAIL_SHOW', true);
            } else {
                this.$store.commit('SHOW_LOGIN_TOAST', true);
            }
        },
        onPauseH5() {
            this.arrPlayer[this.playIndex].fun.pause();
        },
        //开奖按钮 1.开奖，2.未满足开奖按钮，3.开过奖
        draw(index) {
            switch (index) {
                //开奖按钮
                case 1: {
                    if (this.canDraw) {
                        this.canDraw = false;
                        logh5.goldlog('CLK', 'openprize');
                        const randomTime = Math.floor((Math.random() * 500 )); //在0-1000之间随机一个时间n，在n毫秒之后发送开奖请求，降低QPS
                        const timer = setTimeout(() => {
                            clearTimeout(timer);
                            this.$store.dispatch('getPrizeData');
                            //this.canDraw = true;
                        }, randomTime);
                    }
                    break;
                }
                //未集齐卡按钮
                case 2: {
                    this.popObj.isShowPop = true;
                    this.popObj.text = this.mgData.drawCardTxt;
                    this.$store.commit('COMMPOP_DATA', this.popObj);
                    break;
                }
                //已开奖按钮
                case 3: {
                    this.popObj.isShowPop = true;
                    this.popObj.text = this.mgData.drawOver;
                    this.$store.commit('COMMPOP_DATA', this.popObj);
                    break;
                }
                //未登录时点击开奖按钮
                case 4: {
                    this.$store.commit('SHOW_LOGIN_TOAST', true);
                    break;
                }
                //未到开奖时间
                case 5: {
                    this.popObj.isShowPop = true;
                    this.popObj.text = '尚未到开奖时间';
                    this.$store.commit('COMMPOP_DATA', this.popObj);
                    break;
                }
                default:
            }
        },
        toAward() {
            logh5.goldlog('CLK', 'myaward');
            bridge.loadUrl({
                link: window.mgData.myAwardUrl
            });
            window.commonData.homePlayer.pause();
        },
        showDraw() {
            const data = this.prizeData;
            const openAward = data.openAward;
            if (data && data.awardcode) {
                if (openAward.length > 0) {
                    for (let i = 0; i < openAward.length; i++) {
                        if (openAward[i].type === 13) {
                            this.couponFee = openAward[i].name;
                            this.isCouponFee = true;
                        } else if (openAward[i].type === 5 && openAward[i].subType === 'freecoupon') {
                            this.isFreecoupon = true;
                        }
                    }
                    this.maskShow = true;
                    this.prizePop = true;
                    this.noMove = true;
                    this.canDraw = true;
                } else {
                    //奖品为空，不再请求
                    this.winNoneFun();
                    this.canDraw = true;
                    return;
                }
            } else {
                //接口出错，可再次请求
                this.winNoneFun();
                this.canDraw = true;
                return;
            }
        },
        //接口出错，可再次请求
        winErrorFun() {
            this.popObj.isShowPop = true;
            this.popObj.text = this.mgData.winError;
            this.$store.commit('COMMPOP_DATA', this.popObj);
        },
        //奖品为空，不再请求
        winNoneFun() {
            this.popObj.isShowPop = true;
            this.popObj.text = this.mgData.winNone;
            this.$store.commit('COMMPOP_DATA', this.popObj);
            this.isErrorPrize = true;
        },
        close() {
            this.maskShow = false;
            this.onMove = false;
            this.prizePop = false;
            this.noMove = false;
            this.isGetPrize = true;
        },
        //立即查看
        goLook() {
            logh5.goldlog('CLK', 'prizepopgetbtn');
        },
        //晒一下
        async goShare(type, id) {
            if (this.canShare) {
                // this.maskShow = false;
                // this.prizePop = false;
                this.canShare = false;
                logh5.goldlog('CLK', 'prizepopsharebtn');
                const param = {
                    shareType: type, //（必选）1：赠送；2：索要；3：普通分享
                    cardId: id //（可选）赠卡/索卡的卡片id,普通分享没有cardId参数
                };
                const result = await RequestData.getShareInfo(param);//获取分享信息

                if (result.data && result.data.data) {
                    this.shareData = result.data.data;
                }
                this.canShare = true;
                //默认兜底
                const sDefault = window.commonData.shareDefault;

                const reg = /http|https/gi;
                const getPic = (this.shareData && this.shareData.pic) || sDefault.shareImg;
                const pic = reg.test(getPic) ? getPic : `https:${getPic}`;
                window.localStorage.setItem('tt', '');
                bridge.setShare({
                    sourceId: 10, //分享来源页面编号
                    outputType: 1, //分享内容类型
                    title: (this.shareData && this.shareData.title) || sDefault.shareTitle,
                    link: (this.shareData && this.shareData.shortUrl) || sDefault.shareUrl,
                    img: pic, //带http、https协议
                    taskId: window.mgData.baseInfo.taskId,
                    desc: (this.shareData && this.shareData.desc) || sDefault.shareDesc //分享内容描述
                });
            }
        },
        async getCardlist(dialogName){
            console.log(dialogName);
            logh5.goldlog('CLK', 'clickcardlist');
            if (this.isLogin) {
                logh5.goldlog('CLK', 'getcardbtn');
                if (this.cardData.allRoles && this.cardData.allRoles.length > 0) {
                    window.location.hash = '#/cardlist';
                } else {
                    this.popObj.isShowPop = true;
                    this.popObj.text = this.mgData.initPop.faultTolerant;
                    this.popObj.btnText = this.mgData.initPop.resetBtn;
                    this.popObj.reloadType = 'getInitData';
                    this.$store.commit('COMMPOP_DATA', this.popObj);
                }
            } else {
                this.$store.commit('SHOW_LOGIN_TOAST', true);
            }
        },
        async getRecord(dialogName) {
            if (this.isLogin) {
                logh5.goldlog('CLK', 'getcardbtn');
                this.$store.dispatch('getRecordData');
                this.$store.commit('SHOW_DIALOG', dialogName);
            } else {
                this.$store.commit('SHOW_LOGIN_TOAST', true);
            }
        }
    },
    watch: {
        idata() {
            this.init();
        },
        prizeData() {
            this.showDraw();
        },
        cardData() {
            this.init();
        },
        durOpenTime() {
            this.calDiff();
        },
        durEndTime() {
            this.calEndDiff();
        }
    }
};
</script>
