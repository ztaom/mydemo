<template>
    <div id="turntable">
        <div class="zhuanpan">
            <div class="zpbg"><img src="../img/zp_zpbg.png" class="pic"></div>
            <div class="zpinfo">
                <ul class="prizelist">
                    <li v-for="item in prizeList">
                        <img :src="item.pic" class="pic">
                    </li>
                </ul>
                <div class="cjvideo">
                    <div id="video"></div>
                    <div class="startarea" v-show="islotterBtn">
                        <div class="startbtn" @click="openCard(0)"><img :src="startbtn" class="pic"></div>
                        <p class="txt">您有<em>{{remainderDrawCount}}</em>张多余将军卡，每次夺宝消耗 1 张</p>
                    </div>
                    <div class="goonarea" v-show="isOpenAgain">
                        <div class="startbtn" @click="openCard(1)"><img :src="goonbtn" class="pic"></div>
                        <p class="txt">您有<em>{{remainderDrawCount}}</em>张多余将军卡</p>
                    </div>
                    <!-- 中奖提示 -->
                    <div class="p_tips" v-show="isResultPop">
                        <div class="txt">{{lotterTxt}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="actintr">
            <h3>活动介绍</h3>
            <p v-html="ruleText"></p>
            <!-- <p v-for="item in rules">{{item.text}}</p> -->
        </div>
        <div class="cjbanner"><img :src="banner.pic" class="pic" @click="linkAD"></div>
    </div>
</template>

<script>
// import { mapState } from 'vuex';
// import request from '@ali/lib-request';
import RequestData from '../data/data';
import bridge from '@ali/lib-bridge';
import { logh5 } from '@ali/lib-goldlog';
export default {
    name: 'turntable',
    data () {
        return {
            islotterBtn:true,
            isOpenAgain:false,
            isResultPop:false,
            remainderDrawCount: 0,
            picBg:'',
            prizeList:[],
            vidList:[],
            lotterTxt:'',
            ruleText:'',
            startbtn:'',
            goonbtn:'',
            resultTime:'',
        };
    },
    created(){
        document.body.scrollTop = 0;
        this.turnTableData = window.mgData.turnTableData;
        this.prizeList = this.turnTableData.prizeList;
        this.picBg = this.turnTableData.picBg;
        this.vidList = this.turnTableData.vidList;
        this.ruleText = this.turnTableData.ruleText;
        this.resultTime = this.turnTableData.time;
        this.goonbtn = this.turnTableData.goonbtn;
        this.startbtn = this.turnTableData.startbtn;
        this.banner = this.turnTableData.banner;
        this.getLotterInfo();
    },
    mounted() {
        this.initPlayer(this.vidList);
    },
    methods: {
        initPlayer(vidList) {
            let i = 0;
            const config = {
                videoId: vidList[i].vid, //视频id【必传】
                ccode: '0501', //渠道id 【必传】
                control: {
                    laguange: '', //默认使用的语言类型
                    hd: 'mp4hd', //默认使用的码率
                    autoplay: false, //可选，默认不自动播放，非优酷app内部，慎用，可能会不支持【可选】
                },
                events:{
                    onPlayEnd:() => {
                        i++;
                        if (i === vidList.length) {
                            i = 0;
                        }
                        this.player.changeByVid(vidList[i].vid);
                        setTimeout(() => {
                            this.player.play();
                        }, 500);
                    }
                }
            };
            const uiconfig = {
                hidetitle:true //是否隐藏标题
            };
            this.player = window.YKPlayer.Player('video', config, uiconfig);
        },
        async getLotterInfo(){
            // request.requestMtop({
            //     // debug:1,
            //     DEV:'pre',
            //     api:'mtop.com.youku.aplatform.securySet',
            //     bizType:'agent_zh.Agent.GetSingleCardPrize'
            // }).then(data => {
            //     alert(JSON.stringify(data));
            // }, data => {
            //     alert(JSON.stringify(data));
            // });
            const result = await RequestData.getLetterCard();
            this.remainderDrawCount = result.data.data.remainderDrawCount || 0;
        },
        async openCard(params){
            clearInterval(this.timer);
            if (params) {
                logh5.goldlog('CLK', 'clickgoondbbtn');
            } else {
                logh5.goldlog('CLK', 'clickstartdbbtn');
            }
            if (this.isLotter) return false;
            this.isLotter = true;
            window.addEventListener('touchmove', this.windowNoScroll, false);
            this.player.play();
            this.islotterBtn = false;
            this.randomEffect();
            const result = await RequestData.openLetterCard();
            const data = result.data.data;
            if (result.data.code === 0 ) {
                this.remainderDrawCount = data.remainderDrawCount || 0;
                this.isOpenAgain = true;
                if (data.awards) {
                    this.lotterTxt = data.awards.length > 1 ? `恭喜获得“${data.awards[0].name}”等奖品` : `恭喜获得“${data.awards[0].name}”`;
                } else {
                    this.lotterTxt = '您没有中奖，再接再厉！';
                }
                setTimeout(() => {
                    this.isResultPop = true;
                    window.removeEventListener('touchmove', this.windowNoScroll, false);
                }, this.resultTime);
                setTimeout(() => {
                    clearInterval(this.timer);//结果请求出来之后
                    this.removeLiClass();
                }, this.resultTime - 500);
                setTimeout(() => {
                    this.isResultPop = false;
                    this.isLotter = false;
                }, parseInt(this.resultTime) + 2000);
                this.$store.commit('UPDATE_ROLES', data.allRoles); //更新卡包信息的数据
            } else if (result.data.code === -10){
                this.lotterTxt = result.data.desc;
                this.isResultPop = true;
                this.isOpenAgain = false;
                setTimeout(() => {
                    clearInterval(this.timer);//结果请求出来之后
                    this.removeLiClass();
                    this.isResultPop = false;
                    this.isLotter = false;
                    window.removeEventListener('touchmove', this.windowNoScroll, false);
                }, 1000);
            } else {
                this.lotterTxt = result.data.desc;
                this.isOpenAgain = true;
                this.isResultPop = true;
                setTimeout(() => {
                    clearInterval(this.timer);//结果请求出来之后
                    this.removeLiClass();
                    this.isResultPop = false;
                    this.isLotter = false;
                    window.removeEventListener('touchmove', this.windowNoScroll, false);
                }, 1000);
            }
        },
        randomEffect(){
            this.timer = setInterval(() => {
                const round = parseInt(Math.random() * 8);
                this.removeLiClass();
                document.querySelector('.prizelist').getElementsByTagName('li')[round].classList.add('current');
            }, 200);
        },
        removeLiClass(){
            const listArr = document.querySelector('.prizelist').getElementsByTagName('li');
            for (let i = 0 ;i < listArr.length; i++){
                listArr[i].classList.remove('current');
            }
        },
        linkAD(){
            logh5.goldlog('CLK', 'turntablebanner');
            /*eslint no-alert: 0*/
            if (this.banner.url) {
                bridge.loadUrl({
                    link: this.banner.url
                });
            }
        },
        windowNoScroll(e){
            e.preventDefault();
            return false;
        }
    }
};
</script>
<style scope lang='less'>
@import '../less/turntable.less';
</style>
