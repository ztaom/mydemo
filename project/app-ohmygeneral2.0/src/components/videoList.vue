<template>
    <!-- 视频星球区域 -->
    <div class="videowrap">
        <div class="title"><img :src="videoTitle" class="pic"></div>
        <div class="videolist" data-spm='c_vidgroup'>
            <div class="item" v-for="(item, index) in videoList" @click="toPlay" :data-vid="item.vid" :data-index="index" :data-spm="'d_vid'+(Number(index)+1)">
                <img :src="item.vidPoster">
                <h3>{{ item.title }}</h3>
                <p>{{ item.desc }}</p>
            </div>
        </div>

    </div>

</template>

<script>
import bridge from '@ali/lib-bridge';
import { logh5 } from '@ali/lib-goldlog';
export default {
    name: 'videowrap',
    data () {
        return {
            videoList: '',
            playDate: '独家开播',
            starList: [],
            picList:null,
            videoTitle: window.mgData.baseInfo.videoTitle
        };
    },
    created () {
        const jsVideoList = window.mgData.videoList;
        this.videoList = jsVideoList;
        this.playDate = window.mgData.playData;
    },
    methods: {
        toPlay(e) {
            const sVid = e.currentTarget.getAttribute('data-vid');
            const vIndex = e.currentTarget.getAttribute('data-index');
            let godVid = 'v';
            godVid = `${godVid}${(Number(vIndex) + 1)}_${sVid}`;
            logh5.goldlog('CLK', godVid);

            //跳转播放页
            bridge.play({
                vid: sVid
            });

            //点击跳转暂停播放
            window.commonData.homePlayer.pause();
        }
    }

};
</script>
