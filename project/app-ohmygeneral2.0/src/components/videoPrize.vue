<template>
    <div v-if="role">
        <!-- 动画效果添加，出现的时候添加p_cddown，回收的时候添加p_cdup -->
        <div class="pop p_carddetail" :class="detailStyle" ref="detail" v-show="getShow" v-move="{noMove: noMove}">
            <div class="inner">
                <!-- 广告banner -->
                <div class="videobigads" @click="toAd" v-show="adShow"><img :src="cardAds.cdPic" class="pic"></div>
                <!-- 视频区域 -->
                <div class="videoarea">
                    <div class="video" id="cardVideo"></div>
                    <!-- 播放按钮 -->
                    <div class="startplay" @click="startPlay" v-show="isPlayIcon">
                        <div class="playicon"></div>
                    </div>
                    <div class="endtipwrap" v-if="nextIndex !== null" v-show="isPrevue">
                        <!-- 中奖提示 -->
                        <div class="playtip">
                            <div class="txt">
                                {{drawTxt}}
                                <p>看视频继续拿福利</p>
                            </div>
                        </div>
                        <!-- 抽奖完之后视频选择提示 -->
                        <div class="videoselect" @click="goPlay">
                            <img v-bind:src="predata[nextIndex].imgArr[0].url" class="pic">
                            <p>{{predata[nextIndex].titleArr[0].subTitle}}</p>
                        </div>
                    </div>
                    <!-- 视频角广告 -->
                    <div class="videoads"><img :src="cardAds.vPic" class="pic"></div>
                </div>
                <!-- 卡片视频右侧列表 -->
                <ul class="allvideo">
                    <li v-for="(item, index) in predata[cardIndex].imgArr">
                        <img v-bind:src="item.url" class="pic" @click="prePlay(index)">
                        <p class="showdot">{{predata[cardIndex].titleArr[index].subTitle}}</p>
                    </li>
                </ul>
                <!-- 卡片信息 -->
                <div class="cardinfo">
                    <div class="card"><img :src="role.cardicon" class="pic"></div>
                    <div class="txt">
                        <h3>{{role.name}}<span>({{role.player}}饰)</span></h3>
                        <p class="tostar" :data-starid="role.star" @click="toStar">星球</p>
                        <p class="brief">{{role.desc}}</p>
                        <template v-if="role.num > 0">
                            <div class="handlewrap">
                                <div class="givebtn" v-on:click="goShare(1,role.id)"></div>
                                <div class="cardnum">{{role.num}}张</div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="handlewrap">
                                <div class="askbtn" v-on:click="goShare(2,role.id)"></div>
                                <div class="cardnum">未获得</div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="togglebtn" v-on:click="up()"></div>
            </div>
            <div class="bot"></div>
        </div>
        <div class="masker" v-show="maskShow" v-on:click="up()"></div>
        <div class="p_ok_single" style="font-size:0.4rem;padding:0.28rem 0;height: auto;" v-show="isShowTextPop">
            <div class="inner">
                <div class="txt" v-html="textTips"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { logh5 } from '@ali/lib-goldlog';
import bridge from '@ali/lib-bridge';
import RequestData from '../data/data';
import common from '../common/fn';
import { mapState } from 'vuex';
export default {
    name: 'videPrize',
    props: ['roles'],
    data () {
        const mt = window.mgData;
        return {
            role: null, //当前显示的卡片详情
            isPlayer: null, //播放器对象
            drawTxt: '您没有中奖，再接再厉！', //默认的看视频抽奖数据
            isShowTextPop: false,
            textTips: mt.baseInfo.dataErrorText, //分享接口异常时出弱提示
            timer: null,
            //以下显示开关
            noMove: '', //弹框禁止滚动
            isPrevue: false, //抽奖完之后视频预告显示开关
            detailStyle: '', //展开合起样式控制
            maskShow: true, //遮罩显示开关
            isRequest: true, //默认看完视频抽奖，根据接口返回值canDrawMore为false时不再发请求
            downDetail: false, //根据store改变时，是否首次展开卡片详情的开关
            isPlayIcon: true, //播放器开始播放icon显示开关
            adShow: false, //广告是否显示开关
            //以下为切换视频相关数据
            cardIndex: null, //当前展示的卡片索引，初始值从store中的getIndex获取，后续点击视频抽奖后的切换在组件内，不走store
            predata: mt.cardsPrevue, //mt，海报预报
            cardAds: mt.cardAds,
            nextIndex: null //视频播放完后下一个要播的视频
        };
    },
    computed: mapState({
        getIndex(state) {
            return state.detailIndex;
        },
        getShow(state) {
            this.noMove = state.detailShow;
            return state.detailShow;
        }
    }),
    methods: {
        init() {
            if (this.getShow) {
                this.detailStyle = 'p_cddown';
                this.maskShow = true;
                this.role = this.roles[this.getIndex];
                //切换视频
                if (this.isPlayer) {
                    const vids = this.role.vid.split(',');
                    this.changeVid(vids[0]);
                }
                setTimeout(() => {
                    this.adShow = true;
                }, 500);
            }
            this.cardIndex = this.getIndex;
        },
        toStar(e) {
            if (!this.isPlayer.isPause) {
                this.onPauseH5();
            }
            const sId = e.currentTarget.getAttribute('data-starid');
            const _role = this.roles[this.cardIndex];
            const cardId = _role.id;
            const cardName = _role.name;
            logh5.goldlog('CLK', `detailstar_${cardId}_${cardName}`);
            // 跳转星球话题
            bridge.navigatorPlanets({
                target : `youku://planet/actor_home_page?id=${sId}`,
                fallback : `https://m.planet.youku.com/artist?id=${sId}`,
                vi : '6.6.2.1',
                va : '6.6.3.3'
            });
        },
        toAd() {
            logh5.goldlog('CLK', 'videobigads');
            window.location.href = this.cardAds.adsUrl;
        },
        startPlay() {
            this.isPlayer.play();
            this.isPlayIcon = false;
        },
        initPlayer(vid) {
            const _this = this;
            const config = {
                videoId: vid, //视频id【必传】
                ccode: '0501', //渠道id 【必传】
                'client_id': 'f7c2b04eea94f042',
                events:{
                    'onPlayerReady': this.onPlayerReadyH5,
                    'onPlayStart': this.onAdPlayStartH5,
                    'onAdPlayStart': this.onAdPlayStartH5,
                    'onPlayEnd': () => {
                        _this.draw();
                    },
                    'onPlay': () => {
                        _this.isPlayIcon = false;
                        _this.downDetail = false;
                        const _role = _this.roles[_this.cardIndex];
                        logh5.goldlog('CLK', `clickvideo_${_role.id}_${_role.name}`);
                    },
                    'onPause': _this.onPauseH5,
                    'onMediaSrcOK': this.onMediaSrcOK
                },
                control: {
                    laguange: '', //默认使用的语言类型
                    hd: 'mp4hd', //默认使用的码率
                    autoplay: false //可选，默认不自动播放，非优酷app内部，慎用，可能会不支持【可选】
                }
            };
            this.isPlayer = new window.YKPlayer.Player('cardVideo', config);
        },
        //合起
        up() {
            this.isPlayIcon = true;
            this.detailStyle = 'p_cdup';
            this.maskShow = false;
            this.isPrevue = false;
            this.adShow = false;
            this.onPauseH5();
            this.isMove = true;
            setTimeout(() => {
                this.$emit('isUpFun', false);
                this.$store.commit('DETAIL_SHOW', false);
            }, 500);
        },
        onPauseH5() {
            this.isPlayer.pause();
        },
        async draw() {
            if (this.isRequest) {
                const result = await RequestData.getVideoPrize();
                if (result && result.data && result.data.code === 0) {
                    const _data = result.data.data;
                    if (_data.cardList || _data.randomAward) {
                        const _cardList = common.isArray(_data.cardList) && (_data.cardList.length > 0);
                        const _randomAward = common.isArray(_data.randomAward) && (_data.randomAward.length > 0);
                        if (_cardList && _randomAward) {
                            this.drawTxt = `恭喜获得${_data.randomAward[0].name}等`;
                        } else if (_randomAward) {
                            if (_data.randomAward.length > 1) {
                                this.drawTxt = `恭喜获得${_data.randomAward[0].name}等`;
                            } else {
                                this.drawTxt = `恭喜获得${_data.randomAward[0].name}`;
                            }
                        } else if (_cardList) {
                            if (_data.cardList.length > 1) {
                                this.drawTxt = `恭喜获得${_data.cardList[0].name}等`;
                            } else {
                                this.drawTxt = `恭喜获得${_data.cardList[0].name}`;
                            }
                        }
                    } else {
                        this.drawTxt = '您没有中奖，再接再厉！';
                    }
                    // if (!result.data.data.canDrawMore) {
                    //     this.isRequest = false;
                    // }
                } else {
                    this.drawTxt = '您没有中奖，再接再厉！';
                    this.isRequest = false;
                }
            } else {
                this.drawTxt = '您没有中奖，再接再厉！';
            }
            this.prevuePost();
            this.isPrevue = true;
        },
        prevuePost(){
            const len = this.roles.length;
            if (this.cardIndex === len - 1) {
                this.nextIndex = 0;
            } else {
                this.nextIndex = this.cardIndex + 1;
            }
        },
        //点击视频预告播放
        goPlay() {
            this.isPrevue = false;
            this.role = this.roles[this.nextIndex];
            this.cardIndex = this.nextIndex;
            this.changeVid(this.role.vid.split(',')[0]);
            logh5.goldlog('CLK', `clickrightposter_${this.role.id}_${this.role.name}`);
            this.isPlayIcon = true;
        },
        //点击右侧列表播放
        prePlay(index) {
            logh5.goldlog('CLK', `card_${this.role.id}_${index}`);
            //this.onPauseH5();
            this.changeVid(this.role.vid.split(',')[index]);
            this.isPrevue = false;
            this.isPlayIcon = true;
        },
        //播放器切换视频id
        changeVid(vid) {
            this.isPlayer.changeByVid(vid);
        },
        //点击赠卡或索卡
        async goShare(type, id) {
            if (type === 1) {
                logh5.goldlog('CLK', 'cardgive');
            } else if (type === 2) {
                logh5.goldlog('CLK', 'cardask');
            }
            const param = {
                shareType: type, //（必选）1：赠送；2：索要；3：普通分享
                cardId: id //（可选）赠卡/索卡的卡片id,普通分享没有cardId参数
            };
            this.isShowTextPop = false;
            try {
                const result = await RequestData.getShareInfo(param);//获取分享信息
                if (result && result.data && result.data.data) {
                    const data = result.data.data;
                    const reg = /http|https/gi;
                    const pic = reg.test(data.pic) ? data.pic : `https:${data.pic}`;
                    const shareParam = {
                        sourceId: 10, //分享来源页面编号
                        outputType: 1, //分享内容类型
                        title: data.title,
                        link: data.shortUrl,
                        img: pic, //带http、https协议
                        taskId: window.mgData.baseInfo.taskId,
                        desc: data.desc //分享内容描述
                    };
                    window.localStorage.setItem('tt', '');
                    this.onPauseH5();
                    bridge.setShare(shareParam);
                }
            } catch (e) {
                this.isShowTextPop = true;
                window.localStorage.setItem('errorLog', `getShareInfo错误日志:${JSON.stringify(e)}`);
            }
        },
        async getRecordData(dialogName){
            this.$store.dispatch('getRecordData');
            this.$store.commit('SHOW_DIALOG', dialogName);
        }
    },
    updated(){
        if (this.downDetail) {
            const vids = this.role.vid.split(',');
            if (vids.length > 0 && !this.isPlayer) {
                this.initPlayer(vids[0]);
            }
        }
    },
    watch: {
        getIndex() {
            //this.init();
        },
        getShow() {
            this.init();
            this.downDetail = true;
        }
    }
};
</script>
