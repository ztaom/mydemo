<template>
    <!-- 首页视频 -->
    <div class="indexvideo">
        <div class="indextitle"><img :src="topPic" class="pic"></div>
        <div class="vwrap">
            <div class="video" id="ivideo"></div>
            <!-- 跳转播放页 -->
            <div class="gotoplay" @click="toPlay">
                <img :src="toPlayPic" class="pic">
            </div>
            <div class="indextips">
                <!-- 中奖播报 -->
                <div class="scrollalt" v-show="showAltTips">
                    <div class="scorll_move">
                        <span id="information">
                            {{awardNews}}
                        </span>
                        <span id="information1">
                            {{awardNews}}
                        </span>
                    </div>
                </div>
                <!-- 红包雨提示 -->
                <div class="redraintip" v-show="showRedTips">
                    <p>{{redPackageTipts}}</p>
                </div>
            </div>
        </div>
        <div v-show="isAutoPlay" v-on:click="changeVoice" :class="voiceStyle"></div>
        <div class="videotext" style="display:none"><img :src="videoPic" class="pic"></div>
        <div @click="toRule" class="utxt ruletext">活动规则</div>
    </div>
</template>

<script>
import { logh5 } from '@ali/lib-goldlog';
import bridge from '@ali/lib-bridge';
export default {
    name: 'indexvideo',
    data() {
        return {
            topPic: window.mgData.topPic,
            videoPic: window.mgData.videoPic,
            isAutoPlay: false,
            voiceStyle: 'voiceicon hidevoice',
            redPackageTipts: window.mgData.baseInfo.redPackageTips,
            showRedTips: window.mgData.baseInfo.showRedTips,
            showAltTips: false,
            indextips: false,   //中奖播报
            toPlayPic: window.mgData.baseInfo.toPlayPic,
            ruleId: window.mgData.ruleId
        };
    },
    computed: {
        awardNews () {
            return (this.$store.state.awardNews.slice(0, 50).join('，'));
        },
    },
    created () {
        console.log(window.mgData.baseInfo.showRedTips);
        if (this.showRedTips === false) {
            this.showAltTips = true;
        } else {
            this.showAltTips = false;
        }
        const indextips = (this.$store.state.awardNews.length > 0) ? true : false;
        this.$data.indextips = indextips;
    },
    methods: {
        async initPlayer(vid) {
            window.commonData.homePlayer = null;
            try {
                await window.WindVane.call('WVNetwork', 'getNetworkType', {}, (data) => {
                    if (data && data.type && data.type.toLowerCase() === 'wifi') {
                        this.isAutoPlay = true;
                    }
                });
            } catch (err) {
                console.log(err);
            }
            const config = {
                videoId: vid, //视频id【必传】
                ccode: '0501', //渠道id 【必传】
                'client_id': 'f7c2b04eea94f042', //优酷视频云创建应用的client_id，用于去广告
                control: {
                    laguange: '', //默认使用的语言类型
                    hd: 'mp4hd', //默认使用的码率
                    autoplay: false //可选，默认不自动播放，非优酷app内部，慎用，可能会不支持【可选】
                    // autoplay: this.isAutoPlay //可选，默认不自动播放，非优酷app内部，慎用，可能会不支持【可选】
                },
                events: {
                    'onReady': () => {//数据已经准备好，可触发播放回调
                        if (this.isAutoPlay) {
                            window.commonData.homePlayer.play();
                            // document.querySelector('.ykplayer .x-video-button .x-video-play-ico').style.display = 'block';
                        }
                    },
                    'onPlay': () => {
                        logh5.goldlog('CLK', 'clickMainVideo');
                        document.querySelector('.ykplayer .x-video-button .x-video-play-ico').style.display = 'none';
                    },
                    'onPause': () => {
                        document.querySelector('.ykplayer .x-video-button .x-video-play-ico').style.display = 'block';
                    },
                    'onPlayEnd': () => {
                        document.querySelector('.ykplayer .x-video-button .x-video-play-ico').style.display = 'block';
                    }
                },
            };
            const uiconfig = {
                hidetitle: true, //是否隐藏标题
                hidelogo: true
            };
            window.commonData.homePlayer = window.YKPlayer.Player('ivideo', config, uiconfig);
            const voiceState = this.isAutoPlay ? 0 : 1;
            window.commonData.homePlayer.changeMuted(voiceState);
        },
        toRule() {
            logh5.goldlog('CLK', 'showrule');
            window.commonData.homePlayer.pause();
            // 活动规则
            bridge.navigatorPlanets({
                target: `youku://planet/fans_post_detail?id=${this.ruleId}`,
                fallback: `https://m.planet.youku.com/post-app/${this.ruleId}`,
                vi: '6.6.2.1',
                va: '6.6.3.3'
            });
        },
        toPlay() {
            logh5.goldlog('CLK', 'indexToPlay');
            window.commonData.homePlayer.pause();
            // 活动规则
            bridge.play({
                showid: window.mgData.taskConfig.videotask.showId, //剧集id，非数字id 可选
                source: 'mplaypage', //用于标识播放页类型 可选
            });
        },
        changeVoice() {
            if (this.voiceStyle === 'voiceicon') {
                this.voiceStyle = 'voiceicon hidevoice';
                window.commonData.homePlayer.changeMuted(0);
            } else {
                this.voiceStyle = 'voiceicon';
                window.commonData.homePlayer.changeMuted(1);
            }
        }
    },
    mounted() {
        const indexVid = (window.mgData && window.mgData.indexVid) || 'XMzA2NzQwODUyOA==';
        this.initPlayer(indexVid);
    }
};
</script>
