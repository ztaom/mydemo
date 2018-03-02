<template>
    <!-- 任务区域 -->
    <div class="taskwrap">
        <div class="title">
            <img v-bind:src="taskConfig.titlePic" class="pic">
            <div class="shuiyin"><img :src="shuiyin" class="pic"></div>
        </div>
        <div class="cctstate">已有
            <em>{{rcount}}</em>人集齐；{{taskConfig.prizeDesc}}</div>
        <div class="taskarea">
            <!-- 每日登录 -->
            <div class="item" @click="toLogin">
                <img v-bind:src="taskConfig.randomtask.pic" class="pic"> {{taskConfig.randomtask.title}}
                <span v-show="!randomtask" v-bind:style="{background:taskConfig.didSpanBg}"></span>
            </div>
            <!-- 分享好友 -->
            <div class="item" @click="toShare">
                <img v-bind:src="taskConfig.sharedtask.pic" class="pic"> {{taskConfig.sharedtask.title}}
                <span v-show="!sharedtask" v-bind:style="{background:taskConfig.didSpanBg}"></span>
            </div>
            <!-- 去逛星球 -->
            <div class="item" @click="toStar">
                <img v-bind:src="taskConfig.startask.pic" class="pic"> {{taskConfig.startask.title}}
                <span v-show="!startask" v-bind:style="{background:taskConfig.didSpanBg}"></span>
            </div>
            <!-- 去看正片 -->
            <div class="item" @click="toWatchTV">
                <img v-bind:src="taskConfig.videotask.pic" class="pic">
                {{ videotaskTitle }}
                <span v-show="!videotask" v-bind:style="{background:taskConfig.didSpanBg}"></span>
            </div>
        </div>
        <div class="p_task" v-show="toastShow">
            <div class="inner">
                <div class="txt">
                    {{taskDesc}}
                </div>
            </div>
        </div>
        <!-- 视频列表弹窗 -->
        <div class="masker" style="display:none"></div>
        <div class="pop p_videolist" style="display:none">
            <div class="inner">
                <div class="videolist">
                    <div class="item" @click="toPlay" v-for="(item, index) in videoList" :data-vid="item.vid" :data-showid="item.showid" :data-index="index">
                        <img :src="item.vidPoster">
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.desc }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { browser as Browser } from '@ali/browser-detect';
import { logh5 } from '@ali/lib-goldlog';
import bridge from '@ali/lib-bridge';
import RequestData from '../data/data';
// import fn from '../common/fn';
export default {
    name: 'taskwrap',
    data() {
        return {
            videoList: '',
            playDate: '独家开播',
            judge: false,
            isShare: false,
            taskDesc: '首次做XX任务的提示弹窗',
            toastShow: false,
            canShare: true, //给“晒一晒”按钮加锁
            shuiyin: window.mgData.baseInfo.shuiyin,
            taskId: window.mgData.baseInfo.taskId,
        };
    },
    created() {
        const jsVideoList = window.mgData.videoList;
        this.videoList = jsVideoList;
        // 分享回调
        document.addEventListener('ShareResultCallback', (data) => {
            const shareResult = (data.param && data.param.callbackresult === 1) ? true : false;
            const shareKey = window.localStorage.getItem('tt');
            if (shareKey && this.sharedtask && shareResult) {
                this.$store.dispatch('setShareTask', shareKey);
                window.localStorage.setItem('tt', '');
            }
        }, false);
    },

    computed: {
        isLogin() {
            return this.$store.state.isLogin;
        },
        // 日常登录
        randomtask() {
            const result = (this.$store.state.taskData && this.$store.state.taskData.randomtask);
            return result;
        },
        // 分享给好友
        sharedtask() {
            const result = (this.$store.state.taskData && this.$store.state.taskData.sharedtask);
            return result;
        },
        // 逛星球
        startask() {
            const result = (this.$store.state.taskData && this.$store.state.taskData.startask);
            return result;
        },
        // 看正片
        videotask() {
            const result = (this.$store.state.taskData && this.$store.state.taskData.videotask);
            return result;
        },
        // 看剧得卡标题任务完成次数
        videotaskTitle(){
            const videotaskFinishCount = this.$store.state.taskData && this.$store.state.taskData.videotaskFinishCount;
            return (videotaskFinishCount > 0) ? this.taskConfig.videotask.titleS : this.taskConfig.videotask.title;
        },
        recordData() {
            return this.$store.state.recordData;
        },
        taskConfig() {
            return window.mgData.taskConfig;
        },
        rcount() {
            return this.$store.state.initData.rcount;
        }
    },
    methods: {
        toPlay(e) {
            // const sVid = e.currentTarget.getAttribute('data-vid');
            const sShowId = e.currentTarget.getAttribute('data-showid');
            const vIndex = e.currentTarget.getAttribute('data-index');
            let godVid = 'v';
            godVid = `${godVid}${(Number(vIndex) + 1)}_${sShowId}`;
            logh5.goldlog('CLK', godVid);
            //跳转播放页
            bridge.play({
                // vid: sVid
                showid: sShowId
            });
        },
        toLogin() {
            const self = this;
            if (!self.isLogin) {
                logh5.goldlog('CLK', 'clicktoaccess');
                self.$store.commit('SHOW_LOGIN_TOAST', true);
            } else {
                const taskDesc = self.taskConfig.randomtask.toast;
                const toastHideTime = self.taskConfig.toastHideTime;
                self.showToast(taskDesc);
                setTimeout(() => {
                    self.hideToast();
                }, toastHideTime);
            }
        },
        async toShare() {
            logh5.goldlog('CLK', 'sharepagebtn');
            const self = this;
            const versionArr = (Browser.version).split('.');
            const youkuVersion = parseInt(versionArr[0] * 1000) + parseInt(versionArr[1] * 10) + parseInt(versionArr[2]);
            if ((Browser.isAndroid && youkuVersion < 6100) || (Browser.isIOS && youkuVersion < 6101)) {//版本过低，不支持分享回调监听
                self.$store.commit('SHOW_LOWVERSION', true);
            } else {
                if (this.isLogin) {
                    if (this.$data.canShare) {
                        this.$data.canShare = false;
                        const param = {
                            shareType: 3
                        };
                        const reg = /http|https/gi;
                        const taskDesc = self.taskConfig.sharedtask.toast;
                        const toastHideTime = self.taskConfig.toastHideTime;
                        self.showToast(taskDesc);
                        this.$data.canShare = true;
                        let shareData = window.commonData.shareDefault;
                        Object.assign('shareData', {'token': ''});
                        try {
                            const getShareResult = await RequestData.getShareInfo(param);//获取分享信息
                            shareData = getShareResult.data.data;
                        } catch (e) {
                            console.log(e);
                        }
                        const getPic = shareData.pic || window.commonData.shareDefault.shareImg;
                        const pic = reg.test(getPic) ? getPic : `https:${getPic}`;
                        setTimeout(() => {
                            self.hideToast();
                            bridge.setShare({
                                title: shareData.title || window.commonData.shareDefault.shareTitle,
                                link: shareData.shortUrl || window.commonData.shareDefault.shareUrl,
                                img: pic, //带http、https协议
                                desc: shareData.desc || window.commonData.shareDefault.shareDesc, //分享内容描述
                                taskId: this.$data.taskId //用于业务方标识该分享的一个任务id 没有可与不传
                            });
                            if (this.sharedtask ) {
                                window.localStorage.setItem('tt', shareData.token);
                            }
                        }, toastHideTime);
                    }
                } else {
                    this.$store.commit('SHOW_LOGIN_TOAST', true);
                }
            }
        },

        toStar() {
            const self = this;
            logh5.goldlog('CLK', 'clicktostarbtn');
            if (this.isLogin) {
                window.commonData.homePlayer.pause();
                const taskDesc = self.taskConfig.startask.toast;
                const toastHideTime = self.taskConfig.toastHideTime;
                self.showToast(taskDesc);
                // if (this.startask) {//startask为true表示任务可做，即任务未完成
                //     fn.goUpdateTime(this.$store, 'startask');
                // }
                setTimeout(() => {
                    self.hideToast();
                    // 去逛星球
                    bridge.navigatorPlanets({
                        target: `youku://planet/ip_home_page?id=${this.taskConfig.startask.starId}`,
                        fallback: `https://m.planet.youku.com/ippage?id=${this.taskConfig.startask.starId}`,
                        vi: '6.6.2.1',
                        va: '6.6.3.3',
                        // env:'暂未启用'
                    });
                }, toastHideTime);
            } else {
                this.$store.commit('SHOW_LOGIN_TOAST', true);
            }
        },

        toWatchTV() {
            // 看剧得卡
            const self = this;
            logh5.goldlog('CLK', 'seevideobtn');
            if (self.isLogin) {
                window.commonData.homePlayer.pause();
                const taskDesc = self.taskConfig.videotask.toast;
                const toastHideTime = self.taskConfig.toastHideTime;
                self.showToast(taskDesc);
                // if (this.videotask) {//videotask为true表示任务可做，即任务未完成
                //     fn.goUpdateTime(this.$store, 'videotask');
                // }
                setTimeout(() => {
                    self.hideToast();
                    bridge.play({
                        vid: self.taskConfig.videotask.vid, //或者未编码的vid：752369169可能会不兼容，约定格式会编码后的vid
                        showid: self.taskConfig.videotask.showId, //剧集id，非数字id 可选
                        source: 'mplaypage', //用于标识播放页类型 可选
                    });
                }, toastHideTime);
            } else {
                self.$store.commit('SHOW_LOGIN_TOAST', true);
            }
        },
        showToast(taskDesc){
            const self = this;
            if (!self.$data.toastShow) {
                self.$data.toastShow = true;
                self.$data.taskDesc = taskDesc;
            }
        },
        hideToast(){
            const self = this;
            self.$data.toastShow = false;
            self.$data.taskDesc = '';
        }
    },
};
</script>
