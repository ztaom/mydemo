<template>
    <!-- 奖品展示 -->
    <div class="prizeshow" @click="thisGoto">
        <img :src="prizePic" class="pic">
    </div>
</template>

<script>
export default {
    name: 'prizeshow',
    data () {
        return {
            prizePic: '奖品明细',
            gotoUrl: null
        };
    },
    created () {
        const mgPrize = window.mgData.prizeShow;
        this.prizePic = mgPrize[0].prize;
        this.gotoUrl = mgPrize[0].url;
        // eslint-disable-next-line
        // console.log(this.gotoUrl);
    },
    methods: {
        thisGoto() {
            if (this.gotoUrl) {
                location.href = this.gotoUrl;
                // eslint-disable-next-line
            }

            //点击跳转暂停播放
            // window.commonData.homePlayer.pause();
        }
    }
};
</script>
