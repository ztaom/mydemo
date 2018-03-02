<template>
    <div class="bannertwo" style="display:block" @click="clickBanner"><img :src="bannerPic" class="pic"></div>
</template>

<script>
import { logh5 } from '@ali/lib-goldlog';
export default {
    name: 'bannertwo',
    data () {
        return {
            bannerPic: null
        };
    },
    created () {
        const dataConfig = window.mgData.structure;
        let banner = null;
        dataConfig.forEach((item) => {
            if (item.mod === 'page-bannerTwo') {
                banner = item.config;
            }
        });
        banner = JSON.parse(banner);
        this.bannerPic = banner.pic;
    },
    methods: {
        clickBanner() {
            try {
                logh5.goldlog('CLK', 'indexBannerOne2');
                if (window.commonData.homePlayer) {
                    window.commonData.homePlayer.pause();
                }
            } catch (e) {
                console(e);
            }
            window.location.hash = '#/turntable';
        }
    }

};
</script>
