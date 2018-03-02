<template>
    <!-- 广告位 -->
    <div class="adswrap">
        <div class="title"><img :src="title" class="pic"></div>
        <ul class="bannerlist">
            <li v-for="(item, index) in adsense" @click="toLink" :data-link="item.bannerLink" :data-index="index">
                <img :src="item.bannerPic" class="pic">
            </li>
        </ul>
        <ul class="linklist">
            <li v-for="item in friends">
                <img :src="item.logo" class="pic">
            </li>
        </ul>
        <div class="torule" @click="toRule" style="display:none">查看活动规则详情</div>
    </div>
</template>

<script>
import { logh5 } from '@ali/lib-goldlog';
import bridge from '@ali/lib-bridge';
export default {
    name: 'adswrap',
    data () {
        return {
            adsense: '',
            ruleId: '',
            friends: '',
            title: window.mgData.baseInfo.bannerTitle
        };
    },
    created () {
        const jsAdsense = window.mgData.adsense;
        const jsFriends = window.mgData.friends;
        this.adsense = jsAdsense;
        this.ruleId = window.mgData.ruleId;
        this.friends = jsFriends;
        window.addEventListener('scroll', this.scrollEvent, false);
    },
    methods: {
        toLink(e) {
            const bannerIndex = e.currentTarget.getAttribute('data-index');
            const bannerUrl = e.currentTarget.getAttribute('data-link');
            if (bannerUrl) {
                bridge.loadUrl({
                    link: bannerUrl
                });
            }
            let godBanner = 'banner';
            godBanner = `${godBanner}${(Number(bannerIndex) + 1)}`;
            logh5.goldlog('CLK', godBanner);
        },
        toRule() {
            logh5.goldlog('CLK', 'showrule');
            // 活动规则
            bridge.navigatorPlanets({
                target : `youku://planet/fans_topic_homepage?id=${this.ruleId}`,
                fallback : `https://m.planet.youku.com/topic?id=${this.ruleId}`,
                vi : '6.6.2.1',
                va : '6.6.3.3'
            });
        },
        scrollEvent() {//监听滚动到视频列表模块时，发送曝光埋点
            if (!this.isScrolling) {
                this.isScrolling = true;
                const height = window.innerHeight;
                const minH = 1.4 * height;
                // const maxH = 1.8 * height;
                const scrollH = document.body.scrollTop || document.documentElement.scrollTop;
                if (scrollH > minH) {
                    this.srcollTimer = setTimeout(() => {
                        clearTimeout(this.srcollTimer);
                        if (scrollH > minH) {
                            logh5.goldlog('EXP', 'bannerEXP');//视频列表模块曝光
                        }
                        this.isScrolling = false;
                    }, 1000);
                } else {
                    this.isScrolling = false;
                }
            }
        }
    }
};
</script>
