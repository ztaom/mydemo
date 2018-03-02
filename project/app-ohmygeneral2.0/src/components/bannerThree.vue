<template>
    <div class="bannerthree" @click="clickBanner"><img :src="bannerPic" class="pic"></div>
</template>

<script>
import { logh5 } from '@ali/lib-goldlog';
import bridge from '@ali/lib-bridge';
export default {
    name: 'bannerthree',
    data () {
        return {
            bannerPic: null,
            bannerUrl: null
        };
    },
    created () {
        // const dataBanner = window.mgData.structure;
        // eslint-disable-next-line
        // console.log(dataBanner);
        const dataConfig = window.mgData.structure;
        let banner = null;
        dataConfig.forEach((item) => {
            // const modList = item.mod;
            if (item.mod === 'page-bannerThree') {
                banner = item.config;
            }
        });
        banner = JSON.parse(banner);
        this.bannerPic = banner.pic;
        this.bannerUrl = banner.url;
    },
    methods: {
        clickBanner() {
            logh5.goldlog('CLK', 'indexBannerOne3');
            if (window.commonData.homePlayer) {
                window.commonData.homePlayer.pause();
            }
            if (this.bannerUrl) {
                bridge.loadUrl({
                    link: this.bannerUrl
                });
            }
        }
    }

};
</script>
