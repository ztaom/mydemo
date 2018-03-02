<template>
    <div>
        <div id="cardlist" v-if="allRoles">
            <div class="title"><img src="../img/cl_title.png" class="pic"></div>
            <div class="recordbtn" @click="getRecord('dialogCHShow')">得卡明细</div>
            <!--卡片区域做成onload之后加载，增加默认图，通过mt配置-->
            <ul class="list">
                <li v-for="(item, index) in allRoles">
                    <div v-if="item.num > 0" class="card" v-on:click="getDetail(index)"><img :src="item.cardicon" class="pic"></div>
                    <div v-else class="card" v-on:click="getDetail(index)"><img :src="item.backCardIcon" class="pic"></div>
                    <p>{{item.num || 0}}张</p>
                </li>
            </ul>
            <!-- （点击卡片之后出现）人物相关视频组件 -->
            <VideoPrize :roles="allRoles"></VideoPrize>
            <!-- 得卡明细 -->
            <RecordList></RecordList>
        </div>
        <div id="cardlist" v-else>
            <div class="title"><img src="../img/cl_title.png" class="pic"></div>
            <div class="recordbtn" @click="getRecord('dialogCHShow')">得卡明细</div>
            <!--卡片区域做成onload之后加载，增加默认图，通过mt配置-->
            <ul class="list">
                <li v-for="(item, index) in defaultAllRoles">
                    <div class="card"><img :src="item.url" class="pic"></div>
                    <p>0张</p>
                </li>
            </ul>
            <!-- （点击卡片之后出现）人物相关视频组件 -->
            <VideoPrize :roles="allRoles"></VideoPrize>
            <!-- 得卡明细 -->
            <RecordList></RecordList>
        </div>
    </div>
</template>

<script>

import { logh5 } from '@ali/lib-goldlog';
import { mapState } from 'vuex';
export default {
    name: 'cardlist',
    data () {
        //const mt = window.mgData;
        return {
            defaultAllRoles: new Array(9).fill({
                url: '//gw.alicdn.com/tfs/TB1NCPUqgMPMeJjy1XcXXXpppXa-186-279.png'
            }),
            allRoles: null,
            //defaultPic: mt.baseInfo.defaultCardO
        };
    },
    components: {
        'VideoPrize': () => import('./videoPrize'),
        'RecordList': () => import('./recordList')
    },
    computed: mapState({
        isLogin(store) {
            return store.isLogin;
        },
        getAllRoles(state) {
            return state.cardData.allRoles;
        }
    }),
    methods: {
        init() {
            this.allRoles = this.getAllRoles;
        },
        //弹出得卡明细
        getRecord(dialogName) {
            if (this.isLogin) {
                logh5.goldlog('CLK', 'getcardbtn');
                this.$store.dispatch('getRecordData');
                this.$store.commit('SHOW_DIALOG', dialogName);
            } else {
                this.$store.commit('SHOW_LOGIN_TOAST', true);
            }
        },
        //展示卡片详情
        getDetail(index) {
            if (this.isLogin) {
                const _role = this.allRoles[index];
                //const cardId = _role.id;
                const cardName = _role.name;
                logh5.goldlog('CLK', `card_${cardName}`);
                this.$store.commit('DETAIL_INDEX', index);
                this.$store.commit('DETAIL_SHOW', true);
            } else {
                this.$store.commit('SHOW_LOGIN_TOAST', true);
            }
        },
    },
    created() {
        document.body.scrollTop = 0;
        if (this.$store.state.cardData) {
            this.allRoles = this.$store.state.cardData.allRoles;
        }
        if (this.$store.state.isLogin) {
            this.isLogin = this.$store.state.isLogin;
        }
    },
    watch: {
        getAllRoles() {
            this.init();
        }
    }
};
</script>

<style scope lang='less'>
@import '../less/cardlist.less';
</style>


