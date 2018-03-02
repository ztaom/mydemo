<template>
    <!-- 视频星球区域 -->
    <div class="starwrap" @click="toStar">
        <img :src='starPic' class="pic">
    </div>

</template>

<script>
import bridge from '@ali/lib-bridge';
import { logh5 } from '@ali/lib-goldlog';
export default {
    name: 'starwrap',
    data () {
        return {
            starPic: '',
            starId: ''
        };
    },
    created () {
        const starBanner = window.mgData.starBanner;
        this.starPic = starBanner.pic;
        this.starId = starBanner.toStarId;
    },
    methods: {
        toStar() {
            logh5.goldlog('CLK', 'clickstarbanner');
            // 跳转星球话题
            bridge.navigatorPlanets({
                target : `youku://planet/fans_topic_homepage?id=${this.starId}`,
                fallback : `https://m.planet.youku.com/topic?id=${this.starId}`,
                vi : '6.6.2.1',
                va : '6.6.3.3'
            });
        }
    }
};
</script>
