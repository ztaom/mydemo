<template>
    <!-- 视频星球区域 -->
    <div class="starlistwrap" v-show="starShow">
        <div class="title"><img :src="starTitle" class="pic"></div>
        <div class="starlist" data-spm='c_stargroup'>
            <div class="item" v-for="(item, index) in starList" @click="toStar" :data-index="index" :data-sid="item.id" :data-spm="'d_star'+(Number(index)+1)">
                <div class="avatar"><img :src="picList.get(item.id.toString())" class="pic"></div>
                <div class="text">
                    <h3>{{ item.name }}</h3>
                    <p><span>阅读{{ item.viewCount }}</span><span>参与{{ item.discussCount }}</span></p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import bridge from '@ali/lib-bridge';
import { logh5 } from '@ali/lib-goldlog';
import mtop from '@ali/lib-mtop';

mtop.config.prefix = 'acs';
mtop.config.subDomain = '';
mtop.config.mainDomain = 'youku.com';
export default {
    name: 'starlistwrap',
    data () {
        return {
            starList: [],
            picList:null,
            starTitle: window.mgData.baseInfo.starTitle,
            starShow: true
        };
    },
    created () {
        const topicIds = window.mgData.topicIds;
        const starIda = topicIds[0].id;
        const starIdb = topicIds[1].id;
        const starIdc = topicIds[2].id;
        const starTopicIds = [starIda, starIdb, starIdc];

        //遍历id和pic对应关系
        this.picList = new Map();
        topicIds.forEach(item => {
            this.picList.set(item.id, item.pic);
        });
        // console.log(this.picList.get(starIda));

        const params = {
            'requestStr': `{\"header\": {},\"model\": {\"topicIds\": [${starTopicIds}], \"postIds\": []}}`
        };

        const promise = mtop.request({
            //通用参数
            api: 'mtop.youku.community.counsellorservice.getcommunitycontents',
            ecode: 0,
            dataType:'jsonp',
            v: '1.0',
            appKey: '23536927',
            data: params
        });
        promise.then(data => {
            // console.log('成功');
            // console.log(starData);
            const starData = data.data.data.topics;
            this.starList = starData;
        }, data => {
            this.starShow = false;
            console.log('失败');
            console.log(data);
        });
    },
    methods: {
        toStar(e) {
            const sIndex = e.currentTarget.getAttribute('data-index');
            const sId = e.currentTarget.getAttribute('data-sid');
            // console.log(sIndex);
            // console.log(sId);
            let star = 'star';
            star = `${star}${(Number(sIndex) + 1)}`;
            logh5.goldlog('CLK', star);
            // 跳转星球话题
            bridge.navigatorPlanets({
                target : `youku://planet/fans_topic_homepage?id=${sId}`,
                fallback : `https://m.planet.youku.com/topic?id=${sId}`,
                vi : '6.6.2.1',
                va : '6.6.3.3'
            });

            //点击跳转暂停播放
            window.commonData.homePlayer.pause();
        }
    }

};
</script>
