<template>
    <div class="bannerone" style="display:block" @click="clickBanner"><img :src="bannerPic" class="pic"></div>
</template>

<script>
import { logh5 } from '@ali/lib-goldlog';
import bridge from '@ali/lib-bridge';
export default {
    name: 'bannerone',
    data () {
        return {
            bannerPic: null,
            bannerUrl: null
        };
    },
    created () {
        // const dataBanner = window.mgData.structure;
        // // eslint-disable-next-line
        // console.log(dataBanner);
        const dataConfig = window.mgData.structure;
        let banner = null;
        dataConfig.forEach((item) => {
            // const modList = item.mod;
            if (item.mod === 'page-bannerOne') {
                banner = item.config;
            }
        });
        banner = JSON.parse(banner);
        this.bannerPic = banner.pic;
        this.bannerUrl = banner.url;
    },
    methods: {
        clickBanner() {
            logh5.goldlog('CLK', 'indexBannerOne1');
            if (this.bannerUrl) {
                bridge.loadUrl({
                    link: this.bannerUrl
                });
            }
        }
    }

};
</script>
