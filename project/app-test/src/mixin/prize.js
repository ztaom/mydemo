import config from '../config';
import { mapState } from 'vuex';
import bridge from '@ali/lib-bridge';
import callApp from '@ali/yk-callapp';
import { Browser } from '@ali/browser-detect';
import login from '../common/login';

export default {
    computed: {
        ...mapState({
            isLogin: state => state.isLogin,
            playChances: state => state.playChances
        }),
        mtData() {
            return config.mtData;
        }
    },
    methods: {
        /*
            排行榜领取奖励
        */
        __getPrize(params = {}) {
            this.$store.dispatch('getPrize', params).then(() => {
                this.$store.dispatch('getTopRank', window.exparam);
            }, (err) => {
                console.log(err);
            });
        },

        __unlockBox() {
            // console.log('解锁宝箱');
        },
        __openBox(box) {
            // 打开宝箱
            if (!Browser.isYouku) {
                const params = {
                    boxId: box.boxId,
                    seq: box.seq,
                };
                this.$store.dispatch('openBox', params);
            }
        },
        __startGame() {
            // console.log('开始游戏');
        },
        fillTime(t) {
            return `0${t}`.replace(/.*(\d{2,2})$/, '$1');
        },
        __lunchApp() {
            const ykconfig = {
                isNeedDownload: true,
                downloadUrl: config.mtData.downloadUrl, //下载页
                replace: false, //是否替换当前页面
                params: {
                    'action': 'splash', //http协议
                    //'url': openHalfUrl, //打开url
                    'source': 'jslm2', //APP用source来统计唤起量
                    // 'universalRedirect': ''
                },
                pathname: 'splash', //http协议
                exdParams: {
                    from: 'jslm2'
                }
            };
            callApp.gotoPage(ykconfig);

        },
        __getVideTask() {
            if (Browser.isYouku && Browser.ext.isWindVane) {
                //获取当前播放页的showid
                window.WindVane.call('DJH5Player', 'videoinfo', {}, (e) => {
                    let videoInfo = '';
                    let videoId = '';
                    let showId = '';
                    const mtShowId = config.mtData.otherConfig.showid;
                    if (e && e.param) {
                        videoInfo = e.param.videoinfo;
                        videoId = videoInfo.video.encodeid;
                        showId = videoInfo.show.id;
                        console.log(`${videoId}***${showId}**${mtShowId}`);
                    }
                    if (parseInt(showId) === parseInt(mtShowId)) {
                        setInterval(() => {
                            const param = {
                                taskId: 1
                            };
                            this.__addPlayChance(param);
                        }, 1000);
                    }
                });
            }
        },
        // 分享
        __getShareTask() {
            // 已登录 & 还有playChances.count < playChances.limit 可得游戏币
            const shareInfo = config.mtData.shareInfo[0];
            const openHalfUrl = config.mtData.callAppConfig.openHalfUrl;
            if (Browser.isYouku) {
                bridge.setShare({
                    title: shareInfo.title,
                    link: openHalfUrl,
                    img: shareInfo.pic, //带http、https协议
                    desc: shareInfo.desc, //分享内容描述
                    taskId: '' //用于业务方标识该分享的一个任务id 没有可与不传
                });
            }
        },
        __queryPlayChance() {
            this.$store.dispatch('queryPlayChance');
        },
        __addPlayChance(params) {
            this.$store.dispatch('addPlayChance', params).then((res) => {
                console.log(res);
                this.__queryPlayChance();
            }, () => {});
        },
        __showPop(popName, popState) {
            this.$store.commit('SHOW_POP', [popName, popState]);
        },
        __hidePop(popName, popState) {
            this.$store.commit('HIDE_POP', [popName, popState]);
        },
        __callLogin(callbackUrl) {
            login.callLogin(callbackUrl);
        }
    }

};